# ExecPlan: Private Registry

## Purpose

Implement the private npm registry access-control layer for paid packages.

This plan ensures that Pro packages can only be installed by users with valid Pro or Lifetime access.

The private registry is the main technical distribution control for paid components.

## Scope

This plan includes:

- private registry service setup;
- local registry support;
- token-based package installation authorization;
- registry token creation API;
- registry token listing API;
- registry token revocation API;
- registry authorization endpoint;
- token hashing;
- token prefix display;
- entitlement checks during install;
- package access rules;
- `.npmrc` documentation;
- local install testing workflow.

## Non-goals

This plan does not implement:

- Stripe billing itself;
- full dashboard UI;
- full Pro component implementation;
- full production infrastructure;
- release workflow automation.

Those are handled by other ExecPlans.

## Relevant Documentation

Read before implementation:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/REGISTRY.md`
- `docs/BILLING.md`
- `docs/SECURITY.md`
- `docs/RELEASES.md`

## Relevant Files and Directories

Create or update:

```txt
apps/registry/
apps/api/src/routes/registry.ts
packages/registry-client/
packages/entitlement/
packages/database/
docs/REGISTRY.md
.env.example
docker-compose.yml
```

Expected important files:

```txt
apps/registry/package.json
apps/registry/src/server.ts
apps/registry/src/authorize.ts
apps/registry/config/verdaccio.yaml

packages/registry-client/src/index.ts

