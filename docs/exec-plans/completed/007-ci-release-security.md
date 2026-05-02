# ExecPlan: CI, Release and Security Review

## Purpose

Implement the continuous integration, release automation and security validation workflows for the platform.

This plan ensures the monorepo can be tested, built, reviewed and released safely.

The main goal is to prevent broken builds, accidental private package exposure and unsafe publishing.

## Scope

This plan includes:

- GitHub Actions CI workflow;
- public package release workflow;
- private package release workflow;
- E2E workflow;
- Changesets configuration;
- package publishing safeguards;
- security review scripts;
- secret scanning guidance;
- package boundary checks;
- documentation updates.

## Non-goals

This plan does not implement:

- the component packages themselves;
- billing business logic;
- private registry service;
- full production deployment infrastructure;
- monitoring stack.

Those are handled by other ExecPlans.

## Relevant Documentation

Read before implementation:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/SECURITY.md`
- `docs/RELEASES.md`
- `docs/REGISTRY.md`
- `docs/PLANS.md`

## Relevant Files and Directories

Create or update:

```txt
.github/workflows/
.changeset/
tooling/scripts/
package.json
docs/RELEASES.md
docs/SECURITY.md
```

Expected important files:

```txt
.github/workflows/ci.yml
.github/workflows/e2e.yml
.github/workflows/release-public.yml
.github/workflows/release-private.yml

.changeset/config.json

tooling/scripts/check-package-boundaries.ts
tooling/scripts/check-private-publish-config.ts
tooling/scripts/check-secrets.ts
```

## Architecture Notes

Public and private package releases must be separated.

Private package publishing must use the private registry.

Public package publishing must not include Pro packages.

CI must check that public packages do not import private packages.

CI must check that private packages have private `publishConfig`.

## Required CI Workflow

Create:

```txt
.github/workflows/ci.yml
```

It should run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

It should run on:

- pull requests;
- pushes to main.

## Required E2E Workflow

Create:

```txt
.github/workflows/e2e.yml
```

It should run:

```bash
pnpm test:e2e
```

If full E2E is not ready, create the workflow structure and document what must be completed.

## Required Public Release Workflow

Create:

```txt
.github/workflows/release-public.yml
```

This workflow should:

- install dependencies;
- run checks;
- build packages;
- publish public packages.

It should use:

```txt
NPM_PUBLIC_TOKEN
```

It should not publish:

```txt
@sua-marca-ui-pro/*
```

## Required Private Release Workflow

Create:

```txt
.github/workflows/release-private.yml
```

This workflow should:

- install dependencies;
- run checks;
- build packages;
- verify private package publishConfig;
- publish private packages to private registry.

It should use:

```txt
PRIVATE_REGISTRY_URL
PRIVATE_REGISTRY_TOKEN
```

It should publish only:

```txt
@sua-marca-ui-pro/*
```

## Changesets

Configure Changesets.

Required file:

```txt
.changeset/config.json
```

The config should support the monorepo package release process.

## Package Boundary Checks

Create a script to verify:

- public packages do not import `@sua-marca-ui-pro/*`;
- public packages do not contain Pro component directories;
- private packages have `publishConfig.registry`;
- private packages are not configured for public npm;
- React is not imported in Vue, Angular, Svelte or Web Components packages.

Suggested script:

```txt
tooling/scripts/check-package-boundaries.ts
```

## Private Publish Config Check

Create a script:

```txt
tooling/scripts/check-private-publish-config.ts
```

It should inspect private package `package.json` files and ensure:

```json
{
  "publishConfig": {
    "registry": "https://registry.sua-marca.com"
  }
}
```

or the configured private registry URL.

## Secret Check

Create a basic script:

```txt
tooling/scripts/check-secrets.ts
```

It should scan for common accidental secrets such as:

```txt
sk_live_
sk_test_
whsec_
ghp_
npm_
DATABASE_URL=
_authToken=
PRIVATE_REGISTRY_TOKEN=
NPM_PUBLIC_TOKEN=
```

The script should avoid flagging `.env.example` placeholder values as real secrets.

## Security Checks in CI

CI should run:

```bash
pnpm check:boundaries
pnpm check:private-publish
pnpm check:secrets
```

Add root scripts for these checks.

## Required Root Scripts

Add or verify:

```json
{
  "scripts": {
    "check:boundaries": "tsx tooling/scripts/check-package-boundaries.ts",
    "check:private-publish": "tsx tooling/scripts/check-private-publish-config.ts",
    "check:secrets": "tsx tooling/scripts/check-secrets.ts"
  }
}
```

If `tsx` is used, add it as a dev dependency.

## Implementation Milestones

### Milestone 1: Changesets

Configure Changesets for package versioning.

### Milestone 2: CI Workflow

Create the main CI workflow.

### Milestone 3: Safety Scripts

Create package boundary, private publish and secret check scripts.

### Milestone 4: Release Workflows

Create public and private release workflows.

### Milestone 5: E2E Workflow

Create E2E workflow.

### Milestone 6: Verification

Run local checks and update docs.

## Step-by-Step Tasks

1. Add Changesets config.
2. Add CI workflow.
3. Add E2E workflow.
4. Add public release workflow.
5. Add private release workflow.
6. Add package boundary check script.
7. Add private publish config check script.
8. Add secret check script.
9. Add root scripts for security checks.
10. Ensure CI runs security checks.
11. Update release docs if needed.
12. Run verification commands.
13. Update this plan’s Progress section.
14. Move this plan to completed only if acceptance criteria pass.

## Progress

- [x] Changesets configured
- [x] CI workflow created
- [x] E2E workflow created
- [x] Public release workflow created
- [x] Private release workflow created
- [x] Package boundary check script created
- [x] Private publish config check script created
- [x] Secret check script created
- [x] Root security scripts added
- [x] CI runs security scripts
- [x] Release docs updated
- [x] Security docs updated
- [x] Build verified
- [x] Lint verified
- [x] Typecheck verified
- [x] Tests verified
- [x] Boundary checks verified
- [x] Private publish checks verified
- [x] Secret checks verified

## Decision Log

### Decision: Separate Public and Private Release Workflows

Reason:

Public and private packages have different registry targets and safety requirements. Separating workflows reduces the risk of accidentally publishing paid packages publicly.

### Decision: Add Package Boundary Checks

Reason:

The core business model depends on Pro code not leaking into public packages.

### Decision: Add Secret Scan Script

Reason:

This project handles billing, registry and publishing credentials. Accidental secret commits must be caught early.

## Risks

- Custom safety scripts may need refinement as package structure evolves.
- Release workflows require correct GitHub secrets.
- Private registry availability can affect private package publishing.
- Changesets configuration may need adjustment for mixed public/private registries.

## Verification Commands

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check:boundaries
pnpm check:private-publish
pnpm check:secrets
```

If GitHub Actions cannot be run locally, inspect workflow syntax and document any assumptions.

## Acceptance Criteria

This plan is complete when:

- CI workflow exists;
- E2E workflow exists;
- public release workflow exists;
- private release workflow exists;
- Changesets is configured;
- package boundary script exists;
- private publish config script exists;
- secret check script exists;
- CI runs security checks;
- public release workflow does not publish private packages;
- private release workflow publishes only private packages;
- private packages require private registry configuration;
- public packages do not import private packages;
- build, lint, typecheck, tests and security checks pass.

### Decision: Secret scanning excludes documentation samples

Reason:

Documentation intentionally contains safe examples like `_authToken=USER_TOKEN` and token prefixes. The scanner targets executable/config files to reduce false positives while still protecting real credentials.
