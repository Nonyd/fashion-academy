"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";

export default function ProgramsPageContent() {
  return (
    <>
      <PageHero
        label="Programs"
        title="Disciplines of Excellence"
        description="From design to strategy, our programs are crafted for the next generation of fashion leaders. Study in Lagos, Abuja, or online."
      />

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="programs-list-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="programs-list-title" className="sr-only">
            All programs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/8 bg-[var(--color-charcoal)]/60 transition-colors hover:border-white/15"
              >
                <div className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={program.imageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ivory)]/90 backdrop-blur">
                        {program.category}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--color-ivory)]">
                        {program.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-[var(--color-ivory)]/70">
                      {program.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                      <span>{program.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{program.mode}</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-gold)] group-hover:gap-3 transition-[gap]">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Apply Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
