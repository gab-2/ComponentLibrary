# Confiabilidade e Performance (Fase 5)

## Itens concluídos

- Cobertura de edge cases em componentes de classe utilitária no `@sua-marca-ui/core`.
- Guardrail de budget de bundle para artefatos críticos (`core`, `react`, `styles`, `tokens`).
- Revisão de compatibilidade SSR para componentes interativos atuais (Modal sem acesso a `document` durante render).

## Budget de bundle

Comando:

```bash
pnpm check:bundle-budget
```

Regras atuais:

- `packages/core/dist/index.js` <= 35 KB
- `packages/react/dist/index.js` <= 45 KB
- `packages/styles/dist/index.js` <= 40 KB
- `packages/tokens/src/tokens.css` <= 20 KB

## SSR

O `Modal` não executa acesso a APIs de DOM durante renderização. O ciclo de foco usa `useEffect`, que roda apenas no cliente.
