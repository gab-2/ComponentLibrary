# Sua Marca UI Platform

This repository contains a scalable SaaS platform for selling access to a multi-framework UI component library.

The platform includes:

- public free UI packages;
- private paid UI packages;
- subscription and lifetime access;
- private npm registry access;
- authenticated dashboard;
- public landing page;
- public and private documentation;
- billing and entitlement system;
- multi-framework component architecture;
- package publishing pipeline.

## Product Model

This product is not only a component library.

It is a complete platform for distributing a design system with:

- free public packages;
- paid private packages;
- private registry tokens;
- subscription access;
- lifetime access;
- documentation;
- examples;
- framework adapters.

## Main Rules

Paid code must never be included inside public packages.

Do not use runtime license checks inside installed frontend components.

Correct access control is handled by:

- private npm registry;
- revocable registry tokens;
- backend entitlements;
- private documentation;
- separate Pro packages.

## Repository Structure

```txt
apps/
  marketing/
  dashboard/
  docs/
  api/
  registry/
  storybook/

packages/
  tokens/
  styles/
  core/
  icons/

  react/
  react-pro/

  vue/
  vue-pro/

  angular/
  angular-pro/

  svelte/
  svelte-pro/

  web-components/

  database/
  billing/
  auth/
  entitlement/
  registry-client/
  ui-internal/

  config-eslint/
  config-typescript/
  config-tailwind/

docs/
  PLANS.md
  BILLING.md
  REGISTRY.md
  COMPONENTS.md
  SECURITY.md
  RELEASES.md
  MULTI_FRAMEWORK.md
  ADDING_COMPONENTS.md

  exec-plans/
    active/
    completed/
```

## Apps

### `apps/marketing`

Public landing page with:

- hero section;
- pricing;
- component previews;
- free component examples;
- Pro component previews;
- calls to action for signup and checkout.

### `apps/dashboard`

Authenticated user dashboard with:

- account overview;
- plan status;
- billing actions;
- registry token generation;
- registry token revocation;
- install instructions;
- `.npmrc` instructions.

### `apps/docs`

Documentation site with:

- public documentation;
- private Pro documentation;
- framework-specific guides;
- install instructions;
- component examples.

### `apps/api`

Backend API with:

- authentication;
- billing;
- subscriptions;
- lifetime licenses;
- entitlements;
- registry token management;
- registry authorization.

### `apps/registry`

Private npm registry service with:

- private package access;
- token validation;
- entitlement checks;
- install authorization.

### `apps/storybook`

Component preview and development environment.

## Packages

### Public packages

- `@sua-marca-ui/tokens`
- `@sua-marca-ui/styles`
- `@sua-marca-ui/core`
- `@sua-marca-ui/icons`
- `@sua-marca-ui/react`
- `@sua-marca-ui/vue`
- `@sua-marca-ui/angular`
- `@sua-marca-ui/svelte`
- `@sua-marca-ui/web-components`

### Private packages

- `@sua-marca-ui-pro/react`
- `@sua-marca-ui-pro/vue`
- `@sua-marca-ui-pro/angular`
- `@sua-marca-ui-pro/svelte`
- `@sua-marca-ui-pro/templates`

## Multi-Framework Strategy

The project must not reuse React components directly in Vue, Angular or Svelte.

The correct architecture is:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework-specific adapters
```

Shared packages provide design tokens, styles and pure logic.

Framework-specific packages provide idiomatic components for each framework.

## Plans

The platform supports:

- `FREE`
- `PRO_MONTHLY`
- `PRO_YEARLY`
- `LIFETIME`

Lifetime access includes:

- permanent Pro access;
- future updates;
- new components;
- private documentation;
- private package access.

## Local Development

Install dependencies:

```bash
pnpm install
```

Start development services:

```bash
pnpm dev
```

Run build:

```bash
pnpm build
```

Run lint:

```bash
pnpm lint
```

Run typecheck:

```bash
pnpm typecheck
```

Run tests:

```bash
pnpm test
```

Run database migration:

```bash
pnpm db:migrate
```

Run seed:

```bash
pnpm db:seed
```

## Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

Then update the values for your local environment.

Never commit real secrets.

## Private Registry Usage

A Pro or Lifetime user configures `.npmrc` like this:

```txt
@sua-marca-ui-pro:registry=https://registry.sua-marca-ui.com
//registry.sua-marca-ui.com/:_authToken=USER_TOKEN
```

For local development:

```txt
@sua-marca-ui-pro:registry=http://localhost:4873
//localhost:4873/:_authToken=USER_TOKEN
```

Then install:

```bash
pnpm add @sua-marca-ui-pro/react
```

## ExecPlans

Complex work is managed through ExecPlans.

Read:

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

Recommended implementation order:

1. `001-monorepo-foundation.md`
2. `002-design-system-packages.md`
3. `003-auth-billing-entitlements.md`
4. `004-private-registry.md`
5. `005-marketing-dashboard-docs.md`
6. `006-multiframework-adapters.md`
7. `007-ci-release-security.md`

## Documentation

Important docs:

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

## Security Notes

Do not commit:

- real Stripe keys;
- real npm tokens;
- real registry tokens;
- production database URLs;
- auth secrets;
- private customer data.

Use placeholders in `.env.example`.

## Definition of Done

The repository is ready when:

- dependencies install;
- apps run locally;
- packages build;
- tests pass;
- lint passes;
- typecheck passes;
- seed users exist;
- Free, Pro and Lifetime access rules work;
- private registry tokens work;
- revoked tokens fail;
- public and private packages are separated;
- docs explain how to extend the platform.