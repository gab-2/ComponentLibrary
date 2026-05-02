# High-Level Component Library Checklist

## Objetivo

Este documento transforma o plano de evolução da biblioteca em um checklist operacional por fases, com status de progresso.

Legenda:

- `[x]` concluído
- `[ ]` pendente
- `[-]` não iniciado nesta fase

---

## Fase 1 — Fundamentos de Produto e Arquitetura

Status geral da fase: **Concluída**.

### 1.1 Escopo e governança

- [x] Definir escopo de pacotes públicos vs privados.
- [x] Garantir separação física entre pacotes free e pro.
- [x] Formalizar regra de não incluir código Pro nos pacotes públicos.
- [x] Definir regras de aceite arquitetural e de segurança.
- [x] Definir estrutura de apps e packages do monorepo.

### 1.2 Arquitetura multi-framework

- [x] Formalizar arquitetura em camadas (`tokens -> styles -> core -> adapters/framework`).
- [x] Impedir reutilização direta de componentes React em outros frameworks.
- [x] Manter packages framework-specific separados (`react`, `vue`, `angular`, `svelte`, `web-components`).
- [x] Manter packages `*-pro` separados para distribuição privada.

### 1.3 Monorepo e build base

- [x] Monorepo com `pnpm workspaces` + `Turborepo` configurados.
- [x] Scripts raiz padronizados (`dev`, `build`, `lint`, `test`, `typecheck`, `db:*`, `changeset`, `release`).
- [x] Pipeline de versionamento/publicação com Changesets.
- [x] Estrutura inicial de CI/release e checagens de boundary/security.

### Evidências implementadas nesta fase

- Regras de produto, separação free/pro e arquitetura multi-framework documentadas no guia do agente.
- Estrutura de apps esperada criada (`marketing`, `dashboard`, `docs`, `api`, `registry`, `storybook`).
- Estrutura de packages compartilhados, framework-specific e plataforma criada.
- Base de tooling para publicação e segurança (scripts de boundary, publish privado e secrets).

---

## Fase 2 — Design System e Qualidade Visual

Status geral da fase: **Concluída**.

### 2.1 Tokens e temas

- [x] Estrutura de packages para tokens/styles criada.
- [x] Consolidar tokens semânticos completos (cores, motion, z-index, densidade).
- [x] Definir contrato final de theming (light/dark) com documentação de override.

### 2.2 Variantes e estados visuais

- [x] Padronizar variantes transversais para todos os componentes base desta etapa (Button/Input).
- [x] Padronizar estados visuais completos (`hover`, `focus-visible`, `disabled`, `loading`, `error`) para os componentes base desta etapa.
- [x] Definir guideline único de animações e acessibilidade de motion.

---

## Fase 3 — API de Componentes e DX

Status geral da fase: **Concluída**.

- [x] Padronizar assinatura de props entre componentes base (Button/Input/Alert/Badge/Card/Modal).
- [x] Definir estratégia controlado vs não-controlado para componente de estado (Modal).
- [x] Garantir consistência de eventos e contratos de tipagem (`onOpenChange`, `aria-*`, HTMLAttributes).
- [x] Definir política de composição base (children + className + atributos nativos), com evolução planejada para slots/compound.

---

## Fase 4 — Acessibilidade (A11y)

Status geral da fase: **Concluída**.

- [x] Definir checklist obrigatório de teclado/foco/ARIA por componente.
- [x] Implementar padrão WAI-ARIA para Dialog/Modal (componente crítico disponível nesta base atual).
- [x] Integrar validações automatizadas de acessibilidade no componente crítico disponível (Dialog/Modal), com cobertura de interação por teclado.

---

## Fase 5 — Confiabilidade Funcional e Performance

Status geral da fase: **Concluída**.

- [x] Infra de monorepo para testes/build disponível.
- [x] Cobrir edge cases por componente base atual (classes utilitárias e estados centrais).
- [x] Definir e medir budget de bundle por pacote (script automatizado em tooling).
- [x] Validar SSR/hidratação em componente crítico atual (Modal com foco em useEffect/client-only).

---

## Fase 6 — Estratégia de Testes

Status geral da fase: **Concluída**.

- [x] Base de testes unitários presente em apps e libs centrais.
- [x] Comando E2E previsto no workspace.
- [x] Consolidar matriz de testes por componente/pacote no baseline atual (unitário + sanity + build integration).
- [x] Consolidar baseline de regressão visual via fluxo de Storybook (processo e gate de build definidos).
- [x] Definir metas de cobertura por pacote (meta inicial de 80% para core).

---

## Fase 7 — Storybook e Documentação de Produto

Status geral da fase: **Concluída**.

- [x] App Storybook criado no monorepo.
- [x] Stories base para múltiplos frameworks já existentes.
- [x] Padronizar histórias por estado/variante/tamanho para componentes React base (Button/Input/Modal).
- [x] Adicionar documentação “quando usar / quando não usar” por componente base (Button/Input/Modal).
- [x] Incluir documentação de acessibilidade por componente base (Button/Input/Modal).

---

## Fase 8 — Qualidade de Engenharia (CI/CD)

Status geral da fase: **Concluída**.

- [x] Scripts e estrutura de qualidade inicial (lint/test/typecheck/build).
- [x] Checks utilitários de boundaries, publish privado e segredos.
- [x] Enforçar gates de qualidade no CI (lint/typecheck/test/build/test:phase6/bundle budget/boundary/security).
- [x] Automatizar bloqueio de release via gates de qualidade e segurança de pipeline.

---

## Fase 9 — Plataforma SaaS (Entitlement + Registry)

Status geral da fase: **Concluída**.

- [x] Apps de `api` e `registry` estruturados.
- [x] Domínio de billing/entitlement e rotas principais existentes.
- [x] Completar matriz de testes de cenários de status de assinatura inativa (canceled/unpaid/past_due/expired).
- [x] Consolidar observabilidade/auditoria para autorizações de token (allowed/denied com reason).

---

## Fase 10 — Roadmap de Componentes

Status geral da fase: **Concluída**.

- [x] Fase 10.1: componentes base (Button, Input, Textarea, Label, Checkbox, Radio, Switch)
- [x] Fase 10.2: form + overlays (Select, Combobox, Dialog, Popover, Tooltip)
- [x] Fase 10.3: navegação e dados (Tabs, Accordion, Menu, Table, Pagination, Toast)
- [x] Fase 10.4: catálogo Pro privado com docs gated

---

## Próxima priorização recomendada

1. Fechar Fase 2 (tokens/variantes/estados) para criar base visual consistente.
2. Executar Fase 10.1 em cima do padrão da Fase 2.
3. Rodar Fase 4 e Fase 6 em paralelo para garantir qualidade real desde os primeiros componentes.
