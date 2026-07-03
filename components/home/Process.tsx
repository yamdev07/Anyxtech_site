import { MessageSquare, PenTool, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    icon: MessageSquare,
    color: "from-sky-500 to-cyan-400",
    title: "Échangeons",
    text: "Parlez-nous de votre projet et de vos objectifs. Premier échange gratuit et sans engagement.",
  },
  {
    n: "02",
    icon: PenTool,
    color: "from-indigo-500 to-blue-500",
    title: "Concevons",
    text: "Nous élaborons une solution sur mesure, adaptée à votre contexte et à votre budget au Bénin.",
  },
  {
    n: "03",
    icon: Rocket,
    color: "from-fuchsia-500 to-pink-500",
    title: "Déployons",
    text: "Mise en œuvre, formation et accompagnement continu jusqu'à votre entière satisfaction.",
  },
];

export default function Process() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Comment ça marche"
          title={
            <>
              Trois étapes, <span className="text-shimmer">zéro friction</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={i} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card">
                  <span className="pointer-events-none absolute -top-2 right-4 font-display text-6xl font-bold text-[var(--border)] transition-colors group-hover:text-brand-light/20">
                    {s.n}
                  </span>
                  <div className={`relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-soft">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
