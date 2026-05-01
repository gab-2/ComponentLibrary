import test from "node:test";
import assert from "node:assert/strict";
import { docsServer } from "./server";

(globalThis as any).fetch = async () => ({ ok: true, json: async () => ({ access: { canAccessPro: false } }) });

test("serves public docs", async () => {
  const response = await docsServer.inject({ method: "GET", url: "/docs/public" });
  assert.equal(response.statusCode, 200);
});

test("gates pro docs", async () => {
  const response = await docsServer.inject({ method: "GET", url: "/docs/pro/react?email=free@example.com" });
  assert.equal(response.statusCode, 403);
});
