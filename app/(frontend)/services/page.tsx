import type { Metadata } from "next";
import { Award, Clock, Handshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import ServicesExplorer from "@/components/services/ServicesExplorer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nos Services | Solutions Digitales & Réseaux Informatiques",
  description:
    "Découvrez tous nos services de transformation digitale, réseaux informatiques, communication digitale et solutions technologiques au Bénin. Experts AnyxTech à Cotonou.",
  alternates: { canonical: "/services" },
};

const whyUs = [
  {
    icon: Award,
    title: "Expertise Locale",
    text: "Une connaissance approfondie du marché béninois et des besoins spécifiques des entreprises locales.",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    text: "Assistance technique disponible en permanence pour garantir la continuité de vos services.",
  },
  {
    icon: Handshake,
    title: "Approche Personnalisée",
    text: "Des solutions adaptées à chaque client avec un accompagnement sur mesure.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        breadcrumb="Services"
        eyebrow="Nos services au Bénin"
        title="Des solutions technologiques complètes"
        subtitle="Pour propulser votre entreprise à l'ère numérique — explorez nos domaines d'expertise."
      />

      <ServicesExplorer />

      {/* Pourquoi choisir AnyxTech */}
      <section className="bg-soft py-20 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Nos atouts"
            title={
              <>
                Pourquoi choisir <span className="text-gradient">AnyxTech</span> au Bénin ?
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {whyUs.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={i}>
                  <div className="card-glow h-full p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-glow">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{w.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-soft">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Un projet en tête au Bénin ?"
        subtitle="Discutons de vos besoins et trouvons ensemble la solution idéale pour votre entreprise."
        links={[
          { href: "/devis", label: "Demander un devis" },
          { href: siteConfig.phoneHref, label: siteConfig.phone, variant: "outline", external: true },
        ]}
      />
    </main>
  );
}
