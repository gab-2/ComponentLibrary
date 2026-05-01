import { describe, expect, it } from "vitest";
import { canAccessPro } from "../src/can-access-pro";

describe("canAccessPro", () => {
  it("denies free users", () => {
    expect(canAccessPro({ hasActiveProEntitlement: false, hasActiveSubscription: false, hasActiveLifetimeLicense: false })).toBe(false);
  });

  it("allows active subscription", () => {
    expect(canAccessPro({ hasActiveProEntitlement: false, hasActiveSubscription: true, hasActiveLifetimeLicense: false })).toBe(true);
  });

  it("allows active lifetime", () => {
    expect(canAccessPro({ hasActiveProEntitlement: false, hasActiveSubscription: false, hasActiveLifetimeLicense: true })).toBe(true);
  });
});
