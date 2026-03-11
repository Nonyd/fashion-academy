"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { SidebarLink } from "@/lib/data/about";

type Props = {
  overviewLinks: SidebarLink[];
  operationsLinks: SidebarLink[];
};

export default function AboutDirectoryAccordion({
  overviewLinks,
  operationsLinks,
}: Props) {
  const [openId, setOpenId] = useState<"overview" | "operations" | null>("overview");

  const toggle = (id: "overview" | "operations") => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="mt-16 w-full min-w-0"
      aria-label="About directory"
    >
      {/* Mobile: accordion */}
      <div className="flex flex-col gap-0 md:hidden">
        <div className="border-b border-white/10">
          <button
            type="button"
            onClick={() => toggle("overview")}
            className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]"
            aria-expanded={openId === "overview"}
            aria-controls="accordion-overview"
            id="accordion-overview-heading"
          >
            <span className="border-b-2 border-[var(--color-gold)] pb-0.5">Overview</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[var(--color-gold)] transition-transform duration-200 ${
                openId === "overview" ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
          <div
            id="accordion-overview"
            role="region"
            aria-labelledby="accordion-overview-heading"
            className={`grid transition-[grid-template-rows] duration-200 ease-out ${
              openId === "overview" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
            <ul className="space-y-2 pb-4 pt-2">
              {overviewLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-[var(--color-ivory)]/90 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
        <div className="border-b border-white/10">
          <button
            type="button"
            onClick={() => toggle("operations")}
            className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]"
            aria-expanded={openId === "operations"}
            aria-controls="accordion-operations"
            id="accordion-operations-heading"
          >
            <span className="border-b-2 border-[var(--color-gold)] pb-0.5">Operations</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[var(--color-gold)] transition-transform duration-200 ${
                openId === "operations" ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
          <div
            id="accordion-operations"
            role="region"
            aria-labelledby="accordion-operations-heading"
            className={`grid transition-[grid-template-rows] duration-200 ease-out ${
              openId === "operations" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
            <ul className="space-y-2 pb-4 pt-2">
              {operationsLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-[var(--color-ivory)]/90 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: two-column grid */}
      <div className="hidden w-full min-w-0 grid-cols-2 gap-12 md:grid">
        <div className="min-w-0">
          <h2 className="mb-6 border-b-2 border-[var(--color-gold)] pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]">
            Overview
          </h2>
          <ul className="space-y-2">
            {overviewLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-[var(--color-ivory)]/90 transition-colors hover:text-[var(--color-gold)]"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <h2 className="mb-6 border-b-2 border-[var(--color-gold)] pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ivory)]">
            Operations
          </h2>
          <ul className="space-y-2">
            {operationsLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-[var(--color-ivory)]/90 transition-colors hover:text-[var(--color-gold)]"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
