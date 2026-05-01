import { describe, expect, it } from "vitest";
import { deriveEntitlementUpdateFromStripeEvent } from "./billing-webhook";

describe("deriveEntitlementUpdateFromStripeEvent", () => {
  it("derives entitlement update from subscription event", () => {
    const update = deriveEntitlementUpdateFromStripeEvent({
      id: "evt_1",
      type: "customer.subscription.updated",
      data: {
        object: {
          customer_email: "pro@example.com",
          id: "sub_1",
          status: "active",
          plan_code: "PRO_YEARLY",
        },
      },
    });

    expect(update).toEqual({
      email: "pro@example.com",
      providerRef: "sub_1",
      normalizedStatus: "ACTIVE",
      entitlementShouldBeActive: true,
      planCode: "PRO_YEARLY",
    });
  });

  it("returns null for non-subscription events", () => {
    expect(
      deriveEntitlementUpdateFromStripeEvent({
        id: "evt_2",
        type: "invoice.created",
      }),
    ).toBeNull();
  });
});
