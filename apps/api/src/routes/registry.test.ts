import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockDb } = vi.hoisted(() => ({
  mockDb: {
    user: { findUnique: vi.fn() },
    package: { findUnique: vi.fn() },
    auditLog: { create: vi.fn() },
    registryToken: { create: vi.fn(), findMany: vi.fn(), findFirst: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
  },
}));

vi.mock("../lib/db", () => ({ db: mockDb }));

import { registerRegistryRoutes } from "./registry";

describe("registry routes", () => {
  beforeEach(() => vi.clearAllMocks());

  it("allows pro user to create registry token", async () => {
    const app = Fastify();
    await registerRegistryRoutes(app);

    mockDb.user.findUnique.mockResolvedValue({
      id: "u1",
      entitlements: [
        { key: "pro.packages.access", status: "ACTIVE" },
        { key: "registry.tokens.create", status: "ACTIVE" },
      ],
      subscriptions: [{ status: "active" }],
      licenses: [],
    });
    mockDb.registryToken.create.mockResolvedValue({ id: "t1", name: "ci", tokenPrefix: "smr_dev_xxxx", createdAt: new Date() });

    const response = await app.inject({ method: "POST", url: "/registry/tokens", payload: { email: "pro@example.com", name: "ci" } });
    expect(response.statusCode).toBe(200);
    expect(response.json().token).toMatch(/^smr_dev_/);
    expect(mockDb.auditLog.create).toHaveBeenCalledTimes(1);
  });

  it("denies free user registry token creation", async () => {
    const app = Fastify();
    await registerRegistryRoutes(app);
    mockDb.user.findUnique.mockResolvedValue({ id: "u-free", entitlements: [], subscriptions: [], licenses: [] });

    const response = await app.inject({ method: "POST", url: "/registry/tokens", payload: { email: "free@example.com" } });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toEqual({ error: "missing_entitlement" });
  });

  it("allows lifetime token authorization", async () => {
    const app = Fastify();
    await registerRegistryRoutes(app);
    mockDb.package.findUnique.mockResolvedValue({ name: "@sua-marca-ui-pro/react", visibility: "PRIVATE" });
    mockDb.registryToken.findUnique.mockResolvedValue({ id: "t-life", userId: "u-life", revokedAt: null });
    mockDb.user.findUnique.mockResolvedValue({
      id: "u-life",
      entitlements: [{ key: "pro.packages.access", status: "ACTIVE" }],
      subscriptions: [],
      licenses: [{ plan: "LIFETIME", active: true }],
    });

    const response = await app.inject({ method: "POST", url: "/registry/authorize", payload: { token: "smr_dev_life", packageName: "@sua-marca-ui-pro/react" } });
    expect(response.statusCode).toBe(200);
    expect(response.json().allowed).toBe(true);
    expect(mockDb.registryToken.update).toHaveBeenCalledTimes(1);
  });

  it("denies revoked and invalid tokens", async () => {
    const app = Fastify();
    await registerRegistryRoutes(app);
    mockDb.package.findUnique.mockResolvedValue({ name: "@sua-marca-ui-pro/react", visibility: "PRIVATE" });
    mockDb.registryToken.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: "t1", userId: "u1", revokedAt: new Date() });

    const invalid = await app.inject({ method: "POST", url: "/registry/authorize", payload: { token: "bad", packageName: "@sua-marca-ui-pro/react" } });
    expect(invalid.json()).toEqual({ allowed: false, reason: "INVALID_TOKEN" });

    const revoked = await app.inject({ method: "POST", url: "/registry/authorize", payload: { token: "revoked", packageName: "@sua-marca-ui-pro/react" } });
    expect(revoked.json()).toEqual({ allowed: false, reason: "REVOKED_TOKEN" });
  });
});
