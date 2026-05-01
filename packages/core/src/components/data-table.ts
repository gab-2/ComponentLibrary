export interface DataTableColumn {
  key: string;
  label: string;
}

export interface DataTableRow {
  [key: string]: string | number | null | undefined;
}

export interface DataTableClassOptions {
  dense?: boolean;
  striped?: boolean;
}

export function getDataTableClass(options: DataTableClassOptions = {}) {
  const classes = ["sm-data-table"];
  if (options.dense) classes.push("sm-data-table--dense");
  if (options.striped) classes.push("sm-data-table--striped");
  return classes.join(" ");
}

export function getCellValue(row: DataTableRow, key: string): string {
  const value = row[key];
  return value == null ? "" : String(value);
}
