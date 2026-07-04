import Link from "next/link";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Magnetic from "@/components/ui/Magnetic";

const trust = [
  { value: 50, suffix: "+", label: "Clients satisfaits" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
  { value: 24, suffix: "/7", label: "Support client" },
];

const chips = ["Digital", "Réseaux", "Wi-Fi", "Énergie", "Marketing", "Hébergement"];

export default function HeroGlass() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Mesh animé */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-0 h-[32rem] w-[32rem] animate-float rounded-full bg-brand-blue/40 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[30rem] w-[30rem] animate-float rounded-full bg-cyan-400/40 blur-[90px]" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] animate-float rounded-full bg-violet-500/30 blur-[90px]" style={{ animationDelay: "-4s" }} />
        <div className="absolute -right-16 bottom-10 h-72 w-72 animate-float rounded-full bg-pink-400/30 blur-[90px]" style={{ animationDelay: "-1s" }} />
      </div>

      <div className="container-x relative py-24">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/40 px-4 py-1.5 text-sm font-semibold text-brand-blue backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-white">
            <Sparkles className="h-4 w-4" />
            Vos besoins avant les nôtres
          </span>

          <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            Toujours plus{" "}
            <span className="bg-gradient-to-r from-brand-blue via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              proche de vous
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-soft sm:text-xl">
            Des solutions numériques innovantes pour propulser votre entreprise vers
            l&apos;excellence au Bénin.
          </p>

          {/* Panneau verre : CTA + chips */}
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/40 bg-white/30 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <Link href="/devis" className="btn-primary w-full sm:w-auto">
                  <Rocket className="h-5 w-5" />
                  Démarrer un projet
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/services" className="btn-ghost w-full bg-white/40 sm:w-auto dark:bg-white/5">
                  Nos services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/40 bg-white/40 px-3 py-1 text-xs font-medium text-soft backdrop-blur-md dark:border-white/10 dark:bg-white/10"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Stats verre */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4">
            {trust.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border border-white/40 bg-white/30 px-4 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <div className="font-display text-2xl font-bold text-brand-blue dark:text-brand-light sm:text-3xl">
                  <Counter value={t.value} suffix={t.suffix} />
                </div>
                <div className="mt-1 text-xs text-soft sm:text-sm">{t.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
