# Multi-Framework Architecture

## Overview

The platform must support multiple frontend frameworks without trying to reuse React components directly.

Supported targets:

- React;
- Vue;
- Angular;
- Svelte;
- Web Components.

The correct architecture is:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework-specific adapters
```

## Why React Components Should Not Be Reused Everywhere

React components are tied to React’s runtime, JSX model, hooks and rendering behavior.

Using React components directly inside Vue, Angular or Svelte would create:

- unnecessary runtime dependencies;
- worse developer experience;
- awkward APIs;
- harder SSR behavior;
- framework integration issues;
- form integration problems;
- event handling inconsistencies.

Each framework should receive idiomatic components.

## Shared Layers

### `packages/tokens`

Design decisions that are independent of framework.

Includes:

- colors;
- typography;
- spacing;
- radius;
- shadows;
- z-index;
- breakpoints;
- motion.

Outputs:

- TypeScript;
- CSS variables;
- JSON.

### `packages/styles`

Framework-agnostic CSS.

Includes:

- base styles;
- component CSS classes;
- CSS variables;
- accessibility states;
- focus states;
- component variants.

### `packages/core`

Headless logic and pure utilities.

Includes:

- class builders;
- shared component types;
- state machines when useful;
- filtering helpers;
- sorting helpers;
- pagination helpers;
- accessibility helpers.

Must not contain framework-specific component code.

## Framework Adapter Packages

Framework adapters should use the shared layers.

### React

Package:

```txt
@sua-marca/react
```

Private package:

```txt
@sua-marca-pro/react
```

React components should be written in TSX.

They should use:

- React props;
- React refs where appropriate;
- idiomatic event handlers;
- React-compatible controlled/uncontrolled patterns.

### Vue

Package:

```txt
@sua-marca/vue
```

Private package:

```txt
@sua-marca-pro/vue
```

Vue components should be written as Vue Single File Components where practical.

They should use:

- props;
- emits;
- slots;
- composition API;
- idiomatic Vue patterns.

### Angular

Package:

```txt
@sua-marca/angular
```

Private package:

```txt
@sua-marca-pro/angular
```

Angular components should be structured as a proper Angular library.

They should use:

- inputs;
- outputs;
- content projection;
- Angular module or standalone component patterns;
- Angular-friendly forms integration where practical.

### Svelte

Package:

```txt
@sua-marca/svelte
```

Private package:

```txt
@sua-marca-pro/svelte
```

Svelte components should use:

- `.svelte` files;
- exported props;
- slots;
- Svelte events;
- idiomatic Svelte reactivity.

### Web Components

Package:

```txt
@sua-marca/web-components
```

Web Components should be used for broad interoperability.

They are especially suitable for:

- Button;
- Input;
- Badge;
- Card;
- Alert;
- Spinner;
- Avatar;
- basic Modal.

Web Components may use Lit or a similar lightweight base.

## Recommended Implementation Order

1. Build tokens.
2. Build shared styles.
3. Build core logic.
4. Build React free components.
5. Build React Pro components.
6. Build Web Components for simple components.
7. Build Vue adapter.
8. Build Svelte adapter.
9. Build Angular adapter.

This order works because React already exists in the current component source, while shared layers prepare the project for other frameworks.

## Component API Consistency

Component APIs should be similar across frameworks where possible, but idiomatic for each framework.

For example, React:

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

Svelte:

```svelte
<Button variant="primary" size="md">
  Save
</Button>
```

Angular:

```html
<sm-button variant="primary" size="md"> Save </sm-button>
```

Web Component:

```html
<sm-button variant="primary" size="md"> Save </sm-button>
```

## Shared Styling

All frameworks should use the same tokens and CSS variables.

Example:

```css
:root {
  --sm-color-primary-500: #2563eb;
  --sm-radius-md: 8px;
  --sm-spacing-4: 16px;
}
```

Framework components should not hardcode theme values when a token exists.

## Core Logic Example

The core package may expose:

```ts
export function getButtonClasses(options: {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}) {
  return [
    "sm-button",
    `sm-button--${options.variant ?? "primary"}`,
    `sm-button--${options.size ?? "md"}`,
    options.disabled ? "sm-button--disabled" : null,
  ]
    .filter(Boolean)
    .join(" ");
}
```

React can use this.

Vue can use this.

Angular can use this.

Svelte can use this.

Web Components can use this.

## Pro Components Across Frameworks

Complex Pro components should share as much headless logic as practical.

Examples:

- DataTable sorting;
- DataTable pagination;
- filtering;
- selection state;
- date utilities;
- command menu filtering;
- multi-select state.

The UI adapter should remain framework-specific.

## Web Components vs Native Adapters

Web Components are useful for broad compatibility, but they should not replace all native adapters.

Use Web Components for:

- simple components;
- interoperability;
- embedding in unknown environments.

Use native framework adapters for:

- advanced form integration;
- complex stateful components;
- SSR-sensitive components;
- framework-specific developer experience;
- deeply interactive Pro components.

## Documentation Requirements

Each framework should have documentation for:

- installation;
- setup;
- CSS import;
- token usage;
- component usage;
- Pro package access;
- examples;
- known limitations.

## Testing Requirements

Test shared logic in `packages/core`.

Test framework components in their own package where practical.

At minimum:

- core utilities should have unit tests;
- React components should have unit tests or stories;
- examples should compile;
- package exports should be verified.

## Anti-Patterns

Do not:

- import React into Vue package;
- import React into Angular package;
- import React into Svelte package;
- put Pro code inside Free packages;
- hardcode design values in each framework;
- duplicate complex logic unnecessarily;
- expose private packages through public docs without gating.