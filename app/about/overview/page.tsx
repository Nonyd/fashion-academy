import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/about/Breadcrumb";

export const metadata: Metadata = {
  title: "About the Academy | Prudential Fashion Academy",
  description: "Who we are, what we stand for, and our approach to fashion education.",
};

export default function OverviewPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "About the Academy" },
        ]}
      />
      <h1 className="mb-8 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        About the Academy
      </h1>

      <div className="relative mb-12 aspect-[21/9] w-full max-w-4xl overflow-hidden rounded-xl bg-white/5">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
          alt="Fashion atelier"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
        />
      </div>

      <section className="mb-12">
        <h2 className="section-label mb-4">Who We Are</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          Prudential Fashion Academy is a leading fashion education institution in Nigeria and the
          wider region. We offer programmes in fashion design, styling, fashion business, textile
          design, fashion photography, and fashion technology, preparing students for careers in
          design houses, brands, media, and entrepreneurship. Our campuses in Lagos and Abuja
          provide industry-connected learning environments with experienced faculty and
          state-of-the-art facilities.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">What We Stand For</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          We believe in creativity, excellence, and identity. Our values guide everything we do:
          from curriculum design to student support and industry partnerships. We stand for
          integrity in craft and business, innovation in practice and pedagogy, and a global
          mindset that connects African creativity to the world. We are committed to building a
          inclusive community where every student can thrive.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Our Approach to Fashion Education</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          We combine hands-on studio practice with theory, research, and industry exposure.
          Students work on real briefs, collaborate with peers, and learn from visiting
          practitioners. Our pedagogy emphasises critical thinking, sustainability, and
          professionalism so that graduates are not only skilled makers but also thoughtful
          leaders who can shape the future of fashion.
        </p>
      </section>

      <section>
        <h2 className="section-label mb-4">Our Academy Today</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ivory)]/90">
          Today PFA has grown into a multi-campus academy with a strong reputation for quality
          and employability. We continue to expand our programmes, partnerships, and facilities
          while staying true to our mission: to nurture global fashion creatives and equip them
          to lead with creativity, excellence, and identity.
        </p>
      </section>
    </>
  );
}
