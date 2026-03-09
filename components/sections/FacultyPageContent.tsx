"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { faculty } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";

export default function FacultyPageContent() {
  return (
    <>
      <PageHero
        label="Faculty"
        title="Learn From Industry Legends"
        description="Our mentors have shaped runways, campaigns, and institutions across Lagos, Abuja, and beyond—bringing decades of experience directly into the studio."
      />

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="faculty-list-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="faculty-list-title" className="sr-only">
            Faculty members
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.map((person, index) => (
              <motion.article
                key={person.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group overflow-hidden rounded-3xl border border-white/8 bg-[var(--color-charcoal)]/80 p-4 shadow-[var(--shadow-subtle)] backdrop-blur"
              >
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={person.imageUrl}
                    alt={person.name}
                    fill
                    sizes="(min-width: 1024px) 220px, 50vw"
                    className="h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-ivory)]">
                  {person.name}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-ivory)]/75">
                  {person.title}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  {person.formerBrand}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
