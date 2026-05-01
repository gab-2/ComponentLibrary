# ExecPlan: Monorepo Foundation

## Purpose

Create the foundational monorepo structure for the SaaS platform and component library system.

This plan establishes the repository layout, workspace configuration, shared tooling, Docker setup, TypeScript configuration and initial app/package scaffolding.

The goal is to create a stable foundation for all future implementation plans.

## Scope

This plan includes:

- pnpm workspace setup;
- Turborepo setup;
- root package scripts;
- base TypeScript configuration;
- ESLint configuration package;
- Tailwind configuration package;
- initial app directories;
- initial package directories;
- Docker Compose setup;
- PostgreSQL local service;
- placeholder registry local service;
- basic CI-ready command structure;
- initial README updates if needed.

## Non-goals

This plan does not implement:

- full billing logic;
- Stripe integration;
- full private registry authorization;
- complete UI components;
- complete docs site;
- complete dashboard;
- full release workflows;
- all framework adapters.

Those are handled by later ExecPlans.

## Relevant Documentation

Read before implementation:

- `AGENTS.md`
- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/PLANS.md`
- `docs/SECURITY.md`
- `docs/RELEASES.md`

## Relevant Files and Directories

Create or update:

```txt
package.json
pnpm-workspace.yaml
turbo.json
tsconfig.json
.eslintrc or eslint.config.*
.prettierrc
docker-compose.yml

apps/
  marketing/
  dashboard/
  docs/
  api/
  registry/
  storybook/

packages/
  config-typescript/
  config-eslint/
  config-tailwind/
  database/
  billing/
  auth/
  entitlement/
  registry-client/
  ui-internal/
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

tooling/
  scripts/

docker/
```

## Architecture Notes

This repository must be a monorepo.

Use pnpm workspaces and Turborepo.

Apps live under:

```txt
apps/
```

Packages live under:

```txt
packages/
```

The repository must support future deployment of multiple apps and services.

Do not implement private package logic in this plan beyond scaffolding.

Do not put paid code into public packages.

## Implementation Milestones

### Milestone 1: Workspace and Turborepo

Set up:

- root `package.json`;
- `pnpm-workspace.yaml`;
- `turbo.json`;
- base scripts.

Required scripts:

```txt
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm db:migrate
pnpm db:seed
```

### Milestone 2: Shared Config Packages

Create:

```txt
packages/config-typescript
packages/config-eslint
packages/config-tailwind
```

Each should contain a minimal working configuration that other packages/apps can extend.

### Milestone 3: App Scaffolding

Create minimal app structures for:

```txt
apps/marketing
apps/dashboard
apps/docs
apps/api
apps/registry
apps/storybook
```

Each app should have:

- `package.json`;
- basic source directory;
- placeholder scripts for `dev`, `build`, `lint`, `typecheck`, `test` where applicable.

### Milestone 4: Package Scaffolding

Create minimal package structures for all required packages.

Each package should have:

- `package.json`;
- `src/index.ts` where applicable;
- `tsconfig.json`;
- placeholder build script.

### Milestone 5: Docker Compose

Create Docker Compose setup for local development.

At minimum include:

- PostgreSQL;
- local registry service placeholder or Verdaccio;
- optional Mailpit or equivalent for local email testing.

### Milestone 6: Verification

Run the verification commands and fix failures.

## Step-by-Step Tasks

1. Ensure root package manager is pnpm.
2. Configure pnpm workspaces.
3. Configure Turborepo tasks.
4. Add base TypeScript configuration.
5. Add Prettier configuration.
6. Add ESLint configuration.
7. Create app directories.
8. Create package directories.
9. Add placeholder package manifests.
10. Add Docker Compose.
11. Add local database service.
12. Add local registry service or placeholder.
13. Add documentation notes if commands differ.
14. Run install, lint, typecheck and build.
15. Update this plan’s Progress section.
16. Move this plan to completed only if acceptance criteria pass.

## Progress

- [ ] Root workspace configured
- [ ] Turborepo configured
- [ ] Base TypeScript config added
- [ ] ESLint config added
- [ ] Prettier config added
- [ ] App directories created
- [ ] Package directories created
- [ ] Config packages created
- [ ] Docker Compose created
- [ ] PostgreSQL local service configured
- [ ] Registry local service scaffolded
- [ ] Root scripts verified
- [ ] Build verified
- [ ] Lint verified
- [ ] Typecheck verified

## Decision Log

### Decision: Use pnpm workspaces and Turborepo

Reason:

The project contains multiple apps and packages that need coordinated builds, dependency management and caching.

### Decision: Use separate apps and packages

Reason:

The platform includes web apps, backend services, package libraries and shared tooling. Separate directories improve scaling and maintainability.

## Risks

- Tooling can become too complex if initial configuration is over-engineered.
- Some app frameworks may need additional configuration in later plans.
- Placeholder app scripts may need refinement as real implementations are added.

## Verification Commands

Run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
```

If Docker Compose is added:

```bash
docker compose up -d
docker compose ps
docker compose down
```

## Acceptance Criteria

This plan is complete when:

- `pnpm install` works;
- `pnpm lint` runs;
- `pnpm typecheck` runs;
- `pnpm build` runs;
- Turborepo is configured;
- all required app directories exist;
- all required package directories exist;
- Docker Compose includes PostgreSQL;
- Docker Compose includes a registry service or scaffold;
- the repository structure matches the architecture docs.