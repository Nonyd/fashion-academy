"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";
import { FormField } from "@/components/management/FormField";
import { useToast } from "@/components/ui/ToastProvider";

export default function SettingsPage() {
  const { apiFetch } = useManagement();
  const toast = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/settings")
      .then((r) => r.json())
      .then((d) => d.data && setSettings(d.data))
      .finally(() => setLoading(false));
  }, [apiFetch]);

  function handleSave(key: string, value: string) {
    apiFetch("/settings/" + key, {
      method: "PATCH",
      body: JSON.stringify({ value }),
    })
      .then((r) => r.json())
      .then(() => toast("Setting saved", "success"))
      .catch(() => toast("Failed to save", "error"));
  }

  if (loading) return <PageHeader title="Settings" />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Settings" />
      <div className="space-y-8">
        <section className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-[var(--color-ivory)] font-[var(--font-display)] mb-4">Academy Info</h2>
          <FormField label="Academy Name">
            <input
              type="text"
              defaultValue={settings.academy_name}
              onBlur={(e) => handleSave("academy_name", e.target.value)}
              className="w-full px-3 py-2 border border-white/10 rounded-xl bg-black/30 text-[var(--color-ivory)] focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 outline-none"
            />
          </FormField>
          <FormField label="Academy Email">
            <input
              type="email"
              defaultValue={settings.academy_email}
              onBlur={(e) => handleSave("academy_email", e.target.value)}
              className="w-full px-3 py-2 border border-white/10 rounded-xl bg-black/30 text-[var(--color-ivory)] focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 outline-none"
            />
          </FormField>
          <FormField label="Academy Phone">
            <input
              type="text"
              defaultValue={settings.academy_phone}
              onBlur={(e) => handleSave("academy_phone", e.target.value)}
              className="w-full px-3 py-2 border border-white/10 rounded-xl bg-black/30 text-[var(--color-ivory)] focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 outline-none"
            />
          </FormField>
        </section>
        <section className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-[var(--color-ivory)] font-[var(--font-display)] mb-4">Admissions</h2>
          <FormField label="Admissions Open">
            <select
              defaultValue={settings.admissions_open}
              onChange={(e) => handleSave("admissions_open", e.target.value)}
              className="w-full px-3 py-2 border border-white/10 rounded-xl bg-black/30 text-[var(--color-ivory)] focus:ring-2 focus:ring-[var(--color-gold)]/50 outline-none"
            >
              <option value="true">Open</option>
              <option value="false">Closed</option>
            </select>
          </FormField>
          <FormField label="Current Intake">
            <input
              type="text"
              defaultValue={settings.current_intake}
              onBlur={(e) => handleSave("current_intake", e.target.value)}
              className="w-full px-3 py-2 border border-white/10 rounded-xl bg-black/30 text-[var(--color-ivory)] focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 outline-none"
            />
          </FormField>
        </section>
      </div>
    </motion.div>
  );
}
