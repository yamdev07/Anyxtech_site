import Link from "next/link";
import Image from "next/image";
import { Rocket, ArrowUpRight, Users, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const chips = ["Communication", "Réseaux", "Wi-Fi", "Énergie", "Marketing", "Hébergement"];

export default function HeroBento() {
  return (
    <section className="flex min-h-screen items-center py-24">
      <div className="container-x w-full">
        <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Titre (grand) */}
          <Reveal className="col-span-2 row-span-2">
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-light p-8 text-white">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Vos besoins avant les nôtres
              </span>
              <div>
                <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
                  Toujours plus proche de vous.
                </h1>
                <p className="mt-4 max-w-md text-white/80">
                  Solutions numériques innovantes pour propulser votre entreprise au Bénin.
                </p>
                <Link
                  href="/devis"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-blue transition-transform hover:scale-105"
                >
                  <Rocket className="h-5 w-5" /> Démarrer un projet
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={1} className="col-span-2">
            <div className="relative h-full min-h-[150px] overflow-hidden rounded-3xl border border-[var(--border)]">
              <Image src="/images/Business_tech.jpg" alt="AnyxTech" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/50 to-transparent" />
              <span className="absolute bottom-5 left-5 font-display text-xl font-bold text-white">
                Excellence numérique
              </span>
            </div>
          </Reveal>

          {/* Stat 1 */}
          <Reveal delay={2}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
              <Users className="h-6 w-6 text-brand-light" />
              <div>
                <div className="font-display text-4xl font-bold text-brand-blue dark:text-brand-light">
                  <Counter value={50} suffix="+" />
                </div>
                <div className="text-sm text-soft">Clients satisfaits</div>
              </div>
            </div>
          </Reveal>

          {/* Stat 2 */}
          <Reveal delay={3}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
              <Zap className="h-6 w-6 text-brand-light" />
              <div>
                <div className="font-display text-4xl font-bold text-brand-blue dark:text-brand-light">
                  <Counter value={20} suffix="+" />
                </div>
                <div className="text-sm text-soft">Projets réalisés</div>
              </div>
            </div>
          </Reveal>

          {/* Chips services */}
          <Reveal delay={2} className="col-span-2">
            <div className="flex h-full flex-col justify-center gap-3 rounded-3xl border border-[var(--border)] bg-soft p-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-soft">Nos expertises</span>
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span key={c} className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-1.5 text-sm font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Support */}
          <Reveal delay={3}>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-brand-dark to-brand-blue p-6 text-white">
              <span className="text-sm text-white/80">Disponibilité</span>
              <div className="font-display text-4xl font-bold">24/7</div>
            </div>
          </Reveal>

          {/* CTA devis */}
          <Reveal delay={4}>
            <Link
              href="/contact"
              className="group flex h-full flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-brand-light/50"
            >
              <ArrowUpRight className="h-6 w-6 text-brand-light transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              <div className="font-display text-lg font-semibold leading-tight">Parlons de votre projet</div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
