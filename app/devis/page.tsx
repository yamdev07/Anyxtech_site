import type { Metadata } from "next";
import { Info, Clock, Headset, Phone, Mail, MessageCircle, Percent, Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import QuoteForm from "@/components/devis/QuoteForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demande de Devis",
  description:
    "Demandez un devis personnalisé pour vos projets numériques avec AnyxTech Bénin. Solutions sur mesure en communication digitale, réseaux et transformation numérique.",
  alternates: { canonical: "/devis" },
};

const tips = [
  "Décrivez votre projet le plus précisément possible",
  "Sélectionnez tous les services dont vous avez besoin",
  "Indiquez votre budget approximatif si possible",
  "Joignez des documents utiles (cahier des charges, maquettes...)",
];

const delaisReponse = [
  "Une estimation budgétaire",
  "Un échéancier prévisionnel",
  "Des propositions de solutions",
];

export default function DevisPage() {
  return (
    <main id="main">
      <PageHero
        breadcrumb="Devis"
        eyebrow="Estimation personnalisée"
        title="Demande de Devis"
        subtitle="Remplissez ce formulaire pour recevoir une estimation personnalisée de votre projet."
      />

      <section className="container-x py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Formulaire */}
          <Reveal className="lg:col-span-2">
            <QuoteForm />
          </Reveal>

          {/* Encadrés */}
          <Reveal delay={1} className="space-y-6">
            <SideCard icon={Info} title="Comment obtenir un devis précis">
              <ul className="space-y-2">
                {tips.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                    {t}
                  </li>
                ))}
              </ul>
            </SideCard>

            <SideCard icon={Clock} title="Délais de réponse">
              <p className="mb-3 text-sm text-soft">
                Nous nous engageons à vous répondre sous 48 heures ouvrées avec :
              </p>
              <ul className="space-y-2">
                {delaisReponse.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                    {t}
                  </li>
                ))}
              </ul>
            </SideCard>

            <SideCard icon={Headset} title="Besoin d'aide ?">
              <p className="mb-3 text-sm text-soft">
                Notre équipe est disponible pour vous guider :
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-brand-light">
                    <Phone className="h-4 w-4 text-brand-light" /> {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-brand-light">
                    <Mail className="h-4 w-4 text-brand-light" /> {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-light">
                    <MessageCircle className="h-4 w-4 text-brand-light" /> Chat WhatsApp
                  </a>
                </li>
              </ul>
            </SideCard>

            {/* Offre promo */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-light/30 bg-gradient-to-br from-brand-blue to-brand-light p-6 text-white">
              <Percent className="absolute -right-3 -top-3 h-20 w-20 text-white/10" />
              <div className="relative">
                <h3 className="font-display text-lg font-bold">Réduction spéciale</h3>
                <p className="mt-2 text-sm text-white/90">
                  Première collaboration ? Bénéficiez de 10% de réduction sur votre
                  premier projet !
                </p>
                <span className="mt-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold">
                  Code : ANYX10
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function SideCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-card">
      <h3 className="mb-4 flex items-center gap-2 font-display font-semibold">
        <Icon className="h-5 w-5 text-brand-light" />
        {title}
      </h3>
      {children}
    </div>
  );
}
