"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { DataTable } from "@/components/management/DataTable";

type Course = {
  id: string;
  code: string;
  title: string;
  program: string;
  semester: number;
  teacher?: { user?: { firstName?: string; lastName?: string } };
  isArchived?: boolean;
};

export default function CoursesPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/courses?page=${page}&limit=${limit}`)
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
      <PageHeader title="Courses" />
      <DataTable<Course>
        columns={[
          { key: "code", label: "Code" },
          { key: "title", label: "Title" },
          { key: "program", label: "Program" },
          { key: "semester", label: "Semester" },
          { key: "teacher", label: "Teacher", render: (r) => r.teacher?.user ? `${r.teacher.user.firstName} ${r.teacher.user.lastName}` : "" },
          { key: "isArchived", label: "Status", render: (r) => r.isArchived ? "Archived" : "Active" },
        ]}
        data={items}
        loading={loading}
        pagination={{ page, totalPages, total, limit }}
        onPageChange={setPage}
        emptyMessage="No courses found"
      />
    </motion.div>
  );
}
