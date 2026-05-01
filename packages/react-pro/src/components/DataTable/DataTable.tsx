import * as React from "react";

type DataTableProps = { columns: string[]; rows: Array<Record<string, string | number>> };

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <table>
      <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{columns.map((c) => <td key={c}>{String(r[c] ?? "")}</td>)}</tr>)}</tbody>
    </table>
  );
}
