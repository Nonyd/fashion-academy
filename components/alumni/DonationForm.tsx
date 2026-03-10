"use client";

import { useState } from "react";

const AMOUNTS = [5000, 10000, 25000, 50000, 100000, 250000];
const FREQUENCIES = [
  { id: "once", label: "One-time" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "annually", label: "Annually" },
] as const;

type Props = { fundSlug: string; fundName: string };

function formatNaira(n: number): string {
  return "₦" + n.toLocaleString();
}

export default function DonationForm({ fundSlug, fundName }: Props) {
  const [amount, setAmount] = useState<number | null>(25000);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<(typeof FREQUENCIES)[number]["id"]>("once");
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dedication, setDedication] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const effectiveAmount = customAmount.trim()
    ? parseInt(customAmount.replace(/\D/g, ""), 10) || 0
    : amount ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount < 1000) return;
    setLoading(true);
    try {
      const res = await fetch("/api/alumni/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fundSlug,
          amount: effectiveAmount,
          frequency,
          anonymous,
          name: anonymous ? "" : name,
          email,
          dedication: dedication || undefined,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 p-8 text-center">
        <h3 className="text-xl font-semibold text-[var(--color-ivory)]">Thank you</h3>
        <p className="mt-2 text-sm text-[var(--color-ivory)]/80">
          Your donation has been received. A confirmation email will be sent to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Amount
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {AMOUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setAmount(n);
                setCustomAmount("");
              }}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                amount === n && !customAmount.trim()
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                  : "border-white/20 bg-white/5 text-[var(--color-ivory)] hover:border-[var(--color-gold)]/50"
              }`}
            >
              {n >= 1000 ? (n / 1000) + "k" : n}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <input
            type="text"
            placeholder="Custom amount (₦)"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(null);
            }}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Frequency
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFrequency(f.id)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                frequency === f.id
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                  : "border-white/20 bg-white/5 text-[var(--color-ivory)] hover:border-[var(--color-gold)]/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="h-4 w-4 rounded border-white/30 bg-white/5 text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
        />
        <span className="text-sm text-[var(--color-ivory)]/80">Give anonymously</span>
      </label>

      {!anonymous && (
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Name *
          </label>
          <input
            type="text"
            required={!anonymous}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Email *
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Dedication message (optional)
        </label>
        <textarea
          value={dedication}
          onChange={(e) => setDedication(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>

      <button
        type="submit"
        disabled={effectiveAmount < 1000 || loading}
        className="w-full rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-50"
      >
        {loading ? "Processing…" : `Donate ${formatNaira(effectiveAmount)}`}
      </button>
    </form>
  );
}
