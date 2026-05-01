import type { HTMLAttributes } from 'react';

export type ModalProps = HTMLAttributes<HTMLDivElement>;

export function Modal(props: ModalProps) {
  return <div {...props} />;
}
