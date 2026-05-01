import Fastify from "fastify";
import { pathToFileURL } from "node:url";

const app = Fastify({ logger: true });
const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:4000";

async function canAccessPro(email?: string) {
  if (!email) return false;
  const response = await fetch(`${apiBaseUrl}/me?email=${encodeURIComponent(email)}`);
  if (!response.ok) return false;
  const body = (await response.json()) as { access?: { canAccessPro?: boolean } };
  return Boolean(body.access?.canAccessPro);
}

app.get("/health", async () => ({ status: "ok" }));
app.get("/docs/public", async () => ({ title: "Public Docs", frameworks: ["react", "vue", "angular", "svelte", "web-components"] }));
app.get("/docs/react", async () => ({ title: "React Docs" }));
app.get("/docs/vue", async () => ({ title: "Vue Docs" }));
app.get("/docs/angular", async () => ({ title: "Angular Docs" }));
app.get("/docs/svelte", async () => ({ title: "Svelte Docs" }));
app.get("/docs/web-components", async () => ({ title: "Web Components Docs" }));

app.get("/docs/pro/react", async (request, reply) => {
  const query = request.query as { email?: string };
  if (!(await canAccessPro(query.email))) {
    return reply.code(403).send({ error: "forbidden", reason: "missing_entitlement" });
  }

  return {
    title: "React Pro Docs",
    package: "@sua-marca-pro/react",
    install: "pnpm add @sua-marca-pro/react",
    npmrc: "@sua-marca-pro:registry=https://registry.sua-marca.com\n//registry.sua-marca.com/:_authToken=YOUR_TOKEN",
    examples: ["DataTable", "DatePicker", "CommandMenu"],
  };
});

async function startDocsServer() {
  await app.listen({ port: 3003, host: "0.0.0.0" });
}

const isEntrypoint = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isEntrypoint) {
  startDocsServer().catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}

export { app as docsServer, startDocsServer };
