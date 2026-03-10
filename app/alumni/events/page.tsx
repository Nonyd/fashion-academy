import type { Metadata } from "next";
import Link from "next/link";
import { upcomingEvents } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import EventCard from "@/components/alumni/EventCard";

export const metadata: Metadata = {
  title: "Alumni Events | Prudential Fashion Academy",
  description:
    "Fashion showcases, reunions, networking nights, and masterclasses for PFA alumni.",
};

export default function AlumniEventsPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="events-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Events" },
            ]}
          />
          <h1
            id="events-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Alumni Events
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            Fashion showcases, reunions, networking nights, and masterclasses.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="all-events-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="all-events-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            All Events
          </h2>
          <ul className="mt-12 space-y-6">
            {upcomingEvents.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} variant="list" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
