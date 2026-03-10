import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/about/Breadcrumb";
import { FOUNDER_BIO } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "The Founder & Director | Prudential Fashion Academy",
  description: "Prudent Gabriel Peterson, Founder and Director of PFA.",
};

export default function FounderPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "The Founder & Director" },
        ]}
      />
      <h1 className="mb-8 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        The Founder & Director
      </h1>

      <div className="mb-12 grid gap-10 lg:grid-cols-[320px_1fr]">
        <div className="relative aspect-[3/4] max-w-md overflow-hidden rounded-xl bg-white/5 lg:max-w-none">
          <Image
            src={FOUNDER_BIO.imageUrl}
            alt={FOUNDER_BIO.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 320px"
            priority
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
            {FOUNDER_BIO.name}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-gold)]">{FOUNDER_BIO.title}</p>
          <div className="mt-6 space-y-4">
            {FOUNDER_BIO.bio.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-[var(--color-ivory)]/90">
                {para}
              </p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-4 border-[var(--color-gold)] pl-6 text-lg italic leading-relaxed text-[var(--color-ivory)]/90">
            &ldquo;{FOUNDER_BIO.quote}&rdquo;
          </blockquote>
        </div>
      </div>
    </>
  );
}
