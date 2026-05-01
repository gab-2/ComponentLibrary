import test from "node:test";
import assert from "node:assert/strict";
import { runSeed } from "../prisma/seed";

test("runSeed seeds free/pro/lifetime and packages", async () => {
  let call = 0;
  const upsertUser = async () => {
    call += 1;
    if (call === 1) return { id: "u-free", email: "free@example.com" };
    if (call === 2) return { id: "u-pro", email: "pro@example.com" };
    return { id: "u-life", email: "lifetime@example.com" };
  };

  const counter = { entitlement: 0, pkg: 0 };
  const prisma = {
    user: { upsert: upsertUser },
    subscription: { upsert: async () => ({}) },
    license: { upsert: async () => ({}) },
    entitlement: { upsert: async () => { counter.entitlement += 1; return {}; } },
    package: { upsert: async () => { counter.pkg += 1; return {}; } },
  } as any;

  const seeded = await runSeed(prisma);
  assert.deepEqual(seeded.users, { free: "free@example.com", pro: "pro@example.com", lifetime: "lifetime@example.com" });
  assert.equal(counter.entitlement, 8);
  assert.equal(counter.pkg, 4);
});
