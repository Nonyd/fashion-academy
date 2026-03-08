"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headlineWords = ["Where", "Vision", "Becomes", "Fashion"];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaWrapperRef = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!mediaWrapperRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(mediaWrapperRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: mediaWrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-noir)]"
      aria-labelledby="hero-heading"
    >
      <div
        ref={mediaWrapperRef}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            className="hidden h-full w-full object-cover sm:block"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80"
          >
            <source
              src="https://videos.pexels.com/video-files/6311642/6311642-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <Image
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80"
            alt="Editorial runway show at Prudential Fashion Academy"
            fill
            className="object-cover sm:hidden"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/90" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-28 pb-24 lg:flex-row lg:items-end lg:gap-20 lg:px-10">
        <div className="max-w-xl space-y-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Est. 20XX · Milan · New York · Lagos
          </p>
          <h1
            id="hero-heading"
            className="text-4xl leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl lg:text-[4.8rem]"
          >
            {headlineWords.map((word, index) => (
              <motion.span
                key={word}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.5 + index * 0.15,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block overflow-hidden pr-2"
              >
                <span className="inline-block">{word}</span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="max-w-md text-sm leading-relaxed text-[var(--color-ivory)]/75 sm:text-base"
          >
            The world&apos;s most immersive fashion education. Online and
            on-campus. Crafted for visionary designers, creative directors, and
            future leaders of luxury.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#programs"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-noir)] shadow-[var(--shadow-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
            >
              Explore Programs
            </a>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-black/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-black/40">
                <Play className="h-3 w-3 fill-[var(--color-ivory)] text-[var(--color-ivory)]" />
              </span>
              Watch Our Story
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-4 flex w-full flex-col gap-6 text-xs text-[var(--color-ivory)]/70 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:w-72"
        >
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Immersive campuses
            </p>
            <p>Milan · New York · Lagos · Online Studio</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Next intake
            </p>
            <p>Applications for the 2025 cohort are now open.</p>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--color-ivory)]/60"
        >
          <span>Scroll</span>
          <span className="h-10 w-px overflow-hidden bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent">
            <span className="block h-10 w-px animate-[scroll-indicator_1.6s_ease-in-out_infinite] bg-[var(--color-gold)]" />
          </span>
        </motion.div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="absolute right-6 top-6 rounded-full border border-white/30 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            Close
          </button>
          <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-black">
            <video
              className="h-full w-full object-cover"
              controls
              autoPlay
              muted
            >
              <source
                src="https://videos.pexels.com/video-files/6311642/6311642-uhd_2560_1440_25fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

