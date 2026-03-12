"use client";

import { useEffect, useState } from "react";
import { useManagement } from "@/context/ManagementContext";
import { Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/management": "Dashboard",
  "/management/admissions": "Admissions",
  "/management/students": "Students",
  "/management/teachers": "Teachers",
  "/management/courses": "Courses",
  "/management/scores": "Scores",
  "/management/projects": "Projects",
  "/management/payments": "Payments",
  "/management/mail": "Mail",
  "/management/notifications": "Notifications",
  "/management/reports": "Reports",
  "/management/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/management/students/")) return "Student Detail";
  if (pathname.startsWith("/management/teachers/")) return "Teacher Detail";
  if (pathname.startsWith("/management/courses/")) return "Course Detail";
  return "Management";
}

export function TopHeader() {
  const { apiFetch, session } = useManagement();
  const [pathname, setPathname] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

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

  const title = getPageTitle(pathname);
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
    <header className="fixed top-0 left-[260px] right-0 z-20 h-16 bg-white border-b border-[#E5E1F5] flex items-center justify-between px-6">
      <h1 className="text-xl font-bold tracking-tight text-[#1A1A2E]">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <a
          href="/management/notifications"
          className="relative p-2 rounded-lg text-[#6B7280] hover:bg-[#F8F7FF] hover:text-[#7C5CBF]"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-xs font-medium text-white bg-[#EF4444] rounded-full">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </a>
        <div className="w-9 h-9 rounded-full bg-[#7C5CBF] flex items-center justify-center text-white text-sm font-medium">
          {initials}
        </div>
      </div>
    </header>
  );
}
