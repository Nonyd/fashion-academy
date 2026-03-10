import type { Metadata } from "next";
import UnitPage from "@/components/about/UnitPage";
import { OPERATIONS_UNITS } from "@/lib/data/about";

const unit = OPERATIONS_UNITS.find((u) => u.slug === "business-centre")!;

export const metadata: Metadata = {
  title: `${unit.name} | Prudential Fashion Academy`,
  description: unit.aboutParagraph,
};

export default function BusinessCentrePage() {
  return (
    <UnitPage
      unit={unit}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: unit.name },
      ]}
    />
  );
}
