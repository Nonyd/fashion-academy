"use client";

import { usePathname } from "next/navigation";
import AboutSidebar from "./AboutSidebar";

export default function AboutLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname === "/about";

  if (isIndex) {
    return <>{children}</>;
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 lg:flex-row lg:gap-10">
      <AboutSidebar />
      <div className="min-w-0 flex-1 lg:min-w-0">{children}</div>
    </div>
  );
}
