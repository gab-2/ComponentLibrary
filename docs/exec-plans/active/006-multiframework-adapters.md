# ExecPlan: Multi-Framework Adapters

## Purpose

Implement the multi-framework component architecture for Vue, Angular, Svelte and Web Components.

This plan extends the design system beyond React while preserving the correct scalable architecture:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework-specific adapters
```

The goal is to provide idiomatic framework packages without reusing React components directly.

## Scope

This plan includes:

- `packages/vue`;
- `packages/vue-pro`;
- `packages/angular`;
- `packages/angular-pro`;
- `packages/svelte`;
- `packages/svelte-pro`;
- `packages/web-components`;
- initial free components for each framework;
- initial Pro example component for each framework;
- shared usage of tokens, styles and core logic;
- package exports;
- build scripts;
- documentation examples.

## Non-goals

This plan does not implement:

- full parity for every React component;
- full production-grade DataTable for every framework;
- billing;
- private registry implementation;
- dashboard UI;
- release workflows.

The goal is a correct, scalable structure with working examples.

## Relevant Documentation

Read before implementation:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/MULTI_FRAMEWORK.md`
- `docs/COMPONENTS.md`
- `docs/ADDING_COMPONENTS.md`
- `docs/RELEASES.md`
- `design/brand.md`

## Relevant Files and Directories

Create or update:

```txt
packages/vue/
packages/vue-pro/
packages/angular/
packages/angular-pro/
packages/svelte/
packages/svelte-pro/
packages/web-components/
apps/docs/
apps/storybook/
```

Expected important files:

```txt
packages/vue/package.json
packages/vue/src/index.ts
packages/vue/src/components/Button/Button.vue
packages/vue/src/components/Input/Input.vue
packages/vue/src/components/Card/Card.vue

packages/vue-pro/package.json
packages/vue-pro/src/index.ts
packages/vue-pro/src/components/DataTable/DataTable.vue

packages/angular/package.json
packages/angular/src/index.ts
packages/angular/src/components/button.component.ts
packages/angular/src/components/input.component.ts
packages/angular/src/components/card.component.ts

packages/angular-pro/package.json
packages/angular-pro/src/index.ts
packages/angular-pro/src/components/data-table.component.ts

packages/svelte/package.json
packages/svelte/src/index.ts
packages/svelte/src/components/Button.svelte
packages/svelte/src/components/Input.svelte
packages/svelte/src/components/Card.svelte

packages/svelte-pro/package.json
packages/svelte-pro/src/index.ts
packages/svelte-pro/src/components/DataTable.svelte

packages/web-components/package.json
packages/web-components/src/index.ts
packages/web-components/src/components/sm-button.ts
packages/web-components/src/components/sm-input.ts
packages/web-components/src/components/sm-card.ts
```

## Architecture Notes

Do not import React into:

- `packages/vue`;
- `packages/vue-pro`;
- `packages/angular`;
- `packages/angular-pro`;
- `packages/svelte`;
- `packages/svelte-pro`;
- `packages/web-components`.

These packages should use:

- `@sua-marca/tokens`;
- `@sua-marca/styles`;
- `@sua-marca/core`.

Each framework package should be idiomatic.

## Required Public Packages

Create or complete:

```txt
@sua-marca/vue
@sua-marca/angular
@sua-marca/svelte
@sua-marca/web-components
```

## Required Private Packages

Create or complete:

```txt
@sua-marca-pro/vue
@sua-marca-pro/angular
@sua-marca-pro/svelte
```

Private packages must include private `publishConfig`.

## Vue Requirements

Vue Free package:

```txt
@sua-marca/vue
```

Components:

- Button;
- Input;
- Card.

Vue Pro package:

```txt
@sua-marca-pro/vue
```

Components:

- DataTable example.

Vue components should use:

- props;
- slots;
- emits where needed;
- Composition API where useful.

## Angular Requirements

Angular Free package:

```txt
@sua-marca/angular
```

Components:

- Button;
- Input;
- Card.

Angular Pro package:

```txt
@sua-marca-pro/angular
```

Components:

- DataTable example.

Angular components should use:

- Inputs;
- Outputs;
- content projection;
- Angular-friendly APIs.

## Svelte Requirements

Svelte Free package:

```txt
@sua-marca/svelte
```

Components:

- Button;
- Input;
- Card.

Svelte Pro package:

```txt
@sua-marca-pro/svelte
```

Components:

- DataTable example.

Svelte components should use:

- exported props;
- slots;
- Svelte events where needed.

## Web Components Requirements

Web Components package:

```txt
@sua-marca/web-components
```

Components:

- `sm-button`;
- `sm-input`;
- `sm-card`;
- `sm-badge`;
- `sm-alert`;
- `sm-spinner`;
- `sm-avatar`;
- `sm-modal`.

Web Components can use Lit or a similar lightweight base.

They should use:

- custom elements;
- attributes;
- properties;
- slots;
- custom events when needed;
- CSS variables.

## Component API Consistency

