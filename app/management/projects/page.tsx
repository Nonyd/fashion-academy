"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { DataTable } from "@/components/management/DataTable";
import { StatusBadge } from "@/components/management/StatusBadge";

type Project = {
  id: string;
  title: string;
  status: string;
  submittedAt: string;
  student?: { user?: { firstName?: string; lastName?: string } };
  course?: { code?: string };
};

export default function ProjectsPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/projects?page=${page}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setItems(d.data);
        if (d.meta) setTotal(d.meta.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [page, apiFetch]);

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Projects" />
      <DataTable<Project>
        columns={[
          { key: "student", label: "Student", render: (r) => r.student?.user ? `${r.student.user.firstName} ${r.student.user.lastName}` : "" },
          { key: "course", label: "Course", render: (r) => r.course?.code ?? "" },
          { key: "title", label: "Title" },
          { key: "submittedAt", label: "Submitted", render: (r) => new Date(r.submittedAt).toLocaleDateString() },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={items}
        loading={loading}
        pagination={{ page, totalPages, total, limit }}
        onPageChange={setPage}
        emptyMessage="No projects found"
      />
    </motion.div>
  );
}
