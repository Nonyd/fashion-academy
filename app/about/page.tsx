import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import AboutPageContent from "@/components/sections/AboutPageContent";

export const metadata: Metadata = {
  title: "About | Prudential Fashion Academy",
  description:
    "Prudential Fashion Academy, Est. 2020. The bedrock for nurturing global fashion creatives. Lagos, Abuja.",
  openGraph: {
    title: "About | Prudential Fashion Academy",
    description: "The bedrock for nurturing global fashion creatives. Est. 2020.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <AboutPageContent />
      </main>
      <Footer />
    </>
  );
}
