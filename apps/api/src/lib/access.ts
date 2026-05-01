import { canAccessPro } from "@sua-marca/entitlement";

export type AccessSnapshot = {
  entitlements: Array<{ key: string; status: string }>;
  subscriptions: Array<{ status: string }>;
  licenses: Array<{ plan: string; active: boolean }>;
};

export function computeAccess(snapshot: AccessSnapshot) {
  const hasActiveProEntitlement = snapshot.entitlements.some(
    (entry) => entry.key === "pro:packages" && entry.status === "ACTIVE",
  );

  const hasActiveSubscription = snapshot.subscriptions.some(
    (entry) => entry.status === "active",
  );

  const hasActiveLifetimeLicense = snapshot.licenses.some(
    (entry) => entry.plan === "LIFETIME" && entry.active,
  );

  return {
    hasActiveProEntitlement,
    hasActiveSubscription,
    hasActiveLifetimeLicense,
    canAccessPro: canAccessPro({
      hasActiveProEntitlement,
      hasActiveSubscription,
      hasActiveLifetimeLicense,
    }),
  };
}
