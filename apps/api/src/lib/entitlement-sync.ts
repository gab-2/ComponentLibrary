const PRO_ENTITLEMENT_KEYS = [
  "pro.packages.access",
  "pro.docs.access",
  "registry.tokens.create",
  "templates.pro.access",
] as const;

export function buildEntitlementUpdates(active: boolean) {
  return PRO_ENTITLEMENT_KEYS.map((key) => ({ key, status: active ? "ACTIVE" : "INACTIVE" as const }));
}

export { PRO_ENTITLEMENT_KEYS };
