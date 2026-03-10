"use client";

import { useState } from "react";

type Props = { programmeOptions: string[] };

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

export function RegisterForm({ programmeOptions }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/alumni/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          regNumber: data.get("regNumber"),
          programme: data.get("programme"),
          graduationYear: data.get("graduationYear"),
          city: data.get("city"),
          country: data.get("country"),
          employer: data.get("employer") || undefined,
          jobTitle: data.get("jobTitle") || undefined,
          linkedIn: data.get("linkedIn") || undefined,
          mentor: data.get("mentor") === "on",
          listedInDirectory: data.get("listedInDirectory") === "on",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Something went wrong.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 p-8 text-center">
        <h3 className="text-xl font-semibold text-[var(--color-ivory)]">
          Welcome to the network
        </h3>
        <p className="mt-2 text-sm text-[var(--color-ivory)]/80">
          Your registration has been received. A welcome email will be sent to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          PFA REG Number *
        </label>
        <input
          type="text"
          name="regNumber"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Programme *
        </label>
        <select
          name="programme"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <option value="">Select programme</option>
          {programmeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Graduation Year *
        </label>
        <select
          name="graduationYear"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <option value="">Select year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Current City *
          </label>
          <input
            type="text"
            name="city"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Country *
          </label>
          <input
            type="text"
            name="country"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Current Employer / Company <span className="normal-case">(optional)</span>
        </label>
        <input
          type="text"
          name="employer"
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Current Job Title <span className="normal-case">(optional)</span>
        </label>
        <input
          type="text"
          name="jobTitle"
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          LinkedIn Profile URL <span className="normal-case">(optional)</span>
        </label>
        <input
          type="url"
          name="linkedIn"
          placeholder="https://linkedin.com/in/..."
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="mentor"
          className="h-4 w-4 rounded border-white/30 bg-white/5 text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
        />
        <span className="text-sm text-[var(--color-ivory)]/80">
          I would like to mentor current students
        </span>
      </label>
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="listedInDirectory"
          defaultChecked
          className="h-4 w-4 rounded border-white/30 bg-white/5 text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
        />
        <span className="text-sm text-[var(--color-ivory)]/80">
          I would like to be listed in the Alumni Directory
        </span>
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Join the Network"}
      </button>
    </form>
  );
}
