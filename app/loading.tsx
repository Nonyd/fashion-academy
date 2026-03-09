export default function Loading() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[100] h-0.5 bg-[var(--color-gold)] origin-left animate-[loading-bar_0.8s_ease-out]"
      aria-hidden="true"
    />
  );
}
