export type DenialReason = 'MISSING_TOKEN'|'INVALID_TOKEN'|'REVOKED_TOKEN'|'EXPIRED_TOKEN'|'PACKAGE_NOT_FOUND'|'PACKAGE_NOT_PRIVATE'|'NO_ACTIVE_PLAN'|'NO_PACKAGE_ACCESS'|'UNKNOWN_ERROR';
export interface AuthorizeInput { token?: string; packageName: string; action: 'install' }
export function authorizeInstall(input: AuthorizeInput) {
  if (!input.token) return { allowed: false, reason: 'MISSING_TOKEN' as DenialReason };
  if (!input.packageName.startsWith('@sua-marca-pro/')) return { allowed: false, reason: 'PACKAGE_NOT_PRIVATE' as DenialReason };
  return { allowed: true, reason: null };
}
