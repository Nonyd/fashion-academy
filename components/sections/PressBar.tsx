"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { pressLogos } from "@/lib/data";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function PressBar() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || !theme;

  return (
    <section
      className="border-y border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-10 lg:px-10"
      aria-label="Press and recognition"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          As Seen In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {pressLogos.map((logo) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
              className="group relative h-6 w-24 opacity-90 transition hover:opacity-100"
            >
              <Image
                src={logo.imageUrl}
                alt={logo.name}
                fill
                sizes="96px"
                className={`object-contain transition ${
                  isDark
                    ? "brightness-0 invert contrast-90 group-hover:contrast-100"
                    : "invert-0 contrast-[1.2]"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

