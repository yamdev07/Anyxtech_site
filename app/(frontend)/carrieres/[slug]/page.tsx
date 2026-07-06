import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Clock, ArrowLeft, Mail } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getPayloadClient } from "@/lib/payload";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

interface JobDoc {
  id: string | number;
  title: string;
  slug?: string | null;
  location?: string | null;
  type?: string | null;
  department?: string | null;
  excerpt?: string | null;
  description?: SerializedEditorState | null;
}

async function getJob(slug: string): Promise<JobDoc | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "jobs",
    where: { or: [{ slug: { equals: slug } }, { id: { equals: slug } }] },
    limit: 1,
    depth: 0,
  });
  return (docs[0] as unknown as JobDoc) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Offre introuvable" };
  return {
    title: `${job.title} — Carrières AnyxTech`,
    description: job.excerpt ?? `Rejoignez AnyxTech : ${job.title}.`,
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const meta = [
    job.type && { icon: Briefcase, label: job.type },
    job.location && { icon: MapPin, label: job.location },
    job.department && { icon: Clock, label: job.department },
  ].filter(Boolean) as { icon: typeof Briefcase; label: string }[];

  return (
    <main id="main" className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/carrieres"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-soft transition-colors hover:text-brand-light"
        >
          <ArrowLeft className="h-4 w-4" /> Toutes les offres
        </Link>

        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {job.title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-3">
          {meta.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-soft px-3.5 py-1.5 text-sm"
            >
              <Icon className="h-4 w-4 text-brand-light" /> {label}
            </span>
          ))}
        </div>

        {job.description && (
          <div className="prose-content mt-10 max-w-none leading-relaxed text-soft [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--text)] [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--text)] [&_li]:my-1 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_p]:my-4">
            <RichText data={job.description} />
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-soft p-8 text-center">
          <h2 className="font-display text-2xl font-bold">Ce poste vous intéresse ?</h2>
          <p className="mt-2 text-soft">
            Envoyez votre candidature (CV + lettre) et parlons de votre parcours.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=Candidature — ${encodeURIComponent(job.title)}`}
            className="btn-primary mt-6"
          >
            <Mail className="h-5 w-5" /> Postuler par email
          </a>
        </div>
      </div>
    </main>
  );
}
