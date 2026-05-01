import Fastify from "fastify";
import { registerMeRoutes } from "./routes/me";
import { registerRegistryRoutes } from "./routes/registry";
import { registerBillingRoutes } from "./routes/billing";
import { registerAuthRoutes } from "./routes/auth";

export function buildServer() {
  const app = Fastify({ logger: true });

  app.get("/health", async () => ({ status: "ok" }));

  registerAuthRoutes(app);
  registerMeRoutes(app);
  registerRegistryRoutes(app);
  registerBillingRoutes(app);

  return app;
}

if (process.env.NODE_ENV !== "test") {
  const app = buildServer();
  app.listen({ port: 4000, host: "0.0.0.0" }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}
