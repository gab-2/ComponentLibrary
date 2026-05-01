# ExecPlan: Marketing, Dashboard and Docs Apps

## Purpose

Implement the user-facing web applications for the platform.

This plan creates the public landing page, authenticated dashboard and documentation experience.

The goal is to make users able to discover the product, preview components, subscribe, access their account, generate registry tokens and read public or private documentation.

## Scope

This plan includes:

- `apps/marketing`;
- `apps/dashboard`;
- `apps/docs`;
- public landing page;
- pricing page;
- component preview sections;
- Pro component gated previews;
- authenticated dashboard;
- billing status display;
- registry token UI;
- install instructions;
- public docs;
- private docs;
- entitlement-based docs gating.

## Non-goals

This plan does not implement:

- core billing backend;
- private registry backend;
- full component package implementation;
- release workflows;
- all production deployment configuration.

Those are handled by other ExecPlans.

## Relevant Documentation

Read before implementation:

- `AGENTS.md`
- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/BILLING.md`
- `docs/REGISTRY.md`
- `docs/COMPONENTS.md`
- `docs/SECURITY.md`
- `docs/MULTI_FRAMEWORK.md`
- `design/brand.md`

## Relevant Files and Directories

Create or update:

```txt
apps/marketing/
apps/dashboard/
apps/docs/
packages/ui-internal/
packages/auth/
packages/entitlement/
packages/registry-client/
```

Expected important files:

```txt
apps/marketing/package.json
apps/marketing/src/app/page.tsx
apps/marketing/src/app/pricing/page.tsx
apps/marketing/src/app/components/page.tsx

apps/dashboard/package.json
apps/dashboard/src/app/dashboard/page.tsx
apps/dashboard/src/app/dashboard/billing/page.tsx
apps/dashboard/src/app/dashboard/tokens/page.tsx
apps/dashboard/src/app/dashboard/install/page.tsx
apps/dashboard/src/app/dashboard/account/page.tsx

apps/docs/package.json
apps/docs/src/app/docs/page.tsx
apps/docs/src/app/docs/getting-started/page.tsx
apps/docs/src/app/docs/react/page.tsx
apps/docs/src/app/docs/react/button/page.tsx
apps/docs/src/app/docs/react-pro/data-table/page.tsx
apps/docs/src/app/docs/vue/page.tsx
apps/docs/src/app/docs/angular/page.tsx
apps/docs/src/app/docs/svelte/page.tsx
apps/docs/src/app/docs/web-components/page.tsx

packages/ui-internal/src/
```

## Architecture Notes

Marketing, dashboard and docs are separate apps.

Public marketing pages can show Pro component previews, but must not expose paid source code or private install instructions to unauthorized users.

Dashboard pages require authentication.

Private docs require Pro or Lifetime entitlement.

Docs should show install instructions based on access:

- Free users see public install commands.
- Pro or Lifetime users see private registry setup instructions.
- Unauthenticated users see CTA to sign up or subscribe.

## Marketing App Requirements

The marketing app should include:

- landing page;
- hero section;
- component previews;
- free component showcase;
- Pro component previews;
- pricing section;
- comparison table;
- CTA to sign up;
- CTA to subscribe;
- CTA to read docs.

Suggested routes:

```txt
/
 /pricing
 /components
 /components/free
 /components/pro
 /login
 /signup
