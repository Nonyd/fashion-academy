import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PersonCard as PersonCardType } from "@/lib/data/about";

type PersonCardProps = {
  person: PersonCardType;
  showDepartment?: boolean;
  showTag?: boolean;
  tag?: string;
};

export default function PersonCard({
  person,
  showDepartment = true,
  showTag = false,
  tag,
}: PersonCardProps) {
  const label = showTag && (tag ?? (person as { tag?: string }).tag) ? (tag ?? (person as { tag?: string }).tag) : null;

  return (
    <article className="rounded-xl border border-white/10 bg-[var(--color-charcoal)]/60 p-4 transition-colors hover:border-[var(--color-gold)]/30">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/5">
        <Image
          src={person.imageUrl}
          alt={person.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="mt-4">
        {label && (
          <span className="mb-1 inline-block text-[10px] font-medium uppercase tracking-wider text-[var(--color-gold)]">
            {label}
          </span>
        )}
        <h3 className="text-sm font-semibold text-[var(--color-ivory)]">{person.name}</h3>
        <p className="text-xs text-[var(--color-ivory)]/80">{person.title}</p>
        {showDepartment && person.department && (
          <p className="mt-0.5 text-xs text-[var(--color-muted)]">{person.department}</p>
        )}
        {person.profileHref && (
          <Link
            href={person.profileHref}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)]"
          >
            View Profile
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </article>
  );
}
