import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="container-x scroll-mt-24 py-16 md:py-24">
      <SectionHeading
        eyebrow="Nos expertises"
        title={
          <>
            Explorez nos <span className="text-gradient">domaines d&apos;expertise</span>
          </>
        }
        subtitle="Solutions complètes pour votre transformation numérique et énergétique au Bénin."
      />

      {/* Rangée pleine largeur, responsive */}
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {services.slice(0, 6).map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.slug} delay={i} className="h-full">
              <Link
                href={`/services#${s.slug}`}
                className="group flex h-full min-h-[150px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-glow transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-light" />
                </div>
                <h3 className="mt-auto pt-6 font-display text-[15px] font-semibold leading-tight">
                  {s.title}
                </h3>
              </Link>
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
    </section>
  );
}
