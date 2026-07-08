import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer } = body;

    if (!path) return NextResponse.json({ ok: false }, { status: 400 });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const payload = await getPayloadClient();
    await payload.create({
      collection: "visitors",
      data: { path, ip, userAgent, referrer: referrer || null },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
