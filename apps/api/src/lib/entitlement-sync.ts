const PRO_ENTITLEMENT_KEYS = [
  "pro.packages.access",
  "pro.docs.access",
  "registry.tokens.create",
  "templates.pro.access",
] as const;

type EntitlementStatus = "ACTIVE" | "INACTIVE";

export function buildEntitlementUpdates(active: boolean): Array<{ key: (typeof PRO_ENTITLEMENT_KEYS)[number]; status: EntitlementStatus }> {
  const status: EntitlementStatus = active ? "ACTIVE" : "INACTIVE";
  return PRO_ENTITLEMENT_KEYS.map((key) => ({ key, status }));
}

export { PRO_ENTITLEMENT_KEYS };
