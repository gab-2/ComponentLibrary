# Product Spec

## Product Name

Placeholder name: Sua Marca UI.

This name can be changed later.

## Product Goal

Build a SaaS platform that sells access to a premium multi-framework UI component library.

The platform allows users to:

- browse components;
- preview components;
- view public documentation;
- create an account;
- subscribe to a paid plan;
- buy lifetime access;
- access private documentation;
- generate private npm registry tokens;
- install paid packages if entitled;
- use free packages without payment.

## Product Model

The product is not only a component library.

It is a complete distribution platform for a design system.

It includes:

- public website;
- component documentation;
- free public packages;
- paid private packages;
- private npm registry;
- billing system;
- lifetime licensing;
- access control;
- package publishing pipeline;
- multi-framework component architecture.

## User Types

### Anonymous visitor

Can:

- visit landing page;
- see pricing;
- preview free components;
- preview limited Pro components;
- read public documentation;
- create an account.

Cannot:

- access private docs;
- generate registry tokens;
- install private packages;
- view Pro implementation details.

### Free user

Can:

- log in;
- access dashboard;
- use free public packages;
- read free docs;
- preview Pro components;
- start checkout.

Cannot:

- install Pro packages;
- generate Pro registry tokens;
- access private Pro docs;
- access private templates.

### Pro monthly user

Can:

- access all free features;
- access Pro docs;
- generate registry tokens;
- install private packages;
- receive updates while subscription is active.

Loses access when subscription is no longer active.

### Pro yearly user

Can:

- access all free features;
- access Pro docs;
- generate registry tokens;
- install private packages;
- receive updates while subscription is active.

Loses access when subscription is no longer active.

### Lifetime user

Can:

- access all Pro features permanently;
- access future updates;
- access new components;
- access private packages;
- generate registry tokens;
- use private docs.

Lifetime access must not expire automatically.

## Plans

### FREE

Price: free.

Includes:

- free packages;
- public documentation;
- basic component examples;
- public component previews.

Does not include:

- Pro packages;
- private docs;
- private registry tokens;
- advanced components;
- private templates.

### PRO_MONTHLY

Paid monthly subscription.

Includes:

- Pro packages;
- private docs;
- private registry access;
- future updates while active;
- new components while active.

### PRO_YEARLY

Paid yearly subscription.

Includes:

- same access as Pro monthly;
- annual billing.

### LIFETIME

One-time payment.

Includes:

- permanent Pro access;
- future updates;
- new components;
- private docs;
- private registry access.

Lifetime access must be treated as a permanent license.

## Main User Journey

1. User visits landing page.
2. User sees components working.
3. User views pricing.
4. User creates an account.
5. User chooses Pro monthly, Pro yearly or Lifetime.
6. User completes checkout.
7. Payment provider sends webhook.
8. Backend updates subscription or license.
9. Backend creates entitlements.
10. User accesses dashboard.
11. User generates registry token.
12. User configures `.npmrc`.
13. User installs private package.
14. User uses Pro components in their project.

## Free Component Journey

1. User visits documentation.
2. User selects React, Vue, Angular, Svelte or Web Components.
3. User copies public install command.
4. User installs public package.
5. User imports free components.

Example:

```bash
pnpm add @sua-marca-ui/react
```

```tsx
import { Button } from "@sua-marca-ui/react";
```

## Pro Component Journey

1. User logs in.
2. User must have active Pro or Lifetime access.
3. User opens dashboard.
4. User generates a registry token.
5. User configures `.npmrc`.
6. User installs Pro package.

Example:

```txt
@sua-marca-ui-pro:registry=https://registry.sua-marca-ui.com
//registry.sua-marca-ui.com/:_authToken=USER_TOKEN
```

```bash
pnpm add @sua-marca-ui-pro/react
```

```tsx
import { DataTable } from "@sua-marca-ui-pro/react";
```

## Access Expiration Behavior

If a Pro subscription expires, is canceled, is unpaid or becomes inactive:

The user should lose access to:

- private registry installation;
- package updates;
- private docs;
- private templates;
- future Pro component releases.

The user should not be able to generate new registry tokens.

Existing registry tokens should stop authorizing private package access.

## Important Technical Limitation

The platform cannot remove code that the customer has already downloaded.

The platform controls distribution and future access, not already-downloaded source code.

Therefore, the correct access control layer is the private registry and backend entitlement system.

## Component Compatibility Goal

The library should support:

- React;
- Vue;
- Angular;
- Svelte;
- Web Components.

The correct approach is not to reuse React components directly across all frameworks.

The correct approach is:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework-specific adapters
```

## Free Components

Initial free components should include:

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Badge
- Card
- Alert
- Basic Modal
- Basic Tabs
- Basic Tooltip
- Spinner
- Avatar

## Pro Components

Initial Pro components should include:

- DataTable
- DatePicker
- Calendar
- MultiSelect
- CommandMenu
- AdvancedModal
- Drawer
- FileUploader
- Kanban
- RichCombobox
- AdvancedTabs
- Stepper
- Basic FormBuilder
- DashboardWidgets

## Business Rule

Free packages are public.

Pro packages are private.

Never expose Pro source code inside public packages.