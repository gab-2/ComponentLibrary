export type SubscriptionStatus =
  | "ACTIVE"
  | "TRIALING"
  | "PAST_DUE"
  | "UNPAID"
  | "CANCELED"
  | "INCOMPLETE"
  | "INCOMPLETE_EXPIRED"
  | "EXPIRED";

const ALLOWED = new Set<SubscriptionStatus>(["ACTIVE", "TRIALING"]);

export function normalizeStripeSubscriptionStatus(status: string): SubscriptionStatus {
  const value = status.toLowerCase();
  switch (value) {
    case "active":
      return "ACTIVE";
    case "trialing":
      return "TRIALING";
    case "past_due":
      return "PAST_DUE";
    case "unpaid":
      return "UNPAID";
    case "canceled":
      return "CANCELED";
    case "incomplete":
      return "INCOMPLETE";
    case "incomplete_expired":
      return "INCOMPLETE_EXPIRED";
    default:
      return "EXPIRED";
  }
}

export function allowsProAccess(status: SubscriptionStatus): boolean {
  return ALLOWED.has(status);
}
