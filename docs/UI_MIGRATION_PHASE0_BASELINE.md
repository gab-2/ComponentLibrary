# UI Migration Phase 0 baseline checklist (ExecPlan 008)

This document records Phase 0 completion artifacts for `docs/exec-plans/active/008-ui-migration-nextjs-tailwind.md`.

## Baseline confirmed

- Runtime baseline:
  - Node `>=20.11.0`
  - pnpm `>=9.0.0`
  - Source: `package.json` engines.
- Root orchestration baseline:
  - `pnpm dev`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` scripts exist.

## Phase 0 outputs

- Routing standard selected: Next.js App Router.
- API consumption strategy selected: Server Components for reads + server-side mutation handlers.
- Error/loading/empty-state policy documented.
- Auth/session boundary documented.
- Env-variable policy and migration flags documented.
- Tailwind + token styling policy documented.
- Progressive rollout order documented.

## References

- `docs/adr/0008-ui-migration-phase0-decisions.md`
- `docs/exec-plans/active/008-ui-migration-nextjs-tailwind.md`
