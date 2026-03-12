"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { StatusBadge } from "@/components/management/StatusBadge";

export default function StudentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { apiFetch } = useManagement();
  const [student, setStudent] = useState<Record<string, unknown> | null>(null);
  const [tab, setTab] = useState<"overview" | "scores" | "projects" | "payments">("overview");

  useEffect(() => {
    if (!id) return;
    apiFetch(`/students/${id}`)
      .then((r) => r.json())
      .then((d) => d.data && setStudent(d.data));
  }, [id, apiFetch]);

  if (!student) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <PageHeader title="Student" />
        <p className="text-[var(--color-muted)]">Loading...</p>
      </motion.div>
    );
  }

  const user = student.user as { firstName?: string; lastName?: string; email?: string } | undefined;
  const name = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title={name}
        subtitle={(student.regNumber as string) ?? ""}
        actions={<Link href="/management/students" className="text-sm text-[var(--color-gold)] hover:underline">← Back</Link>}
      />
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {(["overview", "scores", "projects", "payments"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium rounded-t-xl ${
              tab === t ? "bg-[var(--color-charcoal)] border border-white/10 border-b-0 -mb-px text-[var(--color-gold)]" : "text-[var(--color-muted)] hover:text-[var(--color-ivory)]"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {tab === "overview" && (
        <div className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-6">
          <p className="text-[var(--color-muted)]">Program: {String(student.program)}</p>
          <p className="text-[var(--color-muted)]">Intake: {String(student.intakeYear)}</p>
          <p className="text-[var(--color-muted)]">Status: <StatusBadge status={String(student.enrollmentStatus)} /></p>
        </div>
      )}
      {tab === "scores" && <p className="text-[var(--color-muted)]">Scores tab – fetch /students/{id}/scores</p>}
      {tab === "projects" && <p className="text-[var(--color-muted)]">Projects tab – fetch /students/{id}/projects</p>}
      {tab === "payments" && <p className="text-[var(--color-muted)]">Payments tab – fetch /students/{id}/payments</p>}
    </motion.div>
  );
}
