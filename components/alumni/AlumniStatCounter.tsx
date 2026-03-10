"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import type { AlumniStat } from "@/lib/data/alumni";

function parseNumeric(value: string): number {
  const cleaned = value.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

type Props = { stat: AlumniStat };

export default function AlumniStatCounter({ stat }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseNumeric(stat.value);
  const isCurrency = stat.label.includes("Donated");
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 45, damping: 28 });

  useEffect(() => {
    if (!isInView) return;
    motionValue.set(numericValue);
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      setDisplayValue(Math.round(latest).toLocaleString());
    });
    return () => unsub();
  }, [spring]);

  const finalDisplay =
    isCurrency ? "₦" + displayValue + (stat.suffix || "") : displayValue + (stat.suffix || "");

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl font-bold tabular-nums text-[var(--color-gold)] sm:text-3xl md:text-4xl">
        {isInView ? finalDisplay : isCurrency ? "₦0" : "0"}
      </p>
      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
        {stat.label}
      </p>
    </div>
  );
}
