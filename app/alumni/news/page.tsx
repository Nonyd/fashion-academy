import type { Metadata } from "next";
import { AlumniNewsClient } from "./AlumniNewsClient";
import { allArticles } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";

export const metadata: Metadata = {
  title: "Alumni News & Stories | Prudential Fashion Academy",
  description:
    "Spotlights, chapter news, and impact from the PFA alumni community.",
};

export default function AlumniNewsPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="news-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "News" },
            ]}
          />
          <h1
            id="news-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Alumni News & Stories
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            Spotlights, chapter news, and impact from our community.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-label="News and stories"
      >
        <div className="mx-auto max-w-6xl">
          <AlumniNewsClient initialArticles={allArticles} />
        </div>
      </section>
    </>
  );
}
