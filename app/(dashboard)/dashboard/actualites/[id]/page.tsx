import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import NewsForm from "@/components/dashboard/NewsForm";
import { lexicalToText } from "@/lib/lexical";

export const dynamic = "force-dynamic";
export const metadata = { title: "Modifier l'article" };

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let article;
  try {
    article = await payload.findByID({ collection: "news", id, depth: 1 });
  } catch {
    notFound();
  }
  if (!article) notFound();

  const cover = article.cover as { url?: string } | string | null | undefined;

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Modifier l&apos;article</h1>
        <p className="mt-1 text-soft">{article.title as string}</p>
      </header>
      <NewsForm
        news={{
          id,
          title: article.title as string,
          excerpt: article.excerpt as string,
          status: article.status as string,
          contentText: lexicalToText(article.content),
          coverUrl: cover && typeof cover === "object" ? cover.url : undefined,
        }}
      />
    </div>
  );
}
