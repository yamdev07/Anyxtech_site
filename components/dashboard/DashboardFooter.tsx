"use client";

import { Sun, Moon, Monitor, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const themes = [
  { value: "light" as const, icon: Sun, label: "Clair" },
  { value: "dark" as const, icon: Moon, label: "Sombre" },
  { value: "system" as const, icon: Monitor, label: "Système" },
];

const navLinks = [
  { label: "Vue d'ensemble", href: "/dashboard" },
  { label: "Analytique", href: "/dashboard/analytics" },
  { label: "Messages", href: "/dashboard/messages" },
  { label: "Paramètres", href: "/dashboard/settings" },
];

export default function DashboardFooter({ email, noSidebar }: { email?: string | null; noSidebar?: boolean }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <footer className={`relative z-10 ${noSidebar ? "" : "lg:pl-64"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 pt-2">
        <div
          className="rounded-2xl px-6 py-5 w-full"
          style={{
            background: "rgba(30, 33, 43, 0.85)",
            backdropFilter: "blur(20px) saturate(1.4)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            boxShadow: "0 -4px 24px -4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Top row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">AnyxTech</span>
              <span className="text-xs text-gray-500">&copy; {new Date().getFullYear()}</span>
            </div>

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

          {/* Divider */}
          <div className="h-px bg-white/10 mb-4" />

          {/* Bottom row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Nav links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-bold transition-colors ${
                      active ? "text-indigo-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white transition-colors"
              >
                Voir le site <ExternalLink className="h-3 w-3" />
              </a>
            </nav>

            {/* Admin + Logout */}
            <div className="flex items-center gap-3">
              {email && (
                <span className="text-xs text-gray-500 hidden sm:inline">{email}</span>
              )}
              <a
                href="/api/users/logout"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-white/20"
              >
                <LogOut className="h-3.5 w-3.5" /> Déconnexion
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
