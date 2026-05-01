# Billing

## Overview

The billing system controls paid access to Pro packages, private documentation and private registry tokens.

The initial payment provider is Stripe.

The architecture must be provider-oriented so another provider, such as Mercado Pago, can be added later.

Billing must not be hardcoded directly into UI components or package code.

## Plans

The platform supports four plans:

- `FREE`
- `PRO_MONTHLY`
- `PRO_YEARLY`
- `LIFETIME`

## Plan Rules

### FREE

Free users can:

- access public docs;
- install public packages;
- preview Pro components with limited information;
- start checkout.

Free users cannot:

- access private docs;
- generate private registry tokens;
- install Pro packages;
- access private templates.

### PRO_MONTHLY

Pro monthly users can:

- access Pro packages while subscription is active;
- access private docs while subscription is active;
- generate registry tokens while subscription is active;
- receive updates while subscription is active.

Access must be removed when the subscription becomes inactive.

### PRO_YEARLY

Pro yearly users have the same access as Pro monthly users, but billing is yearly.

Access must be removed when the subscription becomes inactive.

### LIFETIME

Lifetime users can:

- access Pro packages permanently;
- access private docs permanently;
- generate registry tokens permanently;
- receive future updates;
- receive new components.

Lifetime access must not expire automatically.

Lifetime access can only be revoked manually for exceptional reasons such as abuse, fraud or administrative action.

## Subscription Status Mapping

The implementation should normalize provider-specific statuses into internal statuses.

Suggested internal subscription statuses:

- `ACTIVE`
- `TRIALING`
- `PAST_DUE`
- `UNPAID`
- `CANCELED`
- `INCOMPLETE`
- `INCOMPLETE_EXPIRED`
- `EXPIRED`

Statuses that allow Pro access:

- `ACTIVE`
- `TRIALING`

Statuses that should not allow Pro access:

- `PAST_DUE`
- `UNPAID`
- `CANCELED`
- `INCOMPLETE`
- `INCOMPLETE_EXPIRED`
- `EXPIRED`

## Licenses

The platform should distinguish between subscriptions and licenses.

Subscriptions represent recurring billing.

Licenses represent durable product access.

Suggested license types:

- `FREE`
- `SUBSCRIPTION`
- `LIFETIME`

A Lifetime purchase should create a `LIFETIME` license.

A Pro subscription should create or update a `SUBSCRIPTION` license.

## Entitlements

Billing must update entitlements.

Important entitlement keys:

- `pro.packages.access`
- `pro.docs.access`
- `registry.tokens.create`
- `templates.pro.access`

Rules:

- Free users do not receive Pro entitlements.
- Active Pro subscription users receive Pro entitlements.
- Lifetime users receive Pro entitlements permanently.
- Inactive subscription users lose Pro entitlements.
- Lifetime users keep Pro entitlements.

## Stripe Integration

Stripe is the first billing provider.

The billing package should expose provider-agnostic functions where possible.

Suggested abstractions:

```ts
export type BillingPlan = "FREE" | "PRO_MONTHLY" | "PRO_YEARLY" | "LIFETIME";

export type BillingProvider = "stripe";

export interface CreateCheckoutInput {
  userId: string;
  email: string;
  plan: BillingPlan;
  successUrl: string;
  cancelUrl: string;
}

export interface BillingProviderClient {
  createCheckoutSession(input: CreateCheckoutInput): Promise<{ url: string }>;
  createCustomerPortalSession(input: {
    customerId: string;
    returnUrl: string;
  }): Promise<{ url: string }>;
}
```

## Required Stripe Price Variables

The environment must include:

```txt
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_PRO_YEARLY=
STRIPE_PRICE_LIFETIME=
```

## Checkout Flow

The checkout flow should work like this:

```txt
User selects plan
      ↓
Frontend calls API checkout endpoint
      ↓
API validates selected plan
      ↓
API creates Stripe checkout session
      ↓
User completes payment
      ↓
Stripe sends webhook
      ↓
API validates webhook
      ↓
API updates subscription or license
      ↓
API updates entitlements
      ↓
User gets access
```

