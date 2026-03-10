import type { Metadata } from "next";
import Breadcrumb from "@/components/about/Breadcrumb";
import PersonCard from "@/components/about/PersonCard";
import { PRINCIPAL_OFFICERS } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "Principal Officers | Prudential Fashion Academy",
  description: "Leadership team at Prudential Fashion Academy.",
};

export default function PrincipalOfficersPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Principal Officers" },
        ]}
      />
      <h1 className="mb-6 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        Principal Officers
      </h1>
      <p className="mb-10 max-w-2xl text-sm text-[var(--color-ivory)]/80">
        Our principal officers lead the academy&apos;s strategy, academic quality, admissions,
        registry, finance, and student affairs. They work together to ensure PFA delivers
        excellence in education and operations.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRINCIPAL_OFFICERS.map((person) => (
          <PersonCard key={person.id} person={person} showDepartment />
        ))}
      </div>
    </>
  );
}
