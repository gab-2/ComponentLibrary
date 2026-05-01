export interface SessionUser { id: string; email: string; }
export function requireAuth<T extends { user?: SessionUser }>(ctx: T): SessionUser {
  if (!ctx.user) throw new Error('Unauthorized');
  return ctx.user;
}
