import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Magnetic from "@/components/ui/Magnetic";

const stats = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 20, suffix: "+", label: "Projets" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function HeroEditorial() {
  return (
    <section className="flex min-h-screen flex-col justify-center py-24">
      <div className="container-x">
        <Reveal className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-soft">
          <span>AnyxTech — Solutions numériques</span>
          <span className="hidden sm:block">Cotonou · Bénin — Depuis 2020</span>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="mt-10 font-display text-[16vw] font-bold uppercase leading-[0.86] tracking-tighter sm:text-8xl xl:text-[10rem]">
            Toujours plus
            <br />
            <span className="text-brand-blue">proche</span> de vous
          </h1>
        </Reveal>

        <div className="mt-12 h-px w-full bg-[var(--border)]" />

        <div className="mt-12 grid items-end gap-10 md:grid-cols-2">
          <Reveal delay={1}>
            <p className="max-w-md text-lg leading-relaxed text-soft">
              Solutions numériques innovantes pour propulser votre entreprise au Bénin
              — communication digitale, réseaux, énergie et marketing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Magnetic>
                <Link href="/devis" className="btn-primary">
                  <Rocket className="h-5 w-5" />
                  Démarrer un projet
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/services" className="btn-ghost">
                  Nos services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={2} className="flex gap-10 md:justify-end">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-soft">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
