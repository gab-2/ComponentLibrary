import { describe, expect, it } from "vitest";
import { computeAccess } from "./access";

describe("computeAccess", () => {
  it("allows pro with active entitlement + subscription", () => {
    const access = computeAccess({
      entitlements: [{ key: "pro.packages.access", status: "ACTIVE" }],
      subscriptions: [{ status: "active" }],
      licenses: [],
    });

    expect(access.canAccessPro).toBe(true);
  });

  it("allows pro with lifetime even without subscription", () => {
    const access = computeAccess({
      entitlements: [{ key: "pro.packages.access", status: "ACTIVE" }],
      subscriptions: [],
      licenses: [{ plan: "LIFETIME", active: true }],
    });

    expect(access.canAccessPro).toBe(true);
  });

  it("denies access for free user", () => {
    const access = computeAccess({
      entitlements: [],
      subscriptions: [],
      licenses: [],
    });

    expect(access.canAccessPro).toBe(false);
  });
});
