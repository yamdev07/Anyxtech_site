import Link from "next/link";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Particles from "@/components/ui/Particles";
import Spotlight from "@/components/ui/Spotlight";
import Magnetic from "@/components/ui/Magnetic";

const trust = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 20, suffix: "+", label: "Projets" },
  { value: 24, suffix: "/7", label: "Support" },
];

const expertise = [
  "Communication digitale",
  "Réseaux informatiques",
  "Installation Wi-Fi",
  "Énergie solaire",
  "Marketing digital",
  "Hébergement web",
];

export default function HeroAgency() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a1020] text-white">
      {/* Fond animé */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1530] via-[#0a1020] to-[#060912]" />
        <div className="absolute -right-20 bottom-0 h-[36rem] w-[36rem] animate-float rounded-full bg-brand-blue/25 blur-3xl" />
        <div
          className="absolute left-1/4 top-0 h-72 w-72 animate-float rounded-full bg-brand-light/15 blur-3xl"
          style={{ animationDelay: "-2s" }}
        />
        <div className="absolute inset-0 grid-bg opacity-[0.14] mask-fade-b" />
        <Particles />
      </div>

      <div className="container-x relative z-10 grid flex-1 items-center gap-14 py-20 lg:grid-cols-2">
        {/* Texte */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
            </span>
            Agence digitale
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Concevons aujourd&apos;hui les{" "}
            <span className="text-shimmer">solutions</span> de demain.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            AnyxTech accompagne les entreprises et startups du Bénin dans la
            transformation de leurs idées en solutions numériques puissantes :
            digital, réseaux, énergie et marketing.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Magnetic>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(29,185,255,0.45)] transition-all hover:bg-brand-light hover:shadow-[0_0_50px_rgba(29,185,255,0.75)]"
              >
                Découvrir nos services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>

          {/* Chiffres animés */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 divide-x divide-white/10">
            {trust.map((t) => (
              <div key={t.label} className="pl-8 first:pl-0">
                <div className="font-display text-3xl font-bold text-brand-light">
                  <Counter value={t.value} suffix={t.suffix} />
                </div>
                <div className="text-sm text-white/55">{t.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mockup d'écran */}
        <Reveal delay={1} className="perspective relative">
          <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-blue/25 blur-3xl" />
          <div className="animate-float">
            <Spotlight tilt={8} className="rounded-2xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white text-ink shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-black/10 bg-gray-50 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
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
                </div>
              </div>
            </Spotlight>
          </div>

          {/* Badges flottants */}
          <div
            className="glass absolute -left-5 top-10 flex animate-float items-center gap-3 rounded-2xl border border-white/15 p-3 shadow-card"
            style={{ animationDelay: "-1.5s" }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-light/15 text-brand-light">
              <Star className="h-4 w-4" />
            </div>
            <div>
              <div className="font-display text-base font-bold leading-none text-white">98%</div>
              <div className="text-[11px] text-white/60">Satisfaction</div>
            </div>
          </div>
          <div
            className="glass absolute -bottom-4 right-6 flex animate-float items-center gap-2 rounded-2xl border border-white/15 px-4 py-2.5 shadow-card"
            style={{ animationDelay: "-3s" }}
          >
            <ShieldCheck className="h-4 w-4 text-brand-light" />
            <span className="text-sm font-semibold text-white">Sécurisé & fiable</span>
          </div>
        </Reveal>
      </div>

      {/* Marquee expertise */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.03] py-4 backdrop-blur-sm">
        <div className="group flex overflow-hidden">
          <div className="flex animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...expertise, ...expertise].map((e, i) => (
              <span key={i} className="mx-8 flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-white/45">
                {e}
                <span className="text-brand-light/70">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
