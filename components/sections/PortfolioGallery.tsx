"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { portfolioItems } from "@/lib/data";

export default function PortfolioGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = portfolioItems.find((item) => item.id === activeId);

  return (
    <section
      id="showcase"
      className="border-y border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
      aria-labelledby="showcase-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Student Work
            </p>
            <h2
              id="showcase-title"
              className="mt-2 text-3xl leading-[1.1] text-[var(--color-ivory)] sm:text-4xl"
            >
              Student Showcase
            </h2>
          </div>
          <a
            href="#"
            className="text-xs uppercase tracking-[0.26em] text-[var(--color-ivory)]/70 underline-offset-4 hover:text-[var(--color-ivory)] hover:underline"
          >
            View Full Showcase →
          </a>
        </motion.div>

        <div className="columns-2 gap-4 md:columns-4">
          {portfolioItems.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mb-4 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-3xl border border-white/8 bg-[var(--color-charcoal)]/80 text-left shadow-[var(--shadow-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.imageUrl}
                  alt={`${item.title} by ${item.studentName}`}
                  fill
                  sizes="(min-width: 1024px) 240px, 50vw"
                  className="h-full w-full transform object-cover transition duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
              <div className="px-3 py-3">
                <p className="text-xs font-medium text-[var(--color-ivory)]">
                  {item.title}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {item.studentName}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(null);
              }}
              className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[var(--color-noir)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={activeItem.imageUrl}
                  alt={`${activeItem.title} by ${activeItem.studentName}`}
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4 text-sm text-[var(--color-ivory)]/85">
                <div>
                  <p className="font-medium">{activeItem.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {activeItem.studentName} · École Atelier
                  </p>
                </div>
                <p className="hidden text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] sm:block">
                  Student Showcase
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

