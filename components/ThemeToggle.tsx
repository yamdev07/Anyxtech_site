"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className={`grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-soft transition-colors hover:text-brand-light ${className}`}
    >
      {mounted && dark ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
