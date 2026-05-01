import { createHash, randomBytes } from "node:crypto";
import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";
import { computeAccess } from "../lib/access";

function hashToken(rawToken: string) {
  return createHash("sha256").update(rawToken).digest("hex");
}

function generateRegistryToken() {
  const secret = randomBytes(24).toString("base64url");
  const token = `smr_dev_${secret}`;
  return {
    token,
    tokenHash: hashToken(token),
    tokenPrefix: token.slice(0, 12),
  };
}

async function loadUserAccessByEmail(email: string) {
  return db.user.findUnique({
    where: { email },
    include: { entitlements: true, subscriptions: true, licenses: true },
  });
}

export async function registerRegistryRoutes(app: FastifyInstance) {
  app.post("/registry/tokens", async (request, reply) => {
    const body = request.body as { email?: string; name?: string };
    const email = body?.email;

    if (!email) return reply.code(400).send({ error: "missing_email" });

    const user = await loadUserAccessByEmail(email);
    if (!user) return reply.code(404).send({ error: "user_not_found" });

    const access = computeAccess(user);
    const hasTokenEntitlement = user.entitlements.some(
      (entry: { key: string; status: string }) => entry.key === "registry.tokens.create" && entry.status === "ACTIVE",
    );

    if (!access.canAccessPro || !hasTokenEntitlement) {
      return reply.code(403).send({ error: "missing_entitlement" });
    }

    const generated = generateRegistryToken();

    const created = await db.registryToken.create({
      data: {
        userId: user.id,
        name: body?.name,
        tokenHash: generated.tokenHash,
        tokenPrefix: generated.tokenPrefix,
      },
    });

    await db.auditLog.create({
      data: { actorUserId: user.id, action: "registry.token.created", resource: `registryToken:${created.id}` },
    });

    return {
      id: created.id,
      name: created.name,
      tokenPrefix: created.tokenPrefix,
      token: generated.token,
      createdAt: created.createdAt,
    };
  });

  app.get("/registry/tokens", async (request, reply) => {
    const query = request.query as { email?: string };
    const email = query?.email;
    if (!email) return reply.code(400).send({ error: "missing_email" });

    const user = await db.user.findUnique({ where: { email } });
    if (!user) return reply.code(404).send({ error: "user_not_found" });

    const tokens = await db.registryToken.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, tokenPrefix: true, createdAt: true, lastUsedAt: true, revokedAt: true },
    });

    return { tokens };
  });

  app.delete("/registry/tokens/:id", async (request, reply) => {
    const params = request.params as { id: string };
    const body = request.body as { email?: string };
    if (!body?.email) return reply.code(400).send({ error: "missing_email" });

    const user = await db.user.findUnique({ where: { email: body.email } });
    if (!user) return reply.code(404).send({ error: "user_not_found" });

    const token = await db.registryToken.findFirst({ where: { id: params.id, userId: user.id } });
    if (!token) return reply.code(404).send({ error: "token_not_found" });

    if (!token.revokedAt) {
      await db.registryToken.update({ where: { id: token.id }, data: { revokedAt: new Date() } });
      await db.auditLog.create({
        data: { actorUserId: user.id, action: "registry.token.revoked", resource: `registryToken:${token.id}` },
      });
    }

    return { ok: true, alreadyRevoked: Boolean(token.revokedAt) };
  });

  app.post("/registry/authorize", async (request, reply) => {
    const body = request.body as { email?: string; token?: string; packageName?: string; action?: string };
    if (!body?.token) return reply.code(400).send({ allowed: false, reason: "MISSING_TOKEN" });

    const packageName = body.packageName;
    if (!packageName) return { allowed: false, reason: "PACKAGE_NOT_FOUND" };

    const pkg = await db.package.findUnique({ where: { name: packageName } });
    if (!pkg) return { allowed: false, reason: "PACKAGE_NOT_FOUND" };
    if (pkg.visibility !== "PRIVATE") return { allowed: false, reason: "PACKAGE_NOT_PRIVATE" };

    const tokenHash = hashToken(body.token);
    const token = await db.registryToken.findUnique({ where: { tokenHash } });
    if (!token) return { allowed: false, reason: "INVALID_TOKEN" };
    if (token.revokedAt) return { allowed: false, reason: "REVOKED_TOKEN" };

    const user = await db.user.findUnique({
      where: { id: token.userId },
      include: { entitlements: true, subscriptions: true, licenses: true },
    });
    if (!user) return { allowed: false, reason: "INVALID_TOKEN" };

    const access = computeAccess(user);
    if (!access.canAccessPro) return { allowed: false, reason: "NO_ACTIVE_PLAN" };

    await db.registryToken.update({ where: { id: token.id }, data: { lastUsedAt: new Date() } });
    return { allowed: true, reason: "ok", userId: user.id };
  });
}
