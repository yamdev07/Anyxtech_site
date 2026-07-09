import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import PartnerForm from "@/components/dashboard/PartnerForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Modifier le partenaire" };

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let partner;
  try {
    partner = await payload.findByID({ collection: "partners", id, depth: 1 });
  } catch {
    notFound();
  }
  if (!partner) notFound();

  const logo = partner.logo as { url?: string } | string | null | undefined;
  const logoUrl = logo && typeof logo === "object" ? logo.url : undefined;

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Modifier le partenaire</h1>
        <p className="mt-1 text-soft">{partner.name as string}</p>
      </header>
      <PartnerForm
        partner={{
          id,
          name: partner.name as string,
          website: partner.website as string,
          description: partner.description as string,
          logoUrl,
        }}
      />
    </div>
  );
}
