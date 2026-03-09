"use client";

import { motion } from "framer-motion";
import { events } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";

const typeColors: Record<string, string> = {
  Workshop: "bg-[var(--color-gold)]/20 text-[var(--color-gold)]",
  Runway: "bg-[var(--color-ivory)]/10 text-[var(--color-ivory)]",
  Masterclass: "bg-[var(--color-gold)]/15 text-[var(--color-gold-light)]",
};

export default function EventsPageContent() {
  return (
    <>
      <PageHero
        label="Events"
        title="Open Days, Runways & Masterclasses"
        description="Join us for virtual open days, graduate runway shows, and masterclasses with industry leaders."
      />

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="events-list-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="events-list-title" className="sr-only">
            Upcoming events
          </h2>
          <ul className="space-y-4">
            {events.map((event, index) => (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-[var(--color-charcoal)]/60 p-6 transition-colors hover:border-white/15 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl font-semibold tabular-nums text-[var(--color-gold)]">
                    {event.dateLabel}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-ivory)]">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-ivory)]/70">
                      {event.location}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full border border-current px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] ${
                    typeColors[event.type] ?? "bg-white/10 text-[var(--color-ivory)]"
                  }`}
                >
                  {event.type}
                </span>
              </motion.li>
            ))}
          </ul>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center text-sm text-[var(--color-muted)]"
          >
            For more events and to register, contact{" "}
            <a
              href="mailto:admissions@prudentialfashionacademy.com"
              className="text-[var(--color-gold)] hover:underline"
            >
              admissions@prudentialfashionacademy.com
            </a>
          </motion.p>
        </div>
      </section>
    </>
  );
}
