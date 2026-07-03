import type { Metadata } from "next";
import { Suspense } from "react";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Solutions Digitales & Réseaux Cotonou",
  description:
    "Contactez AnyxTech Bénin à Cotonou pour vos projets digitaux, réseaux informatiques et communication. Notre équipe experte vous accompagne dans votre transformation numérique.",
  alternates: { canonical: "/contact" },
};

const infos = [
  { icon: MapPin, label: "Adresse à Cotonou", value: siteConfig.address },
  { icon: Mail, label: "Email professionnel", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Téléphone Bénin", value: siteConfig.phone, href: siteConfig.phoneHref },
  { icon: MessageCircle, label: "WhatsApp Business", value: "Discuter maintenant", href: siteConfig.whatsapp, external: true },
];

const hours = [
  "Lundi - Vendredi : 8h00 - 18h00",
  "Samedi : 9h00 - 13h00",
  "Sur rendez-vous en dehors des heures d'ouverture",
];

const socials = [
  { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
  { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        breadcrumb="Contact"
        eyebrow="Parlons de vos idées !"
        title="Contactez AnyxTech Bénin"
        subtitle="Nous sommes là pour vous accompagner dans tous vos projets technologiques au Bénin."
      />

      <section className="container-x py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Formulaire */}
          <Reveal className="lg:col-span-3">
            <h2 className="mb-6 font-display text-2xl font-bold">Envoyez-nous un message</h2>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>

          {/* Coordonnées */}
          <Reveal delay={1} className="lg:col-span-2">
            <h2 className="mb-6 font-display text-2xl font-bold">Nos coordonnées au Bénin</h2>
            <div className="space-y-4">
              {infos.map((info) => {
                const Icon = info.icon;
                const inner = (
                  <div className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-brand-light/50">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light/10 text-brand-light">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-soft">{info.label}</div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </div>
                );
                return info.href ? (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.external ? "_blank" : undefined}
                    rel={info.external ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={info.label}>{inner}</div>
                );
              })}

              {/* Horaires */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                <div className="mb-3 flex items-center gap-3 font-medium">
                  <Clock className="h-5 w-5 text-brand-light" />
                  Horaires d&apos;ouverture
                </div>
                <ul className="space-y-1.5 text-sm text-soft">
                  {hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Réseaux */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                <div className="mb-3 font-medium">Suivez-nous sur les réseaux</div>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-soft transition-all hover:border-brand-light hover:text-brand-light"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
