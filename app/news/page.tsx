import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "News & Articles | Prudential Fashion Academy",
  description: "Latest news, articles, and updates from Prudential Fashion Academy.",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <PageHero
          label="News & Articles"
          title="Latest from PFA"
          description="Updates, features, and stories from Prudential Fashion Academy and our community."
        />
        <section className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-sm text-[var(--color-ivory)]/60">
              News and articles coming soon.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
