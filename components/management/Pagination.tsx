"use client";

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
}) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <p className="text-sm text-[#6B7280]">
        Showing {start}–{end} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-lg border border-[#E5E1F5] text-sm font-medium text-[#1A1A2E] disabled:opacity-50 hover:bg-[#F8F7FF]"
        >
          Previous
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const p = page <= 3 ? i + 1 : page - 2 + i;
          if (p < 1 || p > totalPages) return null;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                p === page
                  ? "bg-[#7C5CBF] text-white"
                  : "border border-[#E5E1F5] text-[#1A1A2E] hover:bg-[#F8F7FF]"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 rounded-lg border border-[#E5E1F5] text-sm font-medium text-[#1A1A2E] disabled:opacity-50 hover:bg-[#F8F7FF]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
