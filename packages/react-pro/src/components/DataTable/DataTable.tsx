import type { HTMLAttributes } from 'react';

export type DataTableProps = HTMLAttributes<HTMLDivElement>;

export function DataTable(props: DataTableProps) {
  return <div {...props} />;
}
