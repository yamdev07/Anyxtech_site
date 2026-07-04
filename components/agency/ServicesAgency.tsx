import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/services";

export default function ServicesAgency() {
  return (
    <section id="services" className="bg-white py-20 dark:bg-ink md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-blue dark:text-brand-light">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Nos services
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Des services pensés pour booster votre{" "}
            <span className="text-brand-blue dark:text-brand-light">croissance.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i} className="h-full">
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--border)] bg-soft text-brand-blue transition-colors group-hover:border-brand-light/40 group-hover:text-brand-light dark:text-brand-light">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue opacity-0 transition-opacity group-hover:opacity-100 dark:text-brand-light">
                    En savoir plus
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 font-semibold transition-colors hover:border-brand-light hover:text-brand-light"
          >
            Voir tous les services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
