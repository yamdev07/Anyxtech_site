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
  ArrowLeft,
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
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/30 px-4 py-3 lg:hidden"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px) saturate(1.6)",
        }}
      >
        <Image src="/images/logo-removebg-preview.png" alt="AnyxTech" width={120} height={36} className="h-8 w-auto object-contain" />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/40 bg-white/60"
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
        className={`sidebar-glass fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Gradient accent strip */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{
            background: "linear-gradient(180deg, #1f429b, #1db9ff, #22d3ee)",
          }}
        />

        {/* Logo + Back to site */}
        <div className="px-5 pt-5 pb-4 space-y-3">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light shadow-lg shadow-brand-light/20 transition-shadow group-hover:shadow-brand-light/40">
              <Image src="/images/logo-removebg-preview.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--text)]">AnyxTech</div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-soft)]">Dashboard</div>
            </div>
          </Link>
          <Link href="/" className="back-btn w-full justify-center">
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour au site
          </Link>
        </div>

        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navGroups.map((group) => {
            const isCollapsed = collapsed[group.label] === false;
            return (
              <div key={group.label} className="mb-3">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {group.label}
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isCollapsed ? "-rotate-90" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"}`}>
                  {group.items.map((n) => {
                    const Icon = n.icon;
                    const active = isActive(n.href);
                    return (
                      <Link
                        key={n.href}
                        href={n.href}
                        onClick={() => setOpen(false)}
                        className={`sidebar-pill mb-0.5 ${active ? "active" : ""}`}
                      >
                        <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-brand-blue" : "opacity-50"}`} />
                        <span className="flex-1">{n.label}</span>
                        {n.badge ? (
                          <span className="rounded-full bg-gradient-to-r from-brand-blue to-brand-light px-2 py-0.5 text-[10px] font-bold text-white">
                            {n.badge}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer: user + actions */}
        <div className="border-t border-white/40 px-4 pt-4 pb-3 space-y-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="relative">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-light text-sm font-bold text-white shadow-lg shadow-brand-light/25">
                {userInitial}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-[var(--text)]">{email || "Admin"}</div>
              <div className="text-[11px] text-[var(--text-soft)]">Administrateur</div>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Link
              href="/"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/50 px-3 py-2 text-xs font-medium text-[var(--text-soft)] transition-all duration-300 hover:border-brand-light/40 hover:text-brand-blue hover:bg-white/80 hover:shadow-md"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Site
            </Link>
            <a
              href="/admin/logout"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/50 px-3 py-2 text-xs font-medium text-[var(--text-soft)] transition-all duration-300 hover:border-red-300 hover:text-red-500 hover:bg-red-50/80 hover:shadow-md"
            >
              <LogOut className="h-3.5 w-3.5" /> Déconnexion
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
