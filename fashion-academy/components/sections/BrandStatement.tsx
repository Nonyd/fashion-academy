"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Graduates", value: "12,000+" },
  { label: "Countries Represented", value: "48" },
  { label: "Employment Rate", value: "95%" },
];

export default function BrandStatement() {
  return (
    <section
      id="admissions"
      className="relative border-y border-[var(--color-charcoal)] bg-[var(--color-ivory)] px-6 py-20 text-[var(--color-noir)] sm:py-24 lg:px-10"
      aria-label="Brand statement and outcomes"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.04),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-multiply [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-3xl text-3xl leading-[1.15] sm:text-4xl md:text-[3.3rem]"
        >
          <span className="pointer-events-none absolute -left-6 -top-10 text-7xl text-[var(--color-gold)]/35 sm:-left-10 sm:-top-12 sm:text-8xl">
            “
          </span>
          <p className="whitespace-pre-line pl-4 sm:pl-6">
            {`Fashion is not just clothing.\nIt is culture, identity, and the future.`}
          </p>
        </motion.blockquote>

        <motion.dl
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid flex-1 grid-cols-1 gap-6 text-sm sm:grid-cols-3 lg:border-l lg:border-[var(--color-charcoal)] lg:pl-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1 text-left sm:text-left lg:text-right">
              <dt className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-muted)]">
                {stat.label}
              </dt>
              <dd className="text-2xl font-semibold tracking-[0.16em]">
                <AnimatedCounter displayValue={stat.value} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

type AnimatedCounterProps = {
  displayValue: string;
};

function AnimatedCounter({ displayValue }: AnimatedCounterProps) {
  const numericPart = parseInt(displayValue.replace(/[^\d]/g, ""), 10);
  const suffix = displayValue.replace(/[\d]/g, "");

  return (
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.6 }}
      aria-label={displayValue}
    >
      <span>{numericPart.toLocaleString()}</span>
      <span>{suffix}</span>
    </motion.span>
  );
}

