"use client";

import { Sun, Moon, Monitor, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const themes = [
  { value: "light" as const, icon: Sun, label: "Clair" },
  { value: "dark" as const, icon: Moon, label: "Sombre" },
  { value: "system" as const, icon: Monitor, label: "Système" },
];

const navPrincipal = [
  { label: "Vue d'ensemble", href: "/dashboard" },
  { label: "Analytique", href: "/dashboard/analytics" },
];

const navContenu = [
  { label: "Services", href: "/dashboard/edit/services" },
  { label: "Offres d'emploi", href: "/dashboard/edit/jobs" },
  { label: "Partenaires", href: "/dashboard/edit/partners" },
  { label: "Actualités", href: "/dashboard/edit/news" },
  { label: "Témoignages", href: "/dashboard/edit/testimonials" },
];

const navMessages = [
  { label: "Messages reçus", href: "/dashboard/messages" },
];

const navConfig = [
  { label: "Paramètres du site", href: "/dashboard/settings" },
];

interface FooterProps {
  email?: string | null;
  noSidebar?: boolean;
  isAuth?: boolean;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
}

export default function DashboardFooter({ email, noSidebar, isAuth, contact }: FooterProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  }

  function NavItem({ label, href }: { label: string; href: string }) {
    return (
      <Link
        href={href}
        className={`block text-sm py-1 transition-colors ${
          isActive(href) ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <footer className={`relative z-10 ${noSidebar ? "" : "lg:pl-64"}`}>
      <div
        style={{
          background: "rgba(30, 33, 43, 0.85)",
          backdropFilter: "blur(20px) saturate(1.4)",
          borderTop: "1px solid rgba(148, 163, 184, 0.1)",
        }}
      >
        {/* Main content */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 shadow-lg shadow-indigo-500/20">
                  <Image src="/images/logo-removebg-preview.png" alt="" width={22} height={22} className="h-[22px] w-auto object-contain brightness-0 invert" />
                </div>
                <span className="text-base font-bold text-white">AnyxTech</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Votre partenaire en solutions digitales innovantes au Bénin et en Afrique de l&apos;Ouest.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com/AnyxTechBenin" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com/AnyxTechBenin" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://linkedin.com/company/AnyxTechBenin" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://instagram.com/AnyxTechBenin" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>

            {/* Navigation column */}
            {!isAuth && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h3>
                <div className="space-y-0.5">
                  {navPrincipal.map((n) => <NavItem key={n.href} {...n} />)}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-2">Messages</h3>
                <div className="space-y-0.5">
                  {navMessages.map((n) => <NavItem key={n.href} {...n} />)}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-2">Configuration</h3>
                <div className="space-y-0.5">
                  {navConfig.map((n) => <NavItem key={n.href} {...n} />)}
                </div>
              </div>
            )}

            {/* Contenu column */}
            {!isAuth && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contenu</h3>
                <div className="space-y-0.5">
                  {navContenu.map((n) => <NavItem key={n.href} {...n} />)}
                </div>
              </div>
            )}

            {/* Contact column */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact</h3>
              <div className="space-y-3 text-sm text-gray-400">
                {contact?.address && (
                  <div className="flex items-start gap-2">
                    <svg className="h-4 w-4 mt-0.5 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                    <span>{contact.address}</span>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                    <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
                  </div>
                )}
                {contact?.email && (
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                    <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                  </div>
                )}
                {contact?.hours && (
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>{contact.hours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>&copy; {new Date().getFullYear()} AnyxTech Bénin.</span>
              <span className="hidden sm:inline">Conçu avec passion à Cotonou &bull; Bénin</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme switcher */}
              <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
                {themes.map((t) => {
                  const Icon = t.icon;
                  const active = theme === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      title={t.label}
                      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition-all ${
                        active
                          ? "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-md shadow-indigo-500/25"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>

              {/* User info + Logout */}
              {!isAuth && (
                <div className="flex items-center gap-2">
                  {email && <span className="text-xs text-gray-500 hidden sm:inline">{email}</span>}
                  <a
                    href="/api/users/logout"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-white/20"
                  >
                    <LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Déconnexion</span>
                  </a>
                </div>
              )}

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-white/20"
              >
                <ExternalLink className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
