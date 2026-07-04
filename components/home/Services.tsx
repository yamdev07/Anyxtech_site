import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      {/* Décor de fond */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.35] mask-fade-b" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Nos expertises"
          title={
            <>
              Explorez nos <span className="text-shimmer">domaines d&apos;expertise</span>
            </>
          }
          subtitle="Solutions complètes pour votre transformation numérique et énergétique au Bénin."
        />

        {/* Rangée pleine largeur, responsive */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.slice(0, 6).map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i} className="perspective h-full">
                <Spotlight className="h-full rounded-2xl">
                  <Link
                    href={`/services#${s.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-light/50 hover:shadow-card"
                  >
                    {/* Accent supérieur au survol */}
                    <span
                      className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${s.color} transition-transform duration-300 group-hover:scale-x-100`}
                    />
                    <div className="flex items-start justify-between [transform:translateZ(30px)]">
                      <div
                        className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-light" />
                    </div>
                    <h3 className="mt-6 font-display text-[15px] font-semibold leading-snug [transform:translateZ(20px)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-soft">
                      {s.short}
                    </p>
                  </Link>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/services" className="btn-ghost">
            Voir tous les services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
