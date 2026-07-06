import { unstable_cache } from "next/cache";
import { getPayloadClient } from "./payload";

export interface HomeStat {
  value: number;
  suffix: string;
  label: string;
}
export interface HomeStep {
  title: string;
  text: string;
}
export interface HomeContent {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    image: string;
  };
  about: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    text1: string;
    text2: string;
    image: string;
    badgeValue: string;
    badgeLabel: string;
    stats: HomeStat[];
  };
  process: {
    titlePrefix: string;
    titleHighlight: string;
    steps: HomeStep[];
  };
  marquee: string[];
  cta: { title: string; subtitle: string };
}

export const defaultHome: HomeContent = {
  hero: {
    badge: "Vos besoins avant les nôtres",
    titlePrefix: "Toujours plus",
    titleHighlight: "proche de vous",
    titleSuffix: "pour une meilleure satisfaction",
    subtitle:
      "Des solutions numériques innovantes pour propulser votre entreprise vers l'excellence au Bénin.",
    image: "/images/Business_tech.jpg",
  },
  about: {
    badge: "Qui sommes-nous ?",
    titlePrefix: "Qui",
    titleHighlight: "sommes-nous",
    text1:
      "Nous regroupons des professionnels passionnés par les technologies modernes et l'innovation. Notre ambition est de faire grandir votre entreprise à travers des services personnalisés et fiables au Bénin.",
    text2:
      "En mettant vos besoins avant les nôtres, nous construisons un partenariat durable pour votre réussite digitale en Afrique de l'Ouest.",
    image: "/images/team.png",
    badgeValue: "3+",
    badgeLabel: "Ans d'expérience",
    stats: [
      { value: 50, suffix: "+", label: "Clients satisfaits" },
      { value: 20, suffix: "+", label: "Projets réalisés" },
      { value: 10, suffix: "+", label: "Experts techniques" },
      { value: 24, suffix: "/7", label: "Support client" },
    ],
  },
  process: {
    titlePrefix: "Trois étapes,",
    titleHighlight: "zéro friction",
    steps: [
      { title: "Échangeons", text: "Parlez-nous de votre projet et de vos objectifs. Premier échange gratuit et sans engagement." },
      { title: "Concevons", text: "Nous élaborons une solution sur mesure, adaptée à votre contexte et à votre budget au Bénin." },
      { title: "Déployons", text: "Mise en œuvre, formation et accompagnement continu jusqu'à votre entière satisfaction." },
    ],
  },
  marquee: [
    "Communication digitale",
    "Réseaux informatiques",
    "Installation Wi-Fi",
    "Énergie solaire",
    "Marketing digital",
    "Hébergement web",
    "Cybersécurité",
    "Cloud",
  ],
  cta: {
    title: "Voulez-vous démarrer votre projet au Bénin ?",
    subtitle: "Contactez-nous dès aujourd'hui pour discuter de vos besoins en solutions digitales.",
  },
};

const str = (v: unknown, d: string) =>
  typeof v === "string" && v.trim() ? v : d;
const img = (v: unknown, d: string) =>
  typeof v === "object" && v && typeof (v as { url?: string }).url === "string"
    ? ((v as { url: string }).url)
    : d;

async function load(): Promise<HomeContent> {
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({ slug: "home-content", depth: 1 })) as Record<string, unknown>;
    const d = defaultHome;

    const stats = Array.isArray(g.stats) && g.stats.length
      ? (g.stats as Record<string, unknown>[]).map((s, i) => ({
          value: typeof s.value === "number" ? s.value : d.about.stats[i]?.value ?? 0,
          suffix: str(s.suffix, ""),
          label: str(s.label, ""),
        }))
      : d.about.stats;

    const steps = Array.isArray(g.steps) && g.steps.length
      ? (g.steps as Record<string, unknown>[]).map((s, i) => ({
          title: str(s.title, d.process.steps[i]?.title ?? ""),
          text: str(s.text, d.process.steps[i]?.text ?? ""),
        }))
      : d.process.steps;

    const marquee = Array.isArray(g.marquee) && g.marquee.length
      ? (g.marquee as Record<string, unknown>[]).map((m) => str(m.item, "")).filter(Boolean)
      : d.marquee;

    return {
      hero: {
        badge: str(g.heroBadge, d.hero.badge),
        titlePrefix: str(g.heroTitlePrefix, d.hero.titlePrefix),
        titleHighlight: str(g.heroTitleHighlight, d.hero.titleHighlight),
        titleSuffix: str(g.heroTitleSuffix, d.hero.titleSuffix),
        subtitle: str(g.heroSubtitle, d.hero.subtitle),
        image: img(g.heroImage, d.hero.image),
      },
      about: {
        badge: str(g.aboutBadge, d.about.badge),
        titlePrefix: str(g.aboutTitlePrefix, d.about.titlePrefix),
        titleHighlight: str(g.aboutTitleHighlight, d.about.titleHighlight),
        text1: str(g.aboutText1, d.about.text1),
        text2: str(g.aboutText2, d.about.text2),
        image: img(g.aboutImage, d.about.image),
        badgeValue: str(g.aboutBadgeValue, d.about.badgeValue),
        badgeLabel: str(g.aboutBadgeLabel, d.about.badgeLabel),
        stats,
      },
      process: {
        titlePrefix: str(g.processTitlePrefix, d.process.titlePrefix),
        titleHighlight: str(g.processTitleHighlight, d.process.titleHighlight),
        steps,
      },
      marquee,
      cta: {
        title: str(g.ctaTitle, d.cta.title),
        subtitle: str(g.ctaSubtitle, d.cta.subtitle),
      },
    };
  } catch {
    return defaultHome;
  }
}

export const getHomeContent = unstable_cache(load, ["home-content"], {
  revalidate: 60,
  tags: ["home-content"],
});
