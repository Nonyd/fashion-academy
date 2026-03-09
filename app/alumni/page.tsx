import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import AlumniPageContent from "@/components/sections/AlumniPageContent";

export const metadata: Metadata = {
  title: "Alumni | Prudential Fashion Academy",
  description:
    "Join the Prudential Fashion Academy alumni network. Connect with graduates shaping the global fashion industry.",
  openGraph: {
    title: "Alumni | Prudential Fashion Academy",
    description:
      "Join the Prudential Fashion Academy alumni network. Connect with graduates shaping the global fashion industry.",
  },
};

export default function AlumniPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <AlumniPageContent />
      </main>
      <Footer />
    </>
  );
}
