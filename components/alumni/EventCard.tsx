import Link from "next/link";
import type { AlumniEvent } from "@/lib/data/alumni";
import ProgressBar from "./ProgressBar";

type Props = {
  event: AlumniEvent;
  variant?: "grid" | "list";
};

export default function EventCard({ event, variant = "list" }: Props) {
  const rsvpPercent = Math.min(100, (event.rsvpCurrent / event.rsvpCapacity) * 100);

  if (variant === "grid") {
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6 transition-colors hover:border-[var(--color-gold)]/30 sm:flex-row sm:items-center">
        <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-[var(--color-gold)]/30 bg-black/40 px-6 py-4 text-center">
          <span className="text-3xl font-bold tabular-nums text-[var(--color-gold)]">
            {event.dateDay}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {event.dateMonth}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[var(--color-ivory)]">{event.title}</h3>
          <p className="mt-1 text-sm text-[var(--color-ivory)]/70">
            {event.time} · {event.venue}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {event.organiser}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xs text-[var(--color-ivory)]/80">
              {event.rsvpCurrent} / {event.rsvpCapacity} RSVPs
            </span>
            <span
              className={
                event.priceNumeric === 0
                  ? "rounded-full bg-[var(--color-gold)]/20 px-2 py-0.5 text-[10px] font-medium uppercase text-[var(--color-gold)]"
                  : "text-[11px] text-[var(--color-muted)]"
              }
            >
              {event.price}
            </span>
          </div>
          <Link
            href={`/alumni/events/${event.slug}`}
            className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            RSVP
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6 transition-colors hover:border-[var(--color-gold)]/30 sm:flex-row sm:items-center">
      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-[var(--color-gold)]/30 bg-black/40 px-6 py-4 text-center">
        <span className="text-3xl font-bold tabular-nums text-[var(--color-gold)]">
          {event.dateDay}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {event.dateMonth}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-[var(--color-ivory)]">{event.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-ivory)]/70">
          {event.time} · {event.venue}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {event.organiser}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-xs text-[var(--color-ivory)]/80">
            {event.rsvpCurrent} / {event.rsvpCapacity} RSVPs
          </span>
          <span
            className={
              event.priceNumeric === 0
                ? "rounded-full bg-[var(--color-gold)]/20 px-2 py-0.5 text-[10px] font-medium uppercase text-[var(--color-gold)]"
                : "text-[11px] text-[var(--color-muted)]"
            }
          >
            {event.price}
          </span>
        </div>
        <Link
          href={`/alumni/events/${event.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          RSVP
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
