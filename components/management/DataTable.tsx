"use client";

import { Pagination } from "./Pagination";
import { Inbox } from "lucide-react";

type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading,
  pagination,
  onPageChange,
  onSearch,
  actions,
  emptyMessage = "No records found",
}: {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: { page: number; totalPages: number; total: number; limit: number };
  onPageChange?: (page: number) => void;
  onSearch?: (q: string) => void;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}) {
  return (
    <div className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 overflow-hidden">
      {(onSearch || actions) && (
        <div className="p-4 border-b border-white/10 flex items-center gap-4">
          {onSearch && (
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
              className="px-3 py-2 border border-white/10 rounded-xl bg-black/30 text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] text-sm w-64 focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 outline-none"
            />
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black/30 border-b border-white/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/10">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-5 bg-white/10 rounded animate-pulse" />
                    </td>
                  ))}
                  {actions && <td className="px-4 py-3" />}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-12 text-center"
                >
                  <Inbox className="w-12 h-12 mx-auto text-[var(--color-muted)] mb-2" />
                  <p className="font-medium text-[var(--color-ivory)]">{emptyMessage}</p>
                  <p className="text-sm text-[var(--color-muted)] mt-1">
                    Try adjusting your filters
                  </p>
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-[var(--color-ivory)]"
                    >
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">{actions(row)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && onPageChange && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
