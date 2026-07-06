import type { Metadata, Viewport } from "next";
import { dmSans, outfit } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StructuredData from "@/components/StructuredData";
import VariantSwitcher from "@/components/VariantSwitcher";
import "./globals.css";

const SITE_URL = "https://www.anyxtech.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AnyxTech Bénin – Solutions Digitales & Réseaux Informatiques",
    template: "%s | AnyxTech Bénin",
  },
  description:
    "AnyxTech Bénin : votre partenaire expert en transformation numérique. Solutions digitales innovantes, réseaux informatiques, communication digitale et énergétique au Bénin et en Afrique de l'Ouest.",
  keywords: [
    "solutions digitales Bénin",
    "réseaux informatiques",
    "transformation numérique",
    "communication digitale",
    "énergie solaire",
    "marketing digital",
    "Wi-Fi professionnel",
    "AnyxTech",
  ],
  authors: [{ name: "AnyxTech Bénin" }],
  creator: "AnyxTech Bénin",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "AnyxTech Bénin",
    title: "AnyxTech Bénin – Solutions Digitales & Réseaux Informatiques",
    description:
      "Votre partenaire en transformation numérique au Bénin. Communication digitale, réseaux, solutions énergétiques.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnyxTechBenin",
    creator: "@AnyxTechBenin",
    title: "AnyxTech Bénin – Solutions Digitales & Réseaux Informatiques",
    description: "Votre partenaire en transformation numérique au Bénin",
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f429b",
  width: "device-width",
  initialScale: 1,
};

// Applique le thème avant le rendu pour éviter le flash (FOUC)
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <VariantSwitcher />
      </body>
    </html>
  );
}
