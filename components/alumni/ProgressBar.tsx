"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

type Props = { percent: number; className?: string };

export default function ProgressBar({ percent, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const target = Math.min(100, percent);
    const timer = requestAnimationFrame(function tick() {
      setWidth((w) => {
        const next = w + (target - w) * 0.12;
        if (Math.abs(next - target) < 0.5) return target;
        requestAnimationFrame(tick);
        return next;
      });
    });
    return () => cancelAnimationFrame(timer);
  }, [isInView, percent]);

  return (
    <div
      ref={ref}
      className={`h-2 overflow-hidden rounded-full bg-white/10 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-[var(--color-gold)] transition-[width] duration-700 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
