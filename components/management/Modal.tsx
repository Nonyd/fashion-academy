"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full ${sizeMap[size]} bg-[var(--color-charcoal)] rounded-xl shadow-xl border border-white/10 max-h-[90vh] flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-[var(--color-ivory)] font-[var(--font-display)]">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-xl text-[var(--color-muted)] hover:bg-white/10 hover:text-[var(--color-ivory)]"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 py-4 text-[var(--color-ivory)]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
