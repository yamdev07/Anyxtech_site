import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowRight } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import AdminEdit from "@/components/admin/AdminEdit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Actualités — AnyxTech Bénin",
  description:
    "Les dernières actualités, projets et annonces d'AnyxTech, votre partenaire numérique au Bénin.",
  alternates: { canonical: "/actualites" },
};

interface NewsDoc {
  id: string | number;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  cover?: { url?: string | null } | string | null;
}

function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ActualitesPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 50,
    depth: 1,
  });
  const news = docs as unknown as NewsDoc[];

  return (
    <main id="main">
      <PageHero
        breadcrumb="Actualités"
        eyebrow="Le blog"
        title="Actualités & ressources"
        subtitle="Suivez les nouveautés, projets et conseils d'AnyxTech au Bénin."
      />

      <section className="container-x py-16 md:py-24">
        <div className="mb-8 text-center">
          <AdminEdit href="/dashboard/actualites" label="Gérer les actualités" />
        </div>
        {news.length === 0 ? (
          <Reveal className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-soft p-10 text-center">
            <Newspaper className="mx-auto h-10 w-10 text-brand-light" />
            <h2 className="mt-4 font-display text-2xl font-bold">Bientôt disponible</h2>
            <p className="mt-3 text-soft">Nos premières actualités arrivent très prochainement.</p>
          </Reveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n, i) => {
              const coverUrl = typeof n.cover === "object" && n.cover ? n.cover.url : null;
              return (
                <Reveal key={n.id} delay={i % 3} className="h-full">
                  <Link
                    href={`/actualites/${n.slug ?? n.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="relative h-48 overflow-hidden bg-soft">
                      {coverUrl && (
                        <Image
                          src={coverUrl}
                          alt={n.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <time className="text-xs uppercase tracking-wider text-soft">
                        {formatDate(n.publishedAt)}
                      </time>
                      <h3 className="mt-2 font-display text-lg font-bold">{n.title}</h3>
                      {n.excerpt && (
                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-soft">{n.excerpt}</p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2.5 dark:text-brand-light">
                        Lire l&apos;article <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
