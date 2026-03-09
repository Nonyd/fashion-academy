"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, LayoutDashboard, ArrowRight } from "lucide-react";

const cards = [
  {
    id: "student",
    icon: GraduationCap,
    title: "Student Portal",
    body:
      "Track your scores and GPA, upload course projects, monitor your academic performance, manage payments, and access your unique PFA registration number — all in one place.",
    href: "/auth/login",
    cta: "Login as Student →",
    delay: 0,
  },
  {
    id: "teacher",
    icon: BookOpen,
    title: "Teacher Portal",
    body:
      "Manage your courses, publish student scores, review and give feedback on submitted projects, and monitor the academic progress of every student in your class.",
    href: "/auth/login",
    cta: "Login as Teacher →",
    delay: 0.1,
  },
  {
    id: "management",
    icon: LayoutDashboard,
    title: "Management Portal",
    body:
      "Full academy oversight — manage admissions, track applications and payments, oversee all students and faculty, run reports, and control automated academy communications.",
    href: "/auth/login",
    cta: "Login as Management →",
    delay: 0.2,
  },
] as const;

export default function PortalEcosystem() {
  return (
    <section
      className="border-y border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
      aria-labelledby="ecosystem-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl space-y-3"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Digital Experience
          </p>
          <h2
            id="ecosystem-title"
            className="text-3xl leading-[1.1] text-[var(--color-ivory)] sm:text-4xl"
          >
            A Complete Learning Ecosystem
          </h2>
          <p className="text-sm text-[var(--color-ivory)]/70">
            Prudential Fashion Academy gives every member of our community their
            own dedicated digital space — built for focus, clarity, and
            excellence.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <PortalCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = (typeof cards)[number];

function PortalCard({ icon: Icon, title, body, href, cta, delay }: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6 shadow-[var(--shadow-subtle)] backdrop-blur"
    >
      <div className="space-y-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/30 bg-black/40 text-[var(--color-gold)]">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <h3 className="text-lg text-[var(--color-ivory)]">{title}</h3>
        <p className="text-sm text-[var(--color-ivory)]/70">{body}</p>
      </div>
      <a
        href={href}
        className="mt-6 inline-flex items-center text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)]"
      >
        <span className="underline-offset-4 group-hover:underline">{cta}</span>
        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.article>
  );
}

