import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { services } from "@/lib/services";

export default function ServicesGlass() {
  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-28">
      {/* Mesh doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-brand-light/20 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-400/20 blur-[100px]" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/40 px-4 py-1.5 text-sm font-semibold text-brand-blue backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Nos expertises
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Explorez nos{" "}
            <span className="bg-gradient-to-r from-brand-blue via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              domaines d&apos;expertise
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i} className="perspective h-full">
                <Spotlight tilt={6} className="h-full rounded-3xl">
                  <Link
                    href={`/services#${s.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-white/40 bg-white/30 p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/45 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 [transform:translateZ(30px)]`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2 dark:text-brand-light">
                      En savoir plus
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
