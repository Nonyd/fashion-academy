"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { DataTable } from "@/components/management/DataTable";
import { StatusBadge } from "@/components/management/StatusBadge";

type Payment = {
  id: string;
  transactionRef?: string;
  name: string;
  purpose: string;
  amount: number;
  provider: string;
  status: string;
  createdAt: string;
};

export default function PaymentsPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/payments?page=${page}&limit=${limit}`)
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
      <PageHeader title="Payments" />
      <DataTable<Payment>
        columns={[
          { key: "transactionRef", label: "Reference" },
          { key: "name", label: "Name" },
          { key: "purpose", label: "Purpose" },
          { key: "amount", label: "Amount" },
          { key: "provider", label: "Provider" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString() },
        ]}
        data={items}
        loading={loading}
        pagination={{ page, totalPages, total, limit }}
        onPageChange={setPage}
        emptyMessage="No payments found"
      />
    </motion.div>
  );
}
