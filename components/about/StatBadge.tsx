type StatBadgeProps = {
  label: string;
};

export default function StatBadge({ label }: StatBadgeProps) {
  return (
    <span className="inline-block rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
      {label}
    </span>
  );
}
