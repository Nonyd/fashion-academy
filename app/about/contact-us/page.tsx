import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Breadcrumb from "@/components/about/Breadcrumb";
import ContactForm from "@/components/about/ContactForm";
import { DEPARTMENT_CONTACTS } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "Contact Us | Prudential Fashion Academy",
  description: "Get in touch with PFA.",
};

export default function ContactUsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact Us" },
        ]}
      />
      <h1 className="mb-10 text-3xl font-semibold text-[var(--color-ivory)] sm:text-4xl">
        Contact Us
      </h1>

      <section className="mb-12">
        <h2 className="section-label mb-4">Send Us a Message</h2>
        <ContactForm />
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Contact Information</h2>
        <div className="flex flex-wrap gap-8 text-sm text-[var(--color-ivory)]/90 min-w-0">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--color-gold)]" />
            <span>Egbeda, Lagos · Ajah, Lagos · Ojodu, Lagos · Abuja</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-[var(--color-gold)]" />
            <a href="tel:+2348000000000" className="hover:text-[var(--color-gold)]">
              +234 800 000 0000
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-[var(--color-gold)]" />
            <a
              href="mailto:info@prudentialfashionacademy.com"
              className="hover:text-[var(--color-gold)]"
            >
              info@prudentialfashionacademy.com
            </a>
          </div>
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)]">
          Opening hours: Mon – Fri 8:00 AM – 5:00 PM (reception)
        </p>
      </section>

      <section className="mb-12">
        <h2 className="section-label mb-4">Department Contacts</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-2 text-left font-medium text-[var(--color-ivory)]">
                  Department
                </th>
                <th className="pb-2 text-left font-medium text-[var(--color-ivory)]">Email</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-ivory)]/80">
              {DEPARTMENT_CONTACTS.map((row) => (
                <tr key={row.name} className="border-b border-white/5">
                  <td className="py-2">{row.name}</td>
                  <td className="py-2">
                    <a
                      href={`mailto:${row.email}`}
                      className="text-[var(--color-gold)] hover:underline"
                    >
                      {row.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="section-label mb-4">Follow Us</h2>
        <div className="flex gap-4">
          <a
            href="#"
            className="rounded-full border border-white/20 p-2 text-[var(--color-ivory)]/80 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            aria-label="Facebook"
          >
            <span className="text-sm font-medium">f</span>
          </a>
          <a
            href="#"
            className="rounded-full border border-white/20 p-2 text-[var(--color-ivory)]/80 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            aria-label="Instagram"
          >
            <span className="text-sm font-medium">IG</span>
          </a>
          <a
            href="#"
            className="rounded-full border border-white/20 p-2 text-[var(--color-ivory)]/80 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            aria-label="Twitter"
          >
            <span className="text-sm font-medium">X</span>
          </a>
          <a
            href="#"
            className="rounded-full border border-white/20 p-2 text-[var(--color-ivory)]/80 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            aria-label="LinkedIn"
          >
            <span className="text-sm font-medium">in</span>
          </a>
        </div>
      </section>
    </>
  );
}
