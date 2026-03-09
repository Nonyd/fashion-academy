"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

const campuses = [
  { city: "Lagos", areas: "Egbeda, Ajah, Ojodu" },
  { city: "Abuja", areas: "" },
];

export default function AboutPageContent() {
  return (
    <>
      <PageHero
        label="About"
        title="The Bedrock For Nurturing Global Fashion Creatives"
        description="Est. 2020. A global school for fashion's next storytellers, strategists, and image makers."
      />

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="about-story-title"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="section-label">Our Story</p>
            <span className="section-title-accent" aria-hidden="true" />
            <h2
              id="about-story-title"
              className="mt-4 text-3xl text-[var(--color-ivory)] sm:text-4xl"
            >
              Where Vision Becomes Fashion
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-ivory)]/75">
              Prudential Fashion Academy was founded in 2020 to offer world-class fashion
              education in Nigeria and beyond. We combine rigorous design and business
              training with industry access, so our graduates are ready to lead—whether
              in ateliers, brands, or their own ventures.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ivory)]/75">
              With campuses in Lagos and Abuja, and programs spanning fashion design,
              styling, luxury management, textile design, and technology, we are the
              bedrock for nurturing the next generation of global fashion creatives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-16"
          >
            <p className="section-label">Campuses</p>
            <span className="section-title-accent" aria-hidden="true" />
            <h2 className="mt-4 text-2xl text-[var(--color-ivory)] sm:text-3xl">
              Lagos · Abuja
            </h2>
            <ul className="mt-6 space-y-4">
              {campuses.map((c) => (
                <li
                  key={c.city}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-[var(--color-charcoal)]/60 p-4"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                  <div>
                    <p className="font-semibold text-[var(--color-ivory)]">{c.city}</p>
                    {c.areas && (
                      <p className="text-xs text-[var(--color-ivory)]/70">{c.areas}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-block text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-gold)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Contact & directions
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-ivory)] px-6 py-20 text-[var(--color-noir)] lg:px-10 lg:py-24"
        aria-labelledby="stats-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="stats-title" className="sr-only">
            By the numbers
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { label: "Graduates", value: "12,000+" },
              { label: "Countries", value: "48" },
              { label: "Employment Rate", value: "95%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-[var(--color-noir)] pl-6"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold sm:text-3xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
