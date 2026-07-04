import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function HeroAgency() {
  return (
    <section className="relative overflow-hidden bg-[#0a1020] text-white">
      {/* Dégradé + halo bleu */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1530] via-[#0a1020] to-[#060912]" />
        <div className="absolute -right-20 bottom-0 h-[36rem] w-[36rem] rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-brand-light/10 blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-[0.14]" />
      </div>

      <div className="container-x relative grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
        {/* Texte */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Agence digitale
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Concevons aujourd&apos;hui les{" "}
            <span className="text-brand-light">solutions</span> de demain.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            AnyxTech accompagne les entreprises et startups du Bénin dans la
            transformation de leurs idées en solutions numériques puissantes :
            digital, réseaux, énergie et marketing.
          </p>
          <Link
            href="/services"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-brand-light hover:shadow-glow"
          >
            Découvrir nos services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Mockup d'écran */}
        <Reveal delay={1} className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-blue/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white text-ink shadow-2xl">
            {/* Barre navigateur */}
            <div className="flex items-center gap-1.5 border-b border-black/10 bg-gray-50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            {/* Écran */}
            <div className="relative bg-white p-8 sm:p-10">
              <div className="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-brand-blue">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-blue text-white">A</span>
                ANYXTECH
              </div>
              <p className="mt-8 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                Nous créons
                <br />
                des expériences
                <br />
                digitales <span className="text-brand-blue">uniques</span>
              </p>
              <div className="mt-8 flex gap-2">
                <span className="h-2 w-16 rounded-full bg-brand-blue" />
                <span className="h-2 w-8 rounded-full bg-gray-200" />
                <span className="h-2 w-8 rounded-full bg-gray-200" />
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-light/20 blur-2xl" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
