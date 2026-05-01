import type { HTMLAttributes } from 'react';

export type BadgeProps = HTMLAttributes<HTMLDivElement>;

export function Badge(props: BadgeProps) {
  return <div {...props} />;
}
