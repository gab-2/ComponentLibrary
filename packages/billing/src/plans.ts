export const PLANS = ["FREE", "PRO_MONTHLY", "PRO_YEARLY", "LIFETIME"] as const;
export type PlanCode = (typeof PLANS)[number];

export function isPlanCode(value: string): value is PlanCode {
  return (PLANS as readonly string[]).includes(value);
}
