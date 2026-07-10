import { getPayloadClient } from "@/lib/payload";
import HomeContentForm, { type HomeContentInitial } from "@/components/dashboard/HomeContentForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contenu de l'accueil" };

export default async function HomeContentPage() {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "home-content", depth: 1 });
  const d = doc as Record<string, unknown>;

  const heroImage = d.heroImage as { url?: string } | string | null | undefined;
  const aboutImage = d.aboutImage as { url?: string } | string | null | undefined;

  const initial: HomeContentInitial = {
    heroBadge: (d.heroBadge as string) || "",
    heroTitlePrefix: (d.heroTitlePrefix as string) || "",
    heroTitleHighlight: (d.heroTitleHighlight as string) || "",
    heroTitleSuffix: (d.heroTitleSuffix as string) || "",
    heroSubtitle: (d.heroSubtitle as string) || "",
    heroImageUrl: heroImage && typeof heroImage === "object" ? heroImage.url : undefined,

    aboutBadge: (d.aboutBadge as string) || "",
    aboutTitlePrefix: (d.aboutTitlePrefix as string) || "",
    aboutTitleHighlight: (d.aboutTitleHighlight as string) || "",
    aboutText1: (d.aboutText1 as string) || "",
    aboutText2: (d.aboutText2 as string) || "",
    aboutImageUrl: aboutImage && typeof aboutImage === "object" ? aboutImage.url : undefined,
    aboutBadgeValue: (d.aboutBadgeValue as string) || "",
    aboutBadgeLabel: (d.aboutBadgeLabel as string) || "",
    stats: (d.stats as HomeContentInitial["stats"]) || [],

    processTitlePrefix: (d.processTitlePrefix as string) || "",
    processTitleHighlight: (d.processTitleHighlight as string) || "",
    steps: (d.steps as HomeContentInitial["steps"]) || [],

    marquee: (d.marquee as HomeContentInitial["marquee"]) || [],
    ctaTitle: (d.ctaTitle as string) || "",
    ctaSubtitle: (d.ctaSubtitle as string) || "",
  };

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Contenu de l&apos;accueil</h1>
        <p className="mt-1 text-soft">Modifiez les textes et images de votre page d&apos;accueil, sans intervention d&apos;un développeur.</p>
      </header>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <HomeContentForm initial={initial} />
      </div>
    </div>
  );
}
