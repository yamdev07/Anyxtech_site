import { NextRequest, NextResponse } from "next/server";
import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 6);
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";

  const where: Record<string, unknown> = {
    and: [
      { status: { equals: "open" } },
      { showOnSite: { not_equals: false } },
    ],
  };

  if (q) {
    (where.and as Record<string, unknown>[]).push({
      or: [
        { title: { contains: q } },
        { excerpt: { contains: q } },
        { department: { contains: q } },
        { location: { contains: q } },
      ],
    });
  }

  if (type) {
    (where.and as Record<string, unknown>[]).push({ type: { equals: type } });
  }

  const result = await payload.find({
    collection: "jobs",
    where,
    sort: "-publishedAt",
    limit,
    page,
    depth: 0,
  });

  return NextResponse.json({
    docs: result.docs,
    hasNextPage: result.hasNextPage,
    totalDocs: result.totalDocs,
    page: result.page,
    totalPages: result.totalPages,
  });
}
