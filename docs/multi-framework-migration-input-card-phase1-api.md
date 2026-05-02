# Fase 1 — Contrato canônico de API (`Input` e `Card`)

Este documento define a API canônica multi-framework para os componentes `Input` e `Card`, além da estratégia de controle por framework.

## 1.1 Input — contrato canônico

## Props canônicas

| Prop           | Tipo                   | Padrão           | Descrição                                                                                               |
| -------------- | ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `label`        | `string`               | `undefined`      | Texto do rótulo visível associado ao campo.                                                             |
| `error`        | `string`               | `undefined`      | Mensagem de erro abaixo do campo.                                                                       |
| `size`         | `"sm" \| "md" \| "lg"` | `"md"`           | Escala visual do input.                                                                                 |
| `disabled`     | `boolean`              | `false`          | Desabilita interação e edição.                                                                          |
| `invalid`      | `boolean`              | `false`          | Estado de invalidez explícito. Quando `error` estiver presente, `invalid` deve ser tratado como `true`. |
| `id`           | `string`               | `auto/undefined` | Identificador para associação com `label`.                                                              |
| `placeholder`  | `string`               | `""`             | Texto auxiliar interno.                                                                                 |
| `value`        | `string`               | depende do modo  | Valor controlado.                                                                                       |
| `defaultValue` | `string`               | `""`             | Valor inicial em modo não-controlado.                                                                   |

## Eventos canônicos

| Evento         | Assinatura canônica      | Objetivo                      |
| -------------- | ------------------------ | ----------------------------- |
| `focus`        | `(event) => void`        | Entrada de foco no campo.     |
| `blur`         | `(event) => void`        | Saída de foco do campo.       |
| `input/change` | `(value, event) => void` | Notificar alteração de valor. |

## Regras comportamentais

- `aria-invalid` deve refletir `invalid || Boolean(error)`.
- Se `label` existir, deve existir associação `label -> for/id`.
- Placeholder não substitui label.
- Em `disabled`, não deve haver interação nem mudança de valor.

## Estratégia de controle por framework

- **React**
  - Controlled: `value` + `onChange`.
  - Uncontrolled: `defaultValue`.
- **Vue**
  - Controlled idiomático: `v-model` (`modelValue` + `update:modelValue`).
  - Uncontrolled: `:modelValue` opcional com estado local apenas quando necessário.
- **Angular**
  - Controlled idiomático: `@Input() value` + `@Output() valueChange`.
  - Compatível com forms (`ControlValueAccessor`) em fase posterior.
- **Svelte**
  - Controlled idiomático: `bind:value`.
  - Uncontrolled: `value` inicial quando não bindado.

## 1.2 Card — contrato canônico

## Props canônicas

| Prop                | Tipo      | Padrão              | Descrição                                               |
| ------------------- | --------- | ------------------- | ------------------------------------------------------- |
| `hover`             | `boolean` | `false`             | Ativa estilo de hover.                                  |
| `interactive`       | `boolean` | `false`             | Marca semântica/visual de interação (cursor e estados). |
| `className`/`class` | `string`  | `""`                | Extensão de estilos do consumidor.                      |
| `as` (opcional)     | `string`  | `"div"`/`"article"` | Elemento de renderização quando suportado.              |

## Eventos canônicos

| Evento  | Assinatura canônica | Objetivo                                                          |
| ------- | ------------------- | ----------------------------------------------------------------- |
| `click` | `(event) => void`   | Interação primária quando componente estiver interativo/clicável. |

## Regras comportamentais

- `interactive=true` deve aplicar affordance visual (cursor e feedback).
- `hover=true` habilita transição visual em borda/sombra.
- Sem `interactive`, o card permanece semântico e não sugere ação.

## Estratégia por framework

- **React:** `onClick`, `className`, children.
- **Vue:** `@click`, `class`, slots.
- **Angular:** `(click)`, `class`, `ng-content`.
- **Svelte:** `on:click`, `class`, slots.

## 1.3 Critério de paridade de API

Para considerar a Fase 1 concluída:

- Props canônicas documentadas para Input e Card.
- Eventos canônicos documentados para Input e Card.
- Estratégia de controle documentada para React, Vue, Angular e Svelte.
- Regras de acessibilidade mínimas documentadas.
