"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Calendar } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export default function AdmissionsPageContent() {
  return (
    <>
      <PageHero
        label="Admissions"
        title="Your Journey Starts Here"
        description="Applications for the 2026 intake are now open. Join a global cohort of designers, strategists, and image makers ready to redefine fashion's future."
      />

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="how-to-apply-title"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="section-label">How to Apply</p>
            <span className="section-title-accent" aria-hidden="true" />
            <h2
              id="how-to-apply-title"
              className="mt-4 text-3xl text-[var(--color-ivory)] sm:text-4xl"
            >
              Application Process
            </h2>
            <ul className="mt-8 space-y-6 text-sm text-[var(--color-ivory)]/80">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-xs font-semibold text-[var(--color-gold)]">
                  1
                </span>
                <div>
                  <strong className="text-[var(--color-ivory)]">Submit your application</strong> — Complete the online form with your details and program of interest.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-xs font-semibold text-[var(--color-gold)]">
                  2
                </span>
                <div>
                  <strong className="text-[var(--color-ivory)]">Portfolio & documents</strong> — Upload your portfolio (where required) and supporting documents.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-xs font-semibold text-[var(--color-gold)]">
                  3
                </span>
                <div>
                  <strong className="text-[var(--color-ivory)]">Interview</strong> — Shortlisted candidates are invited for an interview (in person or online).
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-xs font-semibold text-[var(--color-gold)]">
                  4
                </span>
                <div>
                  <strong className="text-[var(--color-ivory)]">Offer & enrolment</strong> — Receive your offer and secure your place for the 2026 cohort.
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 grid gap-6 sm:grid-cols-2"
          >
            <a
              href="mailto:admissions@prudentialfashionacademy.com"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/60 p-6 transition-colors hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-charcoal)]/80"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]/20">
                <FileText className="h-6 w-6 text-[var(--color-gold)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--color-ivory)]">Download Prospectus</p>
                <p className="text-xs text-[var(--color-ivory)]/60">Request a copy via email</p>
              </div>
            </a>
            <a
              href="/contact"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/60 p-6 transition-colors hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-charcoal)]/80"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]/20">
                <Calendar className="h-6 w-6 text-[var(--color-gold)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--color-ivory)]">Open Days & Events</p>
                <p className="text-xs text-[var(--color-ivory)]/60">Visit us or join online</p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Apply Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <p className="mt-4 text-xs text-[var(--color-muted)]">
              Or email admissions@prudentialfashionacademy.com
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
