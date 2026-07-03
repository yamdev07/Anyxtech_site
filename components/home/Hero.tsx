import Link from "next/link";
import Image from "next/image";
import { Rocket, ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const trust = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 20, suffix: "+", label: "Projets" },
  { value: 3, suffix: "+", label: "Ans" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-radial opacity-70" aria-hidden />
      <div className="container-x relative grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
        {/* Colonne texte */}
        <Reveal>
          <span className="chip mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Vos besoins avant les nôtres
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Toujours plus{" "}
            <span className="text-gradient">proche de vous</span> pour votre
            réussite digitale
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
            AnyxTech accompagne les entreprises béninoises dans leur transformation
            numérique : communication digitale, réseaux, énergie et marketing.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/devis" className="btn-primary">
              <Rocket className="h-5 w-5" />
              Démarrer un projet
            </Link>
            <Link href="/services" className="btn-ghost">
              Nos services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 flex divide-x divide-[var(--border)]">
            {trust.map((t) => (
              <div key={t.label} className="px-6 first:pl-0">
                <div className="font-display text-3xl font-bold text-brand-blue dark:text-brand-light">
                  <Counter value={t.value} suffix={t.suffix} />
                </div>
                <div className="text-sm text-soft">{t.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Colonne visuelle */}
        <Reveal delay={1} className="relative">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-brand">
            <Image
              src="/images/Business_tech.jpg"
              alt="Solutions technologiques AnyxTech au Bénin"
              width={720}
              height={640}
              priority
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
          </div>

          {/* Carte flottante haut-gauche */}
          <div className="absolute -left-4 top-10 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-card sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light/10 text-brand-light">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold leading-none">98%</div>
                <div className="text-xs text-soft">Satisfaction client</div>
              </div>
            </div>
          </div>

          {/* Carte flottante bas-droite */}
          <div className="absolute -bottom-6 right-2 flex gap-2 sm:right-6">
            {[ShieldCheck, Zap].map((Icon, i) => (
              <div
                key={i}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-brand-light shadow-card"
              >
                <Icon className="h-5 w-5" />
              </div>
            ))}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 shadow-card">
              <div className="text-xs text-soft">Support</div>
              <div className="font-display font-bold text-brand-blue dark:text-brand-light">24/7</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
