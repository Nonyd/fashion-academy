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
    <div className="flex w-full gap-8 lg:gap-10">
      <AboutSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
