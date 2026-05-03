# ExecPlan 008 — Migração de UI para Next.js + React TSX + Tailwind (sem quebrar contratos atuais)

## Contexto

Atualmente os apps `marketing`, `dashboard` e `docs` respondem via servidores Fastify com payloads JSON. O objetivo deste plano é migrar essas superfícies para páginas reais (`.tsx`) com Next.js + Tailwind, mantendo compatibilidade com a API atual e preservando regras críticas de produto (separação Free/Pro, sem runtime license check no componente instalado, gating por entitlement no backend).

## Objetivos

1. Criar páginas reais para:
   - `apps/marketing`
   - `apps/dashboard`
   - `apps/docs`
2. Preservar o backend atual (`apps/api` e `apps/registry`) e contratos existentes.
3. Migrar de forma incremental com rollback simples por app.
4. Garantir que build/lint/test/typecheck continuem verdes durante toda a migração.

## Princípios de migração

- Não alterar regras de negócio de entitlement durante migração visual.
- Não mover lógica de autorização para frontend.
- Não expor secrets em apps web.
- Não misturar código Pro em pacotes públicos.
- APIs continuam sendo fonte de verdade; frontend apenas consome.

## Arquitetura-alvo (alto nível)

- `apps/api` (Fastify): autenticação, billing, entitlements, tokens de registry.
- `apps/registry` (Fastify + Verdaccio): autorização de acesso a pacote privado.
- `apps/marketing` (Next.js): páginas públicas de aquisição.
- `apps/dashboard` (Next.js): UI autenticada consumindo API.
- `apps/docs` (Next.js): docs públicas e docs Pro com gating via API.

## Estratégia de execução (ordem recomendada)

1. Fase 0 — Preparação base comum de UI e padrões.
2. Fase 1 — Migrar `apps/marketing` para Next.js.
3. Fase 2 — Migrar `apps/docs` para Next.js.
4. Fase 3 — Migrar `apps/dashboard` para Next.js.
5. Fase 4 — Endurecimento (testes, observabilidade, segurança, DX).
6. Fase 5 — Corte final, documentação e validação de aceite.

---

## Checklist mestre (controle de progresso)

> Marcar `[x]` ao concluir. Manter links para PRs/commits em cada item quando aplicável.

### Fase 0 — Base e governança

- [x] Confirmar versões e baseline de runtime (Node/pnpm) no monorepo.
- [x] Definir padrão de roteamento Next (App Router) para os 3 apps.
- [x] Definir estratégia de consumo de API (server components + fetch, ou BFF por app).
- [x] Definir padrão de tratamento de erro/loading/empty state em UI.
- [x] Definir padrão de auth de sessão no dashboard (cookie/session).
- [x] Definir variáveis de ambiente por app (`NEXT_PUBLIC_*` vs server-only).
- [x] Adicionar guideline de styling com Tailwind + tokens.
- [x] Planejar feature flags de migração por app (ex.: `UI_MIGRATION_MARKETING=1`).
- [x] Criar ADR curto de decisões técnicas da migração.

### Fase 1 — `apps/marketing` (público)

- [x] Scaffold Next.js + Tailwind no `apps/marketing`.
- [x] Criar layout global (`app/layout.tsx`) e home (`app/page.tsx`).
- [x] Implementar página `/pricing` em TSX com dados atuais dos planos.
- [x] Implementar página `/components` com seções Free/Pro preview.
- [x] Garantir links/CTAs e metadados SEO básicos.
- [x] Validar responsividade mobile/tablet/desktop.
- [x] Validar acessibilidade básica (heading order, focus, contraste).
- [x] Adicionar testes (mínimo smoke de rotas e render).
- [x] Manter rota JSON legada temporária (se necessário para compatibilidade).

### Fase 2 — `apps/docs` (público + Pro)

- [x] Scaffold/ajuste Next.js + Tailwind no `apps/docs`.
- [x] Criar home de documentação + navegação por framework.
- [x] Implementar páginas públicas (`/docs/public`, `/docs/react`, etc.) como UI.
- [x] Implementar área Pro com gating por entitlement via API.
- [x] Criar UX de bloqueio (upgrade CTA) quando sem entitlement.
- [x] Garantir que conteúdo Pro não seja pré-renderizado para usuários sem acesso.
- [x] Adicionar testes de acesso permitido/negado para docs Pro.
- [x] Revisar estratégia de cache para evitar vazamento de conteúdo.

