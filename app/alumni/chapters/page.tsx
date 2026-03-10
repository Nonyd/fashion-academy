import type { Metadata } from "next";
import Link from "next/link";
import { chapters } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";

export const metadata: Metadata = {
  title: "Alumni Chapters | Prudential Fashion Academy",
  description:
    "PFA alumni communities across Nigeria and beyond.",
};

export default function AlumniChaptersPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="chapters-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Chapters" },
            ]}
          />
          <h1
            id="chapters-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Alumni Chapters
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            PFA alumni communities across Nigeria and beyond.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="intro"
      >
        <div className="mx-auto max-w-6xl">
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/80">
            Our chapter network brings together PFA graduates by city, region, and country.
            Chapters host networking events, mentorship programmes, and support current
            students. Find your community below.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-label="Chapters list"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => (
              <article
                key={ch.slug}
                className="flex flex-col rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6 transition-colors hover:border-[var(--color-gold)]/30"
              >
                <h3 className="text-lg font-semibold text-[var(--color-ivory)]">
                  {ch.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ivory)]/70">
                  {ch.location}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {ch.members} members
                </p>
                <p className="mt-2 text-xs text-[var(--color-ivory)]/80">
                  Chapter President: {ch.president}
                </p>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  View Chapter
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-16 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 p-8 text-center">
            <p className="text-sm text-[var(--color-ivory)]/90">
              Don&apos;t see your city?
            </p>
            <Link
              href="mailto:alumni@prudentialfashionacademy.com?subject=Start a new chapter"
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Start a new chapter
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
