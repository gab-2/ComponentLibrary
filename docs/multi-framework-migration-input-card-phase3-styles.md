# Fase 3 — Styles compartilhados (`Input` e `Card`)

Implementação concluída da Fase 3 com classes canônicas e paridade de estado visual no layer de `packages/styles`.

## Entregas do Input

- Atualização de `.sm-input` para consumir tokens semânticos de componente:
  - `--sm-color-input-*`
  - `--sm-shadow-input`
- Suporte a estados canônicos:
  - `.sm-input--focused`
  - `.sm-input--focus-keyboard`
  - `.sm-input--error`
  - combinações de erro + foco
- Suporte visual complementar:
  - `::selection` com tokens
  - `caret-color` via token
- Classes de composição para adapter:
  - `.sm-input-label`
  - `.sm-input-error`

## Entregas do Card

- Base `.sm-card` atualizada com tokens semânticos e transições.
- Classe de hover canônica:
  - `.sm-card--hover`
- Classe de interatividade canônica:
  - `.sm-card--interactive`

## Qualidade

- Mantida padronização de nomenclatura `sm-*` e `--sm-*`.
- Removidos valores hardcoded relevantes para os estados principais de Input/Card.
- Base pronta para a Fase 4 (core headless) usar composição de classes canônicas.
