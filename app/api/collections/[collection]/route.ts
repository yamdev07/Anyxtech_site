import { NextRequest, NextResponse } from "next/server";
import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

const titleFieldMap: Record<string, string> = {
  services: "title",
  jobs: "title",
  partners: "name",
  news: "title",
  testimonials: "author",
};

const subtitleFieldMap: Record<string, string> = {
  services: "short",
  jobs: "location",
  partners: "website",
  news: "excerpt",
  testimonials: "company",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const allowed = ["services", "jobs", "partners", "news", "testimonials", "submissions"];
  if (!allowed.includes(collection)) {
    return NextResponse.json({ docs: [], hasNextPage: false, totalDocs: 0 });
  }

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: collection as "services",
    sort: "-createdAt",
    limit,
    page,
    depth: 0,
  });

  const titleField = titleFieldMap[collection] || "title";
  const subtitleField = subtitleFieldMap[collection] || "";

  const docs = (result.docs as Record<string, unknown>[]).map((d) => ({
    id: String(d.id),
    title: String(d[titleField] || "Sans titre"),
    subtitle: subtitleField ? String(d[subtitleField] || "") : undefined,
    meta: collection === "jobs" ? (String(d.type) || undefined) : undefined,
  }));

  return NextResponse.json({
    docs,
    hasNextPage: result.hasNextPage,
    totalDocs: result.totalDocs,
    page: result.page,
    totalPages: result.totalPages,
  });
}
