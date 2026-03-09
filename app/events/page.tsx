import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import EventsPageContent from "@/components/sections/EventsPageContent";

export const metadata: Metadata = {
  title: "Events | Prudential Fashion Academy",
  description:
    "Open days, runway shows, masterclasses, and workshops. Join us in Lagos, Abuja, or online.",
  openGraph: {
    title: "Events | Prudential Fashion Academy",
    description: "Upcoming events, open days, and masterclasses.",
  },
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <EventsPageContent />
      </main>
      <Footer />
    </>
  );
}
