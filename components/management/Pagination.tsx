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
    <div className="flex items-center justify-between px-2 py-3 border-t border-white/10 bg-black/20">
      <p className="text-sm text-[var(--color-muted)]">
        Showing {start}–{end} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-xl border border-white/10 text-sm font-medium text-[var(--color-ivory)] disabled:opacity-50 hover:bg-white/5"
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
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                p === page
                  ? "bg-[var(--color-gold)] text-[var(--color-noir)]"
                  : "border border-white/10 text-[var(--color-ivory)] hover:bg-white/5"
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
          className="px-3 py-1.5 rounded-xl border border-white/10 text-sm font-medium text-[var(--color-ivory)] disabled:opacity-50 hover:bg-white/5"
        >
          Next
        </button>
      </div>
    </div>
  );
}
