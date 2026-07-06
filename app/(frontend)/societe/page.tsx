import type { Metadata } from "next";
import Image from "next/image";
import {
  Rocket,
  Eye,
  Star,
  Lightbulb,
  Handshake,
  ShieldCheck,
  Quote,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import CtaBand from "@/components/ui/CtaBand";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Société | Notre Histoire & Valeurs",
  description:
    "Découvrez l'histoire d'AnyxTech, votre partenaire en transformation numérique au Bénin. Expert en développement web, réseaux informatiques et solutions digitales depuis 2020 à Cotonou.",
  alternates: { canonical: "/societe" },
};

const values = [
  { icon: Star, title: "Excellence", text: "Nous nous engageons à fournir des solutions de qualité supérieure au Bénin, avec un souci du détail qui fait la différence." },
  { icon: Lightbulb, title: "Innovation", text: "Nous anticipons les besoins futurs et adoptons les technologies émergentes pour rester à la pointe au Bénin." },
  { icon: Handshake, title: "Engagement", text: "Votre succès est notre priorité. Nous honorons nos promesses et dépassons vos attentes au Bénin." },
  { icon: ShieldCheck, title: "Intégrité", text: "Nous agissons avec transparence et éthique dans toutes nos relations professionnelles au Bénin." },
];

const steps = [
  { n: "01", title: "Écoute & Analyse", text: "Nous prenons le temps de comprendre vos besoins et vos objectifs spécifiques au Bénin." },
  { n: "02", title: "Conception", text: "Nous élaborons une solution sur mesure adaptée à votre contexte béninois." },
  { n: "03", title: "Développement", text: "Nous implémentons la solution avec les meilleures technologies disponibles." },
  { n: "04", title: "Accompagnement", text: "Nous assurons un suivi post-déploiement pour garantir votre satisfaction au Bénin." },
];

const stats = [
  { value: 50, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "Clients satisfaits" },
  { value: 15, suffix: "+", label: "Partenariats" },
  { value: 5, suffix: "+", label: "Prix remportés" },
];

const tech = [
  { title: "Frontend", items: ["React", "Vue.js", "Angular", "TypeScript"] },
  { title: "Backend", items: ["Node.js", "PHP", "Python", "Laravel"] },
  { title: "Bases de données", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "DevOps", items: ["Docker", "CI/CD", "AWS", "Azure"] },
];

export default function SocietePage() {
  return (
    <main id="main">
      <PageHero
        breadcrumb="Société"
        eyebrow="Depuis 2020 à Cotonou"
        title="Qui sommes-nous ?"
        subtitle="Découvrez l'histoire et la passion derrière AnyxTech, votre partenaire de confiance pour la transformation numérique au Bénin."
      />

      {/* Notre Histoire */}
      <section className="container-x py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-3xl border border-[var(--border)] shadow-brand">
              <Image
                src="/images/entreprise.jpg"
                alt="Équipe AnyxTech Bénin travaillant sur un projet digital"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-4 shadow-card sm:-left-6">
              <div className="font-display text-4xl font-bold text-brand-light">
                <Counter value={3} suffix="+" />
              </div>
              <div className="text-sm text-soft">Ans d&apos;expérience</div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <span className="chip mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
              Notre Histoire
            </span>
            <h2 className="section-title">
              Née de la passion pour <span className="text-gradient">l&apos;innovation</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              Fondée en 2020 à Cotonou, AnyxTech est née de la passion pour les
              technologies innovantes et du désir d&apos;accompagner les entreprises
              béninoises dans leur transformation numérique.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-soft">
              Depuis nos débuts, nous avons évolué pour devenir une référence dans le
              domaine des solutions digitales au Bénin, avec une approche centrée sur
              l&apos;innovation et l&apos;excellence opérationnelle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-soft py-20 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { icon: Rocket, title: "Notre Mission", text: "Rendre la transformation numérique accessible, durable et sécurisée pour toutes les structures au Bénin. Nous créons des solutions sur mesure pour des besoins en connectivité, performance et visibilité digitale." },
            { icon: Eye, title: "Notre Vision", text: "Être une référence en accompagnement digital au Bénin et en Afrique de l'Ouest, avec des services à forte valeur ajoutée portés par l'expertise locale et l'innovation continue." },
          ].map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i}>
                <div className="card-glow h-full p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-glow">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold">{b.title}</h3>
                  <p className="mt-3 leading-relaxed text-soft">{b.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Valeurs */}
      <section className="container-x py-20 md:py-28">
        <SectionHeading
          eyebrow="Ce qui nous guide"
          title={<>Nos <span className="text-gradient">valeurs fondamentales</span></>}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i}>
                <div className="card-glow h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/10 text-brand-light">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{v.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Processus */}
      <section className="bg-soft py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Méthodologie"
            title={<>Notre <span className="text-gradient">processus de travail</span></>}
            subtitle="Une méthodologie éprouvée pour garantir le succès de vos projets numériques."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i}>
                <div className="card-glow h-full p-7">
                  <span className="font-display text-4xl font-bold text-gradient">{s.n}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-x py-16">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i}>
              <div className="card-glow flex flex-col items-center p-7 text-center">
                <div className="font-display text-4xl font-bold text-brand-light md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-soft">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-soft py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Notre stack"
            title={<>Technologies & <span className="text-gradient">expertise</span></>}
            subtitle="Nous maîtrisons un large éventail de technologies modernes pour répondre à tous vos besoins numériques au Bénin."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((t, i) => (
              <Reveal key={t.title} delay={i}>
                <div className="card-glow h-full p-7">
                  <h3 className="font-display text-lg font-semibold text-brand-light">{t.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {t.items.map((it) => (
                      <li key={it} className="text-sm text-soft">{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { value: "98%", label: "Satisfaction client au Bénin" },
              { value: "2-4", label: "Semaines de livraison" },
              { value: "24/7", label: "Support technique" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i}>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 text-sm text-soft">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="container-x py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto h-10 w-10 text-brand-light" />
          <p className="mt-6 font-display text-2xl font-medium leading-relaxed sm:text-3xl">
            « AnyxTech transforme les défis digitaux en opportunités concrètes au
            Bénin. Nous concevons des solutions sur mesure qui accélèrent votre
            croissance et optimisent vos processus. »
          </p>
        </Reveal>
      </section>

      <CtaBand
        title="Prêt à booster votre transformation numérique au Bénin ?"
        subtitle="Rejoignez nos clients satisfaits et découvrez ce que nous pouvons faire pour propulser votre entreprise à l'ère digitale."
        links={[
          { href: "/contact", label: "Nous contacter" },
          { href: siteConfig.phoneHref, label: siteConfig.phone, variant: "outline", external: true },
        ]}
      />
    </main>
  );
}
