"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

const campuses = [
  { city: "Lagos", areas: "Egbeda, Ajah, Ojodu" },
  { city: "Abuja", areas: "" },
];

export default function ContactPageContent() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Get in Touch"
        description="Visit us in Lagos or Abuja, or reach out by email or phone. We're here to help."
      />

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="contact-details-title"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label">Campuses</p>
              <span className="section-title-accent" aria-hidden="true" />
              <h2 id="contact-details-title" className="mt-4 text-2xl text-[var(--color-ivory)] sm:text-3xl">
                Lagos · Abuja
              </h2>
              <ul className="mt-6 space-y-4">
                {campuses.map((c) => (
                  <li key={c.city} className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                    <div>
                      <p className="font-semibold text-[var(--color-ivory)]">{c.city}</p>
                      {c.areas && (
                        <p className="text-sm text-[var(--color-ivory)]/70">{c.areas}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
                  General & Admissions
                </p>
                <a
                  href="mailto:admissions@prudentialfashionacademy.com"
                  className="mt-2 flex items-center gap-3 text-sm text-[var(--color-ivory)] hover:text-[var(--color-gold)]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  admissions@prudentialfashionacademy.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
                  Alumni
                </p>
                <a
                  href="mailto:alumni@prudentialfashionacademy.com"
                  className="mt-2 flex items-center gap-3 text-sm text-[var(--color-ivory)] hover:text-[var(--color-gold)]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  alumni@prudentialfashionacademy.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
                  Phone
                </p>
                <a
                  href="tel:+2340000000000"
                  className="mt-2 flex items-center gap-3 text-sm text-[var(--color-ivory)] hover:text-[var(--color-gold)]"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +234 000 000 0000
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/60 p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold text-[var(--color-ivory)]">
              Send a message
            </h3>
            <p className="mt-2 text-sm text-[var(--color-ivory)]/70">
              For enquiries, use the email links above or the form below. We typically respond within 2–3 business days.
            </p>
            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  placeholder="your@email.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  placeholder="Your message"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  Send message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
