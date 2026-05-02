# Architecture

## Overview

This repository implements a SaaS platform for selling access to a multi-framework UI component library.

The platform is composed of:

- public marketing site;
- authenticated dashboard;
- public and private documentation;
- backend API;
- billing system;
- entitlement system;
- private npm registry;
- component package monorepo;
- Storybook;
- release pipeline.

## High-Level Architecture

```txt
                ┌────────────────────┐
                │ Marketing Website  │
                │ apps/marketing     │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Dashboard          │
                │ apps/dashboard     │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ API Backend        │
                │ apps/api           │
                └─────────┬──────────┘
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
┌─────────────┐   ┌────────────────┐   ┌──────────────┐
│ PostgreSQL  │   │ Stripe Billing │   │ Registry     │
│ Prisma      │   │ Webhooks       │   │ apps/registry│
└─────────────┘   └────────────────┘   └──────────────┘
                          │
                          ▼
            Private package installation
```

## Monorepo Structure

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
```

## Apps

### `apps/marketing`

Public-facing landing page.

Responsibilities:

- product positioning;
- pricing;
- component previews;
- free component showcase;
- Pro component previews;
- signup and checkout CTAs.

### `apps/dashboard`

Authenticated customer dashboard.

Responsibilities:

- show user plan;
- show subscription status;
- show Lifetime status;
- generate registry tokens;
- revoke registry tokens;
- show install instructions;
- show `.npmrc` instructions;
- link to private docs.

### `apps/docs`

Documentation site.

Responsibilities:

- public docs;
- private docs;
- framework-specific documentation;
- gated Pro docs;
- component examples.

### `apps/api`

Main backend.

Responsibilities:

- authentication;
- billing;
- subscriptions;
- lifetime licenses;
- entitlements;
- registry token creation;
- registry token revocation;
- registry authorization;
- audit logs.

### `apps/registry`

Private npm registry service.

Responsibilities:

- serve private packages;
- validate registry tokens;
- call API authorization endpoint;
- allow or deny access to private packages.

### `apps/storybook`

Component development and preview environment.

Responsibilities:

- component stories;
- free stories;
- pro stories;
- visual states;
- props documentation.

## Packages

### `packages/tokens`

Framework-agnostic design tokens.

Includes:

- colors;
- typography;
- spacing;
- radii;
- shadows;
- breakpoints;
- z-index;
- motion tokens.

Exports:

- TypeScript tokens;
- CSS variables;
- JSON tokens.

### `packages/styles`

Framework-agnostic CSS.

Includes:

- base styles;
- reset if needed;
- component class styles;
- CSS variables usage;
- per-component CSS files.

### `packages/core`

Framework-agnostic headless logic.

Includes:

- pure functions;
- class name helpers;
- state helpers;
- shared types;
- accessibility helpers where possible.

Must not contain:

- React JSX;
- Vue SFCs;
- Angular components;
- Svelte components;
- browser-only runtime assumptions unless clearly isolated.

### `packages/icons`

Shared icon package.

Should be tree-shakeable.

### Framework Packages

Framework-specific component adapters:

- `packages/react`
- `packages/vue`
- `packages/angular`
- `packages/svelte`
- `packages/web-components`

Paid framework-specific packages:

- `packages/react-pro`
- `packages/vue-pro`
- `packages/angular-pro`
- `packages/svelte-pro`

## Multi-Framework Strategy

The project must not attempt to make React components universal.

The correct structure is:

```txt
tokens
  -> styles
  -> core
  -> framework adapters
```

Example:

```txt
packages/core
  getButtonClasses()
  createSelectState()
  createDataTableState()

packages/styles
  button.css
  input.css
  data-table.css

packages/react
  Button.tsx
  Input.tsx

packages/vue
  Button.vue
  Input.vue

packages/angular
  button.component.ts
  input.component.ts

packages/svelte
  Button.svelte
  Input.svelte
```

## Free vs Pro Package Separation

Free and paid code must be physically separated.

Correct:

```txt
packages/react
packages/react-pro
```

Incorrect:

```txt
packages/react
  free/
  pro/
```

unless the package is private. Public packages must never contain Pro source code.

## Registry Authorization Flow

```txt
User generates token
      ↓
Raw token shown once
      ↓
Token hash saved
      ↓
User configures .npmrc
      ↓
npm install requests private package
      ↓
Registry validates token
      ↓
Registry calls API authorization endpoint
      ↓
API checks entitlement
      ↓
Registry allows or denies package access
```

## Billing Flow

```txt
User selects plan
      ↓
Checkout session created
      ↓
Payment provider processes payment
      ↓
Webhook received
      ↓
Webhook signature validated
      ↓
Subscription or license updated
      ↓
Entitlements updated
      ↓
Registry access enabled or disabled
```

## Entitlement Rules

A user can access Pro packages if:

- they have an active Pro monthly subscription;
- or they have an active Pro yearly subscription;
- or they have an active Lifetime license.

A user cannot access Pro packages if:

- they are Free;
- their subscription is canceled;
- their subscription is unpaid;
- their subscription is past due;
- their subscription has expired;
- their registry token was revoked.

## Lifetime Rule

Lifetime access:

- does not expire automatically;
- includes future updates;
- includes new components;
- should remain valid unless manually revoked for abuse, fraud or administrative reasons.

## Publishing Architecture

Public packages should publish to the public npm registry.

Private packages should publish to the private registry.

Private packages must include `publishConfig`.

Example:

```json
{
  "publishConfig": {
    "registry": "https://registry.sua-marca-ui.com"
  }
}
```

## CI/CD Architecture

The repository should support:

- install;
- lint;
- typecheck;
- unit tests;
- build;
- E2E tests;
- public package release;
- private package release;
- registry deployment;
- docs deployment;
- app deployment.

## Security Architecture

Security requirements:

- no real secrets in repo;
- `.env.example` only;
- registry tokens hashed;
- raw registry tokens shown only once;
- Stripe webhook signatures validated;
- webhook events idempotent;
- private packages never published publicly;
- private docs gated by entitlement;
- audit logs for sensitive actions.