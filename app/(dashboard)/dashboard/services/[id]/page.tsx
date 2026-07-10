import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import ServiceForm from "@/components/dashboard/ServiceForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Modifier le service" };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let service;
  try {
    service = await payload.findByID({ collection: "services", id, depth: 1 });
  } catch {
    notFound();
  }
  if (!service) notFound();

  const image = service.image as { url?: string } | string | null | undefined;

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Modifier le service</h1>
        <p className="mt-1 text-soft">{service.title as string}</p>
      </header>
      <ServiceForm
        service={{
          id,
          title: service.title as string,
          category: service.category as string,
          icon: service.icon as string,
          color: service.color as string,
          short: service.short as string,
          features: service.features as { feature: string }[],
          order: service.order as number,
          imageUrl: image && typeof image === "object" ? image.url : undefined,
        }}
      />
    </div>
  );
}
