import { unstable_cache } from "next/cache";
import { getPayloadClient } from "./payload";
import { siteConfig } from "./site";

export type SiteSettings = typeof siteConfig;

function pick(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

async function loadSettings(): Promise<SiteSettings> {
  try {
    const payload = await getPayloadClient();
    const g = (await payload.findGlobal({ slug: "site-settings" })) as Record<string, unknown>;
    const s = siteConfig.socials;
    return {
      name: siteConfig.name,
      url: siteConfig.url,
      tagline: pick(g.tagline, siteConfig.tagline),
      description: pick(g.description, siteConfig.description),
      phone: pick(g.phone, siteConfig.phone),
      phoneHref: pick(g.phoneHref, siteConfig.phoneHref),
      email: pick(g.email, siteConfig.email),
      whatsapp: pick(g.whatsapp, siteConfig.whatsapp),
      address: pick(g.address, siteConfig.address),
      addressShort: pick(g.addressShort, siteConfig.addressShort),
      hours: pick(g.hours, siteConfig.hours),
      socials: {
        facebook: pick(g.facebook, s.facebook),
        twitter: pick(g.twitter, s.twitter),
        linkedin: pick(g.linkedin, s.linkedin),
        instagram: pick(g.instagram, s.instagram),
      },
    };
  } catch {
    return siteConfig;
  }
}

/**
 * Réglages du site (Global Payload « Paramètres du site »), avec repli sur
 * les valeurs par défaut. Mis en cache 60s (les pages statiques le restent).
 */
export const getSiteSettings = unstable_cache(loadSettings, ["site-settings"], {
  revalidate: 60,
  tags: ["site-settings"],
});
