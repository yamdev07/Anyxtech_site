"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

/**
 * Bouton « éditer » visible uniquement pour un administrateur connecté.
 * La détection se fait côté client (via /api/users/me) pour garder les pages
 * publiques statiques/en cache.
 */
export default function AdminEdit({
  href,
  label = "Éditer",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/users/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active) setShow(Boolean(d?.user));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!show) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-light/50 bg-brand-light/10 px-3.5 py-1.5 text-xs font-semibold text-brand-blue transition-colors hover:bg-brand-light/20 dark:text-brand-light ${className}`}
    >
      <Pencil className="h-3.5 w-3.5" /> {label}
    </a>
  );
}
