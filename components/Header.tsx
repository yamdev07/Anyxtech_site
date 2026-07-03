"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "glass border-b border-[var(--border)] shadow-sm"
            : "border-b border-transparent"
        }`}
      >
        <nav
          className="container-x flex items-center justify-between py-3.5"
          aria-label="Navigation principale"
        >
          <Link href="/" aria-label="AnyxTech — Accueil" className="shrink-0">
            <Image
              src="/images/logo-removebg-preview.png"
              alt="Logo AnyxTech Bénin"
              width={140}
              height={44}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-brand-light"
                      : "text-soft hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-light"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle className="hidden sm:grid" />
            <Link
              href="/devis"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-light px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              Devis <ArrowUpRight className="h-4 w-4" />
            </Link>

            {/* Bouton menu mobile */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--text)] md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="glass overflow-hidden border-b border-[var(--border)] md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-brand-light/10 text-brand-light"
                        : "hover:bg-brand-light/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between gap-3">
                <Link
                  href="/devis"
                  className="flex-1 rounded-xl bg-gradient-to-r from-brand-blue to-brand-light px-4 py-3 text-center font-semibold text-white"
                >
                  Demander un devis
                </Link>
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
