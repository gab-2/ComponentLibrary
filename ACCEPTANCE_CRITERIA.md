# Acceptance Criteria

This file defines the expected finished state of the repository.

The implementation is acceptable when all criteria below pass or are clearly scaffolded with working examples where full implementation would be too large for a single pass.

## Local Development

- `pnpm install` works.
- `pnpm dev` starts local development apps or clearly documented dev targets.
- `pnpm build` builds all apps and packages.
- `pnpm lint` passes.
- `pnpm typecheck` passes.
- `pnpm test` passes.
- Docker Compose starts required local services.
- PostgreSQL runs locally.
- Prisma migrations run.
- Seed command creates demo data.

## Required Apps

The following apps exist:

- `apps/marketing`
- `apps/dashboard`
- `apps/docs`
- `apps/api`
- `apps/registry`
- `apps/storybook`

## Required Packages

The following packages exist:

- `packages/tokens`
- `packages/styles`
- `packages/core`
- `packages/icons`
- `packages/react`
- `packages/react-pro`
- `packages/vue`
- `packages/vue-pro`
- `packages/angular`
- `packages/angular-pro`
- `packages/svelte`
- `packages/svelte-pro`
- `packages/web-components`
- `packages/database`
- `packages/billing`
- `packages/auth`
- `packages/entitlement`
- `packages/registry-client`
- `packages/ui-internal`

## Seed Users

The database seed should create:

- `free@example.com`
- `pro@example.com`
- `lifetime@example.com`

Expected access:

- Free user has no Pro entitlement.
- Pro user has active Pro entitlement.
- Lifetime user has permanent Pro entitlement.

## Billing

The system supports these plans:

- `FREE`
- `PRO_MONTHLY`
- `PRO_YEARLY`
- `LIFETIME`

Billing requirements:

- Stripe integration is implemented or scaffolded with real webhook handlers.
- Checkout session creation exists.
- Customer portal session creation exists.
- Webhook signature verification exists.
- Webhook events are idempotent.
- Subscription updates affect entitlements.
- Failed payment removes Pro entitlement for subscription users.
- Lifetime access does not expire automatically.

## Entitlements

The entitlement system must answer:

- whether a user can access Pro packages;
- whether a user can access private docs;
- whether a user can generate registry tokens;
- whether a token can install a package.

Required behavior:

- Free user cannot access Pro packages.
- Active Pro user can access Pro packages.
- Lifetime user can access Pro packages.
- Inactive subscription user cannot access Pro packages.
- Revoked token cannot access Pro packages.

## Registry

Registry requirements:

- Pro user can generate registry token.
- Lifetime user can generate registry token.
- Free user cannot generate Pro registry token.
- Raw token is shown only once.
- Raw token is never stored.
- Token hash is stored.
- Token prefix is stored.
- Token can be revoked.
- Revoked token fails authorization.
- Private package install checks entitlement.
- Private package install fails without valid token.
- Private package install fails without active entitlement.
- Private package install succeeds with active Pro token.
- Private package install succeeds with Lifetime token.

## Public Packages

Public packages should be installable without private registry access:

- `@sua-marca/tokens`
- `@sua-marca/styles`
- `@sua-marca/core`
- `@sua-marca/icons`
- `@sua-marca/react`
- `@sua-marca/vue`
- `@sua-marca/angular`
- `@sua-marca/svelte`
- `@sua-marca/web-components`

## Private Packages

Private packages should require private registry access:

- `@sua-marca-pro/react`
- `@sua-marca-pro/vue`
- `@sua-marca-pro/angular`
- `@sua-marca-pro/svelte`
- `@sua-marca-pro/templates`

Private packages must not accidentally publish to public npm.

## React Free Components

At minimum, React Free package should include:

- Button
- Input
- Card
- Badge
- Alert
- Basic Modal

## React Pro Components

At minimum, React Pro package should include:

- DataTable
- DatePicker or Calendar
- CommandMenu or MultiSelect

## Vue Support

Vue package structure exists.

At minimum:

- Button
- Input
- Card
- one Pro example component.

## Angular Support

Angular package structure exists.

At minimum:

- Button
- Input
- Card
- one Pro example component.

## Svelte Support

Svelte package structure exists.

At minimum:

- Button
- Input
- Card
- one Pro example component.

## Web Components Support

Web Components package exists.

At minimum:

- `sm-button`
- `sm-input`
- `sm-card`

## Marketing App

Marketing app should include:

- landing page;
- pricing section;
- component previews;
- free component showcase;
- Pro component preview with CTA;
- signup CTA;
- checkout CTA.

## Dashboard App

Dashboard should include:

- authenticated area;
- plan status;
- billing action;
- registry token list;
- token generation;
- token revocation;
- install instructions;
- `.npmrc` instructions.

## Docs App

Docs should include:

- getting started;
- installation;
- tokens;
- React docs;
- Vue docs;
- Angular docs;
- Svelte docs;
- Web Components docs;
- Pro docs gated by entitlement.

## Storybook

Storybook should include:

- free component stories;
- pro component stories;
- variants;
- basic props documentation.

## Documentation

The repo should document:

- how to run locally;
- how to configure environment variables;
- how to run Docker Compose;
- how to run migrations;
- how to seed users;
- how to test billing locally;
- how to test registry locally;
- how to publish public packages;
- how to publish private packages;
- how to add a new component;
- how to add a new framework adapter;
- how to work with ExecPlans.

## Security

Security requirements:

- no real secrets committed;
- `.env.example` exists;
- registry tokens are hashed;
- raw tokens are shown only once;
- webhook handlers validate signatures;
- private packages have private `publishConfig`;
- no Pro source code exists inside public packages;
- audit logs exist for sensitive operations.

## Final Verification Commands

The final implementation should pass:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Where applicable:

```bash
pnpm db:migrate
pnpm db:seed
```