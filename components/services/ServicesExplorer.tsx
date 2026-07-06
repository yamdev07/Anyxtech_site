"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { categories, resolveIcon, type Service, type ServiceCategory } from "@/lib/services";

export default function ServicesExplorer({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");

  const visible =
    filter === "all" ? services : services.filter((s) => s.category === filter);

  return (
    <div className="container-x py-16 md:py-20">
      {/* Filtres */}
      <div className="mb-12 flex flex-wrap justify-center gap-2.5">
        {categories.map((c) => {
          const active = filter === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "border-transparent bg-gradient-to-r from-brand-blue to-brand-light text-white shadow-glow"
                  : "border-[var(--border)] text-soft hover:border-brand-light hover:text-brand-light"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Grille */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((s) => {
            const Icon = resolveIcon(s.icon);
            return (
              <motion.article
                key={s.slug}
                id={s.slug}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className="card-glow flex scroll-mt-28 flex-col p-7"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{s.short}</p>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-light">
                  Nos prestations
                </p>
                <ul className="mt-3 flex-1 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?service=${encodeURIComponent(s.title)}`}
                  className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold transition-all hover:border-brand-light hover:text-brand-light"
                >
                  Demander ce service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
