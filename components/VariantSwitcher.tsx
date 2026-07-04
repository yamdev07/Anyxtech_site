"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sélecteur flottant pour comparer les deux maquettes (visible sur / et /variante). */
export default function VariantSwitcher() {
  const pathname = usePathname();
  if (pathname !== "/" && pathname !== "/variante") return null;

  const options = [
    { href: "/", label: "Actuel" },
    { href: "/variante", label: "Bento" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2">
      <div className="glass flex items-center gap-1 rounded-full border border-[var(--border)] p-1 shadow-card">
        {options.map((o) => {
          const active = pathname === o.href;
          return (
            <Link
              key={o.href}
              href={o.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-to-r from-brand-blue to-brand-light text-white shadow-glow"
                  : "text-soft hover:text-[var(--text)]"
              }`}
            >
              {o.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
