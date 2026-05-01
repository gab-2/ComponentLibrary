import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyWebhookSignature } from "../src/providers/stripe";

describe("verifyWebhookSignature", () => {
  it("accepts valid stripe-like signature", () => {
    const payload = JSON.stringify({ id: "evt_1", type: "checkout.session.completed" });
    const timestamp = "1710000000";
    const secret = "whsec_test";
    const digest = createHmac("sha256", secret)
      .update(`${timestamp}.${payload}`)
      .digest("hex");

    const header = `t=${timestamp},v1=${digest}`;
    expect(verifyWebhookSignature(payload, header, secret)).toBe(true);
  });

  it("rejects invalid signature", () => {
    const payload = JSON.stringify({ id: "evt_1" });
    expect(verifyWebhookSignature(payload, "t=1710000000,v1=abc123", "whsec_test")).toBe(false);
  });
});
