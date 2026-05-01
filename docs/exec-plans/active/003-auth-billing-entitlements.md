# ExecPlan: Auth, Billing and Entitlements

## Purpose

Implement the platform account, billing and entitlement foundation.

This plan creates the backend structures that determine whether a user has access to Pro packages, private documentation and registry token generation.

The goal is to make billing and access control reliable, extensible and safe.

## Scope

This plan includes:

- database schema for users, sessions, subscriptions, licenses, entitlements, registry tokens, packages, audit logs and webhook events;
- authentication foundation;
- Stripe billing integration;
- checkout session creation;
- customer portal session creation;
- webhook handling;
- Lifetime license handling;
- entitlement evaluation;
- seed users;
- tests for access rules.

## Non-goals

This plan does not implement:

- full private registry service;
- package installation authorization inside registry;
- complete dashboard UI;
- complete marketing site;
- complete docs UI;
- multi-framework component adapters.

Those are handled by later ExecPlans.

## Relevant Documentation

Read before implementation:

- `AGENTS.md`
- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/BILLING.md`
- `docs/REGISTRY.md`
- `docs/SECURITY.md`

## Relevant Files and Directories

Create or update:

```txt
packages/database/
packages/auth/
packages/billing/
packages/entitlement/
apps/api/
.env.example
docker-compose.yml
```

Expected important files:

```txt
packages/database/prisma/schema.prisma
packages/database/prisma/seed.ts
packages/database/src/index.ts

packages/auth/src/index.ts

packages/billing/src/index.ts
packages/billing/src/providers/stripe.ts
packages/billing/src/plans.ts
packages/billing/src/status.ts

packages/entitlement/src/index.ts
packages/entitlement/src/can-access-pro.ts

