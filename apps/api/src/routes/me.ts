import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";
import { computeAccess } from "../lib/access";

export async function registerMeRoutes(app: FastifyInstance) {
  app.get("/me", async (request, reply) => {
    const query = request.query as { email?: string };
    const email = query.email ?? "pro@example.com";

    const user = await db.user.findUnique({
      where: { email },
      include: { entitlements: true, subscriptions: true, licenses: true },
    });

    if (!user) {
      reply.code(404);
      return { error: "user_not_found" };
    }

    return {
      user: { id: user.id, email: user.email },
      access: computeAccess({
        entitlements: user.entitlements,
        subscriptions: user.subscriptions,
        licenses: user.licenses,
      }),
    };
  });
}
