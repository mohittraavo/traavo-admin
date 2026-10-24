import { ReactNode } from "react";

type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
  className?: string;
  rowClassName?: (row: T) => string | undefined;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = "No data available.",
  className,
  rowClassName
}: DataTableProps<T>) {
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className={column.className}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>{emptyMessage}</td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={rowKey(row)} className={rowClassName?.(row)}>
              {columns.map((column) => (
                <td key={column.key} className={column.className}>{column.render(row)}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
