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

  const where: Record<string, unknown> = { showOnSite: { not_equals: false } };

  if (q) {
    where.name = { contains: q };
  }

  const result = await payload.find({
    collection: "partners",
    where,
    sort: "order",
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
