"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";

export default function TeacherDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { apiFetch } = useManagement();
  const [teacher, setTeacher] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/teachers/${id}`)
      .then((r) => r.json())
      .then((d) => d.data && setTeacher(d.data));
  }, [id, apiFetch]);

  if (!teacher) return <PageHeader title="Teacher" />;
  const user = teacher.user as { firstName?: string; lastName?: string; email?: string } | undefined;
  const name = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title={name} actions={<Link href="/management/teachers" className="text-sm text-[var(--color-gold)] hover:underline">← Back</Link>} />
      <div className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-6">
        <p className="text-[var(--color-muted)]">Email: {user?.email}</p>
        <p className="text-[var(--color-muted)]">Courses: {(teacher.courses as unknown[])?.length ?? 0}</p>
      </div>
    </motion.div>
  );
}
