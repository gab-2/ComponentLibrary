import { describe, expect, it } from "vitest";
import { allowsProAccess, normalizeStripeSubscriptionStatus } from "../src/status";

describe("normalizeStripeSubscriptionStatus", () => {
  it("normalizes expected statuses", () => {
    expect(normalizeStripeSubscriptionStatus("active")).toBe("ACTIVE");
    expect(normalizeStripeSubscriptionStatus("trialing")).toBe("TRIALING");
    expect(normalizeStripeSubscriptionStatus("past_due")).toBe("PAST_DUE");
    expect(normalizeStripeSubscriptionStatus("unknown")).toBe("EXPIRED");
  });
});

describe("allowsProAccess", () => {
  it("allows only ACTIVE and TRIALING", () => {
    expect(allowsProAccess("ACTIVE")).toBe(true);
    expect(allowsProAccess("TRIALING")).toBe(true);
    expect(allowsProAccess("CANCELED")).toBe(false);
  });
});
