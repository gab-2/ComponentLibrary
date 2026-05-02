# Registry Setup

## Local development

```txt
@sua-marca-ui-pro:registry=http://localhost:4873
//localhost:4873/:_authToken=USER_TOKEN
```

## Production

```txt
@sua-marca-ui-pro:registry=https://registry.sua-marca-ui.com
//registry.sua-marca-ui.com/:_authToken=USER_TOKEN
```

## Token lifecycle

1. Generate token in dashboard (`POST /dashboard/tokens`).
2. Copy raw token once.
3. Add token to `.npmrc`.
4. Revoke with `DELETE /dashboard/tokens/:id` when needed.
