# Plano técnico: migração de `Input` e `Card` (React + Tailwind -> multi-framework)

## Objetivo

Migrar os componentes `Input` e `Card` atualmente implementados em React + Tailwind para a arquitetura multi-framework do monorepo, preservando:

- paridade visual (light/dark, estados e interações);
- paridade comportamental (foco por teclado vs ponteiro, erro, disabled, hover);
- acessibilidade;
- separação de responsabilidades (`tokens -> styles -> core -> adapters`).

---

## Escopo

- Componentes alvo:
  - `Input`
  - `Card`
- Frameworks alvo:
  - React
  - Vue
  - Angular
  - Svelte
  - (opcional no ciclo 1) Web Components

---

## Princípios de implementação

- [x] Não duplicar regra de design em cada framework.
- [x] Não acoplar lógica comportamental ao React-only quando puder estar no `core`.
- [x] Usar tokens semânticos em vez de valores hardcoded por framework.
- [x] Manter API canônica entre frameworks (com adaptação idiomática apenas no binding).
- [x] Garantir que cada adapter seja “fino”: traduz props/eventos, não reimplementa regras centrais.

---

## Fase 0 — Descoberta e baseline

### 0.1 Inventário de comportamento e visual

- [x] Levantar matriz de estados do `Input`:
  - [x] default
  - [x] hover
  - [x] focus (pointer)
  - [x] focus-visible (keyboard)
  - [x] invalid + focus
  - [x] disabled
  - [x] com/sem label
  - [x] com/sem mensagem de erro
- [x] Levantar matriz de estados do `Card`:
  - [x] default
  - [x] hover ativo
  - [x] hover inativo
  - [x] com/sem onClick (interativo/não interativo)
  - [x] dark mode

### 0.2 Baseline visual

- [x] Criar stories de baseline dos componentes atuais (referência visual).
- [x] Capturar screenshots de referência por estado (light e dark).
- [x] Definir tolerância de regressão visual.

### 0.3 Baseline funcional

- [x] Documentar eventos esperados (`focus`, `blur`, `input/change`, `click`).
- [x] Documentar comportamento esperado de a11y:
  - [x] `aria-invalid`
  - [x] associação `label` -> `for/id`
  - [x] foco visível por teclado
  - [x] disabled sem quebra de semântica.

---

## Fase 1 — Contrato canônico dos componentes

## 1.1 API canônica do Input

- [x] Definir contrato cross-framework:
  - [x] `label?: string`
  - [x] `error?: string`
  - [x] `size?: "sm" | "md" | "lg"`
  - [x] `disabled?: boolean`
  - [x] `invalid?: boolean` (derivado de `error` quando aplicável)
  - [x] `id?: string`
  - [x] `placeholder?: string`
  - [x] eventos: focus, blur, input/change
- [x] Definir estratégia de controle:
  - [x] controlled/uncontrolled no React
  - [x] `v-model` no Vue
  - [x] input/output no Angular
  - [x] bind/value no Svelte

## 1.2 API canônica do Card

- [x] Definir contrato cross-framework:
  - [x] `hover?: boolean`
  - [x] `interactive?: boolean` (ou derivado de `onClick`)
  - [x] `className`/`class` extensível
  - [x] slot/children para conteúdo
- [x] Definir semântica de interação:
  - [x] cursor pointer quando interativo
  - [x] transição de borda/sombra quando hover ativo

## 1.3 Documentação da API

- [x] Atualizar docs de componentes (Input/Card) com:
  - [x] tabela de props
  - [x] tabela de eventos
  - [x] variações por framework

---

## Fase 2 — Tokens (design semântico)

## 2.1 Tokens do Input

- [x] Adicionar/revisar tokens para:
  - [x] fundo (light/dark)
  - [x] texto e placeholder
  - [x] borda default/focus/invalid
  - [x] ring focus pointer/keyboard
  - [x] sombra
  - [x] seleção e caret

## 2.2 Tokens do Card

- [x] Adicionar/revisar tokens para:
  - [x] superfície card (light/dark)
  - [x] borda default/hover
  - [x] sombra default/hover
  - [x] radius e spacing

## 2.3 Consistência de nomenclatura

- [x] Validar que nomes de tokens seguem padrão `--sm-*` sem ambiguidades.
- [x] Remover dependências de tokens inexistentes/inconsistentes.

---

## Fase 3 — Styles compartilhados (`packages/styles`)

## 3.1 CSS canônico do Input

- [x] Criar/ajustar classes:
  - [x] `.sm-input`
  - [x] `.sm-input--sm|md|lg`
  - [x] `.sm-input--invalid`
  - [x] `.sm-input--focused`
  - [x] `.sm-input--focus-keyboard`
  - [x] `.sm-input-label`
  - [x] `.sm-input-error`
- [x] Garantir paridade com visual Tailwind original:
  - [x] ring e transições
  - [x] cores dark/light
  - [x] sombras

## 3.2 CSS canônico do Card

- [x] Criar/ajustar classes:
  - [x] `.sm-card`
  - [x] `.sm-card--hover`
  - [x] `.sm-card--interactive`
- [x] Garantir paridade com visual Tailwind original:
  - [x] borda/hover
  - [x] sombra/hover
  - [x] transições e cursor

## 3.3 Qualidade de CSS

- [x] Evitar valores mágicos sem token correspondente.
- [x] Garantir que estados não se anulem entre si.
- [x] Verificar ordem/especificidade para não depender de hacks.

---

## Fase 4 — Core headless (`packages/core`)

## 4.1 Core do Input

- [x] Expandir `input.ts` com:
  - [x] tipos de estado (`focused`, `focusOrigin`, `invalid`, `disabled`, `size`)
  - [x] função de composição de classes canônicas
  - [x] helper para resolver estado de ring/focus
