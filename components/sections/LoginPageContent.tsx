"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, GraduationCap, UserCog, LayoutDashboard } from "lucide-react";

type LoginRole = "student" | "teacher" | "management";

const ROLES: { id: LoginRole; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "student",
    label: "Student",
    icon: <GraduationCap className="h-4 w-4" />,
    description: "Access courses, assignments & resources",
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: <UserCog className="h-4 w-4" />,
    description: "Manage classes, grades & materials",
  },
  {
    id: "management",
    label: "Management",
    icon: <LayoutDashboard className="h-4 w-4" />,
    description: "Admin dashboard & academy oversight",
  },
];

type SubmitResult = { ok: boolean; error?: string };

export default function LoginPageContent({
  onSubmit: onSubmitProp,
}: {
  onSubmit?: (email: string, password: string) => Promise<SubmitResult>;
} = {}) {
  const [role, setRole] = useState<LoginRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    try {
      if (onSubmitProp) {
        const result = await onSubmitProp(email, password);
        if (!result.ok) {
          setSubmitError(result.error ?? "Login failed");
        }
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeRole = ROLES.find((r) => r.id === role)!;

  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-between border-r border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 pt-24 pb-10 lg:px-12 lg:pt-28 lg:pb-14">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--color-ivory)]/60 transition-colors hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>

          <div className="mt-10 lg:mt-16">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--color-gold)]">
              Portal access
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-ivory)] sm:text-4xl">
              Sign in
            </h1>

            {/* Role tabs */}
            <div className="mt-8 flex gap-1 rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/80 p-1.5 backdrop-blur">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className="relative flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-ivory)]/70 transition-colors hover:text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  aria-pressed={role === r.id}
                  aria-label={`Sign in as ${r.label}`}
                >
                  {role === r.id && (
                    <motion.span
                      layoutId="login-role-tab"
                      className="absolute inset-0 rounded-xl bg-[var(--color-gold)]/20 ring-1 ring-[var(--color-gold)]/40"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 hidden sm:inline-block">{r.icon}</span>
                  <span className="relative z-10">{r.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={role}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-[11px] text-[var(--color-muted)]"
              >
                {activeRole.description}
              </motion.p>
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--color-muted)]"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/30"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--color-muted)]"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="mt-2 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/30"
                  placeholder="••••••••"
                />
              </div>
              {submitError && (
                <p className="text-[11px] text-red-400">{submitError}</p>
              )}
              <div className="flex items-center justify-between text-[11px]">
                <label className="flex cursor-pointer items-center gap-2 text-[var(--color-ivory)]/70">
                  <input
                    type="checkbox"
                    className="rounded border-white/20 bg-black/40 text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                  Remember me
                </label>
                <a
                  href="mailto:admissions@prudentialfashionacademy.com?subject=Password%20reset"
                  className="text-[var(--color-gold)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[var(--color-gold)] py-3.5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-70"
              >
                {isSubmitting ? "Signing in…" : `Sign in as ${activeRole.label}`}
              </button>
            </form>

            <p className="mt-8 text-center text-[11px] text-[var(--color-muted)]">
              Don&apos;t have an account?{" "}
              <Link href="/admissions/apply" className="text-[var(--color-gold)] hover:underline">
                Apply to join
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Visual / media side */}
      <div className="relative hidden min-h-[50vh] overflow-hidden lg:block">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            poster="https://images.unsplash.com/photo-1558769132-cb1aeaede033?auto=format&fit=crop&w=1200&q=80"
          >
            <source
              src="https://videos.pexels.com/video-files/6311642/6311642-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(201,168,76,0.12),transparent)]" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-10 xl:p-14">
          <blockquote className="max-w-md">
            <p className="text-2xl font-medium leading-relaxed text-[var(--color-ivory)] xl:text-3xl">
              Fashion is not just clothing. It is culture, identity, and the future.
            </p>
            <footer className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Prudential Fashion Academy
            </footer>
          </blockquote>
          <p className="mt-6 text-xs text-[var(--color-ivory)]/50">
            Est. 2020 · Lagos · Abuja
          </p>
        </div>
        {/* Decorative frame */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
      </div>

      {/* Mobile: show a compact visual strip */}
      <div className="relative h-48 overflow-hidden border-t border-[var(--color-charcoal)] lg:hidden">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aeaede033?auto=format&fit=crop&w=1200&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-noir)] via-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">
            The Bedrock For Nurturing Global Fashion Creatives
          </p>
        </div>
      </div>
    </div>
  );
}
