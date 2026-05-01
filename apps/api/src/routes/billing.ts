import type { FastifyInstance } from "fastify";
import {
  createCheckoutSession,
  createCustomerPortalSession,
  isPlanCode,
  normalizeStripeSubscriptionStatus,
  verifyWebhookSignature,
} from "@sua-marca/billing";
import { db } from "../lib/db";
import { deriveEntitlementUpdateFromStripeEvent } from "../lib/billing-webhook";
import { buildEntitlementUpdates } from "../lib/entitlement-sync";

export async function registerBillingRoutes(app: FastifyInstance) {
  app.get("/billing/status", async (request, reply) => {
    const query = request.query as { email?: string };
    const email = query.email;

    if (!email) {
      reply.code(400);
      return { error: "missing_email" };
    }

    const user = await db.user.findUnique({
      where: { email },
      include: { subscriptions: true, licenses: true },
    });

    if (!user) {
      reply.code(404);
      return { error: "user_not_found" };
    }

    return {
      email: user.email,
      subscriptions: user.subscriptions.map((entry: { plan: string; status: string; provider: string }) => ({
        plan: entry.plan,
        status: normalizeStripeSubscriptionStatus(entry.status),
        provider: entry.provider,
      })),
      licenses: user.licenses.map((entry: { plan: string; active: boolean }) => ({
        plan: entry.plan,
        active: entry.active,
      })),
    };
  });

  app.post("/billing/checkout", async (request, reply) => {
    const body = request.body as { email?: string; plan?: string; successUrl?: string; cancelUrl?: string };
    if (!body.email || !body.plan || !body.successUrl || !body.cancelUrl) {
      reply.code(400);
      return { error: "missing_input" };
    }

    if (!isPlanCode(body.plan) || body.plan === "FREE") {
      reply.code(400);
      return { error: "invalid_plan" };
    }

    const session = await createCheckoutSession({
      userEmail: body.email,
      plan: body.plan,
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
    });

    return { checkoutUrl: session.url };
  });

  const customerPortalHandler = async (request: any, reply: any) => {
    const body = request.body as { email?: string; returnUrl?: string };
    if (!body.email || !body.returnUrl) {
      reply.code(400);
      return { error: "missing_input" };
    }

    const session = await createCustomerPortalSession({ customerEmail: body.email, returnUrl: body.returnUrl });
    return { portalUrl: session.url };
  };
  app.post("/billing/customer-portal", customerPortalHandler);
  app.post("/billing/portal", customerPortalHandler);

  const stripeWebhookHandler = async (request: any, reply: any) => {
    const signature = request.headers["stripe-signature"] as string | undefined;
    const payload = JSON.stringify(request.body ?? {});

    const isValid = verifyWebhookSignature(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
    if (!isValid) {
      reply.code(400);
      return { error: "invalid_signature" };
    }

    const event = request.body as { id?: string; type?: string; data?: { object?: Record<string, unknown> } };
    if (!event.id || !event.type) {
      reply.code(400);
      return { error: "invalid_event" };
    }

    const existing = await db.webhookEvent.findUnique({ where: { providerEventId: event.id } });
    if (existing?.processedAt) {
      return { received: true, idempotent: true };
    }

    await db.webhookEvent.upsert({
      where: { providerEventId: event.id },
      update: { payload: request.body as object, processedAt: new Date() },
      create: {
        provider: "stripe",
        providerEventId: event.id,
        payload: request.body as object,
        processedAt: new Date(),
      },
    });

    const typedEvent = { id: event.id, type: event.type, data: event.data };
    const update = deriveEntitlementUpdateFromStripeEvent(typedEvent);
    if (update) {
      const user = await db.user.findUnique({ where: { email: update.email } });
      if (user) {
        await db.subscription.upsert({
          where: { providerRef: update.providerRef },
          update: {
            status: update.normalizedStatus,
            plan: update.planCode,
            provider: "stripe",
          },
          create: {
            userId: user.id,
            provider: "stripe",
            providerRef: update.providerRef,
            status: update.normalizedStatus,
            plan: update.planCode,
          },
        });

        for (const entitlement of buildEntitlementUpdates(update.entitlementShouldBeActive)) {
          await db.entitlement.upsert({
            where: { userId_key: { userId: user.id, key: entitlement.key } },
            update: { status: entitlement.status, source: "stripe_webhook" },
            create: {
              userId: user.id,
              key: entitlement.key,
              status: entitlement.status,
              source: "stripe_webhook",
            },
          });
        }
      }
    }

    return { received: true, idempotent: false };
  };
  app.post("/billing/webhook", stripeWebhookHandler);
  app.post("/billing/webhooks/stripe", stripeWebhookHandler);
}
