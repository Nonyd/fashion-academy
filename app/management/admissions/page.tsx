"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { DataTable } from "@/components/management/DataTable";
import { StatusBadge } from "@/components/management/StatusBadge";
import { Modal } from "@/components/management/Modal";

type Admission = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  intakeYear: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

export default function AdmissionsPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [detailId, setDetailId] = useState<string | null>(null);
  const limit = 20;

  function load() {
    setLoading(true);
    apiFetch(`/admissions?page=${page}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setItems(d.data);
        if (d.meta) setTotal(d.meta.total ?? 0);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [page, apiFetch]);

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader title="Admissions" />
      <DataTable<Admission>
        columns={[
          { key: "firstName", label: "Name", render: (r) => `${r.firstName} ${r.lastName}` },
          { key: "email", label: "Email" },
          { key: "program", label: "Program" },
          { key: "intakeYear", label: "Intake" },
          { key: "createdAt", label: "Applied", render: (r) => new Date(r.createdAt).toLocaleDateString() },
          { key: "paymentStatus", label: "Payment", render: (r) => <StatusBadge status={r.paymentStatus} /> },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={items}
        loading={loading}
        pagination={{ page, totalPages, total, limit }}
        onPageChange={setPage}
        onSearch={() => {}}
        actions={(row) => (
          <button
            type="button"
            onClick={() => setDetailId(row.id)}
            className="text-[var(--color-gold)] hover:underline text-sm"
          >
            View
          </button>
        )}
        emptyMessage="No admissions found"
      />
      <Modal
        isOpen={!!detailId}
        onClose={() => setDetailId(null)}
        title="Admission Detail"
        size="lg"
      >
        {detailId && <p className="text-[var(--color-muted)]">ID: {detailId}</p>}
      </Modal>
    </motion.div>
  );
}
