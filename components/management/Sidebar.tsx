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
      <p className="px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-2">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/management" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#7C5CBF] text-white"
                    : "text-[#6B7280] hover:bg-[#E5E1F5] hover:text-[#1A1A2E]"
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
    <aside className="fixed left-0 top-0 z-30 h-full w-[260px] bg-[#4A3480] flex flex-col">
      <div className="p-4 border-b border-white/10">
        <Link href="/management" className="block">
          <BrandLogo variant="white" size="sm" />
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
          <div className="w-9 h-9 rounded-full bg-[#7C5CBF] flex items-center justify-center text-white text-sm font-medium">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">{name}</p>
            <p className="text-xs text-white/70">Management</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
