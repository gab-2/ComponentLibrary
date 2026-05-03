# UI Migration Final Report (ExecPlan 008)

Date: 2026-05-03

## Phase 5 execution summary

- Cutover strategy used: **gradual by app** (marketing → docs → dashboard).
- Rollout implementation status:
  - Marketing: migrated to Next.js App Router + Tailwind.
  - Docs: migrated to Next.js App Router + Tailwind with server-side Pro gating.
  - Dashboard: migrated to Next.js App Router + Tailwind with token management UX.
- Legacy UI entrypoints removed:
  - `apps/marketing/src/server.ts`
  - `apps/docs/src/server.ts`
  - `apps/dashboard/src/server.ts`
- Legacy migration adapter endpoints cleaned up:
  - Removed `/api/legacy/marketing` and `/api/legacy/docs`.
  - Renamed dashboard token proxy from `/api/legacy/dashboard/tokens` to `/api/dashboard/tokens`.

## Validation status

Completed in this environment:
- `pnpm check:boundaries` ✅
- `pnpm check:private-publish` ✅
- `pnpm check:secrets` ✅

Blocked by environment dependency/install constraints:
- `pnpm lint` ⚠️ (missing optional Turbo binary `@turbo/linux-64`)
- App tests relying on Rollup optional binary ⚠️ (`@rollup/rollup-linux-x64-gnu` missing)

## Security and architecture review

- Backend entitlement remains source of truth for Pro access.
- No runtime license check was introduced in installed components.
- Free/Pro separation remains package-level and physical.
- Private docs gating remains server-side.
- Security headers configured on migrated web apps.

## Follow-up recommended

1. Re-run `pnpm install` in an environment with registry/optional binaries available.
2. Execute `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
3. Execute dashboard E2E: `pnpm --filter @sua-marca-ui/dashboard test:e2e`.
4. Attach evidence logs/screenshots to release checklist.
