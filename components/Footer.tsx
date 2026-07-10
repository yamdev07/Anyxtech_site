import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  Lock,
} from "lucide-react";
import { getSiteSettings } from "@/lib/settings";
import AdminEdit from "@/components/admin/AdminEdit";

const serviceLinks = [
  { label: "Communication Digitale", href: "/services#communication" },
  { label: "Réseaux Informatiques", href: "/services#infrastructure" },
  { label: "Solutions Énergétiques", href: "/services#infrastructure" },
  { label: "Marketing Digital", href: "/services#communication" },
];

const navFooter = [
  { label: "Accueil", href: "/" },
  { label: "Société", href: "/societe" },
  { label: "Services", href: "/services" },
  { label: "Actualités", href: "/actualites" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Contact", href: "/contact" },
  { label: "Devis", href: "/devis" },
];

export default async function Footer() {
  const settings = await getSiteSettings();
  const socials = [
    { icon: Facebook, href: settings.socials.facebook, label: "Facebook" },
    { icon: Twitter, href: settings.socials.twitter, label: "Twitter" },
    { icon: Linkedin, href: settings.socials.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: settings.socials.instagram, label: "Instagram" },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[var(--border)] bg-soft">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-brand-light/10 blur-3xl" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <Image
              src="/images/logo-removebg-preview.png"
              alt="AnyxTech Bénin"
              width={150}
              height={48}
              className="h-11 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-soft">
              {settings.description}
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-soft transition-all hover:border-brand-light hover:text-brand-light"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navFooter.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-soft transition-colors hover:text-brand-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-soft transition-colors hover:text-brand-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
                Contact
              </h3>
              <AdminEdit href="/dashboard/settings" label="Modifier" />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-soft">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                {settings.addressShort}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-light" />
                <a href={settings.phoneHref} className="hover:text-brand-light">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-light" />
                <a href={`mailto:${settings.email}`} className="hover:text-brand-light">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-brand-light" />
                {settings.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-sm text-soft sm:flex-row">
          <p>© {new Date().getFullYear()} AnyxTech Bénin. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            <span>
              Conçu avec passion à Cotonou <span className="text-brand-light">•</span> Bénin
            </span>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-light"
            >
              <Lock className="h-3.5 w-3.5" /> Espace administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
