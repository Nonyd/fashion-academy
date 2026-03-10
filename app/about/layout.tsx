import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import AboutLayoutWrapper from "@/components/about/AboutLayoutWrapper";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pt-20 pb-12 lg:px-10 lg:pt-28 lg:pb-16">
        <div className="mx-auto max-w-6xl">
          <AboutLayoutWrapper>{children}</AboutLayoutWrapper>
        </div>
      </main>
      <Footer />
    </>
  );
}
