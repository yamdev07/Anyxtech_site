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

/** Read stored theme and resolve it — runs synchronously before paint. */
function getInitialResolved(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("dashboard-theme") as Theme | null;
  return resolveTheme(stored || "system");
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  // On mount: read stored preference and apply immediately
  useEffect(() => {
    const stored = localStorage.getItem("dashboard-theme") as Theme | null;
    const initial = stored || "system";
    const resolvedInitial = resolveTheme(initial);
    setThemeState(initial);
    setResolved(resolvedInitial);
  }, []);

  // Reactively track system preference changes when theme === "system"
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

  // Update resolved whenever explicit theme changes
  useEffect(() => {
    setResolved(resolveTheme(theme));
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  // Apply theme class to <html> and bg class to <body>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dashboard-dark", "dashboard-light", "dark");
    root.classList.add(resolved === "dark" ? "dashboard-dark" : "dashboard-light");
    if (resolved === "dark") {
      root.classList.add("dark");
    }

    // Update body background
    document.body.className = document.body.className
      .replace(/\bbg-\[[^\]]+\]|\bbg-white\b|\bbg-gray-50\b|\bbg-slate-900\b/g, "")
      .trim();
    document.body.classList.add(resolved === "dark" ? "bg-[#13151A]" : "bg-[#F8FAFC]");
  }, [resolved]);

  function setTheme(t: Theme) {
    setThemeState(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme: resolved }}>
      {/* Blocking inline script: applies theme class before first paint to prevent flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var s=localStorage.getItem('dashboard-theme')||'system';var d=s==='dark'||(s==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var root=document.documentElement;root.classList.remove('dashboard-dark','dashboard-light','dark');root.classList.add(d?'dashboard-dark':'dashboard-light');if(d)root.classList.add('dark');document.body.classList.add(d?'bg-[#13151A]':'bg-[#F8FAFC]')}catch(e){}})();`,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}
