"use client";

import { motion } from "framer-motion";
import { events } from "@/lib/data";

export default function EventsCalendar() {
  return (
    <section
      id="events"
      className="border-y border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
      aria-labelledby="events-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Calendar
            </p>
            <h2
              id="events-title"
              className="mt-2 text-3xl leading-[1.1] text-[var(--color-ivory)] sm:text-4xl"
            >
              Upcoming Events
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--color-ivory)]/70">
            Experience the academy through virtual open days, runway shows, and
            intimate masterclasses with visiting designers.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[var(--color-charcoal)]/80 p-5 shadow-[var(--shadow-subtle)]"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-gold)]">
                  {event.dateLabel}
                </p>
                <h3 className="mt-3 text-base text-[var(--color-ivory)]">
                  {event.title}
                </h3>
                <p className="mt-2 text-xs text-[var(--color-ivory)]/70">
                  {event.location}
                </p>
                <span className="mt-3 inline-flex rounded-full border border-white/18 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ivory)]/75">
                  {event.type}
                </span>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full rounded-full border border-[var(--color-gold)] bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-noir)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
                >
                  Register
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

