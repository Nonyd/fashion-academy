import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import AdmissionsPageContent from "@/components/sections/AdmissionsPageContent";

export const metadata: Metadata = {
  title: "Admissions | Prudential Fashion Academy",
  description:
    "Apply to Prudential Fashion Academy. Applications for the 2026 intake are open. Join a global cohort of designers and creatives.",
  openGraph: {
    title: "Admissions | Prudential Fashion Academy",
    description: "Your journey starts here. Apply for the 2026 intake.",
  },
};

export default function AdmissionsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <AdmissionsPageContent />
      </main>
      <Footer />
    </>
  );
}
