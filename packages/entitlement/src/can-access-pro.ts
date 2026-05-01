import type { Plan } from '@sua-marca/billing';
import type { SubscriptionStatus } from '@sua-marca/billing';

export interface EntitlementState {
  plan: Plan;
  subscriptionStatus?: SubscriptionStatus;
  lifetimeActive?: boolean;
}

export function canAccessPro(state: EntitlementState): boolean {
  if (state.lifetimeActive) return true;
  if (state.plan === 'PRO_MONTHLY' || state.plan === 'PRO_YEARLY') {
    return state.subscriptionStatus === 'ACTIVE' || state.subscriptionStatus === 'TRIALING';
  }
  return false;
}