apps/api/src/routes/registry.ts
```

## Architecture Notes

The private registry must not grant access based only on the presence of a token.

The token must be validated against current backend entitlement state.

Authorization must check:

- token validity;
- token revocation;
- token expiration if present;
- user existence;
- package existence;
- package visibility;
- user entitlement.

The registry should be built so Verdaccio or the registry implementation can be swapped later.

## Package Scope Rules

Public scope:

```txt
@sua-marca
```

Private scope:

```txt
@sua-marca-pro
```

Private packages:

```txt
@sua-marca-pro/react
@sua-marca-pro/vue
@sua-marca-pro/angular
@sua-marca-pro/svelte
@sua-marca-pro/templates
```

## Registry Token Rules

Registry tokens:

- can only be created by Pro or Lifetime users;
- cannot be created by Free users;
- are shown raw only once;
- are stored only as hashes;
- display only prefix after creation;
- can be revoked;
- update `lastUsedAt` when used successfully;
- must fail immediately after revocation.

## Authorization Endpoint

Implement:

```txt
POST /registry/authorize
```

Input:

```json
{
  "token": "smr_dev_example",
  "packageName": "@sua-marca-pro/react",
  "action": "install"
}
```

Allowed response:

```json
{
  "allowed": true,
  "userId": "user_id",
  "plan": "PRO_MONTHLY",
  "reason": null
}
```

Denied response:

```json
{
  "allowed": false,
  "userId": null,
  "plan": null,
  "reason": "NO_ACTIVE_PLAN"
}
```

Suggested denial reasons:

- `MISSING_TOKEN`
- `INVALID_TOKEN`
- `REVOKED_TOKEN`
- `EXPIRED_TOKEN`
- `PACKAGE_NOT_FOUND`
- `PACKAGE_NOT_PRIVATE`
- `NO_ACTIVE_PLAN`
- `NO_PACKAGE_ACCESS`
- `UNKNOWN_ERROR`

## Registry Token API

Implement:

```txt
POST   /registry/tokens
GET    /registry/tokens
DELETE /registry/tokens/:id
POST   /registry/authorize
```

## Create Token Behavior

`POST /registry/tokens`

Rules:

- user must be authenticated;
- user must have `registry.tokens.create` entitlement;
- token is generated securely;
- raw token is returned once;
- hash is stored;
- prefix is stored;
- audit log is written.

## List Tokens Behavior

`GET /registry/tokens`

Rules:

- user must be authenticated;
- return token metadata only;
- do not return raw token;
- include name, prefix, lastUsedAt, revokedAt and createdAt.

## Revoke Token Behavior

`DELETE /registry/tokens/:id`

Rules:

- user must be authenticated;
- user can only revoke their own token;
- token should be marked revoked, not physically deleted;
- audit log is written;
- revoked token must fail authorization.

## Registry Service Behavior

The registry service must:

- receive package install requests;
- extract registry token;
- identify requested package;
- call API authorization endpoint;
- allow or deny package access;
- avoid logging raw token;
- return clear unauthorized/forbidden response.

## Local `.npmrc`

Local development:

```txt
@sua-marca-pro:registry=http://localhost:4873
//localhost:4873/:_authToken=USER_TOKEN
```

Production:

```txt
@sua-marca-pro:registry=https://registry.sua-marca.com
//registry.sua-marca.com/:_authToken=USER_TOKEN
```

## Implementation Milestones

### Milestone 1: Token API

Implement registry token creation, listing and revocation.

### Milestone 2: Authorization Endpoint

Implement `POST /registry/authorize`.

### Milestone 3: Registry Client Package

Implement `packages/registry-client` for shared registry authorization calls.

### Milestone 4: Registry Service

Create `apps/registry`.

Use Verdaccio or an equivalent registry foundation.

Configure it for local private package distribution.

Integrate authorization behavior with the API.

### Milestone 5: Package Publish Config

Ensure private packages include private registry `publishConfig`.

### Milestone 6: Local Install Test

Document and test local install flow.

## Step-by-Step Tasks

1. Implement secure token generation.
2. Implement token hashing.
3. Implement token prefix extraction.
4. Implement token creation endpoint.
5. Implement token list endpoint.
6. Implement token revoke endpoint.
7. Implement authorization endpoint.
8. Add denial reasons.
9. Update `lastUsedAt` on allowed authorization.
10. Create registry client package.
11. Configure local registry service.
12. Connect registry service to API authorization.
13. Add private package publishConfig checks.
14. Add local `.npmrc` instructions.
15. Add tests for token rules.
16. Run verification commands.
17. Update this plan’s Progress section.
18. Move this plan to completed only if acceptance criteria pass.

## Progress

- [ ] Secure token generation implemented
- [ ] Token hashing implemented
- [ ] Token prefix implemented
- [ ] Token creation endpoint implemented
- [ ] Token list endpoint implemented
- [ ] Token revocation endpoint implemented
- [ ] Authorization endpoint implemented
- [ ] Denial reasons implemented
- [ ] `lastUsedAt` update implemented
- [ ] Registry client package created
- [ ] Registry service created
- [ ] Local registry configured
- [ ] Registry authorization integrated
- [ ] Private package publishConfig verified
- [ ] Local `.npmrc` documented
- [ ] Pro token install succeeds
- [ ] Lifetime token install succeeds
- [ ] Free token creation fails
- [ ] Revoked token install fails
- [ ] Invalid token install fails
- [ ] Build verified
- [ ] Typecheck verified
- [ ] Tests verified

## Decision Log

### Decision: Use Registry Tokens Instead of Runtime License Checks

Reason:

Frontend package code cannot be reliably protected after installation. Registry access controls distribution and future updates.

### Decision: Store Only Token Hashes

Reason:

Registry tokens are credentials. If the database leaks, raw tokens should not be recoverable.

### Decision: Use Backend Entitlements During Authorization

Reason:

Payment state can change after token creation. Authorization must check current access, not only token existence.

## Risks

- Verdaccio plugin integration may require custom implementation details.
- Package managers may cache packages locally after successful installation.
- Token revocation cannot remove packages already downloaded.
- Local registry setup may differ from production deployment.

## Verification Commands

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If local registry is implemented:

```bash
docker compose up -d
docker compose ps
```

Manual verification:

```bash
pnpm add @sua-marca-pro/react
```

using a valid Pro or Lifetime token.

Then revoke token and confirm access fails.

## Acceptance Criteria

This plan is complete when:

- Pro user can generate registry token;
- Lifetime user can generate registry token;
- Free user cannot generate Pro registry token;
- raw token is shown only once;
- raw token is never stored;
- token hash is stored;
- token prefix is displayed;
- token revocation works;
- revoked token fails authorization;
- invalid token fails authorization;
- active Pro token can access private package;
- Lifetime token can access private package;
- inactive subscription token fails authorization;
- private registry service exists;
- `.npmrc` instructions are documented;
- private packages have private `publishConfig`;
- build, typecheck and tests pass.

### Decision: Static-only validation in this environment

Reason:

pnpm bootstrap is proxy-blocked here; full runtime checks must run in local/CI.
