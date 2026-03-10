import type { Metadata } from "next";
import Breadcrumb from "@/components/about/Breadcrumb";
import FacultyFilterGrid from "@/components/about/FacultyFilterGrid";

export const metadata: Metadata = {
  title: "Faculty & Instructors | Prudential Fashion Academy",
  description: "Meet the faculty and instructors at PFA.",
};

export default function FacultyInstructorsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Faculty & Instructors" },
        ]}
      />
      <h1 className="mb-6 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        Faculty & Instructors
      </h1>
      <p className="mb-8 max-w-2xl text-sm text-[var(--color-ivory)]/80">
        Our faculty and instructors bring industry experience and academic rigour to every
        programme. They guide students from foundation to advanced practice across design,
        styling, business, technology, and photography.
      </p>
      <FacultyFilterGrid />
    </>
  );
}
