# ExecPlan: Design System Packages

## Purpose

Create the core design system package architecture.

This plan establishes the shared packages and the initial React free and React Pro packages.

The goal is to create a scalable component library foundation where free and paid packages are physically separated, while sharing tokens, styles and headless logic.

## Scope

This plan includes:

- `packages/tokens`;
- `packages/styles`;
- `packages/core`;
- `packages/icons`;
- `packages/react`;
- `packages/react-pro`;
- initial free React components;
- initial Pro React components;
- package build configuration;
- package exports;
- TypeScript declarations;
- public/private package separation;
- Storybook-ready component structure.

## Non-goals

This plan does not implement:

- Vue components;
- Angular components;
- Svelte components;
- Web Components;
- billing;
- registry authorization;
- dashboard UI;
- documentation site pages;
- release workflows.

These are handled by later ExecPlans.

## Relevant Documentation

Read before implementation:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/COMPONENTS.md`
- `docs/MULTI_FRAMEWORK.md`
- `docs/ADDING_COMPONENTS.md`
- `docs/RELEASES.md`
- `design/tokens.json`
- `design/brand.md`

## Relevant Files and Directories

Create or update:

```txt
packages/tokens/
packages/styles/
packages/core/
packages/icons/
packages/react/
packages/react-pro/
```

Expected important files:

```txt
packages/tokens/package.json
packages/tokens/src/index.ts
packages/tokens/src/tokens.ts
packages/tokens/src/tokens.css
packages/tokens/src/tokens.json

packages/styles/package.json
packages/styles/src/index.css
packages/styles/src/components/button.css
packages/styles/src/components/input.css
packages/styles/src/components/card.css
packages/styles/src/components/badge.css
packages/styles/src/components/alert.css
packages/styles/src/components/modal.css
packages/styles/src/components/data-table.css

packages/core/package.json
packages/core/src/index.ts
packages/core/src/components/button.ts
packages/core/src/components/input.ts
packages/core/src/components/card.ts
packages/core/src/components/data-table.ts

packages/react/package.json
packages/react/src/index.ts
packages/react/src/components/Button/
packages/react/src/components/Input/
packages/react/src/components/Card/
packages/react/src/components/Badge/
packages/react/src/components/Alert/
packages/react/src/components/Modal/

packages/react-pro/package.json
packages/react-pro/src/index.ts
packages/react-pro/src/components/DataTable/
packages/react-pro/src/components/DatePicker/
packages/react-pro/src/components/CommandMenu/
```

## Architecture Notes

All packages must follow this architecture:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework adapters
```

The React package must not contain Pro source code.

The React Pro package may depend on:

- `@sua-marca-ui/react`;
- `@sua-marca-ui/core`;
- `@sua-marca-ui/styles`;
- `@sua-marca-ui/tokens`.

Public package:

```txt
@sua-marca-ui/react
```

Private package:

```txt
@sua-marca-ui-pro/react
```

## Package Build Requirements

Each package should support:

- `build`;
- `lint`;
- `typecheck`;
- `test` where practical.

Library packages should output:

- ESM;
- CJS if configured;
- TypeScript declarations.

Package manifests should define:

- `main`;
- `module`;
- `types`;
- `exports`;
- `files`.

React packages should define:

