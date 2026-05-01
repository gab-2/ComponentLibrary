export type UserPlan = 'FREE' | 'PRO_MONTHLY' | 'PRO_YEARLY' | 'LIFETIME';

export interface SessionLike {
  userId: string;
  plan: UserPlan;
  subscriptionActive?: boolean;
}

export function getSessionFromEnv(): SessionLike {
  const plan = (process.env.DEMO_PLAN as UserPlan) || 'FREE';
  return { userId: 'demo-user', plan, subscriptionActive: process.env.DEMO_SUB_ACTIVE !== 'false' };
}

export function canAccessPrivateDocs(session: SessionLike): boolean {
  if (session.plan === 'LIFETIME') return true;
  if (session.plan === 'PRO_MONTHLY' || session.plan === 'PRO_YEARLY') return session.subscriptionActive !== false;
  return false;
}
