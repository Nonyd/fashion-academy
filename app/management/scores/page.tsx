"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { DataTable } from "@/components/management/DataTable";

type Score = {
  id: string;
  score: number;
  letterGrade: string;
  assessmentType: string;
  semester: number;
  student?: { user?: { firstName?: string; lastName?: string }; regNumber?: string };
  course?: { code?: string };
};

export default function ScoresPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/scores?page=${page}&limit=${limit}`)
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
      <PageHeader title="Scores" />
      <DataTable<Score>
        columns={[
          { key: "student", label: "Student", render: (r) => r.student?.user ? `${r.student.user.firstName} ${r.student.user.lastName}` : "" },
          { key: "student", label: "REG", render: (r) => (r.student as { regNumber?: string })?.regNumber ?? "" },
          { key: "course", label: "Course", render: (r) => r.course?.code ?? "" },
          { key: "assessmentType", label: "Type" },
          { key: "score", label: "Score" },
          { key: "letterGrade", label: "Grade" },
          { key: "semester", label: "Semester" },
        ]}
        data={items}
        loading={loading}
        pagination={{ page, totalPages, total, limit }}
        onPageChange={setPage}
        emptyMessage="No scores found"
      />
    </motion.div>
  );
}
