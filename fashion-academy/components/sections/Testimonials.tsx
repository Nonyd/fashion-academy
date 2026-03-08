"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/lib/data";

const AUTOPLAY_INTERVAL = 5000;

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      className="border-y border-[var(--color-charcoal)] bg-[var(--color-ivory)] px-6 py-20 text-[var(--color-noir)] lg:px-10 lg:py-24"
      aria-labelledby="testimonials-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-multiply [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Voices of the Atelier
          </p>
          <h2
            id="testimonials-title"
            className="mt-3 text-3xl leading-[1.1] sm:text-4xl"
          >
            Testimonials
          </h2>
        </motion.div>

        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-[var(--color-ivory)]/90 p-6 shadow-[0_18px_45px_rgba(15,15,15,0.18)] sm:p-10">
          <AnimatePresence mode="wait">
            <motion.figure
              key={testimonials[index].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-black/10">
                  <Image
                    src={testimonials[index].imageUrl}
                    alt={testimonials[index].name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium">
                    {testimonials[index].name}{" "}
                    <span className="ml-1 text-xs text-[var(--color-muted)]">
                      {testimonials[index].country}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {testimonials[index].program}
                  </p>
                </div>
              </div>
              <blockquote className="text-sm leading-relaxed text-[var(--color-noir)]/80 sm:text-base">
                “{testimonials[index].quote}”
              </blockquote>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                className="group flex items-center gap-1 focus:outline-none"
                aria-label={`Show testimonial ${i + 1}`}
              >
                <span
                  className={`h-2 w-2 rounded-full border border-black/20 transition-colors ${
                    i === index
                      ? "bg-black"
                      : "bg-transparent group-hover:bg-black/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

