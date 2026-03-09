"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AlumniPageContent() {
  return (
    <>
      <section
        className="relative flex min-h-[60vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-20 pt-32 lg:px-10 lg:pb-24 lg:pt-40"
        aria-labelledby="alumni-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Alumni
          </motion.p>
          <span className="section-title-accent" aria-hidden="true" />
          <motion.h1
            id="alumni-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-4xl leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Our Graduates Shape the Industry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-sm text-[var(--color-ivory)]/70"
          >
            The Prudential Fashion Academy alumni network spans the globe—designers,
            creative directors, stylists, and entrepreneurs who are defining the
            future of fashion.
          </motion.p>
        </div>
      </section>

      <section
        className="relative border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="alumni-network-title"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="section-label">Alumni Network</p>
            <span className="section-title-accent" aria-hidden="true" />
            <h2
              id="alumni-network-title"
              className="mt-4 text-3xl leading-tight text-[var(--color-ivory)] sm:text-4xl"
            >
              Stay Connected
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-ivory)]/70">
              From Lagos to Abuja and beyond, our alumni lead at major houses, launch
              their own brands, and mentor the next generation. Join the network to
              access events, career resources, and a community of peers.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#admissions"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                Get in Touch
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href="mailto:alumni@prudentialfashionacademy.com"
                className="inline-flex items-center rounded-full border border-[var(--color-charcoal)] px-6 py-3 text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-ivory)]/80 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                alumni@prudentialfashionacademy.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="relative bg-[var(--color-ivory)] px-6 py-20 text-[var(--color-noir)] lg:px-10 lg:py-24"
        aria-labelledby="alumni-stats-title"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            By the Numbers
          </motion.p>
          <span className="section-title-accent" aria-hidden="true" />
          <motion.h2
            id="alumni-stats-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl text-[var(--color-noir)] sm:text-4xl"
          >
            A Global Community
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid gap-8 sm:grid-cols-3"
          >
            {[
              { label: "Graduates", value: "12,000+" },
              { label: "Countries", value: "48" },
              { label: "Employment Rate", value: "95%" },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-[var(--color-noir)] pl-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-[var(--color-noir)] sm:text-3xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
