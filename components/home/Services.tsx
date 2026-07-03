import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/services";

export default function Services() {
  const [feature, ...rest] = services.slice(0, 5);
  const FeatureIcon = feature.icon;

  return (
    <section id="services" className="container-x scroll-mt-24 py-16 md:py-20">
      <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="chip mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Nos expertises
          </span>
          <h2 className="section-title">
            Tout un écosystème <span className="text-gradient">à votre service</span>
          </h2>
        </div>
        <Link href="/services" className="btn-ghost shrink-0">
          Voir tous les services
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-4 md:grid-rows-2">
        {/* Cellule vedette */}
        <Link
          href={`/services#${feature.slug}`}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-brand-blue to-brand-light p-8 text-white md:col-span-2 md:row-span-2"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <FeatureIcon className="h-7 w-7" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
              {feature.title}
            </h3>
            <p className="mt-3 max-w-md text-white/85">{feature.short}</p>
          </div>
          <ul className="relative mt-6 grid gap-2 sm:grid-cols-2">
            {feature.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <span className="relative mt-8 inline-flex items-center gap-1.5 font-semibold">
            Découvrir
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </Link>

        {/* Cellules secondaires */}
        {rest.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.slug} delay={i}>
              <Link
                href={`/services#${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light/10 text-brand-light">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">
                  {s.short}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-light">
                  En savoir plus
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
