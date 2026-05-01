import test from "node:test";
import assert from "node:assert/strict";
import { marketingServer } from "./server";

test("landing page", async () => {
  const res = await marketingServer.inject({ method: "GET", url: "/" });
  assert.equal(res.statusCode, 200);
});

test("pricing has lifetime", async () => {
  const res = await marketingServer.inject({ method: "GET", url: "/pricing" });
  const body = res.json() as { plans: Array<{ plan: string }> };
  assert.equal(body.plans.some((p) => p.plan === "LIFETIME"), true);
});
