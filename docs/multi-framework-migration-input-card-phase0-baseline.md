# Fase 0 — Baseline de migração (`Input` e `Card`)

Este documento registra os artefatos executados da Fase 0 do plano de migração.

## 0.1 Inventário de comportamento e visual

## Input — matriz de estados (baseline atual)

| Estado | Cobertura atual | Evidência |
|---|---|---|
| default | Sim | Story `Default` |
| hover | Parcial (CSS) | Classe `.sm-input` |
| focus (pointer) | Parcial (focus-visible sem origem) | Classe `:focus-visible` |
| focus-visible (keyboard) | Sim (sem separação pointer/keyboard) | Classe `:focus-visible` |
| invalid + focus | Sim | Story `Invalid` + `.sm-input--error:focus-visible` |
| disabled | Sim | Story `Disabled` |
| com/sem label | Não implementado no adapter atual | Gap para Fase 1+ |
| com/sem mensagem de erro | Não implementado no adapter atual | Gap para Fase 1+ |

## Card — matriz de estados (baseline atual)

| Estado | Cobertura atual | Evidência |
|---|---|---|
| default | Sim | Story `Default` |
| hover ativo | Não implementado | Gap para Fase 1+ |
| hover inativo | Sim (estado único) | Story `Default` |
| com/sem onClick (interativo/não interativo) | Não implementado no estilo base | Gap para Fase 1+ |
| dark mode | Dependente de token/classe global | Gap de validação visual |

## 0.2 Baseline visual

- Stories baseline adicionadas/atualizadas em Storybook para React (`Input` e `Card`).
- Referência de captura manual por estado:
  - `React/Input`: `Default`, `Small`, `Large`, `Invalid`, `Disabled`.
  - `React/Card`: `Default`, `WithContent`, `Clickable`.
- Tolerância inicial de regressão visual proposta:
  - **Layout/spacing:** 0px de regressão aceitável em snapshots.
  - **Cor/sombra/ring:** diferença visual pequena permitida apenas quando houver ajuste intencional de token semântico.

## 0.3 Baseline funcional

Eventos esperados para migração:

- Input:
  - `focus`
  - `blur`
  - `input/change`
- Card:
  - `click` (quando interativo)

Requisitos de acessibilidade para migração:

- `aria-invalid` quando estado inválido.
- Associação `label` -> `for/id` quando label estiver presente (a implementar na evolução de API).
- Foco visível por teclado preservado.
- `disabled` sem perda de semântica de formulário.

## Resultado da Fase 0

- Baseline visual e funcional documentada.
- Gaps explícitos para execução das fases seguintes sem ambiguidade.
