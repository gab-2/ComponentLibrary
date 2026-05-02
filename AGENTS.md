# AGENTS.md

## Project Overview

This repository is a scalable SaaS platform for selling access to a multi-framework UI component library.

The product includes:

- public free component packages;
- private paid component packages;
- subscription plans;
- lifetime access;
- private npm registry access;
- user dashboard;
- public landing page;
- public and private documentation;
- multi-framework component architecture;
- automated package publishing;
- billing, entitlements and registry token management.

This repository must be built as a production-grade monorepo, not as a quick MVP.

## Main Product Rule

Paid component source code must never be included in public/free packages.

Free and paid packages must be physically separated.

Correct:

- `@sua-marca-ui/react`
- `@sua-marca-ui-pro/react`

Incorrect:

- one public package containing both free and paid code;
- hiding Pro components inside a public package;
- runtime license checks inside installed frontend components.

## Runtime License Rule

Do not implement runtime license checks inside frontend components.

Do not implement this pattern:

```ts
if (!licenseIsValid) {
  return null;
}
```

This is not the correct business or technical model for this product.

Paid access must be controlled through:

- private npm registry;
- revocable registry tokens;
- backend entitlements;
- private documentation access;
- separate private packages;
- private templates;
- access to future versions and updates.

If a customer has already downloaded a package, the platform cannot remove the local code from their machine or from an already deployed build.

When a subscription expires, the platform should block:

- new installs;
- package updates;
- CI/CD builds that need private package installation;
- private documentation;
- new component releases;
- private templates;
- support resources if applicable.

## Package Strategy

Public packages:

- `@sua-marca-ui/tokens`
- `@sua-marca-ui/styles`
- `@sua-marca-ui/core`
- `@sua-marca-ui/icons`
- `@sua-marca-ui/react`
- `@sua-marca-ui/vue`
- `@sua-marca-ui/angular`
- `@sua-marca-ui/svelte`
- `@sua-marca-ui/web-components`

Private paid packages:

- `@sua-marca-ui-pro/react`
- `@sua-marca-ui-pro/vue`
- `@sua-marca-ui-pro/angular`
- `@sua-marca-ui-pro/svelte`
- `@sua-marca-ui-pro/templates`

## Multi-Framework Architecture Rule

Do not reuse React components directly in Vue, Angular or Svelte.

