import type { HTMLAttributes } from 'react';

export type InputProps = HTMLAttributes<HTMLDivElement>;

export function Input(props: InputProps) {
  return <div {...props} />;
}
