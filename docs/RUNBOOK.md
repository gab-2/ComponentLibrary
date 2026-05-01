# Runbook

## Local setup
1. Configure environment variables from `.env.example`.
2. Start services with Docker Compose (Postgres + Verdaccio).
3. Install and run workspace commands in a network-enabled environment.

## Publishing model
- Public packages (`@sua-marca/*`) go to public npm.
- Private packages (`@sua-marca-pro/*`) go to private registry only.
- `@sua-marca-pro/*` packages must include `publishConfig.registry`.

## Extending components
Follow architecture:

tokens -> styles -> core -> framework adapter

Do not place Pro source in public packages.

## Registry token operations
- Create token only for Pro/Lifetime.
- Store token hash and prefix only.
- Revoke token immediately when requested.
- Reject revoked token for installs.
