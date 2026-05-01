import type { HTMLAttributes } from 'react';

export type CommandMenuProps = HTMLAttributes<HTMLDivElement>;

export function CommandMenu(props: CommandMenuProps) {
  return <div {...props} />;
}
