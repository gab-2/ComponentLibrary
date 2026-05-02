import Fastify from "fastify";
import { authorizeRegistryAccess } from "@sua-marca-ui/registry-client";

const app = Fastify({ logger: true });
const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:4000";

app.get("/health", async () => ({ status: "ok" }));

app.post("/authorize", async (request, reply) => {
  const body = request.body as { token?: string; packageName?: string; email?: string };

  if (!body?.token) {
    reply.code(400);
    return { allowed: false, reason: "MISSING_TOKEN" };
  }

  if (!body?.packageName) {
    reply.code(400);
    return { allowed: false, reason: "PACKAGE_NOT_FOUND" };
  }

  const result = await authorizeRegistryAccess(apiBaseUrl, {
    token: body.token,
    packageName: body.packageName,
    email: body.email,
    action: "install",
  });

  if (!result.allowed) {
    reply.code(403);
    return { allowed: false, reason: result.reason };
  }

  return { allowed: true, reason: "ok" };
});

if (process.env.NODE_ENV !== "test") {
  app.listen({ port: 4873, host: "0.0.0.0" }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}

export { app as registryServer };
