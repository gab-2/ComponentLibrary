# Input (React)

## Quando usar

- Captura de texto curto (nome, e-mail, busca).
- Campos simples de formulário com feedback de erro.

## Quando não usar

- Conteúdo multi-linha (prefira Textarea).
- Seleção fechada de opções (prefira Select/Combobox).

## Props (canônicas)

| Prop          | Tipo                   | Padrão      | Descrição                     |
| ------------- | ---------------------- | ----------- | ----------------------------- |
| `label`       | `string`               | `undefined` | Rótulo visível do campo.      |
| `error`       | `string`               | `undefined` | Mensagem de erro.             |
| `size`        | `"sm" \| "md" \| "lg"` | `"md"`      | Escala visual do input.       |
| `disabled`    | `boolean`              | `false`     | Desabilita interação.         |
| `invalid`     | `boolean`              | `false`     | Estado inválido explícito.    |
| `id`          | `string`               | `undefined` | Identificador para label/for. |
| `placeholder` | `string`               | `""`        | Texto auxiliar.               |

## Eventos

- `focus`
- `blur`
- `input/change`

## Acessibilidade

- Associar `label` visível ao campo.
- Usar `invalid` (ou `error`) para sinalizar erro com `aria-invalid`.
- Evitar placeholder como substituto de label.
- Preservar foco visível por teclado.
