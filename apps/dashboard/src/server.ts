import Fastify from "fastify";

const app = Fastify({ logger: true });
const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:4000";

async function apiCall(path: string, init: RequestInit) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init.headers ?? {}) },
  });
  return { status: response.status, body: await response.json() };
}

app.get("/health", async () => ({ status: "ok" }));

app.get("/dashboard/overview", async (request, reply) => {
  const query = request.query as { email?: string };
  if (!query.email) return reply.code(400).send({ error: "missing_email" });

  const me = await apiCall(`/me?email=${encodeURIComponent(query.email)}`, { method: "GET" });
  const billing = await apiCall(`/billing/status?email=${encodeURIComponent(query.email)}`, { method: "GET" });

  if (me.status >= 400) return reply.code(me.status).send(me.body);
  if (billing.status >= 400) return reply.code(billing.status).send(billing.body);

  return {
    user: me.body.user,
    access: me.body.access,
    billing: billing.body,
  };
});

app.get("/dashboard/billing", async (request, reply) => {
  const query = request.query as { email?: string };
  if (!query.email) return reply.code(400).send({ error: "missing_email" });

  const response = await apiCall(`/billing/status?email=${encodeURIComponent(query.email)}`, { method: "GET" });
  return reply.code(response.status).send(response.body);
});

app.get("/dashboard/install-instructions", async (request) => {
  const query = request.query as { email?: string };
  const accessResult = query?.email
    ? await apiCall(`/me?email=${encodeURIComponent(query.email)}`, { method: "GET" })
    : null;
  const canAccessPro = Boolean(accessResult?.body?.access?.canAccessPro);

  return {
    local: {
      scope: "@sua-marca-pro",
      registry: "http://localhost:4873",
      npmrc: "@sua-marca-pro:registry=http://localhost:4873\n//localhost:4873/:_authToken=USER_TOKEN",
    },
    production: {
      scope: "@sua-marca-pro",
      registry: "https://registry.sua-marca.com",
      npmrc: "@sua-marca-pro:registry=https://registry.sua-marca.com\n//registry.sua-marca.com/:_authToken=USER_TOKEN",
    },
    access: {
      canAccessPro,
      message: canAccessPro
        ? "You can generate and use registry tokens for @sua-marca-pro packages."
        : "Upgrade to Pro or Lifetime to use @sua-marca-pro packages.",
    },
  };
});

app.get("/dashboard/tokens", async (request, reply) => {
  const query = request.query as { email?: string };
  if (!query.email) return reply.code(400).send({ error: "missing_email" });
  const response = await apiCall(`/registry/tokens?email=${encodeURIComponent(query.email)}`, { method: "GET" });
  return reply.code(response.status).send(response.body);
});

app.post("/dashboard/tokens", async (request, reply) => {
  const body = request.body as { email?: string; name?: string };
  const response = await apiCall("/registry/tokens", { method: "POST", body: JSON.stringify(body ?? {}) });
  return reply.code(response.status).send(response.body);
});

app.delete("/dashboard/tokens/:id", async (request, reply) => {
  const params = request.params as { id: string };
  const body = request.body as { email?: string };
  const response = await apiCall(`/registry/tokens/${params.id}`, { method: "DELETE", body: JSON.stringify(body ?? {}) });
  return reply.code(response.status).send(response.body);
});

if (process.env.NODE_ENV !== "test") {
  app.listen({ port: 3002, host: "0.0.0.0" }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}

export { app as dashboardServer };
