import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { services } from "@/lib/services";

export default function ServicesBento() {
  const [feature, ...rest] = services.slice(0, 5);
  const FeatureIcon = feature.icon;

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Nos expertises
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Un écosystème à votre service
          </h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(150px,auto)] gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Vedette */}
          <Reveal className="perspective md:col-span-2 md:row-span-2">
            <Spotlight className="h-full rounded-3xl" glow="rgba(255,255,255,0.15)">
              <Link
                href={`/services#${feature.slug}`}
                className={`group flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${feature.color} p-8 text-white`}
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <FeatureIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">{feature.title}</h3>
                  <p className="mt-3 max-w-md text-white/85">{feature.short}</p>
                </div>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {feature.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </Link>
            </Spotlight>
          </Reveal>

          {rest.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i} className="perspective">
                <Spotlight tilt={5} className="h-full rounded-3xl">
                  <Link
                    href={`/services#${s.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-brand-light/40"
                  >
                    <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white [transform:translateZ(20px)]`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-brand-blue dark:text-brand-light">
                      Détails <ArrowUpRight className="h-4 w-4" />
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
