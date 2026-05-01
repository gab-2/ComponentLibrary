export type AccessInput = {
  hasActiveProEntitlement: boolean;
  hasActiveSubscription: boolean;
  hasActiveLifetimeLicense: boolean;
};

export function canAccessPro(input: AccessInput): boolean {
  return Boolean(
    input.hasActiveProEntitlement ||
      input.hasActiveSubscription ||
      input.hasActiveLifetimeLicense,
  );
}
