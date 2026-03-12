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
    <div className="bg-white rounded-xl border border-[#E5E1F5] overflow-hidden">
      {(onSearch || actions) && (
        <div className="p-4 border-b border-[#E5E1F5] flex items-center gap-4">
          {onSearch && (
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
              className="px-3 py-2 border border-[#E5E1F5] rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#7C5CBF] focus:border-transparent"
            />
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8F7FF] border-b border-[#E5E1F5]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-[#E5E1F5]">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse" />
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
                  <Inbox className="w-12 h-12 mx-auto text-[#6B7280] mb-2" />
                  <p className="font-medium text-[#1A1A2E]">{emptyMessage}</p>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Try adjusting your filters
                  </p>
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[#E5E1F5] hover:bg-[#F8F7FF]/50"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-[#1A1A2E]"
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
