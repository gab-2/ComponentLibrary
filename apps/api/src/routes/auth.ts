import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";

export async function registerAuthRoutes(app: FastifyInstance) {
  app.get("/auth/session", async (request, reply) => {
    const email = (request.headers["x-user-email"] as string | undefined) ?? null;
    if (!email) {
      return { authenticated: false };
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      reply.code(401);
      return { authenticated: false };
    }

    return { authenticated: true, user: { id: user.id, email: user.email, name: user.name } };
  });
}
