import { NextRequest, NextResponse } from "next/server";
import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);

  const result = await payload.find({
    collection: "visitors",
    sort: "-createdAt",
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
