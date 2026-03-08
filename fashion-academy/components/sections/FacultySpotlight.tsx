"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { faculty } from "@/lib/data";

export default function FacultySpotlight() {
  return (
    <section
      id="faculty"
      className="border-y border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
      aria-labelledby="faculty-title"
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
              Faculty
            </p>
            <h2
              id="faculty-title"
              className="mt-2 text-3xl leading-[1.1] text-[var(--color-ivory)] sm:text-4xl"
            >
              Learn From Industry Legends
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--color-ivory)]/70">
            Our mentors have shaped runways, campaigns, and institutions across
            Paris, New York, Lagos, and beyond—bringing decades of experience
            directly into the studio.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((person) => (
            <motion.article
              key={person.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="group overflow-hidden rounded-3xl border border-white/8 bg-[var(--color-charcoal)]/80 p-4 shadow-[var(--shadow-subtle)] backdrop-blur"
            >
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={person.imageUrl}
                  alt={person.name}
                  fill
                  sizes="(min-width: 1024px) 220px, 50vw"
                  className="h-full w-full transform object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
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
  );
}

