import { siteConfig } from "@/lib/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AnyxTech Bénin",
  description:
    "Entreprise spécialisée dans les solutions digitales, réseaux informatiques et transformation numérique au Bénin",
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo-removebg-preview.png`,
  telephone: "+229-01-52415241",
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressCountry: "BJ",
    addressRegion: "Littoral",
  },
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "$$",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "6.3725",
      longitude: "2.3581",
    },
    geoRadius: "1000000",
  },
  serviceType: [
    "Communication Digitale",
    "Réseaux Informatiques",
    "Installation Wi-Fi",
    "Solutions Énergétiques",
    "Marketing Digital",
    "Hébergement Web",
  ],
  sameAs: [
    siteConfig.socials.facebook,
    siteConfig.socials.twitter,
    siteConfig.socials.linkedin,
    siteConfig.socials.instagram,
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
