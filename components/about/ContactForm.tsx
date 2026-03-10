"use client";

import { useState } from "react";

const SUBJECT_OPTIONS = [
  "Admissions",
  "Academic",
  "Fees",
  "General",
  "Complaint",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0 max-w-xl space-y-4">
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Name *
        </span>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="Your name"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Email *
        </span>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="you@example.com"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Phone
        </span>
        <input
          type="tel"
          name="phone"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="+234 800 000 0000"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Subject *
        </span>
        <select
          name="subject"
          required
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none"
        >
          <option value="">Select</option>
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Message *
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="Your message"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[var(--color-gold)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
      {status === "done" && (
        <p className="text-sm text-[var(--color-gold)]">
          Thank you. Your message has been received.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
