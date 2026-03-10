import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-muted)]" aria-hidden />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[var(--color-gold)] focus:outline-none focus-visible:text-[var(--color-gold)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--color-ivory)]/90">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
