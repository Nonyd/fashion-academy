"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { apiFetch } = useManagement();
  const [course, setCourse] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/courses/${id}`)
      .then((r) => r.json())
      .then((d) => d.data && setCourse(d.data));
  }, [id, apiFetch]);

  if (!course) return <PageHeader title="Course" />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title={String(course.title)} subtitle={String(course.code)} actions={<Link href="/management/courses" className="text-sm text-[#7C5CBF] hover:underline">← Back</Link>} />
      <div className="bg-white rounded-xl border border-[#E5E1F5] p-6">
        <p className="text-[#6B7280]">Program: {String(course.program)}</p>
        <p className="text-[#6B7280]">Semester: {String(course.semester)}</p>
        <p className="text-[#6B7280]">Enrolled: {(course.enrollments as unknown[])?.length ?? 0}</p>
      </div>
    </motion.div>
  );
}
