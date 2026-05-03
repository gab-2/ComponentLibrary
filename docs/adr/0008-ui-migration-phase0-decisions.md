# ADR 0008 — UI Migration Phase 0 decisions

## Status
Accepted — 2026-05-03

## Context
The repository currently exposes `marketing`, `dashboard` and `docs` through Fastify JSON endpoints. ExecPlan 008 starts a migration to real UI pages in React TSX + Tailwind while preserving API contracts and backend authorization/gating.

## Decision

### 1) Next.js routing standard
- Use **Next.js App Router** for all migrated apps.
- Use route groups for organization only (no URL impact).
- Keep URL contracts already used by product docs and external references.

### 2) API consumption strategy
- Prefer **Server Components** for read operations.
- Use **Server Actions** or route handlers for mutations that require secure server context.
- Keep `apps/api` as source of truth for auth, billing, entitlement and registry token operations.

### 3) Error / loading / empty-state UX
- Every page must define loading and empty-state behavior.
- Every mutation must define explicit success and error feedback.
- Errors from API must be mapped to typed UI states (e.g. `missing_email`, `forbidden`, `missing_entitlement`).

### 4) Auth/session boundary
- Dashboard pages are authenticated surfaces.
- Entitlement checks remain backend-side and never move to component runtime checks.
- Frontend can render CTA states, but final access control is always validated by API.

### 5) Environment variables policy
- `NEXT_PUBLIC_*` only for non-sensitive client data.
- Secrets remain server-only and never passed to browser bundles.
- Migration flags for progressive rollout:
  - `UI_MIGRATION_MARKETING`
  - `UI_MIGRATION_DOCS`
  - `UI_MIGRATION_DASHBOARD`

### 6) Styling policy
- Tailwind is the base utility layer.
- Design tokens remain source of truth (`packages/tokens`, `packages/styles`).
- Shared primitives should be extracted to `packages/ui-internal` only when reused across at least two apps.

### 7) Rollout safety
- Migrate one app at a time in this order: marketing → docs → dashboard.
- Keep temporary compatibility adapters when needed.
- Removal of legacy Fastify UI endpoints only after route parity + E2E coverage.

## Consequences
- Enables incremental migration with low blast radius.
- Preserves product/security constraints from AGENTS.
- Keeps paid/free gating centered on backend entitlements and private registry controls.
