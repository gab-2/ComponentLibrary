# Fase 4 — Core headless (`Input` e `Card`)

## Entregas

- `packages/core/src/components/input.ts`
  - Novo contrato `InputClassOptions` com `focused` e `focusOrigin`.
  - `getInputClass(...)` atualizado para classes canônicas de foco e invalidez.
  - Novo utilitário `getInputAriaInvalid(...)`.
  - Novo utilitário agnóstico `createFocusOriginTracker()` para teclado/ponteiro/programático.
- `packages/core/src/components/card.ts`
  - `getCardClass(...)` agora aceita `{ hover, interactive }`.

## Testes

- `packages/core/tests/classes.test.ts` atualizado para cobrir:
  - matriz de classes do `Input` (size, invalid, focused, focus keyboard);
  - matriz de classes do `Card` (hover/interativo);
  - `getInputAriaInvalid(...)`;
  - `createFocusOriginTracker()`.

## Resultado

- Core pronto para adapters finos com composição de classes e estado centralizado.
