# Brand

## Placeholder Brand

The placeholder product name is:

```txt
Sua Marca UI
```

The placeholder package scopes are:

```txt
@sua-marca-ui
@sua-marca-ui-pro
```

The placeholder CSS and Web Component prefix is:

```txt
sm
```

These names can be changed before launch.

## Naming System

### Public packages

Public packages use:

```txt
@sua-marca-ui/*
```

Examples:

```txt
@sua-marca-ui/react
@sua-marca-ui/vue
@sua-marca-ui/tokens
```

### Private packages

Private packages use:

```txt
@sua-marca-ui-pro/*
```

Examples:

```txt
@sua-marca-ui-pro/react
@sua-marca-ui-pro/vue
@sua-marca-ui-pro/templates
```

### CSS variables

CSS variables use:

```txt
--sm-*
```

Examples:

```txt
--sm-color-primary-500
--sm-radius-md
--sm-spacing-4
```

### CSS classes

CSS classes use:

```txt
sm-*
```

Examples:

```txt
sm-button
sm-card
sm-input
```

### Web Components

Web Components use:

```txt
<sm-*>
```

Examples:

```html
<sm-button>Save</sm-button>
<sm-input></sm-input>
<sm-card></sm-card>
```

## Visual Direction

The design system should feel:

- clean;
- modern;
- professional;
- developer-focused;
- suitable for SaaS dashboards;
- suitable for internal tools;
- suitable for modern web applications.

## Design Principles

Components should be:

- accessible;
- predictable;
- composable;
- themeable;
- framework-friendly;
- production-ready;
- documented.

## Theme Principles

Use tokens as the source of truth.

Avoid hardcoded visual values inside framework components.

Prefer:

```css
color: var(--sm-color-primary-500);
border-radius: var(--sm-radius-md);
```

Avoid:

```css
color: #2563eb;
border-radius: 8px;
```

unless defining the token itself.

## Default Style

Default components should use:

- rounded corners;
- visible focus states;
- clear contrast;
- subtle shadows;
- neutral backgrounds;
- strong primary actions;
- predictable spacing.

## Accessibility

The brand must not sacrifice usability for aesthetics.

Every component should consider:

- keyboard interaction;
- focus visibility;
- semantic markup;
- screen reader support;
- disabled states;
- color contrast.

## Naming Before Launch

Before launching publicly, replace placeholders:

- `Sua Marca UI`;
- `sua-marca-ui`;
- `sua-marca-ui-pro`;
- `sm`.

Update:

- package names;
- docs;
- registry scope;
- CSS variables if needed;
- Web Component prefix;
- landing page copy;
- dashboard copy.