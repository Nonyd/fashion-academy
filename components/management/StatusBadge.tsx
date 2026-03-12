"use client";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  ACCEPTED: "bg-emerald-100 text-emerald-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  ACTIVE: "bg-emerald-100 text-emerald-800",
  PAID: "bg-emerald-100 text-emerald-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
  FAILED: "bg-red-100 text-red-800",
  INACTIVE: "bg-red-100 text-red-800",
  WAITLISTED: "bg-orange-100 text-orange-800",
  REVISION_REQUESTED: "bg-orange-100 text-orange-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
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
    statusColors[key] ?? "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}
