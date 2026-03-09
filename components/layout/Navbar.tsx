"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const NAV_ITEMS = [
  { href: "#programs", label: "Programs" },
  { href: "#faculty", label: "Faculty" },
  { href: "#admissions", label: "Admissions" },
  { href: "#showcase", label: "Showcase" },
  { href: "#events", label: "Events" },
  { href: "/alumni", label: "Alumni" },
];

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "IT", label: "Italiano" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ backgroundColor: "rgba(10,10,10,0)", backdropFilter: "blur(0px)" }}
        animate={{
          backgroundColor: isScrolled
            ? theme === "light"
              ? "rgba(245,240,232,0.96)"
              : "rgba(10,10,10,0.95)"
            : "rgba(10,10,10,0)",
          backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex w-full items-center justify-between px-6 py-4 lg:px-10"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]" aria-label="Prudential Fashion Academy – Home">
          <Image
            src="/logo.png"
            alt="Prudential Fashion Academy"
            width={56}
            height={56}
            className={`h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14 ${theme === "light" ? "" : "invert"}`}
          />
          <span className="hidden text-[10px] leading-tight text-[var(--color-ivory)]/80 sm:block sm:max-w-[10rem] lg:max-w-[12rem]">
            The Bedrock For Nurturing Global Fashion Creatives.
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <div className="flex items-center gap-8 text-xs font-medium tracking-[0.22em] text-[var(--color-ivory)]/70">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="uppercase transition-colors hover:text-[var(--color-ivory)] focus:outline-none focus-visible:text-[var(--color-ivory)]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-[var(--color-ivory)]/80 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <Globe className="h-3 w-3" aria-hidden="true" />
                <span>{activeLang}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 mt-2 w-40 rounded-lg border border-white/10 bg-[var(--color-charcoal)]/95 p-1 text-xs shadow-xl backdrop-blur"
                    role="listbox"
                  >
                    {LANGUAGES.map((lang) => (
                      <li key={lang.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveLang(lang.code);
                            setLangOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[var(--color-ivory)]/80 hover:bg-white/5 focus:outline-none focus-visible:bg-white/10"
                          role="option"
                          aria-selected={activeLang === lang.code}
                        >
                          <span>{lang.label}</span>
                          {activeLang === lang.code && (
                            <span className="text-[var(--color-gold)]">●</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <ThemeToggle />
            <a
              href="/auth/login"
              className="rounded-full border border-white/25 px-5 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-ivory)] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
            >
              Login
            </a>
            <a
              href="/admissions"
              className="rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
            >
              Apply Now
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setLangOpen((prev) => !prev)}
            className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ivory)]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            aria-label="Change language"
          >
            <Globe className="h-3 w-3" aria-hidden="true" />
            {activeLang}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
            className={`fixed inset-0 z-40 backdrop-blur-md md:hidden ${
              theme === "light"
                ? "bg-[rgba(245,240,232,0.96)]"
                : "bg-[rgba(4,4,4,0.96)]"
            }`}
          >
            <div className="flex h-full flex-col justify-between px-8 pb-10 pt-24">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="space-y-6 text-2xl font-medium"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="block border-b border-white/10 pb-4 text-[var(--color-ivory)]"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
              <div className="space-y-4">
                <a
                  href="/admissions"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-noir)]"
                >
                  Apply Now
                </a>
                <a
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full border border-white/25 bg-transparent px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-ivory)]"
                >
                  Login
                </a>
                <p className="text-xs text-[var(--color-muted)]">
                  Lagos · Abuja · Online Studio
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

