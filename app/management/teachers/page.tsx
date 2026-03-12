"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { DataTable } from "@/components/management/DataTable";

type Teacher = {
  id: string;
  user?: { firstName: string; lastName: string; email: string };
  courses?: unknown[];
};

export default function TeachersPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/teachers?page=${page}&limit=${limit}`)
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
      <PageHeader title="Teachers" />
      <DataTable<Teacher>
        columns={[
          { key: "user", label: "Name", render: (r) => r.user ? `${r.user.firstName} ${r.user.lastName}` : "" },
          { key: "user", label: "Email", render: (r) => (r.user as { email?: string })?.email ?? "" },
          { key: "courses", label: "Courses", render: (r) => (Array.isArray(r.courses) ? r.courses.length : 0).toString() },
        ]}
        data={items}
        loading={loading}
        pagination={{ page, totalPages, total, limit }}
        onPageChange={setPage}
        emptyMessage="No teachers found"
      />
    </motion.div>
  );
}
