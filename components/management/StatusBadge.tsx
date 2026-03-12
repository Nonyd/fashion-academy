"use client";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/20 text-amber-400",
  ACCEPTED: "bg-emerald-500/20 text-emerald-400",
  APPROVED: "bg-emerald-500/20 text-emerald-400",
  ACTIVE: "bg-emerald-500/20 text-emerald-400",
  PAID: "bg-emerald-500/20 text-emerald-400",
  COMPLETED: "bg-emerald-500/20 text-emerald-400",
  REJECTED: "bg-red-500/20 text-red-400",
  FAILED: "bg-red-500/20 text-red-400",
  INACTIVE: "bg-red-500/20 text-red-400",
  WAITLISTED: "bg-orange-500/20 text-orange-400",
  REVISION_REQUESTED: "bg-orange-500/20 text-orange-400",
  SUBMITTED: "bg-blue-500/20 text-blue-400",
};

export function StatusBadge({
  status,
  type,
}: {
  status: string;
  type?: string;
}) {
  const key = (status || "").toUpperCase();
  const className =
    statusColors[key] ?? "bg-white/10 text-[var(--color-muted)]";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}
