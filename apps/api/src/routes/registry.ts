import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";
import { computeAccess } from "../lib/access";

export async function registerRegistryRoutes(app: FastifyInstance) {
  app.post("/registry/authorize", async (request, reply) => {
    const body = request.body as { email?: string };
    const email = body?.email;

    if (!email) {
      reply.code(400);
      return { allowed: false, reason: "missing_email" };
    }

    const user = await db.user.findUnique({
      where: { email },
      include: { entitlements: true, subscriptions: true, licenses: true },
    });

    if (!user) {
      reply.code(404);
      return { allowed: false, reason: "user_not_found" };
    }

    const access = computeAccess({
      entitlements: user.entitlements,
      subscriptions: user.subscriptions,
      licenses: user.licenses,
    });

    return { allowed: access.canAccessPro, reason: access.canAccessPro ? "ok" : "missing_entitlement" };
  });
}
