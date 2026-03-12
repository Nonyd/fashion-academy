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
  purple: "bg-[#7C5CBF]/10 text-[#7C5CBF]",
  deep: "bg-[#4A3480]/10 text-[#4A3480]",
  gold: "bg-[#D4AF37]/10 text-[#D4AF37]",
  green: "bg-[#10B981]/10 text-[#10B981]",
  blue: "bg-blue-500/10 text-blue-600",
  orange: "bg-[#F59E0B]/10 text-[#F59E0B]",
  teal: "bg-teal-500/10 text-teal-600",
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
      className="bg-white rounded-xl border border-[#E5E1F5] p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-[#1A1A2E]">
            {typeof value === "string" && isNaN(numValue) ? value : display}
          </p>
          {change != null && (
            <p
              className={`mt-1 text-sm font-medium ${
                changeType === "up" ? "text-[#10B981]" : "text-[#EF4444]"
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
