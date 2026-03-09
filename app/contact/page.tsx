import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ContactPageContent from "@/components/sections/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact | Prudential Fashion Academy",
  description:
    "Get in touch. Campuses in Lagos (Egbeda, Ajah, Ojodu) and Abuja. Admissions, alumni, and general enquiries.",
  openGraph: {
    title: "Contact | Prudential Fashion Academy",
    description: "Contact Prudential Fashion Academy. Lagos · Abuja.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}
