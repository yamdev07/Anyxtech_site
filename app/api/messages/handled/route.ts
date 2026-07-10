import { NextRequest, NextResponse } from "next/server";
import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { id, handled } = await req.json();
  const payload = await getPayload({ config });

  try {
    await payload.update({ collection: "submissions", id, data: { handled } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
