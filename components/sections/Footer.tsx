import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pb-6 pt-16 lg:px-10 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 text-sm text-[var(--color-ivory)]/75 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]" aria-label="Prudential Fashion Academy – Home">
              <Image
                src="/logo.png"
                alt="Prudential Fashion Academy"
                width={120}
                height={48}
                className="h-10 w-auto object-contain object-left invert"
              />
            </Link>
            <p className="text-[10px] text-[var(--color-ivory)]/70">
              The Bedrock For Nurturing Global Fashion Creatives.
            </p>
            <p className="text-xs text-[var(--color-ivory)]/60">
              A global school for fashion&apos;s next storytellers, strategists, and
              image makers.
            </p>
            <div className="flex gap-3">
              <SocialIcon href="#" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="#" label="TikTok">
                <Music2 className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.26em] text-[var(--color-muted)]">
              Programs
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a href="#programs" className="hover:text-[var(--color-ivory)]">
                  Fashion Design
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[var(--color-ivory)]">
                  Styling & Art Direction
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[var(--color-ivory)]">
                  Fashion Business & Luxury
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[var(--color-ivory)]">
                  Textile Design
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[var(--color-ivory)]">
                  Technology & AI
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.26em] text-[var(--color-muted)]">
              About
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a href="#admissions" className="hover:text-[var(--color-ivory)]">
                  About the Academy
                </a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-[var(--color-ivory)]">
                  Faculty
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-[var(--color-ivory)]">
                  Events
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[var(--color-ivory)]">
                  Press & Careers
                </a>
              </li>
              <li>
                <a href="/alumni" className="hover:text-[var(--color-ivory)]">
                  Alumni
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.26em] text-[var(--color-muted)]">
              Campuses
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[var(--color-ivory)]/70">
              <li>
                <span className="font-medium text-[var(--color-ivory)]">Lagos</span>
                <span className="text-[var(--color-muted)]"> — Egbeda, Ajah, Ojodu</span>
              </li>
              <li>
                <span className="font-medium text-[var(--color-ivory)]">Abuja</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.26em] text-[var(--color-muted)]">
              Contact
            </h3>
            <p className="text-xs text-[var(--color-ivory)]/70">
              admissions@prudentialfashionacademy.com
              <br />
              +39 02 0000 0000
            </p>
            <form className="space-y-2">
              <label
                htmlFor="newsletter"
                className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
              >
                Newsletter
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[var(--color-gold)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-noir)]"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--color-charcoal)] pt-4 text-[11px] text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>© 2025 Prudential Fashion Academy. Est. 2020. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-[var(--color-ivory)]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--color-ivory)]">
              Terms
            </a>
            <a href="#" className="hover:text-[var(--color-ivory)]">
              Cookie Preferences
            </a>
            <span className="text-[10px]">
              EN · FR · IT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

type SocialIconProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[var(--color-ivory)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
    >
      {children}
    </a>
  );
}

