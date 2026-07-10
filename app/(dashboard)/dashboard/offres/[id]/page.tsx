import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import JobForm from "@/components/dashboard/JobForm";
import { lexicalToText } from "@/lib/lexical";

export const dynamic = "force-dynamic";
export const metadata = { title: "Modifier l'offre" };

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let job;
  try {
    job = await payload.findByID({ collection: "jobs", id, depth: 0 });
  } catch {
    notFound();
  }
  if (!job) notFound();

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Modifier l&apos;offre</h1>
        <p className="mt-1 text-soft">{job.title as string}</p>
      </header>
      <JobForm
        job={{
          id,
          title: job.title as string,
          location: job.location as string,
          type: job.type as string,
          department: job.department as string,
          excerpt: job.excerpt as string,
          status: job.status as string,
          descriptionText: lexicalToText(job.description),
        }}
      />
    </div>
  );
}
