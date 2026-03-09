import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProgramsPageContent from "@/components/sections/ProgramsPageContent";

export const metadata: Metadata = {
  title: "Programs | Prudential Fashion Academy",
  description:
    "Undergraduate, postgraduate and professional programs in fashion design, styling, luxury brand management, textile design, and fashion technology.",
  openGraph: {
    title: "Programs | Prudential Fashion Academy",
    description:
      "Undergraduate, postgraduate and professional programs in fashion design, styling, luxury brand management, and more.",
  },
};

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <ProgramsPageContent />
      </main>
      <Footer />
    </>
  );
}
