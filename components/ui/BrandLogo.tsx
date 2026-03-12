"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Variant = "default" | "white" | "dark";
type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { w: number; h: number }> = {
  sm: { w: 120, h: 40 },
  md: { w: 180, h: 60 },
  lg: { w: 240, h: 80 },
};

export function BrandLogo({
  variant = "default",
  size = "md",
}: {
  variant?: Variant;
  size?: Size;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const dimensions = sizeMap[size];

  useEffect(() => {
    const type =
      variant === "white"
        ? "logo-white"
        : variant === "dark"
          ? "logo-dark"
          : "logo";
    setSrc(`/api/v1/assets/${type}`);
  }, [variant]);

  const fallback =
    variant === "white"
      ? "/assets/logo-white.png"
      : variant === "dark"
        ? "/assets/logo-dark.png"
        : "/assets/logo.png";

  return (
    <Image
      src={src ?? fallback}
      alt="PFA Logo"
      width={dimensions.w}
      height={dimensions.h}
      unoptimized
      onError={() => setSrc(fallback)}
    />
  );
}
