import { createHash, randomBytes } from 'node:crypto';
import { canAccessPro } from '@sua-marca/entitlement';

export interface RegistryTokenRecord { id: string; name: string; tokenHash: string; tokenPrefix: string; revokedAt: Date | null }

export function createRegistryToken(userId: string, plan: 'FREE'|'PRO_MONTHLY'|'PRO_YEARLY'|'LIFETIME') {
  if (!canAccessPro({ plan, subscriptionStatus: plan === 'LIFETIME' ? undefined : 'ACTIVE', lifetimeActive: plan === 'LIFETIME' })) {
    return { error: 'NO_ACTIVE_PLAN' };
  }
  const raw = `smr_dev_${randomBytes(24).toString('hex')}`;
  const tokenHash = createHash('sha256').update(raw).digest('hex');
  const tokenPrefix = raw.slice(0, 12);
  const record: RegistryTokenRecord = { id: `${userId}-${Date.now()}`, name: 'default', tokenHash, tokenPrefix, revokedAt: null };
  return { rawToken: raw, record };
}

export function authorizeRegistryInstall(token: string | undefined, packageName: string, hasEntitlement: boolean) {
  if (!token) return { allowed: false, reason: 'MISSING_TOKEN' };
  if (!packageName.startsWith('@sua-marca-pro/')) return { allowed: false, reason: 'PACKAGE_NOT_PRIVATE' };
  if (!hasEntitlement) return { allowed: false, reason: 'NO_ACTIVE_PLAN' };
  return { allowed: true, reason: null };
}
