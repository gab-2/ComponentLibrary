export type EntitlementLike = { key: string; status: string };
export type SubscriptionLike = { status: string };
export type LicenseLike = { plan: string; active: boolean };

const PRO_KEYS = ["pro.packages.access", "pro.docs.access", "registry.tokens.create", "templates.pro.access"] as const;

export type UserEntitlements = {
  canAccessProPackages: boolean;
  canAccessPrivateDocs: boolean;
  canCreateRegistryToken: boolean;
  keys: string[];
};

function hasActiveEntitlement(entitlements: EntitlementLike[], key: string): boolean {
  return entitlements.some((entry) => entry.key === key && entry.status === "ACTIVE");
}

function hasActiveSubscription(subscriptions: SubscriptionLike[]): boolean {
  return subscriptions.some((entry) => {
    const normalized = entry.status.toLowerCase();
    return normalized === "active" || normalized === "trialing";
  });
}

function hasLifetimeLicense(licenses: LicenseLike[]): boolean {
  return licenses.some((entry) => entry.plan === "LIFETIME" && entry.active);
}

export function getUserEntitlementsFromSources(input: {
  entitlements: EntitlementLike[];
  subscriptions: SubscriptionLike[];
  licenses: LicenseLike[];
}): UserEntitlements {
  const proViaEntitlement = hasActiveEntitlement(input.entitlements, "pro.packages.access");
  const proViaSubscription = hasActiveSubscription(input.subscriptions);
  const proViaLifetime = hasLifetimeLicense(input.licenses);
  const canAccessProPackages = proViaEntitlement || proViaSubscription || proViaLifetime;

  return {
    canAccessProPackages,
    canAccessPrivateDocs: canAccessProPackages || hasActiveEntitlement(input.entitlements, "pro.docs.access"),
    canCreateRegistryToken: canAccessProPackages && hasActiveEntitlement(input.entitlements, "registry.tokens.create"),
    keys: PRO_KEYS.filter((key) => hasActiveEntitlement(input.entitlements, key)),
  };
}

export async function canAccessProPackages(input: {
  entitlements: EntitlementLike[];
  subscriptions: SubscriptionLike[];
  licenses: LicenseLike[];
}): Promise<boolean> {
  return getUserEntitlementsFromSources(input).canAccessProPackages;
}

export async function canAccessPrivateDocs(input: {
  entitlements: EntitlementLike[];
  subscriptions: SubscriptionLike[];
  licenses: LicenseLike[];
}): Promise<boolean> {
  return getUserEntitlementsFromSources(input).canAccessPrivateDocs;
}

export async function canCreateRegistryToken(input: {
  entitlements: EntitlementLike[];
  subscriptions: SubscriptionLike[];
  licenses: LicenseLike[];
}): Promise<boolean> {
  return getUserEntitlementsFromSources(input).canCreateRegistryToken;
}


export async function getUserEntitlements(input: {
  entitlements: EntitlementLike[];
  subscriptions: SubscriptionLike[];
  licenses: LicenseLike[];
}): Promise<UserEntitlements> {
  return getUserEntitlementsFromSources(input);
}
