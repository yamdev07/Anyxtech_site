import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import AdminEdit from "@/components/admin/AdminEdit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Carrières — Rejoignez AnyxTech",
  description:
    "Découvrez les offres d'emploi d'AnyxTech Bénin et rejoignez une équipe passionnée par le numérique à Cotonou.",
  alternates: { canonical: "/carrieres" },
};

interface JobDoc {
  id: string | number;
  title: string;
  slug?: string | null;
  location?: string | null;
  type?: string | null;
  department?: string | null;
  excerpt?: string | null;
}

export default async function CarrieresPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "jobs",
    where: {
      and: [
        { status: { equals: "open" } },
        { showOnSite: { not_equals: false } },
      ],
    },
    sort: "-publishedAt",
    limit: 50,
    depth: 0,
  });
  const jobs = docs as unknown as JobDoc[];

  return (
    <main id="main">
      <PageHero
        breadcrumb="Carrières"
        eyebrow="Rejoignez-nous"
        title="Construisons ensemble le numérique de demain"
        subtitle="AnyxTech recrute des talents passionnés au Bénin. Découvrez nos offres et postulez."
      />

      <section className="container-x py-16 md:py-24">
        <div className="mb-8 text-center">
          <AdminEdit href="/dashboard/edit/jobs" label="Gérer les offres" />
        </div>
        {jobs.length === 0 ? (
          <Reveal className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-soft p-10 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-brand-light" />
            <h2 className="mt-4 font-display text-2xl font-bold">Aucune offre pour le moment</h2>
            <p className="mt-3 text-soft">
              Aucun poste n&apos;est ouvert actuellement. Envoyez-nous une candidature
              spontanée — nous serions ravis d&apos;échanger.
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Candidature spontanée
            </Link>
          </Reveal>
        ) : (
          <div className="mx-auto grid max-w-4xl gap-4">
            {jobs.map((job, i) => (
              <Reveal key={job.id} delay={i % 4}>
                <Link
                  href={`/carrieres/${job.slug ?? job.id}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {job.type && (
                        <span className="rounded-full bg-brand-light/10 px-3 py-1 text-xs font-semibold text-brand-blue dark:text-brand-light">
                          {job.type}
                        </span>
                      )}
                      {job.department && (
                        <span className="text-xs font-medium uppercase tracking-wider text-soft">
                          {job.department}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold">{job.title}</h3>
                    {job.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm text-soft">{job.excerpt}</p>
                    )}
                    {job.location && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-soft">
                        <MapPin className="h-4 w-4 text-brand-light" /> {job.location}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-blue transition-all group-hover:gap-2.5 dark:text-brand-light">
                    Voir l&apos;offre <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
