import { describe, expect, it } from "vitest";
import { syncEntitlementsForUser } from "../src/sync";

describe("syncEntitlementsForUser", () => {
  it("activates all pro entitlements for active subscriptions", () => {
    const updates = syncEntitlementsForUser({ subscriptionStatus: "ACTIVE", hasLifetimeLicense: false });
    expect(updates.every((entry) => entry.status === "ACTIVE")).toBe(true);
  });

  it("keeps entitlements active for lifetime users even when subscription is canceled", () => {
    const updates = syncEntitlementsForUser({ subscriptionStatus: "CANCELED", hasLifetimeLicense: true });
    expect(updates.every((entry) => entry.status === "ACTIVE")).toBe(true);
  });

  it("deactivates entitlements for non-lifetime canceled subscriptions", () => {
    const updates = syncEntitlementsForUser({ subscriptionStatus: "CANCELED", hasLifetimeLicense: false });
    expect(updates.every((entry) => entry.status === "INACTIVE")).toBe(true);
  });
});
