"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "dark",
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return getSystemTheme();
  return theme;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("dashboard-theme") as Theme | null;
    const initial = stored || "system";
    setThemeState(initial);
    setResolved(resolveTheme(initial));
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        setResolved(getSystemTheme());
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  useEffect(() => {
    setResolved(resolveTheme(theme));
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.remove("dashboard-dark", "dashboard-light", "dark");
    document.documentElement.classList.add(resolved === "dark" ? "dashboard-dark" : "dashboard-light");
    if (resolved === "dark") {
      document.documentElement.classList.add("dark");
    }
    document.body.className = document.body.className
      .replace(/bg-\[#[0-9a-fA-F]+\]|bg-white|bg-gray-50|bg-slate-900/, "")
      .trim();
    document.body.classList.add(resolved === "dark" ? "bg-[#13151A]" : "bg-gray-50");
  }, [resolved]);

  function setTheme(t: Theme) {
    setThemeState(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme: resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}
