"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ManagementProvider, useManagement } from "@/context/ManagementContext";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Sidebar } from "@/components/management/Sidebar";
import { TopHeader } from "@/components/management/TopHeader";

function ManagementGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, loading } = useManagement();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      router.replace("/auth/login?from=" + encodeURIComponent(pathname || "/management"));
      return;
    }
    if (session.role !== "MANAGEMENT") {
      router.replace("/?error=management_only");
      return;
    }
  }, [session, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-noir)]">
        <div className="animate-pulse text-[var(--color-gold)]">Loading...</div>
      </div>
    );
  }
  if (!session || session.role !== "MANAGEMENT") {
    return null;
  }

  return (
    <>
      <Sidebar />
      <TopHeader />
      <main className="ml-[260px] mt-16 min-h-[calc(100vh-4rem)] bg-[var(--color-noir)] p-6 text-[var(--color-ivory)]">
        {children}
      </main>
    </>
  );
}

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ManagementProvider>
      <ToastProvider>
        <ManagementGate>{children}</ManagementGate>
      </ToastProvider>
    </ManagementProvider>
  );
}