## Required API Endpoints

The API should expose:

```txt
POST /billing/checkout
POST /billing/customer-portal
POST /billing/webhook
GET  /billing/status
```

## Checkout Endpoint

### `POST /billing/checkout`

Creates a checkout session for the requested plan.

Input:

```json
{
  "plan": "PRO_MONTHLY"
}
```

Allowed plans:

- `PRO_MONTHLY`
- `PRO_YEARLY`
- `LIFETIME`

Free plan does not need checkout.

Response:

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

## Customer Portal Endpoint

### `POST /billing/customer-portal`

Creates a customer portal session.

Response:

```json
{
  "url": "https://billing.stripe.com/..."
}
```

Only users with a Stripe customer id can create a customer portal session.

## Billing Status Endpoint

### `GET /billing/status`

Returns current billing and entitlement status for the authenticated user.

Response example:

```json
{
  "plan": "PRO_MONTHLY",
  "status": "ACTIVE",
  "hasProAccess": true,
  "isLifetime": false,
  "currentPeriodEnd": "2026-12-31T23:59:59.000Z"
}
```

Lifetime response example:

```json
{
  "plan": "LIFETIME",
  "status": "ACTIVE",
  "hasProAccess": true,
  "isLifetime": true,
  "currentPeriodEnd": null
}
```

## Webhooks

The Stripe webhook endpoint must handle:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

## Webhook Requirements

Webhook handlers must:

- verify the Stripe signature;
- be idempotent;
- save processed event ids;
- ignore duplicate events;
- update subscriptions;
- update licenses;
- update entitlements;
- write audit logs.

## Checkout Session Completed

When `checkout.session.completed` is received:

If plan is `LIFETIME`:

- create or update Lifetime license;
- set Pro entitlements active;
- associate customer id with user.

If plan is subscription-based:

- associate Stripe customer id with user;
- save subscription id when available;
- wait for subscription events to finalize subscription state if needed;
- ensure entitlements are active only when subscription status allows access.

## Subscription Updated

When `customer.subscription.updated` is received:

- find the user by Stripe customer id or subscription id;
- update subscription status;
- update current period start;
- update current period end;
- update cancel at period end;
- update entitlements based on normalized status.

## Subscription Deleted

When `customer.subscription.deleted` is received:

- mark subscription as canceled;
- remove subscription-based Pro entitlements;
- do not remove Lifetime entitlements if the user has Lifetime access.

## Invoice Payment Succeeded

When `invoice.payment_succeeded` is received:

- update subscription status if needed;
- activate Pro entitlements for active subscription users;
- write audit log.

## Invoice Payment Failed

When `invoice.payment_failed` is received:

- update subscription status if needed;
- remove Pro entitlements if provider status requires it;
- write audit log.

## Lifetime Rules

Lifetime must be implemented as a durable license, not as a fake subscription.

A Lifetime license should have:

- `type: LIFETIME`
- `status: ACTIVE`
- `expiresAt: null`

Lifetime should not depend on subscription renewal.

Lifetime should continue working even if the user has no active Stripe subscription.

## Database Models

Billing-related models should include at least:

- `Subscription`
- `License`
- `Entitlement`
- `WebhookEvent`
- `AuditLog`

Suggested fields are defined in the ExecPlan for auth, billing and entitlements.

## Testing

Tests should cover:

- Free user has no Pro access;
- active Pro monthly user has Pro access;
- active Pro yearly user has Pro access;
- inactive subscription user loses Pro access;
- Lifetime user keeps Pro access;
- duplicate webhook events are ignored;
- failed payment removes subscription Pro access;
- failed payment does not remove Lifetime access.

## Security Notes

- Never trust plan information from the frontend without validation.
- Never expose Stripe secret keys to frontend apps.
- Always validate webhook signatures.
- Store webhook event ids to avoid duplicate processing.
- Do not grant Pro access until payment status is confirmed.
- Do not remove Lifetime access because of subscription webhook events.
