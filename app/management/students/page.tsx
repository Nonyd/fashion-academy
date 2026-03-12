"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { DataTable } from "@/components/management/DataTable";
import { StatusBadge } from "@/components/management/StatusBadge";

type Student = {
  id: string;
  regNumber: string;
  user?: { firstName: string; lastName: string; email: string };
  program: string;
  intakeYear: number;
  enrollmentStatus: string;
};

export default function StudentsPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/students?page=${page}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setItems(d.data);
        if (d.meta) setTotal(d.meta.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [page, apiFetch]);

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader title="Students" actions={<span className="text-sm text-[#6B7280]">Add Student (modal)</span>} />
      <DataTable<Student>
        columns={[
          { key: "regNumber", label: "REG Number" },
          { key: "user", label: "Name", render: (r) => r.user ? `${r.user.firstName} ${r.user.lastName}` : "" },
          { key: "program", label: "Program" },
          { key: "intakeYear", label: "Intake" },
          { key: "enrollmentStatus", label: "Status", render: (r) => <StatusBadge status={r.enrollmentStatus} /> },
        ]}
        data={items}
        loading={loading}
        pagination={{ page, totalPages, total, limit }}
        onPageChange={setPage}
        actions={(row) => (
          <Link href={`/management/students/${row.id}`} className="text-[#7C5CBF] hover:underline text-sm">
            View
          </Link>
        )}
        emptyMessage="No students found"
      />
    </motion.div>
  );
}