- [x] Criar utilitário agnóstico para origem de foco:
  - [x] keyboard (`Tab`)
  - [x] pointer (`pointerdown`)

## 4.2 Core do Card

- [x] Expandir `card.ts` com:
  - [x] `getCardClass({ hover, interactive })`
  - [x] composição previsível de classes

## 4.3 Testes unitários no Core

- [x] Testar matriz de classes do Input:
  - [x] combinação de size + invalid + focus origin
- [x] Testar matriz de classes do Card:
  - [x] `hover` e `interactive` ligados/desligados

---

## Fase 5 — Adapters por framework

## 5.1 React

- [x] `Input` React:
  - [x] manter `forwardRef`
  - [x] manter callbacks (`onFocus`, `onBlur`, `onPointerDown`)
  - [x] usar core para calcular classes/estado
  - [x] preservar `aria-invalid`, `disabled`, `id/label`
- [x] `Card` React:
  - [x] suportar hover/interativo
  - [x] usar core para classes

## 5.2 Vue

- [x] `Input` Vue:
  - [x] mapear `v-model`
  - [x] mapear eventos de foco/blur
  - [x] aplicar classes derivadas do core
- [x] `Card` Vue:
  - [x] props de hover/interativo
  - [x] slots preservados

## 5.3 Angular

- [x] `Input` Angular:
  - [x] inputs/outputs equivalentes
  - [x] classes do core
  - [x] suporte a estado invalid/focus
- [x] `Card` Angular:
  - [x] inputs de hover/interativo
  - [x] estrutura semântica equivalente

## 5.4 Svelte

- [x] `Input` Svelte:
  - [x] props exportadas
  - [x] bind/value/eventos
  - [x] classes do core
- [x] `Card` Svelte:
  - [x] props de hover/interativo
  - [x] slots equivalentes

## 5.5 Web Components (opcional ciclo 1)

- [x] Definir se Input/Card entram no mesmo ciclo.
- [x] Não entra no ciclo da Fase 5 (adiado por ser opcional).

---

## Fase 6 — Storybook e validação visual

## 6.1 Stories por framework

- [x] Input:
  - [x] default
  - [x] with label
  - [x] invalid
  - [x] disabled
  - [x] sizes
  - [x] dark mode
- [x] Card:
  - [x] default
  - [x] hover enabled
  - [x] interactive
  - [x] dark mode

## 6.2 Regressão visual

- [x] Comparar stories novos com baseline de referência.
- [x] Resolver diferenças acima da tolerância definida.

---

## Fase 7 — Testes e qualidade

## 7.1 Unitários

- [x] Core classes/state (Input/Card).
- [x] Regras de derivação `invalid` e focus origin.

## 7.2 Integração por framework

- [x] React: render + eventos.
- [x] Vue: v-model + eventos.
- [x] Angular: bindings.
- [x] Svelte: props e interações.

## 7.3 Acessibilidade

- [x] Input com label associado corretamente.
- [x] `aria-invalid` quando erro.
- [x] foco visível coerente com keyboard navigation.
- [x] Card interativo com semântica adequada (quando clicável).

---

## Fase 8 — Entrega incremental e governança

## 8.1 Versionamento e changelog

- [x] Registrar mudanças com Changesets.
- [x] Atualizar changelogs dos pacotes impactados.

## 8.2 Critérios de aceite final

- [x] Paridade visual comprovada nos 4 frameworks principais.
- [x] Paridade comportamental comprovada em testes/stories.
- [x] APIs documentadas.
- [x] Sem regressão de acessibilidade.
- [x] Build/lint/typecheck/test verdes.

---

## Mapa de arquivos a serem tocados (planejado)

- Tokens:
  - `packages/tokens/src/tokens.css`
- Styles:
  - `packages/styles/src/components/input.css`
  - `packages/styles/src/components/card.css`
- Core:
  - `packages/core/src/components/input.ts`
  - `packages/core/src/components/card.ts`
  - `packages/core/tests/*`
- React:
  - `packages/react/src/components/Input/Input.tsx`
  - `packages/react/src/components/Card/Card.tsx`
- Vue:
  - `packages/vue/src/components/Input/Input.vue`
  - `packages/vue/src/components/Card/Card.vue`
- Angular:
  - `packages/angular/src/components/input.component.ts`
  - `packages/angular/src/components/card.component.ts`
- Svelte:
  - `packages/svelte/src/components/Input.svelte`
  - `packages/svelte/src/components/Card.svelte`
- Storybook:
  - `apps/storybook/stories/**/*`
- Docs:
  - `apps/docs/src/content/components/input.md`
  - `apps/docs/src/content/components/modal.md` (se houver seção compartilhada de padrões)

---

## Riscos e mitigação

- [x] **Risco:** divergência visual entre frameworks.
  - **Mitigação:** snapshot visual por estado + revisão de tokens.
- [x] **Risco:** inconsistência de API.
  - **Mitigação:** contrato canônico versionado em docs.
- [x] **Risco:** duplicação de lógica em adapters.
  - **Mitigação:** centralizar no `core` antes de portar.
- [x] **Risco:** regressão de acessibilidade.
  - **Mitigação:** checklist a11y obrigatória em PR.

---

## Definição de pronto (DoD) para esta migração

- [x] `Input` e `Card` com paridade visual e funcional em React, Vue, Angular e Svelte.
- [x] Classes e estados centralizados em styles/core.
- [x] Tokens semânticos cobrindo todos os estados usados.
- [x] Storybook com matriz completa de estados.
- [x] Testes unitários e de integração essenciais passando.
- [x] Documentação atualizada para uso multi-framework.
