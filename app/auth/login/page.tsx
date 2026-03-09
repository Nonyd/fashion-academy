import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import LoginPageContent from "@/components/sections/LoginPageContent";

export const metadata: Metadata = {
  title: "Login | Prudential Fashion Academy",
  description: "Student portal login. Access your courses and academy resources.",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative min-h-screen overflow-hidden">
        <LoginPageContent />
      </main>
      <Footer />
    </>
  );
}
