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
      <div className="flex gap-2 mb-6 border-b border-[#E5E1F5]">
        <button
          type="button"
          onClick={() => setTab("templates")}
          className={`px-4 py-2 text-sm font-medium ${tab === "templates" ? "text-[#7C5CBF] border-b-2 border-[#7C5CBF]" : "text-[#6B7280]"}`}
        >
          Templates
        </button>
        <button
          type="button"
          onClick={() => setTab("send")}
          className={`px-4 py-2 text-sm font-medium ${tab === "send" ? "text-[#7C5CBF] border-b-2 border-[#7C5CBF]" : "text-[#6B7280]"}`}
        >
          Send Mail
        </button>
      </div>
      {tab === "templates" && (
        <div className="bg-white rounded-xl border border-[#E5E1F5] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((t) => (
              <div key={t.event} className="p-4 border border-[#E5E1F5] rounded-lg">
                <p className="font-medium text-[#1A1A2E]">{t.event}</p>
                <p className="text-sm text-[#6B7280] truncate">{t.subject}</p>
                <span className={`text-xs ${t.isActive ? "text-[#10B981]" : "text-[#6B7280]"}`}>
                  {t.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "send" && (
        <div className="bg-white rounded-xl border border-[#E5E1F5] p-6">
          <p className="text-[#6B7280]">Send bulk mail form (recipients, subject, body)</p>
        </div>
      )}
    </motion.div>
  );
}
