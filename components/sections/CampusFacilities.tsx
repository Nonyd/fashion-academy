"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X } from "lucide-react";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1558769132-cb1aeaede033?auto=format&fit=crop&w=1600&q=80";
const FACILITIES_VIDEO =
  "https://videos.pexels.com/video-files/6311642/6311642-uhd_2560_1440_25fps.mp4";

export default function CampusFacilities() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      id="facilities"
      className="relative min-h-[70vh] overflow-hidden border-y border-[var(--color-charcoal)]"
      aria-labelledby="facilities-title"
    >
      <div className="absolute inset-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-[var(--color-noir)]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-noir)]/95 via-[var(--color-noir)]/80 to-[var(--color-noir)]/60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Campus
          </p>
          <h2
            id="facilities-title"
            className="mt-3 text-3xl leading-[1.15] text-[var(--color-ivory)] sm:text-4xl lg:text-[2.75rem]"
          >
            State of the Art Facilities
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[var(--color-ivory)]/80">
            Our Lagos and Abuja campuses are equipped with professional ateliers,
            design studios, photography labs, and collaborative spaces built for
            the next generation of fashion creatives. From cutting-edge technology
            to traditional craft rooms, PFA delivers an environment where vision
            meets execution.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ivory)]/70">
            Experience our studios, workshops, and show spaces—where students
            bring collections to life and industry partners connect with emerging
            talent.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="shrink-0"
        >
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className="group flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)] shadow-[0_0_0_0_rgba(201,168,76,0.4)] transition-all duration-300 hover:bg-[var(--color-gold)]/25 hover:shadow-[0_0_40px_12px_rgba(201,168,76,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-noir)]"
            aria-label="Play facilities video"
          >
            <Play className="h-10 w-10 fill-current pl-1 text-[var(--color-gold)] transition group-hover:scale-110" />
          </button>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.28em] text-[var(--color-ivory)]/70">
            Watch the tour
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Facilities video"
            onClick={() => setShowVideo(false)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowVideo(false);
              }}
              className="absolute right-6 top-6 z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="h-full w-full object-cover"
                controls
                autoPlay
                muted
                playsInline
              >
                <source src={FACILITIES_VIDEO} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
