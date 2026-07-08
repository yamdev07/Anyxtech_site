"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cog,
  Briefcase,
  Handshake,
  Newspaper,
  Star,
  Inbox,
  Settings,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
  X,
  BarChart3,
  ChevronDown,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { label: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
      { label: "Analytique", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Contenu",
    items: [
      { label: "Contenu de l'accueil", href: "/admin/globals/home-content", icon: FileText },
      { label: "Services", href: "/dashboard/services", icon: Cog },
      { label: "Offres d'emploi", href: "/dashboard/offres", icon: Briefcase },
      { label: "Partenaires", href: "/dashboard/partenaires", icon: Handshake },
      { label: "Actualités", href: "/dashboard/actualites", icon: Newspaper },
      { label: "Témoignages", href: "/dashboard/temoignages", icon: Star },
    ],
  },
  {
    label: "Messages",
    items: [
      { label: "Messages reçus", href: "/dashboard/messages", icon: Inbox },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Paramètres du site", href: "/dashboard/parametres", icon: Settings },
    ],
  },
];

export default function Sidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const toggleGroup = (label: string) =>
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));

  const userInitial = email ? email.charAt(0).toUpperCase() : "A";

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-white/80 backdrop-blur-xl px-4 py-3 lg:hidden">
        <Image src="/images/logo-removebg-preview.png" alt="AnyxTech" width={120} height={36} className="h-8 w-auto object-contain" />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <button aria-label="Fermer" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border)] bg-white/80 backdrop-blur-2xl transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 pb-5 border-b border-[var(--border)]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light shadow-lg shadow-brand-light/20"
            >
              <Image src="/images/logo-removebg-preview.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--text)]">AnyxTech</div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-soft)]">Dashboard</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Fermer">
            <X className="h-5 w-5 text-[var(--text-soft)]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navGroups.map((group) => {
            const isCollapsed = collapsed[group.label] === false;
            return (
              <div key={group.label} className="mb-4">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {group.label}
                  <ChevronDown className={`h-3 w-3 transition-transform ${isCollapsed ? "-rotate-90" : ""}`} />
                </button>
                {!isCollapsed && group.items.map((n) => {
                  const Icon = n.icon;
                  const active = isActive(n.href);
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all duration-300 mb-0.5 ${
                        active
                          ? "text-brand-blue font-semibold"
                          : "text-slate-500 hover:bg-blue-50 hover:text-slate-800"
                      }`}
                      style={
                        active
                          ? {
                              background: "linear-gradient(90deg, rgba(31,66,155,0.10), rgba(29,185,255,0.08))",
                              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                            }
                          : undefined
                      }
                    >
                      {active && (
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] rounded-r-full"
                          style={{
                            background: "linear-gradient(180deg, #1f429b, #1db9ff)",
                          }}
                        />
                      )}
                      <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-brand-blue" : "opacity-50 group-hover:opacity-80"}`} />
                      {n.label}
                      {n.badge ? (
                        <span className="ml-auto rounded-full bg-gradient-to-r from-brand-blue to-brand-light px-2 py-0.5 text-[10px] font-bold text-white">
                          {n.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Footer: user + actions */}
        <div className="border-t border-[var(--border)] px-4 pt-4 pb-3 space-y-2">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-light text-sm font-bold text-white shadow-lg shadow-brand-light/20"
            >
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-[var(--text)]">{email || "Admin"}</div>
              <div className="text-[11px] text-[var(--text-soft)]">Administrateur</div>
            </div>
          </div>
          <div className="flex gap-1">
            <Link
              href="/"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-soft)] transition-all duration-300 hover:border-brand-light/40 hover:text-brand-blue hover:bg-blue-50"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Site
            </Link>
            <a
              href="/admin/logout"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-soft)] transition-all duration-300 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
            >
              <LogOut className="h-3.5 w-3.5" /> Déconnexion
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
