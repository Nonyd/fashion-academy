"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";

type Template = { event: string; subject: string; isActive: boolean };

export default function MailPage() {
  const { apiFetch } = useManagement();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [tab, setTab] = useState<"templates" | "send">("templates");

  useEffect(() => {
    apiFetch("/mail/templates")
      .then((r) => r.json())
      .then((d) => d.data && setTemplates(d.data));
  }, [apiFetch]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Mail" />
      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button
          type="button"
          onClick={() => setTab("templates")}
          className={`px-4 py-2 text-sm font-medium ${tab === "templates" ? "text-[var(--color-gold)] border-b-2 border-[var(--color-gold)]" : "text-[var(--color-muted)]"}`}
        >
          Templates
        </button>
        <button
          type="button"
          onClick={() => setTab("send")}
          className={`px-4 py-2 text-sm font-medium ${tab === "send" ? "text-[var(--color-gold)] border-b-2 border-[var(--color-gold)]" : "text-[var(--color-muted)]"}`}
        >
          Send Mail
        </button>
      </div>
      {tab === "templates" && (
        <div className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((t) => (
              <div key={t.event} className="p-4 border border-white/10 rounded-xl">
                <p className="font-medium text-[var(--color-ivory)]">{t.event}</p>
                <p className="text-sm text-[var(--color-muted)] truncate">{t.subject}</p>
                <span className={`text-xs ${t.isActive ? "text-emerald-400" : "text-[var(--color-muted)]"}`}>
                  {t.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "send" && (
        <div className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-6">
          <p className="text-[var(--color-muted)]">Send bulk mail form (recipients, subject, body)</p>
        </div>
      )}
    </motion.div>
  );
}
