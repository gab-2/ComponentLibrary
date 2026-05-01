import type { HTMLAttributes } from 'react';

export type AlertProps = HTMLAttributes<HTMLDivElement>;

export function Alert(props: AlertProps) {
  return <div {...props} />;
}
