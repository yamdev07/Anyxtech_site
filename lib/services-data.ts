import { unstable_cache } from "next/cache";
import { getPayloadClient } from "./payload";
import { services as fallback, type Service, type ServiceCategory } from "./services";

async function load(): Promise<Service[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "services",
      sort: "order",
      limit: 100,
      depth: 1,
    });
    if (!docs.length) return fallback;
    return (docs as Record<string, unknown>[]).map((d, i) => {
      const image = typeof d.image === "object" && d.image ? (d.image as { url?: string }).url : undefined;
      const features = Array.isArray(d.features)
        ? (d.features as { feature?: string }[])
            .map((f) => f.feature)
            .filter((f): f is string => Boolean(f && f.trim()))
        : [];
      return {
        slug: (d.slug as string) || String(d.id ?? i),
        title: (d.title as string) || "Service",
        category: ((d.category as ServiceCategory) || "communication"),
        icon: (d.icon as string) || "Sparkles",
        color: (d.color as string) || "from-brand-blue to-brand-light",
        short: (d.short as string) || "",
        features,
        image: image ?? undefined,
      };
    });
  } catch {
    return fallback;
  }
}

/** Services : depuis le CMS s'il en contient, sinon repli sur les valeurs par défaut. */
export const getServices = unstable_cache(load, ["services"], {
  revalidate: 60,
  tags: ["services"],
});
