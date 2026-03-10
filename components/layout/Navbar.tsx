"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const CENTER_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Admissions", href: "/admissions" },
  { label: "Student Life", href: "/student-life" },
  { label: "Alumni", href: "/alumni" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navBg = isScrolled
    ? theme === "light"
      ? "rgba(245,240,232,0.96)"
      : "rgba(10,10,10,0.95)"
    : "rgba(10,10,10,0)";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ backgroundColor: "rgba(10,10,10,0)", backdropFilter: "blur(0px)" }}
        animate={{
          backgroundColor: navBg,
          backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex w-full items-center justify-between px-6 py-4 lg:px-10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          aria-label="Prudential Fashion Academy – Home"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)] sm:text-sm">
            Prudential Fashion Academy
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] sm:text-xs">
            Lagos, Nigeria
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {CENTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-ivory)]/80 transition-colors hover:text-[var(--color-ivory)] focus:outline-none focus-visible:text-[var(--color-ivory)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="rounded-full border border-white/25 bg-transparent px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-ivory)] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            Student Login
          </Link>
          <Link
            href="/admissions/apply"
            className="rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            Apply Now
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 backdrop-blur-md lg:hidden ${
              theme === "light"
                ? "bg-[rgba(245,240,232,0.96)]"
                : "bg-[rgba(4,4,4,0.96)]"
            }`}
          >
            <div className="flex h-full flex-col justify-between px-8 pb-10 pt-24">
              <nav className="space-y-1" aria-label="Mobile navigation">
                {CENTER_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-white/10 py-4 text-xl font-medium text-[var(--color-ivory)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="space-y-4">
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full border border-white/25 bg-transparent px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ivory)]"
                >
                  Student Login
                </Link>
                <Link
                  href="/admissions/apply"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)]"
                >
                  Apply Now
                </Link>
                <p className="text-xs text-[var(--color-muted)]">
                  Est. 2020 · Lagos · Abuja
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
