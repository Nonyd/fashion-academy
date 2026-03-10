import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Student Life | Prudential Fashion Academy",
  description: "Life at PFA: community, facilities, and student support.",
};

export default function StudentLifePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <PageHero
          label="Student Life"
          title="Life at PFA"
          description="Community, facilities, and support for every student."
        />
        <section className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="max-w-2xl text-sm text-[var(--color-ivory)]/80">
              Student life at Prudential Fashion Academy is built around creativity, collaboration,
              and support. Explore our campuses, fashion hub, wellness centre, and events.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
