import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/about/Breadcrumb";
import StatBadge from "@/components/about/StatBadge";
import { SIDEBAR_OVERVIEW, SIDEBAR_OPERATIONS } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About | Prudential Fashion Academy",
  description:
    "Prudential Fashion Academy, Est. 2020. The bedrock for nurturing global fashion creatives. Lagos, Abuja.",
  openGraph: {
    title: "About | Prudential Fashion Academy",
    description: "The bedrock for nurturing global fashion creatives. Est. 2020.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <h1 className="mt-2 text-4xl font-semibold text-[var(--color-ivory)] sm:text-5xl">
        About Prudential Fashion Academy
      </h1>
      <p
        className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-gold)] sm:text-sm"
        aria-hidden
      >
        Creativity · Excellence · Identity
      </p>

      <section className="mt-16 grid w-full min-w-0 gap-12 md:grid-cols-2" aria-label="About directory">
        <div>
          <h2 className="mb-6 border-b-2 border-[var(--color-gold)] pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]">
            Overview
          </h2>
          <ul className="space-y-2">
            {SIDEBAR_OVERVIEW.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-[var(--color-ivory)]/90 transition-colors hover:text-[var(--color-gold)]"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-6 border-b-2 border-[var(--color-gold)] pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]">
            Operations
          </h2>
          <ul className="space-y-2">
            {SIDEBAR_OPERATIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-[var(--color-ivory)]/90 transition-colors hover:text-[var(--color-gold)]"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20 grid w-full min-w-0 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16" aria-label="Introduction">
        <div className="min-w-0 w-full">
          <p className="text-sm leading-relaxed text-[var(--color-ivory)]/90">
            Prudential Fashion Academy is a world-class fashion institution dedicated to producing
            the next generation of global fashion designers, stylists, and brand leaders. With a
            curriculum that bridges creativity and commerce, we equip our students with the skills
            to lead in one of the world&apos;s most dynamic industries.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ivory)]/90">
            Located in Lagos, Nigeria — Africa&apos;s fashion capital — our academy offers a dynamic
            learning environment with industry-connected faculty, state-of-the-art design studios,
            and a global community of fashion professionals.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StatBadge label="Est. 2020" />
            <StatBadge label="Lagos, Nigeria" />
            <StatBadge label="Internationally Accredited" />
          </div>
          <Link
            href="/about/history"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)]"
          >
            Read Our Full Story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative aspect-[4/3] min-w-0 w-full overflow-hidden rounded-xl bg-white/5">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
            alt="Fashion academy atelier"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </section>
    </>
  );
}
