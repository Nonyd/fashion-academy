import type { Metadata } from "next";
import { alumniDirectory } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import { DirectoryClient } from "./DirectoryClient";

export const metadata: Metadata = {
  title: "Alumni Directory | Prudential Fashion Academy",
  description:
    "Find and connect with fellow PFA graduates worldwide.",
};

export default function AlumniDirectoryPage() {
  return (
    <>
      <section
        className="relative flex min-h-[40vh] flex-col justify-end border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36"
        aria-labelledby="directory-title"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "Directory" },
            ]}
          />
          <h1
            id="directory-title"
            className="mt-4 text-4xl uppercase leading-[1.1] text-[var(--color-ivory)] sm:text-5xl md:text-6xl"
          >
            Alumni Directory
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ivory)]/80">
            Find and connect with fellow PFA graduates worldwide.
          </p>
        </div>
      </section>

      <section
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-label="Directory"
      >
        <div className="mx-auto max-w-6xl">
          <DirectoryClient initialAlumni={alumniDirectory} />
        </div>
      </section>
    </>
  );
}
