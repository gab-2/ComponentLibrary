# Registry Entitlement & Audit (Fase 9)

## Regras implementadas

- Autorização para pacotes privados exige token válido, não revogado e acesso Pro/Lifetime ativo.
- Tokens revogados são negados imediatamente.
- Status de assinatura inativo (`canceled`, `unpaid`, `past_due`, `expired`) não concede acesso Pro.

## Auditoria implementada

No endpoint `/registry/authorize`:

- registra `registry.token.authorization.allowed` para autorizações válidas;
- registra `registry.token.authorization.denied` para negações por:
  - `INVALID_TOKEN`
  - `REVOKED_TOKEN`
  - `NO_ACTIVE_PLAN`

## Cobertura de testes

- matriz de status inativos validada em `apps/api/src/lib/access.test.ts`.
- fluxo de autorização com auditoria de sucesso/falha validado em `apps/api/src/routes/registry.test.ts`.
