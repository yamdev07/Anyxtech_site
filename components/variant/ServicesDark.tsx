import Link from "next/link";
import { ArrowUpRight, MessageSquare, PenTool, Rocket } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { services } from "@/lib/services";

const steps = [
  { n: "01", icon: MessageSquare, color: "from-sky-500 to-cyan-400", title: "Échangeons", text: "Parlez-nous de votre projet. Premier échange gratuit et sans engagement." },
  { n: "02", icon: PenTool, color: "from-indigo-500 to-blue-500", title: "Concevons", text: "Une solution sur mesure, adaptée à votre contexte et votre budget au Bénin." },
  { n: "03", icon: Rocket, color: "from-fuchsia-500 to-pink-500", title: "Déployons", text: "Mise en œuvre, formation et accompagnement continu jusqu'à satisfaction." },
];

export default function ServicesDark() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />

      {/* Services */}
      <div className="container-x relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Nos expertises
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Explorez nos{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-cyan bg-clip-text text-transparent">
              domaines d&apos;expertise
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Solutions complètes pour votre transformation numérique et énergétique au Bénin.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.slice(0, 6).map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i} className="perspective h-full">
                <Spotlight className="h-full rounded-2xl" glow="rgba(29,185,255,0.28)">
                  <Link
                    href={`/services#${s.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-light/50 hover:bg-white/[0.08]"
                  >
                    <span className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${s.color} transition-transform duration-300 group-hover:scale-x-100`} />
                    <div className="flex items-start justify-between [transform:translateZ(30px)]">
                      <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-[0_0_25px_rgba(29,185,255,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-light" />
                    </div>
                    <h3 className="mt-6 font-display text-[15px] font-semibold leading-snug [transform:translateZ(20px)]">{s.title}</h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/55">{s.short}</p>
                  </Link>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Process */}
      <div className="container-x relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Comment ça marche
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Trois étapes,{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-cyan bg-clip-text text-transparent">
              zéro friction
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={i} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-light/40">
                  <span className="pointer-events-none absolute -top-2 right-4 font-display text-6xl font-bold text-white/10 transition-colors group-hover:text-brand-light/25">{s.n}</span>
                  <div className={`relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-[0_0_25px_rgba(29,185,255,0.4)]`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
