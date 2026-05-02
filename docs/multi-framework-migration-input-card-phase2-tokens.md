# Fase 2 — Tokens semânticos (`Input` e `Card`)

Implementação concluída da Fase 2 com foco em tokens semânticos e consistência de nomenclatura.

## Entregas

## Input

- Tokens semânticos adicionados em `tokens.css` para:
  - fundo, texto, placeholder;
  - borda default/focus/invalid;
  - ring focus pointer/keyboard;
  - ring invalid pointer/keyboard;
  - caret e selection;
  - sombra.

## Card

- Tokens semânticos adicionados em `tokens.css` para:
  - fundo, texto;
  - borda default e hover;
  - sombra default e hover.

## JSON de tokens

- `tokens.json` estendido com `components.input` e `components.card` para os temas light/dark.

## Consistência

- Eliminada dependência de tokens inexistentes no CSS de `Card` (`--sm-color-surface`, `--sm-color-text`).
- `Card` agora usa tokens canônicos `--sm-color-card-*` e `--sm-shadow-card`.

## Resultado

- Base de tokens pronta para a Fase 3 (styles compartilhados com paridade visual).
