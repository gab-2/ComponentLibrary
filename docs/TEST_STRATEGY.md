# Estratégia de Testes (Fase 6)

## Objetivo

Padronizar uma matriz mínima obrigatória de testes para os pacotes da biblioteca.

## Matriz implementada

### 1) Unitário (obrigatório)

- `@sua-marca-ui/core`: Vitest com assertions de classes/estados e normalização de dados.
- `@sua-marca-ui/react`: suíte de sanity (`node --test`) para validar pipeline de execução de testes no pacote.

### 2) Integração (baseline)

- Integração de build do pacote React com tipos (`tsup --dts`) para detectar quebra de API pública.

### 3) Visual regression (baseline de processo)

- Fluxo definido para ocorrer via Storybook.
- Gate inicial disponível por build de Storybook dentro do workspace.

## Comandos padrão da fase

```bash
pnpm --filter @sua-marca-ui/core test
pnpm --filter @sua-marca-ui/react test
pnpm --filter @sua-marca-ui/react build
```

## Metas de cobertura (fase atual)

- `@sua-marca-ui/core`: meta mínima de cobertura global definida em 80% (linhas/funções/statements/branches) para evolução incremental.
- Pacotes de framework: evolução por componente conforme expansão de suíte de interação.

## Próximos passos (fase 7+)

- Adicionar testes de interação DOM para React (teclado/foco/eventos por componente).
- Integrar regressão visual automatizada de Storybook com snapshots por estado.
- Publicar relatório de cobertura consolidado no CI.
