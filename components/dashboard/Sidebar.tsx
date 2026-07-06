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
} from "lucide-react";

const nav = [
  { label: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
  { label: "Contenu de l'accueil", href: "/admin/globals/home-content", icon: FileText },
  { label: "Services", href: "/dashboard/services", icon: Cog },
  { label: "Offres d'emploi", href: "/dashboard/offres", icon: Briefcase },
  { label: "Partenaires", href: "/dashboard/partenaires", icon: Handshake },
  { label: "Actualités", href: "/dashboard/actualites", icon: Newspaper },
  { label: "Témoignages", href: "/dashboard/temoignages", icon: Star },
  { label: "Messages", href: "/dashboard/messages", icon: Inbox },
  { label: "Paramètres du site", href: "/dashboard/parametres", icon: Settings },
];

export default function Sidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const links = (
    <nav className="flex-1 space-y-1 px-3">
      {nav.map((n) => {
        const Icon = n.icon;
        const active = isActive(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
              active
                ? "bg-gradient-to-r from-brand-blue to-brand-light text-white shadow-glow"
                : "text-soft hover:bg-brand-light/10 hover:text-brand-blue dark:hover:text-brand-light"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="space-y-1 border-t border-[var(--border)] px-3 pt-3">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-soft transition-colors hover:text-brand-light"
      >
        <ExternalLink className="h-[18px] w-[18px]" /> Voir le site
      </Link>
      <a
        href="/admin/logout"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-soft transition-colors hover:text-red-500"
      >
        <LogOut className="h-[18px] w-[18px]" /> Déconnexion
      </a>
      {email && (
        <p className="truncate px-3.5 pt-2 text-xs text-soft" title={email}>
          {email}
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* Barre mobile */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-4 py-3 lg:hidden">
        <Image src="/images/logo-removebg-preview.png" alt="AnyxTech" width={120} height={36} className="h-8 w-auto object-contain" />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)]"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Overlay mobile */}
      {open && (
        <button
          aria-label="Fermer"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--card)] py-5 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pb-4">
          <Link href="/dashboard">
            <Image src="/images/logo-removebg-preview.png" alt="AnyxTech" width={140} height={40} className="h-9 w-auto object-contain" />
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Fermer">
            <X className="h-5 w-5 text-soft" />
          </button>
        </div>
        {links}
        {footer}
      </aside>
    </>
  );
}
