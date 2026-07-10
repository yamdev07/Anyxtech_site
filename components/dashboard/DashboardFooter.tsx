"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const themes = [
  { value: "light" as const, icon: Sun, label: "Clair" },
  { value: "dark" as const, icon: Moon, label: "Sombre" },
  { value: "system" as const, icon: Monitor, label: "Système" },
];

export default function DashboardFooter() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div
          className="flex items-center justify-between rounded-2xl px-5 py-3"
          style={{
            background: "rgba(30, 33, 43, 0.85)",
            backdropFilter: "blur(20px) saturate(1.4)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            boxShadow: "0 4px 24px -4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <span className="text-xs font-medium text-gray-500">
            &copy; {new Date().getFullYear()} AnyxTech
          </span>

          <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
            {themes.map((t) => {
              const Icon = t.icon;
              const active = theme === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  title={t.label}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-md shadow-indigo-500/25"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
