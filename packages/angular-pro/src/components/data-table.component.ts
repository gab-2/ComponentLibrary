export interface DataTableColumn { key: string; label: string }
export type DataTableRow = Record<string, string | number>;

export class SmDataTableComponent {
  columns: DataTableColumn[] = [];
  rows: DataTableRow[] = [];
}
