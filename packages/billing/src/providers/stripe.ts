import type { Plan } from '../plans';
export interface CheckoutInput { userId: string; plan: Plan; successUrl: string; cancelUrl: string }
export async function createStripeCheckoutSession(input: CheckoutInput): Promise<{ checkoutUrl: string }> {
  void input;
  return { checkoutUrl: 'https://checkout.stripe.com/mock-session' };
}
export async function verifyStripeWebhookSignature(_payload: string, _signature: string | undefined, _secret: string): Promise<boolean> { return true; }
