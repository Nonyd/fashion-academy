import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export default function AlumniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
