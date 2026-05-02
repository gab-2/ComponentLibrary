# Implementation Prompt

You are working inside this repository.

Your goal is to implement a scalable SaaS platform for selling access to a multi-framework UI component library.

Before writing code, read these files:

- `AGENTS.md`
- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/PLANS.md`
- `docs/BILLING.md`
- `docs/REGISTRY.md`
- `docs/COMPONENTS.md`
- `docs/SECURITY.md`
- `docs/RELEASES.md`
- `docs/MULTI_FRAMEWORK.md`
- `docs/ADDING_COMPONENTS.md`
- `design/tokens.json`
- `design/brand.md`

## Main Objective

Create the full repository structure and implementation for a production-grade SaaS platform that distributes free and paid UI component libraries.

The product must support:

- free public packages;
- paid private packages;
- subscription access;
- lifetime access;
- private npm registry access;
- registry tokens;
- user dashboard;
- public landing page;
- public and private documentation;
- billing integration;
- entitlement system;
- multi-framework components;
- release workflow.

## Required Working Mode

Use ExecPlans.

Read:

```txt
docs/PLANS.md
```

Then implement the active plans in this order:

```txt
docs/exec-plans/active/001-monorepo-foundation.md
docs/exec-plans/active/002-design-system-packages.md
docs/exec-plans/active/003-auth-billing-entitlements.md
docs/exec-plans/active/004-private-registry.md
docs/exec-plans/active/005-marketing-dashboard-docs.md
docs/exec-plans/active/006-multiframework-adapters.md
docs/exec-plans/active/007-ci-release-security.md
```

For each ExecPlan:

1. Read the entire plan.
2. Read referenced documentation.
3. Implement milestones in order.
4. Update the Progress checklist.
5. Add Decision Log entries for important decisions.
6. Run the verification commands.
7. Move the plan to `docs/exec-plans/completed/` only when complete.

## Critical Product Rules

Do not put paid code inside public packages.

Do not implement runtime license checks inside installed frontend components.

Do not reuse React components directly in Vue, Angular or Svelte.

Do not publish private packages to public npm.

Do not store raw registry tokens.

Do not commit real secrets.

## Required Architecture

Use this component architecture:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework-specific adapters
```

Use this package separation:

```txt
Public:
@sua-marca-ui/tokens
@sua-marca-ui/styles
@sua-marca-ui/core
@sua-marca-ui/icons
@sua-marca-ui/react
@sua-marca-ui/vue
@sua-marca-ui/angular
@sua-marca-ui/svelte
@sua-marca-ui/web-components

Private:
@sua-marca-ui-pro/react
@sua-marca-ui-pro/vue
@sua-marca-ui-pro/angular
@sua-marca-ui-pro/svelte
@sua-marca-ui-pro/templates
```

## Required Plans

The platform must support:

- `FREE`
- `PRO_MONTHLY`
- `PRO_YEARLY`
- `LIFETIME`

Lifetime must provide permanent access to:

- Pro packages;
- future updates;
- new components;
- private docs;
- private registry access.

## Registry Requirements

The private registry must protect paid packages.

Users with active Pro or Lifetime access can install private packages.

Users without active entitlement cannot install private packages.

When a subscription becomes inactive, the user must lose access to:

- new installs;
- package updates;
- private docs;
- future versions.

Registry tokens must be:

- generated only for entitled users;
- shown only once;
- stored only as hashes;
- revocable;
- checked against current entitlements.

## Billing Requirements

Implement Stripe as the first billing provider.

The billing system must be structured so another provider can be added later.

Required behavior:

- checkout for `PRO_MONTHLY`;
- checkout for `PRO_YEARLY`;
- checkout for `LIFETIME`;
- customer portal;
- webhook handling;
- idempotent webhook processing;
- subscription status normalization;
- entitlement updates;
- Lifetime license creation.

## Required Local Experience

The final repository should support:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm db:migrate
pnpm db:seed
```

Docker Compose should start at least:

- PostgreSQL;
- registry service or registry dependency;
- any required local support services.

## Required Seed Data

Create demo users:

```txt
free@example.com
pro@example.com
lifetime@example.com
```

Expected state:

- Free user has no Pro access.
- Pro user has active Pro access.
- Lifetime user has permanent Pro access.

## Required Apps

Create these apps:

```txt
apps/marketing
apps/dashboard
apps/docs
apps/api
apps/registry
apps/storybook
```

## Required Packages

Create these packages:

```txt
packages/tokens
packages/styles
packages/core
packages/icons

packages/react
packages/react-pro

packages/vue
packages/vue-pro

packages/angular
packages/angular-pro

packages/svelte
packages/svelte-pro

packages/web-components

packages/database
packages/billing
packages/auth
packages/entitlement
packages/registry-client
packages/ui-internal

packages/config-eslint
packages/config-typescript
packages/config-tailwind
```

## Implementation Quality

Prefer working, testable code over placeholder-only files.

If something cannot be fully implemented in one pass, scaffold it correctly and document the remaining work clearly.

Do not leave critical security or access-control behavior as vague pseudocode.

Billing, entitlements, registry tokens and package separation must have real initial implementation.

## Final Verification

At the end, run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Where applicable, also run:

```bash
pnpm db:migrate
pnpm db:seed
```

If a command fails, fix it.

If a command cannot run because external credentials are missing, document exactly why and what is needed.