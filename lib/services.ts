import {
  Megaphone,
  Network,
  Wifi,
  Zap,
  LineChart,
  Headset,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/** Map nom d'icône → composant lucide (les noms sont stockables en base). */
export const iconMap: Record<string, LucideIcon> = {
  Megaphone,
  Network,
  Wifi,
  Zap,
  LineChart,
  Headset,
  Server,
  Sparkles,
};

export const iconNames = Object.keys(iconMap);

export function resolveIcon(name?: string | null): LucideIcon {
  return (name && iconMap[name]) || Sparkles;
}

/** Presets de dégradé pour les tuiles d'icônes (classes littérales pour le JIT). */
export const colorPresets: { label: string; value: string }[] = [
  { label: "Cyan", value: "from-sky-500 to-cyan-400" },
  { label: "Indigo", value: "from-indigo-500 to-blue-500" },
  { label: "Turquoise", value: "from-cyan-500 to-teal-400" },
  { label: "Ambre", value: "from-amber-500 to-orange-400" },
  { label: "Fuchsia", value: "from-fuchsia-500 to-pink-500" },
  { label: "Émeraude", value: "from-emerald-500 to-teal-400" },
  { label: "Violet", value: "from-violet-500 to-purple-500" },
];

export type ServiceCategory =
  | "communication"
  | "infrastructure"
  | "support"
  | "hosting";

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  /** Nom d'icône (voir iconMap). */
  icon: string;
  /** Dégradé Tailwind de la tuile d'icône. */
  color: string;
  short: string;
  features: string[];
  /** URL d'image optionnelle (fournie par le CMS). */
  image?: string;
}

export const categories: { key: ServiceCategory | "all"; label: string }[] = [
  { key: "all", label: "Tous les services" },
  { key: "communication", label: "Communication Digitale" },
  { key: "infrastructure", label: "Infrastructure & Réseaux" },
  { key: "support", label: "Support & Accompagnement" },
  { key: "hosting", label: "Hébergement & Domaine" },
];

export const services: Service[] = [
  {
    slug: "communication",
    title: "Communication Digitale",
    category: "communication",
    icon: "Megaphone",
    color: "from-sky-500 to-cyan-400",
    short:
      "Stratégies digitales sur mesure pour renforcer votre marque en ligne au Bénin, engager votre audience et optimiser votre visibilité.",
    features: [
      "Création de contenus (visuels, vidéos, articles SEO)",
      "Gestion des réseaux sociaux adaptée au marché béninois",
      "Calendriers éditoriaux personnalisés",
      "Publicité en ligne (Google Ads, Meta Ads)",
      "Référencement naturel (SEO) optimisé pour le Bénin",
      "Suivi des performances (reportings détaillés)",
    ],
  },
  {
    slug: "reseau",
    title: "Réseautage & Connectivité",
    category: "infrastructure",
    icon: "Network",
    color: "from-indigo-500 to-blue-500",
    short:
      "Réseaux informatiques sécurisés, stables et évolutifs pour une connectivité fluide adaptée aux entreprises au Bénin.",
    features: [
      "Virtualisation et segmentation réseau avancée",
      "Vente & installation de matériel informatique",
      "Câblage structuré & fibre/ethernet professionnel",
      "Maintenance, supervision, audit réseau complet",
      "Sécurité réseau (VPN, pare-feu) adaptée au contexte béninois",
    ],
  },
  {
    slug: "wifi",
    title: "Installation Wi-Fi",
    category: "infrastructure",
    icon: "Wifi",
    color: "from-cyan-500 to-teal-400",
    short:
      "Déploiement de réseaux robustes au Bénin pour une couverture Wi-Fi rapide, stable et sécurisée.",
    features: [
      "Conception & mise en place de réseaux sans fil",
      "Virtualisation & sécurité réseau optimisée",
      "Fourniture et installation de matériel de qualité",
      "Surveillance et maintenance continue au Bénin",
    ],
  },
  {
    slug: "energie",
    title: "Solutions Énergétiques",
    category: "infrastructure",
    icon: "Zap",
    color: "from-amber-500 to-orange-400",
    short:
      "Projets électriques fiables, sécurisés et durables au Bénin, adaptés aux besoins industriels ou résidentiels.",
    features: [
      "Études techniques et dimensionnement précis",
      "Réseaux basse et moyenne tension sécurisés",
      "Tableaux électriques et onduleurs performants",
      "Maintenance préventive et corrective rapide",
      "Énergies renouvelables (solaire) adaptées au climat béninois",
    ],
  },
  {
    slug: "marketing",
    title: "Marketing Digital",
    category: "communication",
    icon: "LineChart",
    color: "from-fuchsia-500 to-pink-500",
    short:
      "Campagnes digitales ciblées pour renforcer votre image au Bénin, attirer des prospects et fidéliser vos clients.",
    features: [
      "Création/refonte de sites web optimisés",
      "Identité visuelle (logo, charte graphique)",
      "Community management adapté à la culture béninoise",
      "Campagnes publicitaires ciblées localement",
      "Rédaction de contenus SEO optimisés",
      "Emailing & tunnels de conversion performants",
    ],
  },
  {
    slug: "support",
    title: "Suivi Clientèle",
    category: "support",
    icon: "Headset",
    color: "from-emerald-500 to-teal-400",
    short:
      "Accompagnement humain et réactif pour garantir la satisfaction à chaque étape de votre projet au Bénin.",
    features: [
      "Accompagnement personnalisé selon vos besoins",
      "Assistance 7j/7 (technique & fonctionnelle)",
      "Suivi régulier des projets avec reporting",
      "Réponses rapides (mail, téléphone, WhatsApp)",
      "Gestion proactive des demandes et besoins",
      "Mesure de satisfaction et amélioration continue",
    ],
  },
  {
    slug: "hebergement",
    title: "Hébergement & Domaine",
    category: "hosting",
    icon: "Server",
    color: "from-violet-500 to-purple-500",
    short:
      "Hébergement web rapide et sécurisé au Bénin avec gestion complète de vos noms de domaine.",
    features: [
      "Hébergement (mutualisé, dédié, cloud) performant",
      "Enregistrement et gestion de domaines .bj et internationaux",
      "Certificats SSL pour sécurité maximale",
      "Sauvegardes automatiques régulières",
      "Monitoring et support technique local",
      "Sécurité optimisée (anti-DDoS, pare-feu avancé)",
    ],
  },
];
