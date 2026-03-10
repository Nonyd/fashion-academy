"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

type NavLink = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavLink[] };

const NAV_ITEMS: NavItem[] = [
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "All programs", href: "/programs" },
      { label: "Fashion Design", href: "/programs" },
      { label: "Styling & Art Direction", href: "/programs" },
      { label: "Fashion Business & Luxury", href: "/programs" },
      { label: "Textile Design", href: "/programs" },
      { label: "Fashion Photography", href: "/programs" },
      { label: "Fashion Technology & AI", href: "/programs" },
    ],
  },
  { label: "Faculty", href: "/faculty" },
  { label: "Admissions", href: "/admissions" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Alumni", href: "/alumni" },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
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
      if (e.key === "Escape") {
        setExpandedMobile(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setExpandedMobile(null);
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

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6 text-xs font-medium tracking-[0.22em] text-[var(--color-ivory)]/70 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 uppercase transition-colors hover:text-[var(--color-ivory)] focus:outline-none focus-visible:text-[var(--color-ivory)]"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </Link>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.ul
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-2 min-w-[200px] rounded-xl border border-white/10 bg-[var(--color-charcoal)]/98 py-1.5 shadow-xl backdrop-blur"
                          role="menu"
                        >
                          {item.children.map((child) => (
                            <li key={child.href + child.label} role="none">
                              <Link
                                href={child.href}
                                role="menuitem"
                                className="block px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ivory)]/80 transition-colors hover:bg-white/5 hover:text-[var(--color-ivory)] focus:outline-none focus-visible:bg-white/5 focus-visible:text-[var(--color-ivory)]"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="uppercase transition-colors hover:text-[var(--color-ivory)] focus:outline-none focus-visible:text-[var(--color-ivory)]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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
            <Link
              href="/auth/login"
              className="rounded-full border border-white/25 px-5 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-ivory)] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
            >
              Login
            </Link>
            <Link
              href="/admissions"
              className="rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
            >
              Apply Now
            </Link>
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
                className="space-y-2"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="border-b border-white/10"
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobile(expandedMobile === item.label ? null : item.label)
                          }
                          className="flex w-full items-center justify-between py-4 text-left text-xl font-medium text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                          aria-expanded={expandedMobile === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 transition-transform ${
                              expandedMobile === item.label ? "rotate-180" : ""
                            }`}
                            aria-hidden
                          />
                        </button>
                        <AnimatePresence>
                          {expandedMobile === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                              role="menu"
                            >
                              {item.children.map((child) => (
                                <li key={child.href + child.label} role="none">
                                  <Link
                                    href={child.href}
                                    onClick={() => setMenuOpen(false)}
                                    role="menuitem"
                                    className="block border-t border-white/5 py-3 pl-4 text-base text-[var(--color-ivory)]/80 hover:text-[var(--color-ivory)]"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-4 text-xl font-medium text-[var(--color-ivory)]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              <div className="space-y-4">
                <Link
                  href="/admissions"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-noir)]"
                >
                  Apply Now
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full border border-white/25 bg-transparent px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-ivory)]"
                >
                  Login
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