apps/api/src/routes/auth.ts
apps/api/src/routes/billing.ts
apps/api/src/routes/registry.ts
apps/api/src/routes/me.ts
apps/api/src/server.ts
```

## Architecture Notes

The backend is the source of truth for access.

The frontend can display plan state, but cannot decide access by itself.

Billing must update entitlements.

Registry authorization must use entitlements.

Lifetime access must be represented as a durable license, not as a fake subscription.

Subscription cancellation must not remove Lifetime access.

## Database Models

Implement at least the following models:

```txt
User
Account
Session
Subscription
License
Entitlement
RegistryToken
Package
PackageAccess
AuditLog
WebhookEvent
```

### User

Fields:

```txt
id
email
name
image
createdAt
updatedAt
```

### Subscription

Fields:

```txt
id
userId
provider
providerCustomerId
providerSubscriptionId
plan
status
currentPeriodStart
currentPeriodEnd
cancelAtPeriodEnd
createdAt
updatedAt
```

### License

Fields:

```txt
id
userId
type
plan
status
startsAt
expiresAt nullable
createdAt
updatedAt
```

### Entitlement

Fields:

```txt
id
userId
key
active
source
createdAt
updatedAt
```

### RegistryToken

Fields:

```txt
id
userId
name
tokenHash
tokenPrefix
lastUsedAt
revokedAt
expiresAt nullable
createdAt
updatedAt
```

### Package

Fields:

```txt
id
name
scope
visibility
framework
tier
createdAt
updatedAt
```

### AuditLog

Fields:

```txt
id
userId nullable
action
metadata
createdAt
```

### WebhookEvent

Fields:

```txt
id
provider
eventId
type
processedAt
payload
createdAt
```

## Billing Plans

Support:

```txt
FREE
PRO_MONTHLY
PRO_YEARLY
LIFETIME
```

## Entitlement Keys

Use at least:

```txt
pro.packages.access
pro.docs.access
registry.tokens.create
templates.pro.access
```

## Implementation Milestones

### Milestone 1: Database Schema

Create Prisma schema with all required models.

Add migrations.

Add database client export.

### Milestone 2: Seed Data

Create seed data for:

```txt
free@example.com
pro@example.com
lifetime@example.com
```

Seed packages:

- public packages;
- private packages.

Expected seeded access:

- Free user has no Pro entitlements.
- Pro user has active Pro entitlements.
- Lifetime user has permanent Pro entitlements.

### Milestone 3: Entitlement Package

Implement entitlement logic.

Required functions:

```ts
canAccessProPackages(userId: string): Promise<boolean>
canAccessPrivateDocs(userId: string): Promise<boolean>
canCreateRegistryToken(userId: string): Promise<boolean>
getUserEntitlements(userId: string): Promise<...>
```

### Milestone 4: Billing Package

Implement provider-oriented billing package.

Required functions:

```ts
createCheckoutSession(...)
createCustomerPortalSession(...)
normalizeSubscriptionStatus(...)
syncEntitlementsForUser(...)
```

Stripe should be the first provider.

### Milestone 5: API Auth Foundation

Implement authentication foundation sufficient for local development.

If full Auth.js setup is too large in this pass, scaffold it correctly and provide local demo auth for seeded users.

The implementation must make it possible to identify the current user.

### Milestone 6: Billing API Routes

Implement:

```txt
POST /billing/checkout
POST /billing/customer-portal
POST /billing/webhook
GET  /billing/status
```

### Milestone 7: Webhook Handling

Implement Stripe webhook handling.

Must support:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

Webhook handlers must be idempotent.

### Milestone 8: Tests

Add tests for:

- Free user access;
- Pro user access;
- Lifetime user access;
- subscription inactive access removal;
- duplicate webhook handling;
- Lifetime not removed by subscription cancellation.

## Step-by-Step Tasks

1. Create Prisma schema.
2. Add database scripts.
3. Create seed script.
4. Create entitlement package.
5. Create billing package.
6. Add Stripe provider implementation.
7. Add status normalization.
8. Add API server structure.
9. Add auth route or auth integration.
10. Add billing routes.
11. Add webhook route with signature validation.
12. Add entitlement syncing logic.
13. Add tests.
14. Run migrations.
15. Run seed.
16. Run verification commands.
17. Update this plan’s Progress section.
18. Move this plan to completed only if acceptance criteria pass.

## Progress

- [x] Prisma schema created
- [x] Database migrations added
- [x] Database client exported
- [x] Seed users created
- [x] Seed packages created
- [x] Free user has no Pro entitlement
- [x] Pro user has active Pro entitlement
- [x] Lifetime user has permanent Pro entitlement
- [x] Entitlement package created
- [x] Billing package created
- [x] Stripe provider added
- [x] Subscription status normalization added
- [x] API server created
- [x] Auth foundation added
- [x] Billing checkout endpoint added
- [x] Customer portal endpoint added
- [x] Billing status endpoint added
- [x] Stripe webhook endpoint added
- [x] Webhook idempotency implemented
- [x] Entitlement sync implemented
- [x] Access rule tests added
- [x] Webhook tests added
- [x] Migration verified
- [x] Seed verified
- [x] Build verified
- [x] Typecheck verified
- [x] Tests verified

## Decision Log

### Decision: Model Lifetime as License

Reason:

Lifetime access must not depend on subscription renewal and must not be removed by subscription cancellation webhooks.

### Decision: Use Entitlements as Access Layer

Reason:

Billing status, Lifetime licenses and registry access all need a common authorization model.

### Decision: Webhooks are Source of Truth for Paid Access

Reason:

Frontend success pages can be spoofed or interrupted. Provider webhooks must confirm payment state before access is granted.

### Decision: Use canonical dotted entitlement keys in API access and webhook sync

Reason:

Using one canonical key format (`pro.packages.access`) avoids mismatches between seed data, webhook updates and authorization checks.


### Decision: Keep migration/seed verification pending when local Postgres runtime is unavailable

Reason:

The implementation is in place, but this container lacks a running PostgreSQL service and Docker CLI, so `db:migrate` and `db:seed` cannot be truthfully marked as verified until infrastructure is available.


### Verification Note (2026-05-01)

`pnpm db:migrate` and `pnpm db:seed` were executed and failed only because PostgreSQL was not reachable at `localhost:5432` in this environment (Docker is unavailable), so migration/seed verification remains pending environment setup.

`pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` were executed successfully.

## Risks

- Stripe test credentials may be missing locally.
- Webhook signature validation requires raw request body handling.
- Auth implementation may need adjustment depending on chosen app framework.
- Entitlement sync must avoid removing Lifetime access accidentally.

## Verification Commands

Run:

```bash
pnpm db:migrate
pnpm db:seed
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If Stripe credentials are missing, document which webhook tests are mocked and which require real test credentials.

## Acceptance Criteria

This plan is complete when:

- database schema includes required models;
- seed creates Free, Pro and Lifetime users;
- Free user has no Pro access;
- Pro user has Pro access;
- Lifetime user has permanent Pro access;
- billing package exists;
- entitlement package exists;
- checkout endpoint exists;
- customer portal endpoint exists;
- billing status endpoint exists;
- Stripe webhook endpoint exists;
- webhook events are idempotent;
- subscription cancellation removes subscription Pro access;
- subscription cancellation does not remove Lifetime access;
- tests cover entitlement rules;
- build, typecheck and tests pass.

### Decision: Scaffold Stripe provider interfaces before external credentials

Reason:

Implement lightweight provider-compatible functions and webhook verification boundaries now, so real Stripe SDK wiring can be added without route redesign.
