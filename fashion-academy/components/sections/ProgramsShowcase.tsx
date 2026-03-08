"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { programs } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramsShowcase() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!trackRef.current || !sectionRef.current) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll =
        track.scrollWidth - sectionRef.current!.clientWidth + 120;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative border-y border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 lg:px-10 lg:py-24"
      aria-labelledby="programs-title"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:gap-16">
        <div className="max-w-xl space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-gold)]"
          >
            Programs
          </motion.p>
          <motion.h2
            id="programs-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl leading-[1.1] text-[var(--color-ivory)] sm:text-4xl"
          >
            Disciplines of Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-[var(--color-ivory)]/70"
          >
            From haute couture ateliers to digital fashion labs, our programs are
            designed with industry partners to mirror the realities of today&apos;s
            global fashion landscape.
          </motion.p>
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
        <div className="lg:hidden">
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div ref={trackRef} className="flex gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  program: (typeof programs)[number];
};

function ProgramCard({ program }: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="group relative min-w-[240px] max-w-xs flex-1 overflow-hidden rounded-3xl border border-white/8 bg-[var(--color-charcoal)]/70 shadow-[var(--shadow-subtle)] backdrop-blur"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={program.imageUrl}
          alt={program.name}
          fill
          sizes="(min-width: 1024px) 320px, 240px"
          className="transform object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/0" />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-[var(--color-gold)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] backdrop-blur">
          {program.category}
        </span>
      </div>
      <div className="flex flex-col gap-3 px-4 py-4">
        <h3 className="text-lg text-[var(--color-ivory)]">{program.name}</h3>
        <p className="text-xs text-[var(--color-ivory)]/70">
          {program.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ivory)]/70">
          <span className="rounded-full border border-white/15 px-3 py-1">
            {program.duration}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1">
            {program.mode}
          </span>
        </div>
        <button
          type="button"
          className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)]"
        >
          <span>Discover</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}

