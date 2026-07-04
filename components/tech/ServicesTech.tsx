import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { services } from "@/lib/services";

export default function ServicesTech() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-[0.1]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Nos expertises
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Un écosystème{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-cyan bg-clip-text text-transparent">
              connecté
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i} className="perspective h-full">
                <Spotlight tilt={7} className="h-full rounded-2xl" glow="rgba(29,185,255,0.3)">
                  {/* Bordure dégradée animée */}
                  <div className="group relative h-full overflow-hidden rounded-2xl p-[1.5px]">
                    <div className="conic-glow absolute inset-[-45%] opacity-40 transition-opacity duration-500 group-hover:opacity-90" />
                    <Link
                      href={`/services#${s.slug}`}
                      className="relative flex h-full flex-col rounded-2xl bg-[#0b1120] p-6"
                    >
                      <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-[0_0_25px_rgba(29,185,255,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 [transform:translateZ(30px)]`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{s.short}</p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-light transition-all group-hover:gap-2">
                        En savoir plus <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
