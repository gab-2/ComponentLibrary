# Card (React)

## Quando usar

- Agrupar conteúdo relacionado em uma superfície visual.
- Destacar informações com borda/sombra consistentes do design system.
- Tornar bloco clicável apenas quando houver ação clara.

## Quando não usar

- Como substituto de botões/links sem affordance de interação.
- Para layouts que exigem apenas espaçamento simples sem delimitação visual.

## Props (canônicas)

| Prop          | Tipo         | Padrão      | Descrição                              |
| ------------- | ------------ | ----------- | -------------------------------------- |
| `hover`       | `boolean`    | `false`     | Habilita feedback visual no hover.     |
| `interactive` | `boolean`    | `false`     | Aplica affordance de interação.        |
| `onClick`     | `() => void` | `undefined` | Callback de clique (quando aplicável). |
| `className`   | `string`     | `""`        | Classes adicionais do consumidor.      |

## Eventos

- `click`

## Acessibilidade

- Se for clicável, a semântica deve indicar ação (evolução para Fase 3+).
- Evitar cartões clicáveis sem indicação visual de interatividade.
