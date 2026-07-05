import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

interface NewsDoc {
  id: string | number;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  cover?: { url?: string | null } | string | null;
  content?: SerializedEditorState | null;
}

async function getArticle(slug: string): Promise<NewsDoc | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: {
      and: [
        { status: { equals: "published" } },
        { or: [{ slug: { equals: slug } }, { id: { equals: slug } }] },
      ],
    },
    limit: 1,
    depth: 1,
  });
  return (docs[0] as unknown as NewsDoc) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: `${article.title} — Actualités AnyxTech`,
    description: article.excerpt ?? undefined,
  };
}

function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const coverUrl = typeof article.cover === "object" && article.cover ? article.cover.url : null;

  return (
    <main id="main" className="container-x py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/actualites"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-soft transition-colors hover:text-brand-light"
        >
          <ArrowLeft className="h-4 w-4" /> Toutes les actualités
        </Link>

        <time className="mt-6 block text-sm uppercase tracking-wider text-soft">
          {formatDate(article.publishedAt)}
        </time>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {article.title}
        </h1>

        {coverUrl && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image
              src={coverUrl}
              alt={article.title}
              width={1000}
              height={560}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {article.content && (
          <div className="mt-10 max-w-none leading-relaxed text-soft [&_a]:text-brand-blue [&_a]:underline dark:[&_a]:text-brand-light [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--text)] [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--text)] [&_li]:my-1 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_p]:my-4">
            <RichText data={article.content} />
          </div>
        )}
      </article>
    </main>
  );
}
