import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { upcomingEvents } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import RSVPCounter from "@/components/alumni/RSVPCounter";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return upcomingEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = upcomingEvents.find((e) => e.slug === slug);
  if (!event) return { title: "Event | Alumni | PFA" };
  return {
    title: `${event.title} | Alumni Events | Prudential Fashion Academy`,
    description: event.description ?? `${event.title} — ${event.venue}`,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = upcomingEvents.find((e) => e.slug === slug);
  if (!event) notFound();

  const dateLabel = `${event.dateDay} ${event.dateMonth}`;

  return (
    <>
      <section
        className="relative border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 pt-28 lg:px-10 lg:py-20 lg:pt-36"
        aria-labelledby="event-title"
      >
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Events", href: "/alumni/events" },
              { label: event.title },
            ]}
          />
          <h1
            id="event-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl"
          >
            {event.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            {dateLabel} · {event.time}
          </p>
        </div>
      </section>

      {event.bannerImage ? (
        <section className="relative h-64 w-full overflow-hidden bg-[var(--color-charcoal)] md:h-80">
          <img
            src={event.bannerImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </section>
      ) : (
        <section
          className="flex h-48 items-center justify-center bg-[var(--color-charcoal)] md:h-64"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Event
          </span>
        </section>
      )}

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="about-event-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="about-event-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            About this event
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/80">
            {event.description ??
              `${event.title} takes place at ${event.venue}. Join fellow PFA alumni for this occasion.`}
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="details-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="details-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Details
          </h2>
          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Venue
              </dt>
              <dd className="mt-1 text-sm text-[var(--color-ivory)]">
                {event.venue}
                {!event.venue.toLowerCase().includes("online") && (
                  <> · <a href="#" className="text-[var(--color-gold)] hover:underline">Google Maps</a></>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Organiser
              </dt>
              <dd className="mt-1 text-sm text-[var(--color-ivory)]">{event.organiser}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Audience
              </dt>
              <dd className="mt-1 text-sm text-[var(--color-ivory)]">{event.audience ?? "All PFA Alumni"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Registration
              </dt>
              <dd className="mt-1 text-sm text-[var(--color-ivory)]">{event.registration ?? event.price}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="rsvp-title"
      >
        <div className="mx-auto max-w-md">
          <h2 id="rsvp-title" className="sr-only">
            RSVP
          </h2>
          <RSVPCounter event={event} />
        </div>
      </section>

      <section className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/alumni/events"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            ← Back to Events
          </Link>
        </div>
      </section>
    </>
  );
}
