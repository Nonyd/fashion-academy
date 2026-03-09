"use client";

import { motion } from "framer-motion";

const TEXT =
  "FASHION DESIGN · LUXURY BRAND MANAGEMENT · STYLING · TEXTILE ARTS · FASHION TECHNOLOGY · PATTERN MAKING · VISUAL MERCHANDISING ·";

export default function MarqueeTicker() {
  return (
    <section
      aria-label="Programs marquee"
      className="relative border-y border-[var(--color-charcoal)] bg-[var(--color-charcoal)] py-3"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-charcoal)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-charcoal)] to-transparent" />
      <div className="overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap text-sm font-medium italic tracking-[0.32em] text-[var(--color-gold)]"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          <span aria-hidden="true">{TEXT}</span>
          <span className="ml-12" aria-hidden="true">
            {TEXT}
          </span>
          <span className="ml-12" aria-hidden="true">
            {TEXT}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

