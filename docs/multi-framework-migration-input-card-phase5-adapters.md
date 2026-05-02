# Fase 5 — Adapters por framework (`Input` e `Card`)

## Entregas React

- `Input` React com:
  - `label`, `error`, `size`, `invalid`, `id`;
  - controle de origem de foco (teclado/ponteiro) via `core`;
  - classes canônicas do `core`;
  - `aria-invalid` derivado por `getInputAriaInvalid(...)`;
  - `sm-input-label` e `sm-input-error`.
- `Card` React com:
  - `hover` e `interactive`;
  - inferência de interatividade via `onClick`;
  - classes canônicas do `core`.

## Entregas Vue

- `Input` Vue com `v-model`, `label/error`, focus tracking, `aria-invalid` e classes do `core`.
- `Card` Vue com `hover`, `interactive`, classes do `core` e emissão de `click`.

## Entregas Angular

- `SmInputComponent` com API e estado equivalentes para `label/error/size/invalid/focus` + classes do `core`.
- `SmCardComponent` com `hover`, `interactive` e classes do `core`.

## Entregas Svelte

- `Input` Svelte com props canônicas, `bind:value`, focus tracking, `aria-invalid`, classes do `core`.
- `Card` Svelte com `hover`, `interactive` e classes do `core`.

## Resultado

- Adapters de React, Vue, Angular e Svelte alinhados ao contrato canônico e ao layer `core`.
