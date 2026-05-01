export type SortDirection = 'asc' | 'desc';

export function sortRows<T>(rows: T[], compare: (a: T, b: T) => number, direction: SortDirection = 'asc'): T[] {
  const sorted = [...rows].sort(compare);
  return direction === 'asc' ? sorted : sorted.reverse();
}

export function paginateRows<T>(rows: T[], page: number, pageSize: number): T[] {
  const start = Math.max(0, (page - 1) * pageSize);
  return rows.slice(start, start + pageSize);
}
