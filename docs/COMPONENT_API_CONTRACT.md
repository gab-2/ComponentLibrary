# Component API Contract (Fase 3)

Este documento define o contrato de API para os componentes base.

## Regras de consistência

- Componentes visuais aceitam `className` e fazem merge com classes internas.
- Componentes encapsulados em elemento DOM expõem `...HTMLAttributes` do elemento correspondente.
- Componentes com estado interativo devem suportar modo controlado e não-controlado quando aplicável.
- Eventos seguem naming explícito (`onOpenChange`, `onValueChange`, etc.).

## Contratos implementados

### Button

- Props: `variant`, `size`, `loading` + `React.ButtonHTMLAttributes<HTMLButtonElement>`.
- `disabled` é forçado quando `loading=true`.
- `aria-disabled` é aplicado automaticamente em `disabled/loading`.

### Input

- Props: `size`, `invalid` + `React.InputHTMLAttributes<HTMLInputElement>`.
- `aria-invalid` é aplicado automaticamente quando `invalid=true`.

### Modal

- Props controladas: `open`, `onOpenChange`.
- Props não-controladas: `defaultOpen`.
- Comportamento: fecha por backdrop click quando `closeOnBackdropClick=true`.
- Extensibilidade: `className` e `contentClassName`.

### Alert / Badge / Card

- Expostos via `forwardRef`.
- Aceitam `className` + `HTMLAttributes` do elemento base.

## Política controlled vs uncontrolled

- Para componentes de estado (Modal), priorizar API dual:
  - **Controlled**: estado vem do consumidor (`open`).
  - **Uncontrolled**: estado interno com `defaultOpen`.
- Sempre disparar callback de mudança (`onOpenChange`) em ambos os modos.

## Política de composição

- Nesta etapa, composição suportada via:
  - children padrão,
  - `className` para estilização externa,
  - atributos nativos para integração com apps.
- `asChild`/slots avançados ficam para evolução de fase posterior.
