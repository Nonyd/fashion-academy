"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DEADLINE = new Date("2026-08-01T23:59:59Z").getTime();

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(DEADLINE - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function ApplicationCTA() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const id = window.setInterval(
      () => setTimeLeft(calculateTimeLeft()),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="admissions-cta"
      className="relative overflow-hidden border-y border-[var(--color-charcoal)] bg-[var(--color-gold)] px-6 py-20 text-[var(--color-noir)] lg:px-10 lg:py-24"
      aria-labelledby="application-cta-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f7e7bd,transparent_55%),radial-gradient(circle_at_bottom_right,#b38e27,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-noir)]/70">
            Applications
          </p>
          <h2
            id="application-cta-title"
            className="text-3xl leading-[1.1] sm:text-4xl md:text-[2.6rem]"
          >
            Your Journey Starts Here
          </h2>
          <p className="max-w-md text-sm text-[var(--color-noir)]/80">
            Applications for the 2026 intake are now open. Join a global cohort
            of designers, strategists, and image makers ready to redefine
            fashion&apos;s future.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="#admissions"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-noir)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-noir)]/40"
            >
              Apply Now
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-noir)]/40 bg-transparent px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-noir)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-noir)]/40"
            >
              Download Prospectus
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 rounded-3xl border border-[var(--color-noir)]/15 bg-[rgba(10,10,10,0.08)] p-5 shadow-[0_16px_40px_rgba(120,90,20,0.25)] backdrop-blur"
        >
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-[var(--color-noir)]/70">
            Next intake closes in
          </p>
          <div className="grid grid-cols-4 gap-2 text-center text-[var(--color-noir)]">
            {([
              ["Days", timeLeft.days],
              ["Hours", timeLeft.hours],
              ["Minutes", timeLeft.minutes],
              ["Seconds", timeLeft.seconds],
            ] as const).map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-[rgba(255,255,255,0.6)] px-3 py-3"
              >
                <p className="text-lg font-semibold tabular-nums">
                  {value.toString().padStart(2, "0")}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

