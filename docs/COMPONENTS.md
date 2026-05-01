# Components

## Overview

This document defines the initial component catalog for the platform.

The project must support both free and paid components.

Free components are distributed through public packages.

Pro components are distributed through private packages.

Paid component source code must never be included in public packages.

## Component Architecture

Components must follow this architecture:

```txt
tokens
  -> styles
  -> core/headless logic
  -> framework adapters
```

Shared layers:

- `packages/tokens`
- `packages/styles`
- `packages/core`

Framework adapters:

- `packages/react`
- `packages/vue`
- `packages/angular`
- `packages/svelte`
- `packages/web-components`

Pro framework adapters:

- `packages/react-pro`
- `packages/vue-pro`
- `packages/angular-pro`
- `packages/svelte-pro`

## Naming Prefix

Use the placeholder brand prefix:

```txt
sm
```

Examples:

- CSS variables: `--sm-color-primary-500`
- CSS classes: `sm-button`
- Web Components: `<sm-button>`

This can be renamed later.

## Free Component Principles

Free components should be:

- broadly useful;
- simple enough to demonstrate the design system;
- production-quality;
- accessible by default;
- documented publicly;
- available in public packages.

## Pro Component Principles

Pro components should be:

- more complex;
- higher-value;
- harder to build from scratch;
- useful in real production apps;
- documented privately;
- available only through private packages.

## React Free Components

Package:

```txt
@sua-marca/react
```

Directory:

```txt
packages/react
```

Initial components:

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Badge
- Card
- Alert
- Modal
- Tabs
- Tooltip
- Spinner
- Avatar

## React Pro Components

Package:

```txt
@sua-marca-pro/react
```

Directory:

```txt
packages/react-pro
```

Initial components:

- DataTable
- DatePicker
- Calendar
- MultiSelect
- CommandMenu
- AdvancedModal
- Drawer
- FileUploader
- Kanban
- RichCombobox
- AdvancedTabs
- Stepper
- FormBuilder
- DashboardWidgets

## Vue Free Components

Package:

```txt
@sua-marca/vue
```

Directory:

```txt
packages/vue
```

Initial required components:

- Button
- Input
- Card

The Vue package should be structured so more components can be added later.

## Vue Pro Components

Package:

```txt
@sua-marca-pro/vue
```

Directory:

```txt
packages/vue-pro
```

Initial required Pro example:

- DataTable

The Vue Pro package should demonstrate the correct paid-package structure.

## Angular Free Components

Package:

```txt
@sua-marca/angular
```

Directory:

```txt
packages/angular
```

Initial required components:

- Button
- Input
- Card

The Angular package should be structured as a proper Angular library.

## Angular Pro Components

Package:

```txt
@sua-marca-pro/angular
```

Directory:

```txt
packages/angular-pro
```

Initial required Pro example:

- DataTable

The Angular Pro package should demonstrate the correct paid-package structure.

## Svelte Free Components

Package:

```txt
@sua-marca/svelte
```

Directory:

```txt
packages/svelte
```

Initial required components:

- Button
- Input
- Card

## Svelte Pro Components

Package:

```txt
@sua-marca-pro/svelte
```

Directory:

```txt
packages/svelte-pro
```

Initial required Pro example:

- DataTable

## Web Components

Package:

```txt
@sua-marca/web-components
```

Directory:

```txt
packages/web-components
```

Initial components:

- `sm-button`
- `sm-input`
- `sm-card`
- `sm-badge`
- `sm-alert`
- `sm-spinner`
- `sm-avatar`
- `sm-modal`

Web Components should be used for broad interoperability, especially for simple and medium-complexity components.

## React Button API

Example:

```tsx
import { Button } from "@sua-marca/react";

export function Example() {
  return (
    <Button variant="primary" size="md">
      Save
    </Button>
  );
}
```

Required props:

```ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
}
```

## DataTable Pro API

Example:

```tsx
import { DataTable } from "@sua-marca-pro/react";

export function Example() {
  return (
    <DataTable columns={columns} data={data} pagination sorting filtering />
  );
}
```

The initial DataTable does not need to match the complexity of mature table libraries, but it should be:

- typed;
- extensible;
- documented;
- suitable as a real starting point;
- located only in Pro packages.

## Styling Rules

Components should use:

- design tokens;
- CSS variables;
- shared classes where practical;
- accessible markup;
- predictable class names;
- minimal framework-specific styling duplication.

## Accessibility Rules

Components should be built with accessibility in mind.

Important considerations:

- keyboard navigation;
- focus states;
- ARIA attributes where needed;
- semantic HTML;
- disabled states;
- visible labels;
- screen reader support where practical.

## Documentation Requirements

Each component should eventually include:

- overview;
- install instructions;
- import example;
- usage examples;
- props table;
- accessibility notes;
- framework-specific examples;
- Free or Pro badge.

## Storybook Requirements

Each component should eventually include stories for:

- default state;
- variants;
- sizes;
- disabled state;
- loading state when applicable;
- error state when applicable;
- examples with realistic content.

## Free vs Pro Rule

Never import Pro components from Free packages.

Never re-export Pro components from Free packages.

Never include Pro source code in public package builds.