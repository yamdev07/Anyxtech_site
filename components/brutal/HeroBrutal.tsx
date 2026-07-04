import Link from "next/link";
import Image from "next/image";
import { Rocket, ArrowRight, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 20, suffix: "+", label: "Projets" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function HeroBrutal() {
  return (
    <section className="min-h-screen bg-[#fdf3e7] py-20 text-ink">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:py-16">
        <Reveal>
          <span className="inline-block -rotate-2 border-2 border-ink bg-brand-light px-4 py-1.5 text-sm font-bold uppercase text-ink shadow-[4px_4px_0_0_#070b18]">
            ★ Vos besoins avant les nôtres
          </span>
          <h1 className="mt-6 font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Toujours plus{" "}
            <span className="bg-brand-blue px-2 text-white">proche</span> de vous
          </h1>
          <p className="mt-6 max-w-md text-lg font-medium text-ink/70">
            Solutions numériques innovantes pour propulser votre entreprise au Bénin —
            digital, réseaux, énergie et marketing.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 border-2 border-ink bg-brand-blue px-6 py-3 font-bold text-white shadow-[5px_5px_0_0_#070b18] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#070b18]"
            >
              <Rocket className="h-5 w-5" /> Démarrer un projet
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-ink bg-white px-6 py-3 font-bold text-ink shadow-[5px_5px_0_0_#070b18] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#070b18]"
            >
              Nos services <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-10 flex gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border-2 border-ink bg-white px-5 py-3 shadow-[4px_4px_0_0_#070b18]">
                <div className="font-display text-3xl font-extrabold">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs font-bold uppercase text-ink/60">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1} className="relative">
          <div className="relative overflow-hidden border-4 border-ink shadow-[10px_10px_0_0_#070b18]">
            <Image
              src="/images/Business_tech.jpg"
              alt="AnyxTech au Bénin"
              width={720}
              height={620}
              priority
              className="h-[420px] w-full object-cover sm:h-[500px]"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 flex rotate-3 items-center gap-2 border-2 border-ink bg-yellow-300 px-4 py-2 font-bold text-ink shadow-[4px_4px_0_0_#070b18]">
            <Star className="h-5 w-5 fill-ink" /> 98% satisfaction
          </div>
        </Reveal>
      </div>
    </section>
  );
}
