"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_OVERVIEW, SIDEBAR_OPERATIONS } from "@/lib/data/about";

export default function AboutSidebar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href
      ? "border-l-2 border-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-4 font-semibold text-[var(--color-gold)]"
      : "border-l-2 border-transparent pl-4 text-[var(--color-ivory)]/80 transition-colors hover:border-[var(--color-gold)]/50 hover:bg-white/5 hover:text-[var(--color-ivory)]";

  return (
    <>
      <aside className="hidden w-[260px] shrink-0 border-r border-white/10 pr-6 lg:block">
        <nav aria-label="About section navigation">
          <div className="mb-8">
            <h3 className="mb-3 border-b-2 border-[var(--color-gold)] pb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Overview
            </h3>
            <ul className="space-y-0.5">
              {SIDEBAR_OVERVIEW.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2 text-xs uppercase tracking-[0.15em] ${linkClass(item.href)}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 border-b-2 border-[var(--color-gold)] pb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Operations
            </h3>
            <ul className="space-y-0.5">
              {SIDEBAR_OPERATIONS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2 text-xs uppercase tracking-[0.15em] ${linkClass(item.href)}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      <div className="mb-6 w-full min-w-0 overflow-x-auto lg:hidden -mx-1 px-1" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-2 pb-2">
          {[...SIDEBAR_OVERVIEW, ...SIDEBAR_OPERATIONS].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                pathname === item.href
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                  : "border-white/20 bg-white/5 text-[var(--color-ivory)]/80 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-ivory)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
