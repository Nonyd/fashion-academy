"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useManagement } from "@/context/ManagementContext";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { Bell, Menu, X } from "lucide-react";

type NotificationItem = { id: string; title: string; message: string; read: boolean; createdAt: string };

const RECENT_LIMIT = 8;

const mobileLinks = [
  { href: "/management", label: "Dashboard" },
  { href: "/management/admissions", label: "Admissions" },
  { href: "/management/students", label: "Students" },
  { href: "/management/teachers", label: "Teachers" },
  { href: "/management/courses", label: "Courses" },
  { href: "/management/scores", label: "Scores" },
  { href: "/management/projects", label: "Projects" },
  { href: "/management/payments", label: "Payments" },
  { href: "/management/mail", label: "Mail" },
  { href: "/management/notifications", label: "Notifications" },
  { href: "/management/reports", label: "Reports" },
  { href: "/management/settings", label: "Settings" },
] as const;

export function TopHeader() {
  const { apiFetch, session } = useManagement();
  const [pathname, setPathname] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recent, setRecent] = useState<NotificationItem[]>([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPathname(typeof window !== "undefined" ? window.location.pathname : "");
  }, []);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    function fetchCount() {
      apiFetch("/notifications/unread-count")
        .then((r) => r.json())
        .then((d) => {
          if (!cancelled && d.data?.count != null) setUnreadCount(d.data.count);
        })
        .catch(() => {});
    }
    fetchCount();
    const t = setInterval(fetchCount, 60000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [session, apiFetch]);

  useEffect(() => {
    if (!dropdownOpen || !session) return;
    setRecentLoading(true);
    apiFetch(`/notifications?page=1&limit=${RECENT_LIMIT}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data?.items) setRecent(d.data.items);
      })
      .catch(() => {})
      .finally(() => setRecentLoading(false));
  }, [dropdownOpen, session, apiFetch]);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [dropdownOpen]);

  const name = session?.firstName && session?.lastName
    ? `${session.firstName} ${session.lastName}`
    : session?.email ?? "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20 h-16 border-b border-white/10 bg-[var(--color-charcoal)]/95 backdrop-blur flex items-center justify-between px-4 sm:px-6 md:left-[260px]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-[var(--color-ivory)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] md:hidden"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Link
            href="/management"
            className="flex items-center gap-2 md:hidden"
            aria-label="PFA Admin Portal"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-contain invert"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-semibold text-[var(--color-ivory)]">
                PFA
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Admin Portal
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-label="Notifications"
              aria-expanded={dropdownOpen}
              className="relative p-2 rounded-xl text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-gold)] transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-xs font-medium text-[var(--color-noir)] bg-[var(--color-gold)] rounded-full">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-[min(360px,calc(100vw-2rem))] rounded-xl border border-white/10 bg-[var(--color-charcoal)] shadow-xl"
                role="dialog"
                aria-label="Notifications"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ivory)]">
                    Notifications
                  </h2>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {recentLoading ? (
                    <div className="py-8 text-center text-[var(--color-muted)] text-sm">
                      Loading…
                    </div>
                  ) : recent.length === 0 ? (
                    <div className="py-10 px-4 flex flex-col items-center justify-center text-center">
                      <div className="rounded-full bg-white/5 p-4 mb-3">
                        <Bell className="w-10 h-10 text-[var(--color-muted)]" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm text-[var(--color-muted)]">No notifications yet</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-white/10">
                      {recent.map((n) => (
                        <li key={n.id} className={n.read ? "" : "bg-white/5"}>
                          <Link
                            href="/management/notifications"
                            onClick={() => {
                              setDropdownOpen(false);
                              setMobileMenuOpen(false);
                            }}
                            className="block px-4 py-3 hover:bg:white/5 transition-colors"
                          >
                            <p className="text-sm font-medium text-[var(--color-ivory)] truncate">
                              {n.title}
                            </p>
                            <p className="text-xs text-[var(--color-muted)] mt-0.5 line-clamp-2">
                              {n.message}
                            </p>
                            <p className="text-[10px] text-[var(--color-muted)] mt-1">
                              {new Date(n.createdAt).toLocaleString()}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="border-t border-white/10 px-4 py-3">
                  <Link
                    href="/management/notifications"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-[var(--color-gold)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="w-9 h-9 rounded-full bg-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] text-sm font-medium ring-1 ring-[var(--color-gold)]/40">
            {initials}
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="relative h-full w-[260px] max-w-[80%] bg-[var(--color-charcoal)] border-r border-white/10 px-4 py-4 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-ivory)]">
                Menu
              </p>
              <button
                type="button"
                aria-label="Close navigation"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-[var(--color-ivory)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-1 text-sm flex-1 overflow-y-auto">
              {mobileLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/management" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-lg px-3 py-2 font-medium ${
                        active
                          ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                          : "text-[var(--color-ivory)]/80 hover:bg-white/5 hover:text-[var(--color-ivory)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
