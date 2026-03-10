import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/about/Breadcrumb";

export const metadata: Metadata = {
  title: "PFA History | Prudential Fashion Academy",
  description: "The story of Prudential Fashion Academy from founding to today.",
};

export default function HistoryPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "PFA History" },
        ]}
      />
      <h1 className="mb-8 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        PFA History
      </h1>

      <div className="relative mb-12 aspect-[21/9] max-w-4xl overflow-hidden rounded-xl bg-white/5">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
          alt="PFA campus"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
        />
      </div>

      <p className="mb-12 max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
        Prudential Fashion Academy was established to fill a gap in world-class, industry-aligned
        fashion education in Nigeria and the region. Our journey from a single campus to a
        multi-site institution reflects our commitment to excellence and growth.
      </p>

      <section className="mb-12">
        <h2 className="section-label mb-4">The Beginning</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          In 2020, founder Prudent Gabriel Peterson launched Prudential Fashion Academy in Lagos
          with a clear vision: to create an academy that would nurture the next generation of
          fashion designers, stylists, and business leaders. Starting with a focused curriculum in
          fashion design and a single campus, PFA quickly gained recognition for its
          industry-connected approach and high standards of teaching and facilities.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Growth & Development</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          Over the following years, we expanded our programme offerings to include Styling & Art
          Direction, Fashion Business & Luxury Management, Textile Design, Fashion Photography,
          and Fashion Technology & AI. We opened additional campuses in Lagos (Ajah, Ojodu) and
          Abuja, and invested in design libraries, studios, and student support services. Our
          faculty grew to include industry practitioners and academics, and we established
          partnerships with fashion houses, media, and international institutions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Milestones</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          Key milestones include accreditation by the National Board for Technical Education,
          awards for fashion education and graduate employability, and successful graduate
          placements in leading brands and businesses. Our annual fashion shows and industry
          events have become fixtures in the Nigerian fashion calendar, and our alumni network
          continues to grow across the continent and beyond.
        </p>
      </section>

      <section>
        <h2 className="section-label mb-4">PFA Today</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          Today Prudential Fashion Academy is a reference point for fashion education in Africa.
          We remain committed to our founding values of creativity, excellence, and identity while
          continuously evolving our programmes and infrastructure to meet the needs of a
          changing industry. We look forward to writing the next chapters of our story with our
          students, faculty, and partners.
        </p>
      </section>
    </>
  );
}
