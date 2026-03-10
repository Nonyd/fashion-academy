import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/about/Breadcrumb";
import { AWARDS_MILESTONES, PRESS_LOGOS } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "Awards & Recognition | Prudential Fashion Academy",
  description: "PFA awards, milestones, and press.",
};

export default function AwardsRecognitionPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Awards & Recognition" },
        ]}
      />
      <h1 className="mb-6 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        Awards & Recognition
      </h1>
      <p className="mb-10 max-w-2xl text-sm text-[var(--color-ivory)]/80">
        Prudential Fashion Academy has been recognised by industry bodies, educators, and
        media for our contribution to fashion education and graduate outcomes. Below are some
        of our key awards and milestones.
      </p>

      <div className="mb-12 flex flex-wrap items-center gap-8 border-y border-white/10 py-8">
        {PRESS_LOGOS.map((logo) => (
          <div
            key={logo.id}
            className="relative h-12 w-32 shrink-0 overflow-hidden bg-white/5 opacity-80 grayscale"
          >
            <Image
              src={logo.imageUrl}
              alt={logo.name}
              fill
              className="object-contain"
              sizes="128px"
            />
          </div>
        ))}
      </div>

      <section>
        <h2 className="section-label mb-6">Awards & Milestones</h2>
        <div className="space-y-6">
          {AWARDS_MILESTONES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[var(--color-charcoal)]/40 p-6 sm:flex-row sm:items-start sm:gap-6"
            >
              <span className="shrink-0 text-sm font-semibold text-[var(--color-gold)]">
                {item.year}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--color-ivory)]">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-ivory)]/80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
