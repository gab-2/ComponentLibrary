import { createStripeCheckoutSession, type Plan } from '@sua-marca/billing';
export async function billingCheckoutRoute(userId: string, plan: Plan) {
  return createStripeCheckoutSession({ userId, plan, successUrl: 'http://localhost:3000/success', cancelUrl: 'http://localhost:3000/cancel' });
}
