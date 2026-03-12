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
      <PageHeader title="Notifications" actions={<span className="text-sm text-[#7C5CBF]">Mark All Read</span>} />
      <div className="bg-white rounded-xl border border-[#E5E1F5] divide-y divide-[#E5E1F5]">
        {loading && <div className="p-6 animate-pulse">Loading...</div>}
        {!loading && items.length === 0 && <div className="p-12 text-center text-[#6B7280]">No notifications</div>}
        {items.map((n) => (
          <div key={n.id} className={`p-4 ${n.read ? "bg-white" : "bg-[#F8F7FF]"}`}>
            <p className="font-medium text-[#1A1A2E]">{n.title}</p>
            <p className="text-sm text-[#6B7280]">{n.message}</p>
            <p className="text-xs text-[#6B7280] mt-1">{new Date(n.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
