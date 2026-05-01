import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";

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
      subscriptions: (user.subscriptions as Array<{plan:string;status:string;provider:string}>).map((entry) => ({
        plan: entry.plan,
        status: entry.status,
        provider: entry.provider,
      })),
      licenses: (user.licenses as Array<{plan:string;active:boolean}>).map((entry) => ({
        plan: entry.plan,
        active: entry.active,
      })),
    };
  });
}
