import type { Metadata } from "next";
import { programmeOptions } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Join the Alumni Network | Alumni | Prudential Fashion Academy",
  description:
    "Stay connected. Give back. Inspire the next generation of fashion leaders.",
};

export default function AlumniRegisterPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="register-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Join the Network" },
            ]}
          />
          <h1
            id="register-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Join the PFA Alumni Network
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            Stay connected. Give back. Inspire the next generation.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="benefits-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="benefits-title"
            className="sr-only"
          >
            Benefits
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6">
              <span className="text-2xl" aria-hidden>🌐</span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-ivory)]">
                Global Network
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ivory)]/70">
                Connect with 2,400+ PFA graduates across Nigeria and the world.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6">
              <span className="text-2xl" aria-hidden>📅</span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-ivory)]">
                Exclusive Events
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ivory)]/70">
                Access alumni-only events, showcases, networking nights, and masterclasses.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-6">
              <span className="text-2xl" aria-hidden>🎓</span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-ivory)]">
                Give Back
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ivory)]/70">
                Mentor current students and fund scholarships that change lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="form-title"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            id="form-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Registration form
          </h2>
          <RegisterForm programmeOptions={programmeOptions} />
        </div>
      </section>
    </>
  );
}
