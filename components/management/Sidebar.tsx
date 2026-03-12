"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useManagement } from "@/context/ManagementContext";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  FolderOpen,
  CreditCard,
  Mail,
  Bell,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const mainNav = [
  { href: "/management", label: "Dashboard", icon: LayoutDashboard },
  { href: "/management/admissions", label: "Admissions", icon: ClipboardList },
  { href: "/management/students", label: "Students", icon: Users },
  { href: "/management/teachers", label: "Teachers", icon: GraduationCap },
  { href: "/management/courses", label: "Courses", icon: BookOpen },
];

const academicNav = [
  { href: "/management/scores", label: "Scores", icon: BarChart3 },
  { href: "/management/projects", label: "Projects", icon: FolderOpen },
];

const financeNav = [
  { href: "/management/payments", label: "Payments", icon: CreditCard },
];

const commNav = [
  { href: "/management/mail", label: "Mail", icon: Mail },
  { href: "/management/notifications", label: "Notifications", icon: Bell },
];

const systemNav = [
  { href: "/management/reports", label: "Reports", icon: BarChart3 },
  { href: "/management/settings", label: "Settings", icon: Settings },
];

function NavSection({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}) {
  const pathname = usePathname();
  return (
    <div className="mb-4">
      <p className="px-4 text-[10px] font-medium text-[var(--color-muted)] uppercase tracking-[0.28em] mb-2">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/management" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)] ring-1 ring-[var(--color-gold)]/40"
                    : "text-[var(--color-ivory)]/70 hover:bg-white/5 hover:text-[var(--color-ivory)]"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar() {
  const { session, logout } = useManagement();
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
    <aside className="fixed left-0 top-0 z-30 h-full w-[260px] bg-[var(--color-charcoal)] flex flex-col border-r border-white/10">
      <div className="p-4 border-b border-white/10">
        <Link href="/management" className="block" aria-label="Admin dashboard home">
          <BrandLogo variant="white" size="md" />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <NavSection title="Main" items={mainNav} />
        <NavSection title="Academic" items={academicNav} />
        <NavSection title="Finance" items={financeNav} />
        <NavSection title="Communication" items={commNav} />
        <NavSection title="System" items={systemNav} />
      </nav>
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] text-sm font-medium ring-1 ring-[var(--color-gold)]/40">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[var(--color-ivory)] truncate">{name}</p>
            <p className="text-xs text-[var(--color-muted)]">Management</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-ivory)]/80 hover:bg-white/10 hover:text-[var(--color-ivory)] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
