import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import PersonCard from "./PersonCard";
import type { OperationsUnit } from "@/lib/data/about";

type UnitPageProps = {
  unit: OperationsUnit;
  breadcrumbItems: { label: string; href?: string }[];
};

export default function UnitPage({ unit, breadcrumbItems }: UnitPageProps) {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-8 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        {unit.name}
      </h1>

      <section className="mb-12">
        <h2 className="section-label mb-4">About this Unit</h2>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          {unit.aboutParagraph}
        </p>
        <div className="relative aspect-video max-w-2xl overflow-hidden rounded-xl bg-white/5">
          <Image
            src={unit.imageUrl}
            alt={unit.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Services Offered</h2>
        <ul className="space-y-4">
          {unit.services.map((svc, i) => (
            <li key={i}>
              <h3 className="text-sm font-semibold text-[var(--color-ivory)]">{svc.title}</h3>
              <p className="text-sm text-[var(--color-ivory)]/80">{svc.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Opening Hours</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[280px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-2 text-left font-medium text-[var(--color-ivory)]">Days</th>
                <th className="pb-2 text-left font-medium text-[var(--color-ivory)]">Hours</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-ivory)]/80">
              {unit.hours.map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2">{row.days}</td>
                  <td className="py-2">{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Location</h2>
        <p className="text-sm text-[var(--color-ivory)]/90">{unit.location}</p>
      </section>

      <section>
        <h2 className="section-label mb-4">Head of Unit</h2>
        <div className="max-w-sm rounded-xl border border-white/10 bg-[var(--color-charcoal)]/60 p-4">
          <div className="relative mb-4 aspect-square w-32 overflow-hidden rounded-lg bg-white/5">
            <Image
              src={unit.head.imageUrl}
              alt={unit.head.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <h3 className="font-semibold text-[var(--color-ivory)]">{unit.head.name}</h3>
          <p className="text-xs text-[var(--color-ivory)]/80">{unit.head.title}</p>
          {unit.head.phone && (
            <p className="mt-1 text-xs text-[var(--color-muted)]">{unit.head.phone}</p>
          )}
          {unit.head.email && (
            <a
              href={`mailto:${unit.head.email}`}
              className="mt-1 block text-xs text-[var(--color-gold)] hover:underline"
            >
              {unit.head.email}
            </a>
          )}
        </div>
      </section>
    </>
  );
}
