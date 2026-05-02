# CI/CD Quality Gates (Fase 8)

## Gates obrigatórios

- Lint
- Typecheck
- Test
- Build
- Test baseline de componentes (`test:phase6`)
- Bundle budget (`check:bundle-budget`)
- Package boundaries (`check:boundaries`)
- Private publish safety (`check:private-publish`)
- Secret scan (`check:secrets`)

## Comando único

```bash
pnpm ci:quality
```

## CI workflow

O workflow de CI foi atualizado para rodar também:

- `pnpm test:phase6`
- `pnpm check:bundle-budget`
