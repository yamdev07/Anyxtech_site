import { getPayloadClient } from "@/lib/payload";
import DashboardList, { type ListItem } from "@/components/dashboard/DashboardList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Actualités" };

export default async function Page() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "news", sort: "-publishedAt", limit: 200, depth: 0 });
  const items: ListItem[] = (docs as Record<string, unknown>[]).map((d) => ({
    id: String(d.id),
    title: (d.title as string) || "Article",
    subtitle: (d.excerpt as string) || "",
    meta: d.status === "published" ? "Publié" : "Brouillon",
  }));

  return (
    <DashboardList
      title="Actualités"
      description="Les articles du blog."
      items={items}
      collection="news"
      path="/dashboard/actualites"
      addLabel="Nouvel article"
    />
  );
}
