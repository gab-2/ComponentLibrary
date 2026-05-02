# Button (React)

## Quando usar

- Ações principais da tela (salvar, continuar, confirmar).
- Ações secundárias com `outline` ou `ghost`.

## Quando não usar

- Navegação entre páginas (prefira Link).
- Ações destrutivas sem confirmação contextual.

## Acessibilidade

- Sempre fornecer texto claro no conteúdo do botão.
- Evitar usar apenas ícone sem `aria-label`.
- Em `loading`, o componente fica desabilitado para evitar ações duplicadas.
