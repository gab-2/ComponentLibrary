# Private Registry

## Overview

The private registry protects paid packages.

It is the main technical access-control layer for Pro components.

Paid packages must not be distributed through public npm.

The registry must allow installation only when the user has:

- a valid registry token;
- an active Pro subscription or Lifetime license;
- package access entitlement;
- a token that has not been revoked.

## Package Scopes

Public packages use:

```txt
@sua-marca
```

Private paid packages use:

```txt
@sua-marca-pro
```

## Public Packages

These packages should be published publicly:

```txt
@sua-marca/tokens
@sua-marca/styles
@sua-marca/core
@sua-marca/icons
@sua-marca/react
@sua-marca/vue
@sua-marca/angular
@sua-marca/svelte
@sua-marca/web-components
```

## Private Packages

These packages should be published only to the private registry:

```txt
@sua-marca-pro/react
@sua-marca-pro/vue
@sua-marca-pro/angular
@sua-marca-pro/svelte
@sua-marca-pro/templates
```

## Local Registry URL

For local development:

```txt
http://localhost:4873
```

## Production Registry URL

For production:

```txt
https://registry.sua-marca.com
```

## User `.npmrc`

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

## Install Commands

React Pro:

```bash
pnpm add @sua-marca-pro/react
```

Vue Pro:

```bash
pnpm add @sua-marca-pro/vue
```

Angular Pro:

```bash
pnpm add @sua-marca-pro/angular
```

Svelte Pro:

```bash
pnpm add @sua-marca-pro/svelte
```

## Registry Token Rules

Registry tokens must follow these rules:

- only authenticated users can create tokens;
- only users with Pro or Lifetime access can create tokens;
- Free users cannot create Pro registry tokens;
- raw token is shown only once;
- raw token is never stored;
- token hash is stored;
- token prefix is stored;
- tokens can be revoked;
- revoked tokens cannot access packages;
- tokens should track `lastUsedAt`;
- token authorization should check current entitlement status.

## Token Format

Suggested raw token format:

```txt
smr_live_<random-secret>
```

For local development:

```txt
smr_dev_<random-secret>
```

The stored token prefix can be something like:

```txt
smr_live_abcd
```

Only the prefix should be displayed after creation.

## Authorization Endpoint

The registry should call the API to authorize access.

Endpoint:

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

## Denial Reasons

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

## Authorization Rules

Access is allowed when:

- token exists;
- token is not revoked;
- token is not expired;
- user exists;
- user has active Pro or Lifetime entitlement;
- requested package is private and allowed for the user's plan.

Access is denied when:

- token is missing;
- token is invalid;
- token is revoked;
- token is expired;
- user has no active Pro or Lifetime entitlement;
- package does not exist;
- user does not have access to that package.

## Registry Token API

The platform API should expose:

```txt
POST   /registry/tokens
GET    /registry/tokens
DELETE /registry/tokens/:id
POST   /registry/authorize
```

## Create Token

### `POST /registry/tokens`

Input:

```json
{
  "name": "MacBook Pro"
}
```

Response:

```json
{
  "id": "token_id",
  "name": "MacBook Pro",
  "token": "smr_dev_raw_token_shown_once",
  "prefix": "smr_dev_abcd",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

Important:

The `token` field should only be returned once when the token is created.

## List Tokens

### `GET /registry/tokens`

Response:

```json
[
  {
    "id": "token_id",
    "name": "MacBook Pro",
    "prefix": "smr_dev_abcd",
    "lastUsedAt": null,
    "revokedAt": null,
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

Do not return raw tokens.

## Revoke Token

### `DELETE /registry/tokens/:id`

Expected behavior:

- mark token as revoked;
- do not physically delete the token record;
- write audit log.

Response:

```json
{
  "success": true
}
```

## Package Configuration

Private packages must include `publishConfig`.

Example:

```json
{
  "name": "@sua-marca-pro/react",
  "publishConfig": {
    "registry": "https://registry.sua-marca.com"
  }
}
```

For local testing, `.npmrc` can override the registry URL.

## Registry Implementation

The initial implementation can use Verdaccio or an equivalent self-hosted npm registry foundation.

The implementation should be structured so the registry authorization layer can be replaced or extended later.

The registry service must be isolated in:

```txt
apps/registry
```

## Local Testing Flow

1. Start local services.
2. Seed a Pro user.
3. Log in as Pro user.
4. Generate registry token.
5. Configure `.npmrc`.
6. Publish local Pro package to local registry.
7. Install Pro package in a test project.
8. Revoke token.
9. Try installing again.
10. Confirm authorization fails.

## Expected Local `.npmrc`

```txt
@sua-marca-pro:registry=http://localhost:4873
//localhost:4873/:_authToken=USER_TOKEN
```

## Security Requirements

- Raw tokens must never be stored.
- Token hash must use a secure hash.
- Token comparison must be safe.
- Token revocation must take effect immediately.
- Registry authorization must not trust the package manager blindly.
- Private packages must never be published publicly.
- Registry logs should not expose raw tokens.
- Audit logs should record token creation and revocation.