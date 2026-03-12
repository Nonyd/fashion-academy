"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info" | "warning";

const typeStyles: Record<ToastType, string> = {
  success: "bg-[#10B981] text-white",
  error: "bg-[#EF4444] text-white",
  info: "bg-[#7C5CBF] text-white",
  warning: "bg-[#F59E0B] text-white",
};

export type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
};

export function Toast({
  toasts,
  remove,
}: {
  toasts: ToastItem[];
  remove: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.slice(0, 3).map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`pointer-events-auto px-4 py-3 rounded-lg shadow-lg ${typeStyles[t.type]}`}
          >
            <p className="text-sm font-medium">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