### Fase 3 — `apps/dashboard` (autenticado)

- [x] Scaffold/ajuste Next.js + Tailwind no `apps/dashboard`.
- [x] Implementar página de overview (user + access + billing).
- [x] Implementar página de billing/status.
- [x] Implementar página de instruções de instalação/.npmrc.
- [x] Implementar gerenciamento de tokens (listar/criar/revogar).
- [x] Exibir token apenas no momento de criação (one-time display).
- [x] Garantir tratamento de estados de erro da API (`missing_email`, `forbidden`, etc.).
- [x] Adicionar guardas de rota para páginas autenticadas.
- [x] Adicionar testes de fluxos críticos de token.

### Fase 4 — Qualidade, segurança e operação

- [x] Adicionar testes E2E de jornada principal (Playwright):
  - [x] Free sem acesso Pro.
  - [x] Pro com acesso Pro ativo.
  - [x] Lifetime com acesso permanente.
  - [x] Token revogado não autoriza instalação.
- [x] Validar lint/typecheck/test/build em CI e local.
- [x] Validar boundaries entre pacotes públicos vs privados.
- [x] Validar ausência de secrets no frontend.
- [x] Revisar headers de segurança e políticas de cache.
- [x] Incluir monitoramento de erros de frontend (Sentry/alternativa).

### Fase 5 — Cutover e encerramento

- [x] Definir estratégia de corte por app (gradual ou big-bang).
- [x] Executar rollout `marketing`.
- [x] Executar rollout `docs`.
- [x] Executar rollout `dashboard`.
- [x] Desativar endpoints Fastify legados de UI (quando não houver dependências).
- [x] Atualizar documentação de execução local e troubleshooting.
- [x] Registrar relatório final de migração (status, riscos, pendências).
- [x] Atualizar critérios de aceite com evidências.

---

## Checklist de rotas (mapeamento funcional)

### Marketing

- [x] `/`
- [x] `/pricing`
- [x] `/components`
- [x] `/components/free`
- [x] `/components/pro`

### Docs

- [x] `/docs/public`
- [x] `/docs/react`
- [x] `/docs/vue`
- [x] `/docs/angular`
- [x] `/docs/svelte`
- [x] `/docs/web-components`
- [x] `/docs/pro/react` (gated)

### Dashboard

- [x] `/dashboard/overview`
- [x] `/dashboard/billing`
- [x] `/dashboard/install-instructions`
- [x] `/dashboard/tokens` (listar/criar/revogar)

---

## Critérios de aceite da migração

- [x] Marketing, Docs e Dashboard renderizam páginas TSX com Tailwind.
- [x] Contratos de API existentes permanecem funcionais.
- [x] Gating Pro continua no backend por entitlement.
- [x] Nenhum segredo exposto no cliente.
- [x] Fluxo de token (criar/listar/revogar) funcional via UI.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` verdes.
- [x] Documentação atualizada para desenvolvimento e operação.

## Riscos e mitigação

- Risco: quebra de contrato durante migração de app.
  - Mitigação: manter rotas legadas temporárias + testes de contrato.
- Risco: vazamento de conteúdo Pro por cache/SSR.
  - Mitigação: políticas de cache restritivas e validação server-side por request.
- Risco: regressão de UX em fluxo de tokens.
  - Mitigação: testes E2E dedicados e rollout gradual.

## Progress

- [x] Plano de migração criado.
- [x] Execução iniciada.

## Decision Log

- 2026-05-03: Migração proposta em fases independentes por app para reduzir risco de regressão e permitir rollback localizado.
- 2026-05-03: Fase 0 concluída com baseline, ADR, flags de migração e critérios de governança documentados.
- 2026-05-03: Fase 1 concluída no app `marketing` com Next.js + Tailwind, rotas de página e endpoint legado temporário `/api/legacy/marketing`.
- 2026-05-03: Fase 2 concluída no app `docs` com Next.js + Tailwind, rotas públicas/privadas e gating server-side via API.
- 2026-05-03: Fase 3 concluída no app `dashboard` com Next.js + Tailwind, guardas de acesso e fluxo de tokens (listar/criar/revogar).
- 2026-05-03: Fase 4 concluída com suíte E2E inicial Playwright, headers de segurança em apps web e adapter inicial de monitoramento de erros no dashboard.
- 2026-05-03: Fase 5 concluída com cutover gradual finalizado, cleanup de endpoints legados de migração e relatório final documentado.
