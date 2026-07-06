import { getPayloadClient } from "@/lib/payload";
import DashboardList, { type ListItem } from "@/components/dashboard/DashboardList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Services" };

export default async function Page() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "services", sort: "order", limit: 200, depth: 0 });
  const items: ListItem[] = (docs as Record<string, unknown>[]).map((d) => ({
    id: String(d.id),
    title: (d.title as string) || "Service",
    subtitle: (d.short as string) || "",
    meta: (d.category as string) || undefined,
  }));

  return (
    <DashboardList
      title="Services"
      description="Les domaines d'expertise affichés sur le site."
      items={items}
      collection="services"
      path="/dashboard/services"
      addLabel="Nouveau service"
    />
  );
}
