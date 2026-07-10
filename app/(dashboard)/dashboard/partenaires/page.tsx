import { getPayloadClient } from "@/lib/payload";
import DashboardList, { type ListItem } from "@/components/dashboard/DashboardList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Partenaires" };

export default async function Page() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "partners", sort: "order", limit: 200, depth: 0 });
  const items: ListItem[] = (docs as Record<string, unknown>[]).map((d) => ({
    id: String(d.id),
    title: (d.name as string) || "Partenaire",
    subtitle: (d.website as string) || (d.description as string) || "",
  }));

  return (
    <DashboardList
      title="Partenaires"
      description="Les partenaires affichés sur l'accueil."
      items={items}
      collection="partners"
      path="/dashboard/partenaires"
      addLabel="Nouveau partenaire"
      createHref="/dashboard/partenaires/nouveau"
      editHref={(id) => `/dashboard/partenaires/${id}`}
    />
  );
}