```

## Landing Page Sections

The landing page should include:

1. Hero
2. Component preview area
3. Free components section
4. Pro components section
5. Multi-framework support section
6. Registry/private access explanation
7. Pricing CTA
8. Documentation CTA

## Pricing Page

Pricing page should show:

- Free;
- Pro Monthly;
- Pro Yearly;
- Lifetime.

Lifetime should clearly state:

- one-time purchase;
- permanent Pro access;
- future updates included;
- new components included.

## Dashboard Requirements

Dashboard should include:

- current plan;
- subscription status;
- Lifetime badge when applicable;
- available package list;
- billing action;
- customer portal action;
- registry token list;
- token creation;
- token revocation;
- install instructions;
- `.npmrc` instructions.

Suggested routes:

```txt
/dashboard
/dashboard/billing
/dashboard/tokens
/dashboard/install
/dashboard/account
```

## Registry Token UI

The token page should allow entitled users to:

- create a token;
- name a token;
- copy the raw token once;
- see token prefix later;
- see token creation date;
- see last used date;
- revoke token.

Free users should see:

- explanation that Pro or Lifetime is required;
- CTA to pricing or checkout.

## Install Instructions UI

For Pro or Lifetime users, show:

```txt
@sua-marca-pro:registry=https://registry.sua-marca.com
//registry.sua-marca.com/:_authToken=YOUR_TOKEN
```

Then:

```bash
pnpm add @sua-marca-pro/react
```

For local development examples, show:

```txt
@sua-marca-pro:registry=http://localhost:4873
//localhost:4873/:_authToken=YOUR_TOKEN
```

## Docs Requirements

Docs should include:

- getting started;
- installation;
- tokens;
- React;
- React Pro;
- Vue;
- Vue Pro;
- Angular;
- Angular Pro;
- Svelte;
- Svelte Pro;
- Web Components.

Suggested docs routes:

```txt
/docs
/docs/getting-started
/docs/installation
/docs/tokens
/docs/react
/docs/react/button
/docs/react/input
/docs/react/card
/docs/react-pro/data-table
/docs/vue
/docs/angular
/docs/svelte
/docs/web-components
```

## Private Docs Gating

Private docs should check entitlement.

If unauthorized:

- do not show private install instructions;
- do not show private implementation details;
- show CTA to subscribe;
- show explanation that Pro or Lifetime is required.

If authorized:

- show full docs;
- show private package install instructions;
- show component examples.

## Component Preview Rules

Marketing and docs can render component previews.

But unauthorized users must not receive private package source code, registry credentials or private implementation details.

A locked Pro preview can show:

- component name;
- screenshot-like preview;
- short description;
- CTA to subscribe.

## UI Internal Package

Create `packages/ui-internal` for shared app UI components.

Examples:

- AppShell;
- Button;
- Card;
- Badge;
- PricingCard;
- CodeBlock;
- ComponentPreview;
- PlanBadge;
- TokenDisplay.

This package is for internal platform apps only, not the public component library.

## Implementation Milestones

### Milestone 1: Internal UI Package

Create shared internal UI components for marketing, dashboard and docs.

### Milestone 2: Marketing App

Implement landing page, pricing page and component preview pages.

### Milestone 3: Dashboard App

Implement authenticated dashboard pages.

Integrate with API routes for:

- billing status;
- checkout;
- customer portal;
- registry tokens.

### Milestone 4: Docs App

Implement public and gated private docs pages.

### Milestone 5: Access-Aware UI

Ensure UI changes based on user access:

- anonymous;
- Free;
- Pro;
- Lifetime.

### Milestone 6: Verification

Run lint, typecheck, tests and build.

## Step-by-Step Tasks

1. Create `packages/ui-internal`.
2. Add basic shared UI components.
3. Scaffold marketing app.
4. Build landing page.
5. Build pricing page.
6. Build component preview page.
7. Scaffold dashboard app.
8. Build dashboard overview.
9. Build billing page.
10. Build token page.
11. Build install instructions page.
12. Scaffold docs app.
13. Build public docs pages.
14. Build Pro docs page with entitlement gating.
15. Add access-aware CTAs.
16. Add API client utilities where needed.
17. Run verification commands.
18. Update this plan’s Progress section.
19. Move this plan to completed only if acceptance criteria pass.

## Progress

- [ ] Internal UI package created
- [ ] Shared app Button created
- [ ] Shared app Card created
- [ ] Shared app CodeBlock created
- [ ] Shared app PricingCard created
- [ ] Marketing app scaffolded
- [ ] Landing page created
- [ ] Pricing page created
- [ ] Component preview page created
- [ ] Free component showcase created
- [ ] Pro locked preview created
- [x] Dashboard app scaffolded
- [x] Dashboard overview created
- [x] Billing page created
- [x] Token list page created
- [x] Token creation UI created
- [x] Token revocation UI created
- [x] Install instructions page created
- [x] Docs app scaffolded
- [x] Public docs created
- [ ] React docs created
- [x] React Pro docs gated
- [ ] Vue docs created
- [ ] Angular docs created
- [ ] Svelte docs created
- [ ] Web Components docs created
- [x] Access-aware UI implemented
- [ ] Build verified
- [ ] Lint verified
- [x] Typecheck verified
- [x] Tests verified

## Decision Log

### Decision: Keep platform UI separate from public component library

Reason:

The platform needs UI components for marketing and dashboard, but those components are not necessarily part of the public design system package.

### Decision: Gate Pro docs by entitlement

Reason:

Private docs are part of the paid value and may expose private package usage details.

### Decision: Show Pro previews publicly without private source

Reason:

Marketing needs to demonstrate value without exposing paid implementation details.

### Decision: Start Sprint 2 with Dashboard token flows

Reason:

Sprint 2 starts with account-critical capabilities (token management and installation instructions) before marketing/docs polish, enabling immediate paid-package onboarding.

### Decision: Implement docs gating through API access snapshot

Reason:

Private documentation access is bound to the same entitlement model used by registry authorization, keeping paid access rules centralized on backend state.

## Risks

- Dashboard may depend on backend routes from earlier plans.
- Auth integration may require adjustments based on chosen auth implementation.
- Docs gating must avoid leaking private content in statically generated output.
- Marketing previews must not import private packages in public pages unless access is enforced correctly.

## Verification Commands

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Optional app checks:

```bash
pnpm --filter marketing build
pnpm --filter dashboard build
pnpm --filter docs build
```

## Acceptance Criteria

This plan is complete when:

- marketing app has landing page;
- marketing app has pricing page;
- marketing app shows free component previews;
- marketing app shows locked Pro previews;
- dashboard app has account overview;
- dashboard app shows plan status;
- dashboard app shows billing actions;
- dashboard app shows registry token UI;
- dashboard app shows install instructions;
- docs app has public docs;
- docs app has gated Pro docs;
- unauthorized users cannot see private install details;
- Pro or Lifetime users can see private docs;
- build, lint, typecheck and tests pass.