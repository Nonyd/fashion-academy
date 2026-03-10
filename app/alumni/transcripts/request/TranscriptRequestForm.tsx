"use client";

import { useState } from "react";

type Props = {
  processingFee: number;
  deliveryOptions: string[];
  programmeOptions: string[];
  purposeOptions: string[];
};

const DELIVERY_FEES: Record<string, number> = {
  "Email (PDF, certified)": 0,
  "Physical Pickup (Lagos)": 0,
  "Courier (Nigeria)": 4000,
  "Courier (International)": 20000,
};

export function TranscriptRequestForm({
  processingFee,
  deliveryOptions,
  programmeOptions,
  purposeOptions,
}: Props) {
  const [copies, setCopies] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryOptions[0] ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const deliveryFee = DELIVERY_FEES[deliveryMethod] ?? 0;
  const total = copies * processingFee + deliveryFee;
  const showAddress = deliveryMethod.toLowerCase().includes("courier");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/transcript-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          phone: data.get("phone"),
          regNumber: data.get("regNumber"),
          programme: data.get("programme"),
          graduationYear: data.get("graduationYear"),
          copies: Number(data.get("copies")),
          purpose: data.get("purpose"),
          deliveryMethod: data.get("deliveryMethod"),
          deliveryAddress: data.get("deliveryAddress") || undefined,
          notes: data.get("notes") || undefined,
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
      <div className="rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
          Request received
        </h2>
        <p className="mt-2 text-sm text-[var(--color-ivory)]/80">
          You will receive a confirmation email shortly. Proceed to payment when
          prompted to complete your transcript request.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
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
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          PFA REG Number * <span className="normal-case">(e.g. PFA-2022-FD-00045)</span>
        </label>
        <input
          type="text"
          name="regNumber"
          required
          placeholder="PFA-2022-FD-00045"
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Programme Studied *
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
          Year of Graduation *
        </label>
        <input
          type="number"
          name="graduationYear"
          required
          min="2000"
          max="2030"
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Number of Copies *
        </label>
        <input
          type="number"
          name="copies"
          required
          min={1}
          value={copies}
          onChange={(e) => setCopies(Number(e.target.value))}
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Purpose *
        </label>
        <select
          name="purpose"
          required
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <option value="">Select purpose</option>
          {purposeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Delivery Method *
        </label>
        <select
          name="deliveryMethod"
          required
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          {deliveryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {showAddress && (
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Delivery Address *
          </label>
          <textarea
            name="deliveryAddress"
            required={showAddress}
            rows={3}
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          />
        </div>
      )}
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Additional Notes <span className="normal-case">(optional)</span>
        </label>
        <textarea
          name="notes"
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/60 p-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]">
          Payment summary
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-ivory)]/80">
          <li className="flex justify-between">
            <span>Processing fee: ₦{processingFee.toLocaleString()} × {copies}</span>
            <span>₦{(processingFee * copies).toLocaleString()}</span>
          </li>
          <li className="flex justify-between">
            <span>Delivery fee</span>
            <span>{deliveryFee === 0 ? "₦0" : "₦" + deliveryFee.toLocaleString()}</span>
          </li>
          <li className="flex justify-between border-t border-white/10 pt-3 font-semibold text-[var(--color-ivory)]">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Proceed to Payment"}
      </button>
    </form>
  );
}
