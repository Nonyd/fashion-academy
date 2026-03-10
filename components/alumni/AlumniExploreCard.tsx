"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Heart, Calendar, Newspaper, FileText } from "lucide-react";
import type { ExploreCard } from "@/lib/data/alumni";

const iconMap = {
  MapPin,
  Users,
  Heart,
  Calendar,
  Newspaper,
  FileText,
};

type Props = { card: ExploreCard; index?: number };

export default function AlumniExploreCard({ card, index = 0 }: Props) {
  const Icon = iconMap[card.icon as keyof typeof iconMap] ?? FileText;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6 shadow-[var(--shadow-subtle)] transition-all hover:border-[var(--color-gold)]/40 hover:shadow-[0_0_0_1px_var(--color-gold)]/20"
    >
      <div className="space-y-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/30 bg-black/40 text-[var(--color-gold)]">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-ivory)]">{card.title}</h3>
        <p className="text-sm text-[var(--color-ivory)]/70">{card.description}</p>
      </div>
      <Link
        href={card.href}
        className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
      >
        {card.linkLabel}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </motion.article>
  );
}