The correct architecture is:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework-specific adapters
```

Each framework must have idiomatic components for that framework.

Shared logic should live in:

- `packages/tokens`
- `packages/styles`
- `packages/core`

Framework-specific packages should use those shared layers.

## Required Stack

Use the following stack unless there is a strong technical reason not to:

- pnpm workspaces
- Turborepo
- TypeScript
- Next.js
- React
- Tailwind CSS
- Prisma
- PostgreSQL
- Stripe for initial billing
- Auth.js or a robust equivalent authentication solution
- Docker Compose for local development
- Vitest for unit tests
- Playwright for E2E tests
- Storybook for component previews
- Changesets for package versioning and publishing
- Vite library mode or tsup for package builds
- Verdaccio or equivalent self-hosted npm registry layer for private packages

The architecture should be prepared to support another payment provider, such as Mercado Pago, in the future.

## Apps

Create and maintain these apps:

### `apps/marketing`

Public landing page.

Responsibilities:

- product landing page;
- pricing;
- component previews;
- free component showcase;
- pro component previews with gated access;
- conversion to signup and checkout.

### `apps/dashboard`

Authenticated user dashboard.

Responsibilities:

- account overview;
- plan status;
- billing actions;
- registry token generation;
- registry token revocation;
- install instructions;
- `.npmrc` instructions;
- package access list;
- private docs links.

### `apps/docs`

Documentation site.

Responsibilities:

- public docs;
- private docs;
- framework-specific examples;
- gated Pro documentation;
- installation guides;
- package usage guides.

### `apps/api`

Main backend API.

Responsibilities:

- users;
- authentication;
- billing;
- webhooks;
- subscriptions;
- lifetime licenses;
- entitlements;
- registry token management;
- registry authorization endpoint;
- audit logging.

### `apps/registry`

Private npm registry service.

Responsibilities:

- serve private packages;
- validate registry tokens;
- check entitlements;
- block unauthorized package access;
- support local and production registry URLs.

### `apps/storybook`

Component preview environment.

Responsibilities:

- free component stories;
- pro component stories;
- visual testing structure;
- docs for props and variants.

## Packages

Create and maintain these packages:

### Shared packages

- `packages/tokens`
- `packages/styles`
- `packages/core`
- `packages/icons`

### Framework packages

- `packages/react`
- `packages/react-pro`
- `packages/vue`
- `packages/vue-pro`
- `packages/angular`
- `packages/angular-pro`
- `packages/svelte`
- `packages/svelte-pro`
- `packages/web-components`

### Platform packages

- `packages/database`
- `packages/billing`
- `packages/auth`
- `packages/entitlement`
- `packages/registry-client`
- `packages/ui-internal`

### Config packages

- `packages/config-eslint`
- `packages/config-typescript`
- `packages/config-tailwind`

## Billing Plans

Implement these plans:

- `FREE`
- `PRO_MONTHLY`
- `PRO_YEARLY`
- `LIFETIME`

Rules:

- `FREE` users cannot access Pro packages.
- `PRO_MONTHLY` users can access Pro packages only while the subscription is active.
- `PRO_YEARLY` users can access Pro packages only while the subscription is active.
- `LIFETIME` users have permanent access to Pro packages.
- `LIFETIME` includes future updates and new components.
- `LIFETIME` must not expire automatically.
- If a subscription becomes `canceled`, `unpaid`, `past_due`, `expired` or equivalent, Pro entitlement must be removed.
- Manually revoked tokens must not work, even for active users.

## Registry Access Model

A user with Pro or Lifetime access can generate registry tokens.

Registry token rules:

- raw token is shown only once;
- raw token is never stored;
- token hash is stored;
- token prefix is stored for identification;
- tokens can be revoked;
- revoked tokens cannot access private packages;
- registry requests must check entitlement before allowing private package access.

Local `.npmrc` example:

```txt
@sua-marca-pro:registry=http://localhost:4873
//localhost:4873/:_authToken=USER_TOKEN
```

Production `.npmrc` example:

```txt
@sua-marca-pro:registry=https://registry.sua-marca.com
//registry.sua-marca.com/:_authToken=USER_TOKEN
```

## Security Rules

- Never commit real secrets.
- Use `.env.example` only for placeholders.
- Never expose private secrets to frontend apps.
- Hash registry tokens.
- Validate Stripe webhook signatures.
- Make webhook handlers idempotent.
- Add audit logs for sensitive actions.
- Do not leak paid source code into public packages.
- Do not publish private packages to the public npm registry.
- Use `publishConfig` for private packages.
- Add rate limiting to sensitive endpoints where practical.

## Development Commands

Use pnpm.

Expected root commands:

```txt
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm db:migrate
pnpm db:seed
pnpm changeset
pnpm release
```

## ExecPlans

For complex work, use ExecPlans.

ExecPlans are defined in:

```txt
docs/PLANS.md
```

Active plans live in:

```txt
docs/exec-plans/active/
```

Completed plans live in:

```txt
docs/exec-plans/completed/
```

When implementing an ExecPlan:

1. Read `docs/PLANS.md`.
2. Read the target ExecPlan completely.
3. Read all referenced documentation.
4. Implement the milestones in order.
5. Update the Progress section as work is completed.
6. Update the Decision Log when making architectural decisions.
7. Run the verification commands listed in the plan.
8. Only move the plan to `completed` when all acceptance criteria pass.

## Definition of Done

The implementation is done when:

1. `pnpm install` works.
2. Docker Compose starts required local services.
3. PostgreSQL runs locally.
4. Prisma migrations run.
5. Seed users exist for Free, Pro and Lifetime.
6. Marketing app opens.
7. Dashboard app opens.
8. Docs app opens.
9. Storybook opens.
10. Free components are visible publicly.
11. Pro components are gated for Free users.
12. Pro users can generate registry tokens.
13. Lifetime users can generate registry tokens.
14. Revoked tokens cannot access private packages.
15. Private package access checks entitlement.
16. Public packages and private packages are physically separated.
17. React, Vue, Angular, Svelte and Web Components package structures exist.
18. Build, lint, typecheck and tests pass.
19. Documentation explains how to run, publish and extend the platform.