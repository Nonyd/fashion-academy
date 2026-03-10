import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-serif",
  weight: ["400", "500", "600", "700"],
});

const bodySans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prudential Fashion Academy",
  description:
    "Where craft meets ambition. Immersive, on-campus programmes in Lagos and Abuja — fashion design, styling, luxury brand management, and more.",
  metadataBase: new URL("https://prudentialfashionacademy.com"),
  openGraph: {
    title: "Prudential Fashion Academy",
    description:
      "The Bedrock For Nurturing Global Fashion Creatives.",
    siteName: "Prudential Fashion Academy",
    url: "https://prudentialfashionacademy.com",
    type: "website",
  },
  keywords: [
    "fashion school",
    "fashion academy Nigeria",
    "fashion design courses",
    "Prudential Fashion Academy",
    "luxury fashion education",
    "online fashion school",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displaySerif.variable} ${bodySans.variable} antialiased bg-[var(--color-noir)] text-[var(--color-ivory)]`}
      >
        <a href="#main" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
