"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";

const tabs = ["Academic", "Admissions", "Financial", "Enrollment"] as const;

export default function ReportsPage() {
  const { apiFetch } = useManagement();
  const [tab, setTab] = useState<typeof tabs[number]>("Academic");

  function exportCsv() {
    const path = tab === "Academic" ? "/reports/academic/export?format=csv" : "/reports/financial/export?format=csv";
    apiFetch(path).then((r) => r.blob()).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tab.toLowerCase()}-report.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Reports"
        actions={
          <button
            type="button"
            onClick={exportCsv}
            className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-noir)] text-sm font-medium rounded-xl hover:bg-[var(--color-gold-light)]"
          >
            Export CSV
          </button>
        }
      />
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium ${tab === t ? "text-[var(--color-gold)] border-b-2 border-[var(--color-gold)]" : "text-[var(--color-muted)]"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-6">
        <p className="text-[var(--color-muted)]">{tab} report – filters and charts</p>
      </div>
    </motion.div>
  );
}
