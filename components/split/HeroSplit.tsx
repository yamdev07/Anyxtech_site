import Link from "next/link";
import Image from "next/image";
import { Rocket, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 20, suffix: "+", label: "Projets" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function HeroSplit() {
  return (
    <section className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Panneau texte */}
      <div className="flex items-center bg-ink px-6 py-16 text-white sm:px-12 lg:px-16">
        <Reveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            <span className="h-px w-8 bg-brand-light" />
            Agence numérique · Bénin
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl">
            Toujours plus <span className="text-brand-light">proche</span> de vous.
          </h1>
          <p className="mt-6 text-lg text-white/65">
            Solutions numériques innovantes pour propulser votre entreprise au Bénin :
            digital, réseaux, énergie et marketing.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/devis" className="btn-primary">
              <Rocket className="h-5 w-5" /> Démarrer un projet
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Nos services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 flex gap-10 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-brand-light">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Panneau image plein cadre */}
      <div className="relative min-h-[45vh] lg:min-h-full">
        <Image src="/images/Business_tech.jpg" alt="AnyxTech au Bénin" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent lg:bg-gradient-to-l" />
      </div>
    </section>
  );
}
