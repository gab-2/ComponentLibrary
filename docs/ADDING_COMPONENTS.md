# Adding Components

## Overview

This document explains how to add new components to the design system.

The project supports:

- shared tokens;
- shared styles;
- shared core logic;
- framework-specific adapters;
- free public components;
- paid private Pro components.

## Main Rule

Do not add paid component source code to public packages.

Free components go in public packages.

Pro components go in private packages.

Correct:

```txt
packages/react/Button
packages/react-pro/DataTable
```

Incorrect:

```txt
packages/react/Button
packages/react/DataTable
```

if `DataTable` is a paid Pro component.

## Component Architecture

Every component should follow this structure where possible:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework adapter
```

Not every simple component needs complex core logic, but all components should use shared tokens and styles where possible.

## Adding a Free Component

Example: adding a free `Button`.

### 1. Add styles

Create a CSS file in:

```txt
packages/styles/src/components/button.css
```

Use CSS variables from tokens.

Example:

```css
.sm-button {
  border-radius: var(--sm-radius-md);
  padding: var(--sm-spacing-2) var(--sm-spacing-4);
}

.sm-button--primary {
  background: var(--sm-color-primary-500);
  color: white;
}
```

### 2. Add core helper

Create or update:

```txt
packages/core/src/components/button.ts
```

Example:

```ts
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export function getButtonClasses(options: ButtonClassOptions = {}) {
  const variant = options.variant ?? "primary";
  const size = options.size ?? "md";

  return [
    "sm-button",
    `sm-button--${variant}`,
    `sm-button--${size}`,
    options.disabled ? "sm-button--disabled" : null,
  ]
    .filter(Boolean)
    .join(" ");
}
```

### 3. Add React adapter

Create:

```txt
packages/react/src/components/Button/Button.tsx
```

Example:

```tsx
import type { ReactNode } from "react";
import {
  getButtonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@sua-marca/core";
import "@sua-marca/styles/button.css";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      className={getButtonClasses({ variant, size, disabled })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

Create:

```txt
packages/react/src/components/Button/index.ts
```

```ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
```

Export from:

```txt
packages/react/src/index.ts
```

```ts
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";
```

### 4. Add docs

Add documentation in the docs app.

Suggested route:

```txt
apps/docs/src/content/react/button.md
```

Include:

- overview;
- install;
- import;
- examples;
- props;
- accessibility notes.

### 5. Add Storybook story

Add:

```txt
apps/storybook/stories/react/Button.stories.tsx
```

Include:

- default;
- variants;
- sizes;
- disabled.

### 6. Add tests

Add unit tests where practical.

At minimum, test shared core logic.

Example:

```txt
packages/core/src/components/button.test.ts
```

## Adding a Pro Component

Example: adding a Pro `DataTable`.

### 1. Add shared core logic

Create:

```txt
packages/core/src/components/data-table.ts
```

Core logic may include:

- sorting helpers;
- filtering helpers;
- pagination helpers;
- selection state helpers;
- types.

### 2. Add shared styles

Create:

```txt
packages/styles/src/components/data-table.css
```

### 3. Add React Pro adapter

Create:

```txt
packages/react-pro/src/components/DataTable/DataTable.tsx
```

Export from:

```txt
packages/react-pro/src/components/DataTable/index.ts
packages/react-pro/src/index.ts
```

### 4. Do not export from Free package

Do not add this to:

```txt
packages/react/src/index.ts
```

### 5. Add private docs

Add docs in the Pro documentation area.

Suggested route:

```txt
apps/docs/src/content/react-pro/data-table.md
```

This page must be gated by entitlement.

### 6. Add Pro Storybook story

Add:

```txt
apps/storybook/stories/react-pro/DataTable.stories.tsx
```

### 7. Confirm private package configuration

The Pro package must have:

```json
{
  "name": "@sua-marca-pro/react",
  "publishConfig": {
    "registry": "https://registry.sua-marca.com"
  }
}
```

## Adding a Component to Vue

Use the same shared core and styles.

Create:

```txt
packages/vue/src/components/Button/Button.vue
packages/vue/src/components/Button/index.ts
```

The component should use Vue props, emits and slots.

Do not import React.

## Adding a Component to Angular

Use the same shared core and styles.

Create Angular library components under:

```txt
packages/angular/src/components/
```

Use:

- inputs;
- outputs;
- content projection;
- Angular-friendly APIs.

Do not import React.

## Adding a Component to Svelte

Use the same shared core and styles.

Create:

```txt
packages/svelte/src/components/Button/Button.svelte
packages/svelte/src/components/Button/index.ts
```

Use:

- exported props;
- slots;
- Svelte events.

Do not import React.

## Adding a Web Component

Create components under:

```txt
packages/web-components/src/components/
```

Web Components should use:

- CSS variables;
- shared styles where possible;
- standard custom element naming;
- attributes and properties;
- custom events where needed.

Example name:

```txt
sm-button
```

## Component Documentation Checklist

Each component should document:

- component name;
- Free or Pro status;
- supported frameworks;
- install command;
- import example;
- basic usage;
- variants;
- props;
- accessibility notes;
- related components.

## Component Story Checklist

Each Storybook story should include:

- default state;
- variants;
- sizes;
- disabled state;
- loading state if applicable;
- error state if applicable;
- realistic example.

## Component Test Checklist

Tests should cover:

- class helper output;
- default props;
- important states;
- accessibility-critical behavior;
- package exports when practical.

## Free Component Checklist

Before shipping a Free component:

- [ ] component is in public package;
- [ ] no Pro dependency is imported;
- [ ] styles use tokens;
- [ ] docs are public;
- [ ] Storybook story exists;
- [ ] package builds;
- [ ] exports are correct.

## Pro Component Checklist

Before shipping a Pro component:

- [ ] component is in private package;
- [ ] no Pro code is exported from Free package;
- [ ] private docs are gated;
- [ ] Storybook story exists;
- [ ] package has private `publishConfig`;
- [ ] package builds;
- [ ] exports are correct.