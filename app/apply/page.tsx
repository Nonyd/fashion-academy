import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/layout/PageHero";
import ApplicationForm from "@/components/sections/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply | Prudential Fashion Academy",
  description:
    "Submit your application for the 2026 intake. Choose your program and campus, then proceed to payment.",
  openGraph: {
    title: "Apply | Prudential Fashion Academy",
    description: "Complete your application and make payment to secure your place.",
  },
};

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <PageHero
          label="Admissions"
          title="Application form"
          description="Complete each step and click Make payments at the end to proceed. Your preferred campus will show available slots."
        />
        <section className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <ApplicationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
