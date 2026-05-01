import { allowsProAccess, normalizeStripeSubscriptionStatus } from "@sua-marca/billing";

export type StripeWebhookLikeEvent = {
  id: string;
  type: string;
  data?: {
    object?: {
      customer_email?: string;
      subscription?: string;
      id?: string;
      status?: string;
      plan_code?: "PRO_MONTHLY" | "PRO_YEARLY";
    };
  };
};

export type EntitlementUpdate = {
  email: string;
  providerRef: string;
  normalizedStatus: string;
  entitlementShouldBeActive: boolean;
  planCode: "PRO_MONTHLY" | "PRO_YEARLY";
};

export function deriveEntitlementUpdateFromStripeEvent(event: StripeWebhookLikeEvent): EntitlementUpdate | null {
  if (!event.type.startsWith("customer.subscription.")) {
    return null;
  }

  const object = event.data?.object;
  if (!object?.customer_email) {
    return null;
  }

  const providerRef = object.subscription ?? object.id;
  if (!providerRef) {
    return null;
  }

  const normalizedStatus = normalizeStripeSubscriptionStatus(object.status ?? "");
  const entitlementShouldBeActive = allowsProAccess(normalizedStatus);
  const planCode = object.plan_code ?? "PRO_MONTHLY";

  return {
    email: object.customer_email,
    providerRef,
    normalizedStatus,
    entitlementShouldBeActive,
    planCode,
  };
}
