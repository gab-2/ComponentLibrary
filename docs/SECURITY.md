# Security

## Overview

This platform sells access to private source packages, private documentation and future component updates.

Security must protect:

- user accounts;
- billing data;
- registry tokens;
- private package access;
- private documentation;
- package publishing workflows;
- environment secrets.

The system must not rely on client-side runtime checks to protect paid components.

## Core Security Rules

- Never commit real secrets.
- Never store raw registry tokens.
- Never expose server secrets to frontend apps.
- Never put Pro source code inside public packages.
- Never publish private packages to the public npm registry.
- Never trust plan or entitlement data sent from the frontend.
- Always validate billing webhooks.
- Always check current entitlements before allowing private package access.

## Secrets

Secrets must be provided through environment variables.

The repository should only contain:

```txt
.env.example
```

The repository must not contain:

```txt
.env
.env.local
.env.production
.env.staging
real Stripe keys
real npm tokens
real registry tokens
real database passwords
real auth secrets
real customer data
```

## Environment Variables

Required secret categories:

- database connection string;
- auth secret;
- Stripe secret key;
- Stripe webhook secret;
- private registry auth secret;
- npm publish token;
- private registry publish token;
- SMTP credentials if email is enabled.

## Frontend Secret Rule

Frontend apps may only access explicitly public environment variables.

Do not expose:

- Stripe secret key;
- database URL;
- registry auth secret;
- npm tokens;
- private registry tokens;
- webhook secrets;
- auth secrets.

## Registry Token Security

Registry tokens are sensitive credentials.

Rules:

- generate cryptographically random tokens;
- show raw token only once;
- store only token hash;
- store token prefix for display;
- allow token revocation;
- update `lastUsedAt` on successful use;
- deny revoked tokens immediately;
- deny expired tokens if expiration is added;
- do not log raw tokens;
- do not return raw tokens from list endpoints.

## Suggested Token Format

Development token:

```txt
smr_dev_<random_secret>
```

Production token:

```txt
smr_live_<random_secret>
```

The database may store a prefix like:

```txt
smr_live_abcd
```

The raw secret must never be retrievable after creation.

## Token Hashing

Registry tokens should be hashed before storage.

The system should use a secure hashing approach appropriate for API tokens.

The authorization flow should compare provided tokens against stored hashes safely.

## Registry Authorization

Private package access must be authorized server-side.

Registry authorization must verify:

- token exists;
- token is not revoked;
- token is not expired;
- user exists;
- user has active Pro or Lifetime access;
- package exists;
- package is private;
- user is allowed to access requested package.

## Billing Security

Billing events must come from the payment provider webhook.

Frontend checkout success pages must not grant access by themselves.

Webhook handlers must:

- verify provider signatures;
- validate event shape;
- process events idempotently;
- store event IDs;
- update subscriptions and licenses;
- update entitlements;
- write audit logs.

## Stripe Webhook Security

The Stripe webhook endpoint must verify the Stripe signature using:

```txt
STRIPE_WEBHOOK_SECRET
```

Do not process unsigned or invalid webhook events.

## Entitlement Security

Entitlements must be computed or stored server-side.

The frontend can display entitlement state, but the backend is the source of truth.

Sensitive actions must check entitlements server-side, including:

- creating registry token;
- accessing private docs;
- authorizing private package install;
- accessing private templates.

## Lifetime Access Security

Lifetime access should be modeled as a durable license.

Lifetime access must not be removed by subscription cancellation webhooks.

Lifetime access can be manually revoked only for exceptional administrative reasons.

If a user has both a canceled subscription and Lifetime license, Lifetime should continue granting Pro access.

## Package Security

Public packages must not include paid source code.

Private packages must include a private `publishConfig`.

Example:

```json
{
  "publishConfig": {
    "registry": "https://registry.sua-marca.com"
  }
}
```

CI should check that private packages are not accidentally published publicly.

## Dependency Security

The project should:

- use lockfiles;
- review dependency updates;
- avoid unnecessary dependencies;
- run security audits as part of maintenance;
- avoid packages with unclear maintenance status for critical infrastructure.

## Audit Logs

The system should write audit logs for sensitive actions.

Examples:

- user created;
- checkout created;
- webhook processed;
- subscription status changed;
- Lifetime license created;
- entitlement granted;
- entitlement revoked;
- registry token created;
- registry token revoked;
- private package authorization denied;
- private package authorization allowed.

Audit logs should avoid storing secrets.

## Rate Limiting

Sensitive endpoints should have rate limiting where practical.

Examples:

- login;
- signup;
- checkout creation;
- registry token creation;
- registry authorization;
- webhook endpoint if appropriate.

## CORS

CORS should be configured intentionally.

The API should not allow arbitrary origins in production.

Allowed production origins should include only:

- marketing app domain;
- dashboard app domain;
- docs app domain;
- registry internal calls where applicable.

## Authentication

Authenticated actions require a valid session.

Required authenticated actions:

- viewing dashboard;
- creating checkout;
- opening customer portal;
- generating registry token;
- revoking registry token;
- accessing private docs.

## Authorization

Authentication is not enough.

The system must also check authorization.

Examples:

- an authenticated Free user cannot generate Pro registry tokens;
- an authenticated Free user cannot access private docs;
- a Pro user cannot use a revoked token;
- a user cannot revoke another user’s token.

## Logging Rules

Logs must not contain:

- raw registry tokens;
- passwords;
- auth secrets;
- full Stripe secrets;
- raw webhook signing secrets;
- database URLs;
- private npm tokens.

Logs may contain:

- user id;
- package name;
- token prefix;
- action;
- denial reason;
- timestamp.

## Local Development Security

Local development may use fake credentials.

Do not use production secrets locally unless absolutely necessary.

Local `.env` files must remain ignored by git.

## Production Security Checklist

Before production launch:

- rotate all placeholder secrets;
- configure production database;
- configure real Stripe webhook secret;
- configure production auth secret;
- configure production registry secret;
- configure private registry storage;
- configure domain and TLS;
- configure backup strategy;
- configure monitoring;
- configure audit log retention;
- configure CI secrets;
- test private package install;
- test token revocation;
- test failed payment behavior;
- test Lifetime access behavior.
## CI Security Automation (ExecPlan 007)

The repository includes automated security checks:

- `pnpm check:boundaries` validates package separation and anti-leak boundaries;
- `pnpm check:private-publish` validates private package registry configuration;
- `pnpm check:secrets` scans for common committed credential patterns.

These checks are enforced in `.github/workflows/ci.yml` and both release workflows.
