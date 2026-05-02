# Releases

## Overview

This repository contains both public and private packages.

Public packages are published to the public npm registry.

Private Pro packages are published to the private registry.

The release process must prevent paid source code from being published publicly.

## Package Types

### Public Packages

Public packages:

```txt
@sua-marca-ui/tokens
@sua-marca-ui/styles
@sua-marca-ui/core
@sua-marca-ui/icons
@sua-marca-ui/react
@sua-marca-ui/vue
@sua-marca-ui/angular
@sua-marca-ui/svelte
@sua-marca-ui/web-components
```

These packages can be installed without private registry authentication.

### Private Packages

Private packages:

```txt
@sua-marca-ui-pro/react
@sua-marca-ui-pro/vue
@sua-marca-ui-pro/angular
@sua-marca-ui-pro/svelte
@sua-marca-ui-pro/templates
```

These packages must require private registry authentication.

## Versioning

Use semantic versioning.

Examples:

```txt
1.0.0 -> 1.0.1 patch fix
1.0.0 -> 1.1.0 new backwards-compatible feature
1.0.0 -> 2.0.0 breaking change
```

## Changesets

Use Changesets for versioning and changelog management.

Common commands:

```bash
pnpm changeset
pnpm version-packages
pnpm release
```

## Public Release Flow

Public packages should be published to npm.

Expected flow:

```txt
merge to main
      ↓
CI runs install, lint, typecheck, test, build
      ↓
Changesets versions packages
      ↓
Public packages publish to npm
      ↓
Docs update
```

## Private Release Flow

Private packages should be published to the private registry.

Expected flow:

```txt
merge to main
      ↓
CI runs install, lint, typecheck, test, build
      ↓
Changesets versions packages
      ↓
Private packages publish to private registry
      ↓
Pro docs update
```

## Publishing Rules

Private packages must include `publishConfig`.

Example:

```json
{
  "name": "@sua-marca-ui-pro/react",
  "publishConfig": {
    "registry": "https://registry.sua-marca.com"
  }
}
```

Public packages should not include private registry `publishConfig`.

## Required Root Scripts

The root `package.json` should include:

```json
{
  "scripts": {
    "build": "turbo build",
    "lint": "turbo lint",
    "test": "turbo test",
    "typecheck": "turbo typecheck",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "pnpm build && changeset publish",
    "publish:public": "pnpm build && changeset publish",
    "publish:private": "pnpm build && pnpm --filter \"@sua-marca-ui-pro/*\" publish --no-git-checks"
  }
}
```

## CI Release Checks

Before releasing, CI should verify:

- install works;
- lint passes;
- typecheck passes;
- tests pass;
- builds pass;
- private packages contain private registry `publishConfig`;
- public packages do not import from private packages;
- free packages do not include Pro component source;
- package exports are valid;
- package files are limited to intended build output.

## Package Build Requirements

Each package should define:

- `main`;
- `module`;
- `types`;
- `exports`;
- `files`;
- build script;
- typecheck script where applicable.

Example:

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

## React Package Requirements

React packages should use:

```json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

React and ReactDOM should not be bundled into the library.

## Private Package Safety Checks

Before publishing private packages:

- confirm package name starts with `@sua-marca-ui-pro/`;
- confirm `publishConfig.registry` points to private registry;
- confirm no public npm token is used;
- confirm package is not marked for public npm publish;
- confirm package does not expose internal secrets;
- confirm package build contains only intended files.

## Public Package Safety Checks

Before publishing public packages:

- confirm package name starts with `@sua-marca-ui/`;
- confirm package does not import from `@sua-marca-ui-pro/*`;
- confirm package does not include Pro source code;
- confirm package can be installed without private registry token.

## Local Publish Testing

For local registry testing:

1. Start local registry.
2. Build packages.
3. Publish a private package to local registry.
4. Configure `.npmrc`.
5. Install private package from a test project.
6. Revoke token.
7. Confirm install fails.

Local `.npmrc` example:

```txt
@sua-marca-pro:registry=http://localhost:4873
//localhost:4873/:_authToken=USER_TOKEN
```

## Release Documentation

Every release should update:

- changelog;
- docs if APIs changed;
- component examples if props changed;
- migration guide for breaking changes.

## Breaking Changes

Breaking changes require:

- major version bump;
- migration notes;
- docs update;
- examples update.

## Recommended GitHub Actions

Create workflows:

```txt
.github/workflows/ci.yml
.github/workflows/release-public.yml
.github/workflows/release-private.yml
.github/workflows/e2e.yml
```

## Secrets Needed in CI

Public release:

```txt
NPM_PUBLIC_TOKEN
```

Private release:

```txt
PRIVATE_REGISTRY_URL
PRIVATE_REGISTRY_TOKEN
```

Billing and app deployment may require additional secrets, but release workflows should not expose them to package builds unless needed.

## Rollback

If a package release is broken:

- publish a patch version fixing the issue;
- deprecate broken version if necessary;
- update docs;
- notify users if the issue impacts installation or runtime behavior.

For private packages, registry-level access may also be adjusted if needed.
## CI Workflows (ExecPlan 007)

Implemented workflows:

- `.github/workflows/ci.yml`
- `.github/workflows/e2e.yml`
- `.github/workflows/release-public.yml`
- `.github/workflows/release-private.yml`

### CI safety gates

CI now includes:

- `pnpm check:boundaries`
- `pnpm check:private-publish`
- `pnpm check:secrets`

### Public release safeguards

`release-public.yml` publishes only `@sua-marca-ui/*` and explicitly excludes `@sua-marca-ui-pro/*`.

### Private release safeguards

`release-private.yml` publishes only `@sua-marca-ui-pro/*` and requires:

- `PRIVATE_REGISTRY_URL`
- `PRIVATE_REGISTRY_TOKEN`
