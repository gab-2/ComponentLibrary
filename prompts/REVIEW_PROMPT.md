# Review Prompt

You are reviewing this repository for architecture, security, correctness and product alignment.

Before reviewing, read:

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

## Review Goals

Find and fix issues related to:

- package separation;
- paid code exposure;
- registry access;
- billing;
- entitlements;
- authentication;
- security;
- framework architecture;
- release safety;
- documentation accuracy;
- build correctness.

## Critical Checks

Verify that:

- paid source code is not included in public packages;
- public packages do not import from private packages;
- private packages have private `publishConfig`;
- private packages are not configured to publish to public npm;
- React is not bundled into React libraries;
- React components are not reused directly inside Vue, Angular or Svelte packages;
- registry tokens are never stored raw;
- raw registry tokens are shown only once;
- revoked registry tokens fail authorization;
- Free users cannot generate Pro registry tokens;
- inactive subscription users cannot access Pro packages;
- Lifetime users keep Pro access;
- Stripe webhook handlers verify signatures;
- Stripe webhook handlers are idempotent;
- frontend apps do not receive server secrets;
- `.env.example` contains placeholders only.

## Package Review

Inspect:

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
```

Check:

- exports;
- package names;
- build scripts;
- `files`;
- `main`;
- `module`;
- `types`;
- `peerDependencies`;
- `publishConfig`;
- accidental private/public coupling.

## App Review

Inspect:

```txt
apps/marketing
apps/dashboard
apps/docs
apps/api
apps/registry
apps/storybook
```

Check:

- route structure;
- auth boundaries;
- entitlement checks;
- billing flows;
- token flows;
- private doc gating;
- component previews;
- install instructions.

## Billing Review

Verify:

- `FREE`, `PRO_MONTHLY`, `PRO_YEARLY`, `LIFETIME` exist;
- checkout cannot be created for invalid plans;
- Lifetime creates durable license;
- subscription cancellation does not remove Lifetime access;
- failed payment removes subscription-based Pro access;
- duplicate webhooks are ignored;
- audit logs are written for sensitive billing actions.

## Registry Review

Verify:

- private registry uses token authorization;
- authorization checks current entitlement;
- token revocation takes effect;
- raw tokens are not logged;
- package name is validated;
- denial reasons are clear;
- local `.npmrc` instructions work;
- private packages are only published to private registry.

## Multi-Framework Review

Verify:

- shared logic is in `packages/core`;
- shared tokens are in `packages/tokens`;
- shared styles are in `packages/styles`;
- framework packages use those shared layers;
- React does not leak into Vue, Angular or Svelte packages;
- Web Components are implemented independently.

## Security Review

Search for:

```txt
sk_live_
sk_test_
whsec_
npm_
ghp_
password
secret
DATABASE_URL
_authToken
```

Confirm no real secrets are committed.

Also verify:

- sensitive logs do not include raw tokens;
- frontend does not expose server environment variables;
- authorization is enforced server-side;
- private docs are gated server-side or through trusted access checks.

## Verification Commands

Run:

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

If failures occur, fix them.

If a failure requires missing external services or credentials, document the exact blocker.

## Output Required

At the end of the review, provide:

1. Summary of issues found.
2. List of fixes made.
3. Remaining risks.
4. Commands run.
5. Results of verification commands.
6. Any recommended next steps.