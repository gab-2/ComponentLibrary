# Fase 7 — Testes e qualidade

## Cobertura implementada

- **Core (unitário):**
  - matriz de classes do Input/Card;
  - `getInputAriaInvalid(...)`;
  - `createFocusOriginTracker()`.
- **Integração por framework (via suíte workspace):**
  - execução da suíte `pnpm test` cobrindo apps/pacotes no monorepo;
  - validação complementar de comportamento via stories da Fase 6.

## Acessibilidade (garantias implementadas)

- `aria-invalid` derivado de `invalid`/`error` nos adapters modernos.
- Label associado em Input quando `label` e `id` estão presentes.
- Separação de foco por teclado vs ponteiro via tracker no core.

## Observações

- Stories da Fase 6 servem como validação visual/manual complementar.
