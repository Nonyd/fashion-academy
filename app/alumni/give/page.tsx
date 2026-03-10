import type { Metadata } from "next";
import Link from "next/link";
import {
  givingFunds,
  recentDonors,
} from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import FundCard from "@/components/alumni/FundCard";
import DonorFeed from "@/components/alumni/DonorFeed";

export const metadata: Metadata = {
  title: "Give Back | Alumni | Prudential Fashion Academy",
  description:
    "Your gift shapes the next generation of fashion leaders. Support PFA scholarships and programmes.",
};

export default function GiveHubPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="give-hub-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Give" },
            ]}
          />
          <h1
            id="give-hub-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Give Back to PFA
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            Your gift shapes the next generation of fashion leaders.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/alumni/register"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Join the Alumni Network
            </Link>
            <Link
              href="/alumni"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ivory)] transition-colors hover:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Support a Student
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 lg:px-10 lg:py-20"
        aria-labelledby="impact-summary"
      >
        <div className="mx-auto max-w-6xl">
          <p
            id="impact-summary"
            className="max-w-3xl text-base font-semibold leading-relaxed text-[var(--color-ivory)] sm:text-lg"
          >
            PFA alumni and friends have raised ₦18,500,000 to date, funding 28
            scholarships and upgrading our design studios. 274+ donors have made
            this possible.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="funds-title"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="funds-title"
            className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
          >
            Funds
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {givingFunds.map((fund) => (
              <FundCard key={fund.slug} fund={fund} />
            ))}
          </div>
        </div>
      </section>

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
