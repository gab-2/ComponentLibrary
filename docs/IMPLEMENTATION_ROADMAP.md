# Implementation Roadmap (Independent Verification + Next Steps)

Este documento organiza um passo a passo grande para concluir o projeto com validação real (não baseada em checkboxes).

## Fase 0 — Baseline e auditoria técnica real

1. Rodar baseline de ambiente:
   - `pnpm install`
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm build`
2. Rodar baseline de banco:
   - `pnpm db:migrate`
   - `pnpm db:seed`
3. Rodar baseline de infraestrutura local:
   - `docker compose up -d`
   - validar PostgreSQL e registry local
4. Gerar matriz de status por critério:
   - `IMPLEMENTADO` / `PARCIAL` / `AUSENTE` por item do `ACCEPTANCE_CRITERIA.md`.
5. Registrar bloqueios externos (ex.: Stripe credentials) com impacto objetivo e próximo passo.

## Fase 1 — ExecPlan 001 (Monorepo Foundation) hardening

1. Remover scripts placeholder críticos (lint/test/typecheck) em apps/pacotes core da plataforma.
2. Garantir `turbo.json` com outputs corretos para reduzir warnings e melhorar cache.
3. Validar Docker Compose com serviços mínimos funcionando de fato.
4. Confirmar comandos raiz exigidos no AGENTS/Spec.

## Fase 2 — ExecPlan 002 (Design System Packages)

1. Consolidar `tokens -> styles -> core` com exports consistentes.
2. Garantir testes unitários de helpers core (button/input/card/alert/modal).
3. Garantir separação física Free/Pro em `packages/react` e `packages/react-pro`.
4. Validar que pacotes públicos não importam `@sua-marca-pro/*`.

## Fase 3 — ExecPlan 003 (Auth/Billing/Entitlements)

1. Normalização de status de subscription e sincronização de entitlement.
2. Implementar fluxos de checkout/portal/webhook com idempotência.
3. Garantir regras de plano: FREE, PRO_MONTHLY, PRO_YEARLY, LIFETIME.
4. Testes de acesso para FREE vs PRO ativo vs LIFETIME.

## Fase 4 — ExecPlan 004 (Private Registry)

1. Fluxo token registry (gerar/mostrar uma vez/hash/revogar).
2. Endpoint de autorização por entitlement ativo.
3. Testes de acesso negado por token revogado.
4. Publicação privada com `publishConfig.registry` nos pacotes Pro.

## Fase 5 — ExecPlan 005 (Marketing/Dashboard/Docs)

1. Landing funcional com showcase Free e preview Pro.
2. Dashboard autenticado com instruções `.npmrc`, geração/revogação de token.
3. Docs públicas + privadas com gating por entitlement.
4. Testes de integração mínimos para rotas críticas.

## Fase 6 — ExecPlan 006 (Multi-framework Adapters)

1. Estruturar adapters idiomáticos para Vue, Angular, Svelte, Web Components.
2. Validar anti-regra: frameworks não React não podem importar React.
3. Garantir APIs equivalentes entre frameworks para componentes base.
4. Storybook cobrindo Free e Pro por framework.

## Fase 7 — ExecPlan 007 (CI/Release/Security)

1. Pipeline CI: install/lint/typecheck/test/build (+ opcional e2e).
2. Changesets + release workflow público/privado.
3. Segurança: segredos, placeholders env, webhook signature, audit log.
4. Validar publicação privada sem vazamento para npm público.

## Critério de avanço entre fases

Uma fase só é marcada como concluída quando:
- comandos de verificação da fase passam;
- critérios de aceite relacionados estão `IMPLEMENTADO`;
- bloqueios externos (se houver) foram documentados com ação de mitigação.
