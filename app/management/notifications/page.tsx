"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useManagement } from "@/context/ManagementContext";
import { PageHeader } from "@/components/management/PageHeader";

type Notification = { id: string; title: string; message: string; read: boolean; createdAt: string };

export default function NotificationsPage() {
  const { apiFetch } = useManagement();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/notifications?page=1&limit=50")
      .then((r) => r.json())
      .then((d) => d.data?.items && setItems(d.data.items))
      .finally(() => setLoading(false));
  }, [apiFetch]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Notifications" actions={<span className="text-sm text-[var(--color-gold)]">Mark All Read</span>} />
      <div className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 divide-y divide-white/10">
        {loading && <div className="p-6 animate-pulse text-[var(--color-muted)]">Loading...</div>}
        {!loading && items.length === 0 && <div className="p-12 text-center text-[var(--color-muted)]">No notifications</div>}
        {items.map((n) => (
          <div key={n.id} className={`p-4 ${n.read ? "bg-transparent" : "bg-white/5"}`}>
            <p className="font-medium text-[var(--color-ivory)]">{n.title}</p>
            <p className="text-sm text-[var(--color-muted)]">{n.message}</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">{new Date(n.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
