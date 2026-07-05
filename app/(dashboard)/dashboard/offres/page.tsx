import { getPayloadClient } from "@/lib/payload";
import DashboardList, { type ListItem } from "@/components/dashboard/DashboardList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Offres d'emploi" };

export default async function Page() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "jobs", sort: "-publishedAt", limit: 200, depth: 0 });
  const items: ListItem[] = (docs as Record<string, unknown>[]).map((d) => ({
    id: String(d.id),
    title: (d.title as string) || "Offre",
    subtitle: (d.excerpt as string) || (d.location as string) || "",
    meta: d.status === "closed" ? "Fermée" : (d.type as string) || "Ouverte",
  }));

  return (
    <DashboardList
      title="Offres d'emploi"
      description="Les postes publiés sur la page Carrières."
      items={items}
      collection="jobs"
      path="/dashboard/offres"
      addLabel="Nouvelle offre"
    />
  );
}
