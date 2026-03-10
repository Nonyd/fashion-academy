"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { SIDEBAR_OVERVIEW, SIDEBAR_OPERATIONS } from "@/lib/data/about";

const CENTER_LINKS: { label: string; href: string; megaMenu?: boolean }[] = [
  { label: "About", href: "/about", megaMenu: true },
  { label: "Programs", href: "/programs" },
  { label: "Admissions", href: "/admissions" },
  { label: "Student Life", href: "/student-life" },
  { label: "Alumni", href: "/alumni" },
];

function MegaMenuLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center justify-between gap-2 py-2 text-xs uppercase tracking-[0.15em] text-[var(--color-ivory)]/85 transition-colors hover:text-[var(--color-gold)]"
    >
      <span>{label}</span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
      setAboutOpen(false);
    };
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
    <header className="fixed inset-x-0 top-0 z-50 relative">
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
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          aria-label="Prudential Fashion Academy – Home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            className={`h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14 ${theme === "light" ? "" : "invert"}`}
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)] sm:text-sm">
              Prudential Fashion Academy
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] sm:text-xs">
              Lagos, Nigeria
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {CENTER_LINKS.map((item) =>
            item.megaMenu ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-ivory)]/80 transition-colors hover:text-[var(--color-ivory)] focus:outline-none focus-visible:text-[var(--color-ivory)]"
                >
                  {item.label}
                  <ChevronRight
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-90" : ""}`}
                    aria-hidden
                  />
                </Link>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="min-w-[420px] rounded-xl border border-white/10 bg-[var(--color-charcoal)]/98 py-5 shadow-xl backdrop-blur">
                        <div className="grid grid-cols-2 gap-8 px-6">
                          <div>
                            <h3 className="mb-3 border-b border-[var(--color-gold)]/40 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                              Overview
                            </h3>
                            <ul className="space-y-0.5">
                              {SIDEBAR_OVERVIEW.map((link) => (
                                <li key={link.href}>
                                  <MegaMenuLink href={link.href} label={link.label} />
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="mb-3 border-b border-[var(--color-gold)]/40 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                              Operations
                            </h3>
                            <ul className="space-y-0.5">
                              {SIDEBAR_OPERATIONS.map((link) => (
                                <li key={link.href}>
                                  <MegaMenuLink href={link.href} label={link.label} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-3 border-t border-white/10 px-6 pt-3">
                          <Link
                            href="/about"
                            className="group flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)]"
                          >
                            View all about
                            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-ivory)]/80 transition-colors hover:text-[var(--color-ivory)] focus:outline-none focus-visible:text-[var(--color-ivory)]"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="rounded-full border border-white/25 bg-transparent px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-ivory)] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            Login
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
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute left-4 right-4 top-full z-40 mt-2 flex max-h-[70vh] w-auto flex-col overflow-hidden rounded-xl border border-white/10 shadow-xl backdrop-blur-md lg:hidden sm:left-auto sm:right-6 sm:w-[22rem] ${
              theme === "light"
                ? "bg-[rgba(245,240,232,0.98)]"
                : "bg-[rgba(18,18,18,0.98)]"
            }`}
          >
            <div className="flex shrink-0 items-center justify-end border-b border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav
              className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 pb-6 pt-2"
              style={{ WebkitOverflowScrolling: "touch" }}
              aria-label="Mobile navigation"
            >
                  <div className="border-b border-white/10">
                    <Link
                      href="/about"
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 text-xl font-medium text-[var(--color-ivory)]"
                    >
                      About
                    </Link>
                    <div className="grid grid-cols-1 gap-2 pl-4 pb-4">
                      <p className="py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                        Overview
                      </p>
                      {SIDEBAR_OVERVIEW.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-1.5 text-sm text-[var(--color-ivory)]/80 hover:text-[var(--color-gold)]"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <p className="mt-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                        Operations
                      </p>
                      {SIDEBAR_OPERATIONS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-1.5 text-sm text-[var(--color-ivory)]/80 hover:text-[var(--color-gold)]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {CENTER_LINKS.filter((l) => !l.megaMenu).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-white/10 py-4 text-xl font-medium text-[var(--color-ivory)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-4 space-y-3">
                    <Link
                      href="/auth/login"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full rounded-full border border-white/25 bg-transparent py-2.5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ivory)]"
                    >
                      Login
                    </Link>
                    <Link
                      href="/admissions/apply"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] py-2.5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)]"
                    >
                      Apply Now
                    </Link>
                    <p className="text-center text-[11px] text-[var(--color-muted)]">
                      Est. 2020 · Lagos · Abuja
                    </p>
                </div>
              </nav>
            </motion.div>
            )}
          </AnimatePresence>
    </header>
  );
}
