export type SubscriptionStatus = 'ACTIVE' | 'TRIALING' | 'PAST_DUE' | 'UNPAID' | 'CANCELED' | 'INCOMPLETE' | 'INCOMPLETE_EXPIRED' | 'EXPIRED';
export const ACCESS_GRANTING_STATUSES: SubscriptionStatus[] = ['ACTIVE', 'TRIALING'];
