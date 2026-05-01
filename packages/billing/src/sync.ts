import { allowsProAccess, type SubscriptionStatus } from "./status";

const ENTITLEMENT_KEYS = [
  "pro.packages.access",
  "pro.docs.access",
  "registry.tokens.create",
  "templates.pro.access",
] as const;

export type EntitlementMutation = { key: (typeof ENTITLEMENT_KEYS)[number]; status: "ACTIVE" | "INACTIVE"; source: string };

export function syncEntitlementsForUser(input: {
  subscriptionStatus: SubscriptionStatus;
  hasLifetimeLicense: boolean;
  source?: string;
}): EntitlementMutation[] {
  const canAccessPro = allowsProAccess(input.subscriptionStatus) || input.hasLifetimeLicense;
  const status: EntitlementMutation["status"] = canAccessPro ? "ACTIVE" : "INACTIVE";
  const source = input.source ?? "billing_sync";
  return ENTITLEMENT_KEYS.map((key) => ({ key, status, source }));
}
