import type { Metadata } from "next";
import HeroBento from "@/components/bento/HeroBento";
import ServicesBento from "@/components/bento/ServicesBento";
import CtaBand from "@/components/ui/CtaBand";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Maquette bento — Design alternatif",
  description: "Proposition de maquette bento / dashboard pour AnyxTech Bénin.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroBento />
      <ServicesBento />
      <CtaBand
        title="Voulez-vous démarrer votre projet au Bénin ?"
        subtitle="Contactez-nous dès aujourd'hui pour discuter de vos besoins."
        links={[
          { href: "/contact", label: "Nous écrire" },
          { href: siteConfig.phoneHref, label: siteConfig.phone, variant: "outline", external: true },
        ]}
      />
    </main>
  );
}
