import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { services } from "@/lib/services";

export default function Services() {
  const featured = services.slice(0, 6);

  return (
    <section id="services" className="container-x scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        eyebrow="Nos expertises"
        title={
          <>
            Nos domaines <span className="text-shimmer">d&apos;expertise</span>
          </>
        }
        subtitle="Solutions complètes pour votre transformation numérique et énergétique au Bénin."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.slug} delay={i} className="perspective h-full">
              <TiltCard className="h-full rounded-2xl">
                <Link
                  href={`/services#${s.slug}`}
                  className="card-glow gradient-border group relative z-0 flex h-full flex-col overflow-hidden p-7"
                >
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-light/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                    En savoir plus
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-16 text-center">
        <p className="mb-6 font-display text-xl font-semibold sm:text-2xl">
          Prêt à transformer votre entreprise au Bénin ?
        </p>
        <Link href="/contact" className="btn-primary">
          Contactez-nous dès maintenant
        </Link>
      </Reveal>
    </section>
  );
}