Keep APIs consistent where practical.

Button examples:

React:

```tsx
<Button variant="primary" size="md">
  Save
</Button>
```

Vue:

```vue
<SmButton variant="primary" size="md">
  Save
</SmButton>
```

Angular:

```html
<sm-button variant="primary" size="md"> Save </sm-button>
```

Svelte:

```svelte
<Button variant="primary" size="md">
  Save
</Button>
```

Web Component:

```html
<sm-button variant="primary" size="md"> Save </sm-button>
```

## Implementation Milestones

### Milestone 1: Vue Packages

Implement Vue Free and Vue Pro package structure.

Add Button, Input, Card and DataTable example.

### Milestone 2: Angular Packages

Implement Angular Free and Angular Pro package structure.

Add Button, Input, Card and DataTable example.

### Milestone 3: Svelte Packages

Implement Svelte Free and Svelte Pro package structure.

Add Button, Input, Card and DataTable example.

### Milestone 4: Web Components Package

Implement Web Components package.

Add required custom elements.

### Milestone 5: Docs Examples

Update docs with usage examples for each framework.

### Milestone 6: Verification

Run lint, typecheck, tests and build.

## Step-by-Step Tasks

1. Create Vue package manifests.
2. Implement Vue Button, Input and Card.
3. Implement Vue Pro DataTable.
4. Add private publishConfig to Vue Pro.
5. Create Angular package manifests.
6. Implement Angular Button, Input and Card.
7. Implement Angular Pro DataTable.
8. Add private publishConfig to Angular Pro.
9. Create Svelte package manifests.
10. Implement Svelte Button, Input and Card.
11. Implement Svelte Pro DataTable.
12. Add private publishConfig to Svelte Pro.
13. Create Web Components package.
14. Implement `sm-button`.
15. Implement `sm-input`.
16. Implement `sm-card`.
17. Implement remaining basic Web Components.
18. Add docs examples.
19. Ensure no non-React package imports React.
20. Run verification commands.
21. Update this plan’s Progress section.
22. Move this plan to completed only if acceptance criteria pass.

## Progress

- [ ] Vue package created
- [ ] Vue Button created
- [ ] Vue Input created
- [ ] Vue Card created
- [ ] Vue Pro package created
- [ ] Vue Pro DataTable created
- [ ] Vue Pro private publishConfig added
- [ ] Angular package created
- [ ] Angular Button created
- [ ] Angular Input created
- [ ] Angular Card created
- [ ] Angular Pro package created
- [ ] Angular Pro DataTable created
- [ ] Angular Pro private publishConfig added
- [ ] Svelte package created
- [ ] Svelte Button created
- [ ] Svelte Input created
- [ ] Svelte Card created
- [ ] Svelte Pro package created
- [ ] Svelte Pro DataTable created
- [ ] Svelte Pro private publishConfig added
- [ ] Web Components package created
- [ ] `sm-button` created
- [ ] `sm-input` created
- [ ] `sm-card` created
- [ ] `sm-badge` created
- [ ] `sm-alert` created
- [ ] `sm-spinner` created
- [ ] `sm-avatar` created
- [ ] `sm-modal` created
- [ ] Docs examples updated
- [ ] Verified no React imports in non-React packages
- [ ] Build verified
- [ ] Lint verified
- [ ] Typecheck verified
- [ ] Tests verified

## Decision Log

### Decision: Use Native Adapters Per Framework

Reason:

Each framework has different runtime, rendering model, events and developer expectations. Native adapters provide better developer experience and maintainability.

### Decision: Share Core Logic Instead of Components

Reason:

Shared headless logic avoids duplication without forcing one framework’s component model onto another.

### Decision: Use Web Components for Interoperability

Reason:

Web Components are useful for simple reusable components across many environments, but advanced framework integrations still need native adapters.

## Risks

- Angular package setup may require more tooling than other packages.
- Web Components event APIs may differ from framework expectations.
- Full component parity across frameworks will take time.
- Complex Pro components may need more framework-specific implementation than simple components.

## Verification Commands

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Optional checks:

```bash
grep -R "from \"react\"" packages/vue packages/angular packages/svelte packages/web-components || true
grep -R "from 'react'" packages/vue packages/angular packages/svelte packages/web-components || true
```

## Acceptance Criteria

This plan is complete when:

- Vue package exists and exports Button, Input and Card;
- Vue Pro package exists and exports DataTable example;
- Angular package exists and exports Button, Input and Card;
- Angular Pro package exists and exports DataTable example;
- Svelte package exists and exports Button, Input and Card;
- Svelte Pro package exists and exports DataTable example;
- Web Components package exists and defines at least `sm-button`, `sm-input` and `sm-card`;
- Pro framework packages have private `publishConfig`;
- non-React packages do not import React;
- docs include usage examples;
- build, lint, typecheck and tests pass.

### Decision: Static-only validation in this environment

Reason:

pnpm bootstrap is proxy-blocked here; full runtime checks must run in local/CI.
