# Running the project locally

## 1) Prerequisites

- Node.js >= 20.11
- pnpm >= 9
- One of these infrastructure options:
  - **Option A (recommended): Docker**
  - **Option B: Manual PostgreSQL + Manual Verdaccio**

## 2) First-time setup

```bash
pnpm install
pnpm setup:env
```

This creates `.env` from `.env.example` if it does not exist.

## 3) Infrastructure

### Option A — Docker (recommended)

```bash
pnpm services:up
pnpm services:doctor
```

Expected doctor output:
- `docker_cli: ok`
- `postgres_localhost_5432: reachable`
- `registry_localhost_4873: reachable`

### Option B — No Docker

Run services manually:

1. PostgreSQL on `localhost:5432` with database `sua_ui_platform` and credentials from `.env`.
2. Verdaccio on `localhost:4873`.

Then validate:

```bash
pnpm services:doctor
```

## 4) Database

```bash
pnpm db:migrate
pnpm db:seed
```

If these fail with `Can't reach database server at localhost:5432`, the DB service is not up yet.

## 5) Verification commands (Phase 0 done)

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:migrate
pnpm db:seed
```

## 6) Start apps (example)

```bash
pnpm dev
```

Or run specific apps with workspace filters.


## 7) UI apps after migration

- Marketing UI: `http://localhost:3001`
- Dashboard UI: `http://localhost:3002`
- Docs UI: `http://localhost:3003`
- API: `http://localhost:4000`
- Registry: `http://localhost:4873`

### Troubleshooting

- If `pnpm lint` fails with missing Turbo binary, reinstall dependencies in an environment that allows optional binaries.
- If Vitest fails with missing `@rollup/rollup-linux-x64-gnu`, reinstall dependencies without stripping optional packages.
