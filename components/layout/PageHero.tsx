"use client";

import { motion } from "framer-motion";

type PageHeroProps = {
  label: string;
  title: string;
  description?: string;
};

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[50vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
      aria-labelledby="page-hero-title"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          {label}
        </motion.p>
        <span className="section-title-accent" aria-hidden="true" />
        <motion.h1
          id="page-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-sm text-[var(--color-ivory)]/70"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
