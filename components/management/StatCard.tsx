"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: number | string;
  change?: number;
  changeType?: "up" | "down";
  icon: React.ReactNode;
  color: "purple" | "deep" | "gold" | "green" | "blue" | "orange" | "teal";
};

const colorMap = {
  purple: "bg-[var(--color-gold)]/15 text-[var(--color-gold)]",
  deep: "bg-[var(--color-charcoal)] ring-1 ring-white/10 text-[var(--color-ivory)]",
  gold: "bg-[var(--color-gold)]/15 text-[var(--color-gold)]",
  green: "bg-emerald-500/20 text-emerald-400",
  blue: "bg-blue-500/20 text-blue-400",
  orange: "bg-amber-500/20 text-amber-400",
  teal: "bg-teal-500/20 text-teal-400",
};

export function StatCard({
  title,
  value,
  change,
  changeType = "up",
  icon,
  color,
}: StatCardProps) {
  const [display, setDisplay] = useState(typeof value === "number" ? 0 : value);
  const numValue = typeof value === "number" ? value : parseFloat(String(value)) || 0;

  useEffect(() => {
    if (typeof value !== "number") {
      setDisplay(value);
      return;
    }
    let start = 0;
    const end = value;
    const duration = 800;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(start + (end - start) * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--color-charcoal)] rounded-xl border border-white/10 p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-muted)]">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-ivory)] font-[var(--font-display)]">
            {typeof value === "string" && isNaN(numValue) ? value : display}
          </p>
          {change != null && (
            <p
              className={`mt-1 text-sm font-medium ${
                changeType === "up" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {changeType === "up" ? "↑" : "↓"} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
