# Theming (Fase 2)

A biblioteca usa tokens semânticos via CSS variables com suporte nativo a tema claro/escuro.

## Temas disponíveis

- `:root` / `[data-theme="light"]` → tema claro
- `[data-theme="dark"]` → tema escuro

## Como aplicar

Envolva seu app com atributo de tema:

```html
<html data-theme="light">
```

ou

```html
<html data-theme="dark">
```

## Override de tokens

Você pode sobrescrever apenas os tokens necessários no escopo desejado:

```css
[data-theme="light"] {
  --sm-color-bg-primary: #7c3aed;
  --sm-color-bg-primary-hover: #6d28d9;
  --sm-color-border-focus: #7c3aed;
}
```

## Motion e acessibilidade

A biblioteca reduz automaticamente animações quando `prefers-reduced-motion: reduce` está ativo, zerando as durações de motion tokens.
