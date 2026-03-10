import Link from "next/link";
import type { SpotlightArticle } from "@/lib/data/alumni";

type Props = { article: SpotlightArticle };

export default function SpotlightCard({ article }: Props) {
  const isPlaceholder = article.image.includes("placeholder");
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 transition-colors hover:border-[var(--color-gold)]/30">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-charcoal)]">
        {!isPlaceholder ? (
          <img
            src={article.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-noir)]">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Fashion editorial
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-[var(--color-gold)]/50 bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
          {article.badge}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold leading-snug text-[var(--color-ivory)]">
          {article.title}
        </h3>
        <p className="mt-3 text-sm text-[var(--color-ivory)]/70 line-clamp-3">
          {article.excerpt}
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {article.source} · {article.date}
        </p>
        <Link
          href={`/alumni/news/${article.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          Read More
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
