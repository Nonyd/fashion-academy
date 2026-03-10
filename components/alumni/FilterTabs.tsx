"use client";

import type { ArticleCategory } from "@/lib/data/alumni";

const CATEGORIES: { id: ArticleCategory | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Spotlight", label: "Spotlight" },
  { id: "Chapter News", label: "Chapter News" },
  { id: "Announcements", label: "Announcements" },
  { id: "Impact Reports", label: "Impact Reports" },
  { id: "Event Recaps", label: "Event Recaps" },
];

type Props = {
  active: ArticleCategory | "All";
  onSelect: (category: ArticleCategory | "All") => void;
};

export default function FilterTabs({ active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onSelect(cat.id)}
          className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
            active === cat.id
              ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
              : "border-white/20 bg-white/5 text-[var(--color-ivory)] hover:border-[var(--color-gold)]/50"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
