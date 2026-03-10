import Navbar from "@/components/layout/Navbar";
import PageIntro from "@/components/layout/PageIntro";
import CustomCursor from "@/components/layout/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeTicker from "@/components/sections/MarqueeTicker";
import BrandStatement from "@/components/sections/BrandStatement";
import ProgramsShowcase from "@/components/sections/ProgramsShowcase";
import FacultySpotlight from "@/components/sections/FacultySpotlight";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import Testimonials from "@/components/sections/Testimonials";
import PressBar from "@/components/sections/PressBar";
import EventsCalendar from "@/components/sections/EventsCalendar";
import PortalEcosystem from "@/components/sections/PortalEcosystem";
import CampusFacilities from "@/components/sections/CampusFacilities";
import ApplicationCTA from "@/components/sections/ApplicationCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <PageIntro />
      <CustomCursor />
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <HeroSection />
        <MarqueeTicker />
        <BrandStatement />
        <ProgramsShowcase />
        <FacultySpotlight />
        <PortfolioGallery />
        <Testimonials />
        <PressBar />
        <EventsCalendar />
        <PortalEcosystem />
        <CampusFacilities />
        <ApplicationCTA />
      </main>
      <Footer />
    </>
  );
}
