import type { Metadata } from "next";
import Breadcrumb from "@/components/about/Breadcrumb";
import PersonCard from "@/components/about/PersonCard";
import { MANAGEMENT_TEAM } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "Management Team | Prudential Fashion Academy",
  description: "Management and operations team at PFA.",
};

export default function ManagementTeamPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Management Team" },
        ]}
      />
      <h1 className="mb-6 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        Management Team
      </h1>
      <p className="mb-10 max-w-2xl text-sm text-[var(--color-ivory)]/80">
        Our management team oversees day-to-day operations, programmes, facilities, and
        administration, ensuring a smooth and supportive environment for students and staff.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MANAGEMENT_TEAM.map((person) => (
          <PersonCard key={person.id} person={person} showDepartment />
        ))}
      </div>
    </>
  );
}
