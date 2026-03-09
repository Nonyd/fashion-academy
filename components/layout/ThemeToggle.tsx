"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";
  const label = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-[var(--color-ivory)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

