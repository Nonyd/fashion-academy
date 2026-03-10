"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import type { AlumniEvent } from "@/lib/data/alumni";

type Props = { event: AlumniEvent };

export default function RSVPCounter({ event }: Props) {
  const router = useRouter();
  const percent = Math.min(100, (event.rsvpCurrent / event.rsvpCapacity) * 100);

  const handleRSVP = () => {
    fetch("/api/alumni/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventSlug: event.slug }),
    })
      .then((res) => {
        if (res.status === 401) {
          router.push("/auth/login?redirect=/alumni/events/" + event.slug);
          return;
        }
        if (res.ok) {
          router.refresh();
        }
      })
      .catch(() => {});
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6">
      <p className="text-sm font-medium text-[var(--color-ivory)]">
        {event.rsvpCurrent} / {event.rsvpCapacity} RSVPs
      </p>
      <div className="mt-3">
        <ProgressBar percent={percent} />
      </div>
      <button
        type="button"
        onClick={handleRSVP}
        className="mt-6 w-full rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
      >
        RSVP Now
      </button>
      <p className="mt-3 text-[11px] text-[var(--color-muted)]">
        Login required to RSVP
      </p>
    </div>
  );
}
