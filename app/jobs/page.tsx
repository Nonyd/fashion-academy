import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Jobs At PFA | Prudential Fashion Academy",
  description: "Careers and job opportunities at Prudential Fashion Academy.",
};

export default function JobsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <PageHero
          label="Careers"
          title="Jobs At PFA"
          description="Join our team. Explore current openings at Prudential Fashion Academy."
        />
        <section className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-sm text-[var(--color-ivory)]/60">
              Current openings will be listed here. For enquiries, contact{" "}
              <a
                href="mailto:admissions@prudentialfashionacademy.com"
                className="text-[var(--color-gold)] hover:underline"
              >
                admissions@prudentialfashionacademy.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
