import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  givingFunds,
  impactStories,
  fundDonorsBySlug,
} from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import ProgressBar from "@/components/alumni/ProgressBar";
import DonationForm from "@/components/alumni/DonationForm";
import DonorFeed from "@/components/alumni/DonorFeed";

type Props = { params: Promise<{ fund: string }> };

const FUND_SLUGS = ["student-scholarship", "studio-equipment", "emergency-support", "general-fund"];

export async function generateStaticParams() {
  return FUND_SLUGS.map((fund) => ({ fund }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { fund: slug } = await params;
  const fund = givingFunds.find((f) => f.slug === slug);
  if (!fund) return { title: "Give | Alumni | PFA" };
  return {
    title: `${fund.name} | Give | Alumni | Prudential Fashion Academy`,
    description: fund.description,
  };
}

export default async function FundPage({ params }: Props) {
  const { fund: slug } = await params;
  const fund = givingFunds.find((f) => f.slug === slug);
  if (!fund) notFound();

  const percent = Math.min(100, (fund.raised / fund.goal) * 100);
  const stories = impactStories[slug] ?? [];
  const donors = fundDonorsBySlug[slug] ?? [];

  return (
    <>
      <section
        className="relative border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 pt-28 lg:px-10 lg:py-20 lg:pt-36"
        aria-labelledby="fund-title"
      >
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Give", href: "/alumni/give" },
              { label: fund.name },
            ]}
          />
          <h1
            id="fund-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl"
          >
            {fund.name}
          </h1>
          <div className="mt-8">
            <ProgressBar percent={percent} />
            <p className="mt-2 text-sm text-[var(--color-ivory)]/80">
              ₦{fund.raised.toLocaleString()} raised of ₦{fund.goal.toLocaleString()} goal · {fund.donors} donors
            </p>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-ivory)]/80">
            {fund.description}
          </p>
        </div>
      </section>

      {stories.length > 0 && (
        <section
          className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
          aria-labelledby="impact-stories-title"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="impact-stories-title"
              className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
            >
              Impact Stories
            </h2>
            <div className="mt-10 space-y-10">
              {stories.map((s) => (
                <div key={s.title}>
                  <h3 className="text-lg font-semibold text-[var(--color-gold)]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ivory)]/80">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-labelledby="donate-title"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2
                id="donate-title"
                className="text-2xl uppercase leading-tight text-[var(--color-ivory)] sm:text-3xl"
              >
                Make a Donation
              </h2>
              <div className="mt-8">
                <DonationForm fundSlug={fund.slug} fundName={fund.name} />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]">
                Recent Donors to this Fund
              </h3>
              <div className="mt-6">
                <DonorFeed donors={donors.slice(0, 3)} title="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
