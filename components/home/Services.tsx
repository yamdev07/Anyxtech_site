import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ScrollParallax from "@/components/ui/ScrollParallax";
import Spotlight from "@/components/ui/Spotlight";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      {/* Decor de fond multi-couche avec parallaxe */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.30] mask-fade-b" />
        <ScrollParallax y={30} className="absolute -right-32 top-10">
          <div className="h-96 w-96 rounded-full bg-brand-light/8 blur-[100px]" />
        </ScrollParallax>
        <ScrollParallax y={-20} className="absolute -left-20 bottom-20">
          <div className="h-72 w-72 rounded-full bg-brand-cyan/10 blur-[80px]" />
        </ScrollParallax>
      </div>

      <div className="container-x relative">
        <Reveal variant="blur">
          <SectionHeading
            eyebrow="Nos expertises"
            title={
              <>
                Explorez nos <span className="text-shimmer">domaines d&apos;expertise</span>
              </>
            }
            subtitle="Solutions complètes pour votre transformation numérique et énergétique au Bénin."
          />
        </Reveal>

        {/* Rangee pleine largeur, responsive */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.slice(0, 6).map((s, i) => {
            const Icon = s.icon;
            const variant = (["up", "left", "right", "scale", "up", "left"] as const)[i];
            return (
              <Reveal key={s.slug} delay={i} variant={variant} className="perspective h-full">
                <Spotlight tilt={8} glow="rgba(29,185,255,0.25)" className="h-full rounded-2xl">
                  <Link
                    href={`/services#${s.slug}`}
                    className="group glass-heavy gradient-border-animated relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:-translate-y-2 hover-glow"
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r ${s.color} transition-transform duration-500 group-hover:scale-x-100`}
                    />
                    <div className="flex items-start justify-between [transform:translateZ(30px)]">
                      <div
                        className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-light" />
                    </div>
                    <h3 className="mt-6 font-display text-[15px] font-semibold leading-snug tracking-tight [transform:translateZ(20px)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs text-elegant text-soft">
                      {s.short}
                    </p>
                  </Link>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center" variant="scale">
          <Link href="/services" className="btn-ghost group">
            Voir tous les services
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
