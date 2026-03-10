import type { Metadata } from "next";
import Link from "next/link";
import {
  alumniStats,
  exploreCards,
  spotlightArticles,
  upcomingEvents,
  givingFunds,
  recentDonors,
} from "@/lib/data/alumni";
import AlumniStatCounter from "@/components/alumni/AlumniStatCounter";
import AlumniExploreCard from "@/components/alumni/AlumniExploreCard";
import SpotlightCard from "@/components/alumni/SpotlightCard";
import EventCard from "@/components/alumni/EventCard";
import FundCard from "@/components/alumni/FundCard";
import DonorFeed from "@/components/alumni/DonorFeed";
import Breadcrumb from "@/components/about/Breadcrumb";

export const metadata: Metadata = {
  title: "Alumni | Prudential Fashion Academy",
  description:
    "Join the PFA alumni network. Connect with graduates, give back, and stay connected.",
  openGraph: {
    title: "Alumni | Prudential Fashion Academy",
    description:
      "Join the PFA alumni network. Connect with graduates, give back, and stay connected.",
  },
};

export default function AlumniHubPage() {
  const topThreeEvents = upcomingEvents.slice(0, 3);
  const topThreeFunds = givingFunds.slice(0, 3);

  return (
    <>
      {/* SECTION 1 — PAGE HEADER */}
      <section
        className="relative flex min-h-[50vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="alumni-hub-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Alumni Network" },
            ]}
          />
          <p className="section-label">Alumni</p>
          <span className="section-title-accent" aria-hidden="true" />
          <h1
            id="alumni-hub-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            PFA Alumni
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            Once a designer, always family.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/alumni/register"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Join the Alumni Network
            </Link>
            <Link
              href="/alumni/give"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ivory)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Support a Student
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ANIMATED STAT COUNTERS */}
      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 lg:px-10 lg:py-20"
        aria-labelledby="alumni-stats-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="alumni-stats-title" className="sr-only">
            Alumni impact at a glance
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {alumniStats.map((stat) => (
              <AlumniStatCounter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — EXPLORE GRID */}
      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="explore-title"
      >
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Discover</p>
          <span className="section-title-accent" aria-hidden="true" />
          <h2
            id="explore-title"
            className="mt-4 text-3xl uppercase leading-tight text-[var(--color-ivory)] sm:text-4xl"
          >
            Explore
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreCards.map((card, i) => (
              <AlumniExploreCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED ALUMNI SPOTLIGHT */}
      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="spotlight-title"
      >
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Community</p>
          <span className="section-title-accent" aria-hidden="true" />
          <h2
            id="spotlight-title"
            className="mt-4 text-3xl uppercase leading-tight text-[var(--color-ivory)] sm:text-4xl"
          >
            Featured Alumni Spotlight
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {spotlightArticles.map((article) => (
              <SpotlightCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/alumni/news"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              All News & Stories
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — UPCOMING EVENTS */}
      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="events-title"
      >
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Calendar</p>
          <span className="section-title-accent" aria-hidden="true" />
          <h2
            id="events-title"
            className="mt-4 text-3xl uppercase leading-tight text-[var(--color-ivory)] sm:text-4xl"
          >
            Upcoming Events
          </h2>
          <div className="mt-12 space-y-6">
            {topThreeEvents.map((event) => (
              <EventCard key={event.slug} event={event} variant="list" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/alumni/events"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              All Events
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — GIVE BACK */}
      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="give-title"
      >
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Support</p>
          <span className="section-title-accent" aria-hidden="true" />
          <h2
            id="give-title"
            className="mt-4 text-3xl uppercase leading-tight text-[var(--color-ivory)] sm:text-4xl"
          >
            Give Back
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {topThreeFunds.map((fund) => (
              <FundCard key={fund.slug} fund={fund} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — RECENT DONORS */}
      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="donors-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="donors-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Recent Donors
          </h2>
          <div className="mt-8 max-w-md">
            <DonorFeed donors={recentDonors} />
          </div>
        </div>
      </section>
    </>
  );
}
