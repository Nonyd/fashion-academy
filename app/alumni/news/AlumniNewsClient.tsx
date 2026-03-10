"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NewsArticle, ArticleCategory } from "@/lib/data/alumni";
import FilterTabs from "@/components/alumni/FilterTabs";

type Props = { initialArticles: NewsArticle[] };

export function AlumniNewsClient({ initialArticles }: Props) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "All">("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return initialArticles;
    return initialArticles.filter((a) => a.category === activeCategory);
  }, [initialArticles, activeCategory]);

  return (
    <>
      <div className="mb-10">
        <FilterTabs active={activeCategory} onSelect={setActiveCategory} />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((article) => (
          <article
            key={article.slug}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 transition-colors hover:border-[var(--color-gold)]/30"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-charcoal)]">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-noir)]">
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  {article.category}
                </span>
              </div>
              <span className="absolute left-4 top-4 rounded-full border border-[var(--color-gold)]/50 bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {article.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold leading-snug text-[var(--color-ivory)]">
                {article.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm text-[var(--color-ivory)]/70">
                {article.excerpt}
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {article.author} · {article.dateFormatted}
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
        ))}
      </div>
    </>
  );
}