```json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

React and ReactDOM must not be bundled into the package.

## Implementation Milestones

### Milestone 1: Tokens Package

Implement `packages/tokens`.

It should provide:

- TypeScript tokens;
- CSS variables;
- JSON token export.

Required outputs:

```txt
@sua-marca-ui/tokens
@sua-marca-ui/tokens/css
@sua-marca-ui/tokens/json
```

### Milestone 2: Styles Package

Implement `packages/styles`.

It should provide:

- base CSS;
- component CSS files;
- token-based styles;
- per-component exports where practical.

Required styles:

- Button;
- Input;
- Card;
- Badge;
- Alert;
- Modal;
- DataTable.

### Milestone 3: Core Package

Implement `packages/core`.

It should provide:

- shared types;
- class helpers;
- basic component logic;
- DataTable helpers.

Required helpers:

- `getButtonClasses`;
- `getInputClasses`;
- `getCardClasses`;
- `getBadgeClasses`;
- `getAlertClasses`;
- `getModalClasses`;
- `createDataTableState` or equivalent helpers;
- pagination helper;
- sorting helper.

Do not include React JSX in this package.

### Milestone 4: Icons Package

Implement `packages/icons`.

It should include a simple tree-shakeable icon structure.

Initial icons can be minimal placeholders, such as:

- CheckIcon;
- XIcon;
- ChevronDownIcon;
- SearchIcon.

### Milestone 5: React Free Package

Implement `packages/react`.

Initial components:

- Button;
- Input;
- Card;
- Badge;
- Alert;
- Modal.

Requirements:

- use shared core helpers;
- use shared styles;
- expose TypeScript props;
- export components from `src/index.ts`;
- do not import from `@sua-marca-ui-pro/*`.

### Milestone 6: React Pro Package

Implement `packages/react-pro`.

Initial components:

- DataTable;
- DatePicker or Calendar;
- CommandMenu or MultiSelect.

Requirements:

- private package name;
- private `publishConfig`;
- use shared core helpers;
- use shared styles;
- may depend on public React package;
- do not export from public package.

### Milestone 7: Tests and Verification

Add basic tests for:

- core class helpers;
- DataTable sorting;
- DataTable pagination;
- package exports where practical.

Run verification commands.

## Step-by-Step Tasks

1. Create package manifests for tokens, styles, core, icons, react and react-pro.
2. Configure builds using Vite library mode or tsup.
3. Implement tokens based on `design/tokens.json`.
4. Generate or write CSS variables.
5. Implement shared component styles.
6. Implement core helper functions.
7. Implement initial icon exports.
8. Implement React free components.
9. Implement React Pro components.
10. Ensure React package does not import Pro package.
11. Ensure React Pro package has private `publishConfig`.
12. Add tests for core helpers.
13. Run lint, typecheck, test and build.
14. Update this plan’s Progress section.
15. Move this plan to completed only if acceptance criteria pass.

## Progress

- [x] Tokens package created
- [x] Token CSS variables created
- [x] Token JSON export created
- [x] Styles package created
- [x] Button styles created
- [x] Input styles created
- [x] Card styles created
- [x] Badge styles created
- [x] Alert styles created
- [x] Modal styles created
- [x] DataTable styles created
- [x] Core package created
- [x] Button core helper created
- [x] Input core helper created
- [x] Card core helper created
- [x] DataTable helpers created
- [x] Icons package created
- [x] React free package created
- [x] React Button created
- [x] React Input created
- [x] React Card created
- [x] React Badge created
- [x] React Alert created
- [x] React Modal created
- [x] React Pro package created
- [x] React Pro DataTable created
- [x] React Pro DatePicker or Calendar created
- [x] React Pro CommandMenu or MultiSelect created
- [x] Private package publishConfig added
- [x] Core tests added
- [x] Build verified
- [x] Lint verified
- [x] Typecheck verified
- [x] Tests verified

## Decision Log

### Decision: Separate React Free and React Pro packages

Reason:

Paid source code must never be included inside public packages. Separate packages make access control, publishing and review safer.

### Decision: Put shared visual language in tokens and styles

Reason:

Multiple frameworks need a consistent design language without duplicating hardcoded values.

### Decision: Put reusable logic in core

Reason:

DataTable, Select, CommandMenu and other complex components need logic that can be shared across React, Vue, Angular and Svelte.


### Decision: Add shared DataTable stylesheet in packages/styles

Reason:

The Pro React DataTable should consume design tokens from the shared styles layer to preserve the required `tokens -> styles -> core -> adapters` architecture.

## Risks

- Over-sharing logic may make framework adapters awkward.
- Under-sharing logic may cause duplication across frameworks.
- Package export configuration can break consumers if not tested.
- Private package configuration must be correct to avoid accidental public release.

## Verification Commands

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Optional package-level checks:

```bash
pnpm --filter @sua-marca-ui/core test
pnpm --filter @sua-marca-ui/react build
pnpm --filter @sua-marca-ui-pro/react build
```

## Acceptance Criteria

This plan is complete when:

- `@sua-marca-ui/tokens` exists and builds;
- `@sua-marca-ui/styles` exists and builds;
- `@sua-marca-ui/core` exists and builds;
- `@sua-marca-ui/icons` exists and builds;
- `@sua-marca-ui/react` exists and builds;
- `@sua-marca-ui-pro/react` exists and builds;
- React free package exports Button, Input, Card, Badge, Alert and Modal;
- React Pro package exports DataTable and at least two other Pro components;
- React package does not import from Pro package;
- Pro package has private `publishConfig`;
- core helpers have basic tests;
- build, lint, typecheck and tests pass.
### Decision: Implement React first as the reference adapter

Reason:

Following the planned sequence, we implemented tokens → styles → core and then React/React-Pro adapters first, so future Vue/Angular/Svelte/Web Components can reuse the same shared layers without importing React directly.
