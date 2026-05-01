import { createHmac, timingSafeEqual } from "node:crypto";
import type { PlanCode } from "../plans";

export type CheckoutSessionInput = {
  userEmail: string;
  plan: Exclude<PlanCode, "FREE">;
  successUrl: string;
  cancelUrl: string;
};

export async function createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string }> {
  return {
    url: `${input.successUrl}?plan=${input.plan}&email=${encodeURIComponent(input.userEmail)}`,
  };
}

export async function createCustomerPortalSession(input: {
  customerEmail: string;
  returnUrl: string;
}): Promise<{ url: string }> {
  return { url: `${input.returnUrl}?portalFor=${encodeURIComponent(input.customerEmail)}` };
}

function parseSignatureHeader(signatureHeader: string): { timestamp: string; v1: string } | null {
  const parts = signatureHeader.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const v1 = parts.find((part) => part.startsWith("v1="))?.slice(3);

  if (!timestamp || !v1) {
    return null;
  }

  return { timestamp, v1 };
}

export function verifyWebhookSignature(
  payload: string,
  signatureHeader: string | undefined,
  secret: string | undefined,
): boolean {
  if (!signatureHeader || !secret) return false;

  const parsed = parseSignatureHeader(signatureHeader);
  if (!parsed) return false;

  const signedPayload = `${parsed.timestamp}.${payload}`;
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex");

  const actualBuffer = Buffer.from(parsed.v1, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (actualBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(actualBuffer, expectedBuffer);
}
