import { describe, expect, it } from "vitest";
import { canAccessPrivateDocs, canAccessProPackages, canCreateRegistryToken, getUserEntitlementsFromSources } from "../src/entitlements";

describe("entitlement service", () => {
  it("denies free user", async () => {
    const input = { entitlements: [], subscriptions: [], licenses: [] };
    await expect(canAccessProPackages(input)).resolves.toBe(false);
    await expect(canAccessPrivateDocs(input)).resolves.toBe(false);
    await expect(canCreateRegistryToken(input)).resolves.toBe(false);
  });

  it("allows pro user with active entitlements", async () => {
    const input = {
      entitlements: [
        { key: "pro.packages.access", status: "ACTIVE" },
        { key: "pro.docs.access", status: "ACTIVE" },
        { key: "registry.tokens.create", status: "ACTIVE" },
      ],
      subscriptions: [{ status: "active" }],
      licenses: [],
    };
    await expect(canAccessProPackages(input)).resolves.toBe(true);
    await expect(canAccessPrivateDocs(input)).resolves.toBe(true);
    await expect(canCreateRegistryToken(input)).resolves.toBe(true);
  });

  it("keeps lifetime access independent from subscription status", () => {
    const result = getUserEntitlementsFromSources({
      entitlements: [],
      subscriptions: [{ status: "canceled" }],
      licenses: [{ plan: "LIFETIME", active: true }],
    });
    expect(result.canAccessProPackages).toBe(true);
    expect(result.canAccessPrivateDocs).toBe(true);
  });
});
