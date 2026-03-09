import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FacultyPageContent from "@/components/sections/FacultyPageContent";

export const metadata: Metadata = {
  title: "Faculty | Prudential Fashion Academy",
  description:
    "Learn from industry legends. Our mentors have shaped runways, campaigns, and institutions across the globe.",
  openGraph: {
    title: "Faculty | Prudential Fashion Academy",
    description: "Meet the mentors shaping the next generation of fashion leaders.",
  },
};

export default function FacultyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <FacultyPageContent />
      </main>
      <Footer />
    </>
  );
}
