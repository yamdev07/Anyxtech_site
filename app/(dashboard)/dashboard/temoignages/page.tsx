import { getPayloadClient } from "@/lib/payload";
import DashboardList, { type ListItem } from "@/components/dashboard/DashboardList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Témoignages" };

export default async function Page() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "testimonials", sort: "-createdAt", limit: 200, depth: 0 });
  const items: ListItem[] = (docs as Record<string, unknown>[]).map((d) => ({
    id: String(d.id),
    title: (d.author as string) || "Auteur",
    subtitle: (d.quote as string) || "",
    meta: (d.company as string) || (d.featured ? "Mis en avant" : undefined),
  }));

  return (
    <DashboardList
      title="Témoignages"
      description="Les avis clients affichés sur le site."
      items={items}
      collection="testimonials"
      path="/dashboard/temoignages"
      addLabel="Nouveau témoignage"
      createHref="/dashboard/temoignages/nouveau"
      editHref={(id) => `/dashboard/temoignages/${id}`}
    />
  );
}
