"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-noir)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-xs font-medium tracking-[0.32em] text-[var(--color-gold)]">
              PRUDENTIAL FASHION ACADEMY
            </span>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-ivory)]/70">
              The Bedrock For Nurturing Global Fashion Creatives.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

