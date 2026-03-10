import type { Metadata } from "next";
import { Award, Globe, Lightbulb, Palette, Shield, Users } from "lucide-react";
import Breadcrumb from "@/components/about/Breadcrumb";
import { CORE_VALUES } from "@/lib/data/about";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Award,
  Shield,
  Lightbulb,
  Globe,
  Users,
};

export const metadata: Metadata = {
  title: "Vision & Mission | Prudential Fashion Academy",
  description: "PFA vision, mission, and core values.",
};

export default function VisionMissionPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Vision & Mission" },
        ]}
      />
      <h1 className="mb-10 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        Vision & Mission
      </h1>

      <div className="mb-12 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-8">
        <p className="text-lg leading-relaxed italic text-[var(--color-ivory)] sm:text-xl">
          To be the leading fashion education institution in Africa, recognised globally for
          nurturing creative talent, industry readiness, and ethical leadership in fashion and
          design.
        </p>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Our Vision
        </p>
      </div>

      <div className="mb-12 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-8">
        <p className="text-lg leading-relaxed italic text-[var(--color-ivory)] sm:text-xl">
          To provide world-class fashion education that combines creativity, commerce, and
          culture; to equip students with the skills, mindset, and networks to lead in the
          global fashion industry; and to build a community that celebrates diversity,
          innovation, and excellence.
        </p>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Our Mission
        </p>
      </div>

      <section>
        <h2 className="section-label mb-6">Our Core Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value) => {
            const Icon = ICON_MAP[value.icon];
            return (
              <div
                key={value.id}
                className="rounded-xl border border-white/10 bg-[var(--color-charcoal)]/60 p-6"
              >
                {Icon && (
                  <Icon className="mb-3 h-8 w-8 text-[var(--color-gold)]" aria-hidden />
                )}
                <h3 className="text-sm font-semibold text-[var(--color-ivory)]">
                  {value.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ivory)]/80">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
