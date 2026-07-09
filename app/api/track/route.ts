import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/payload";

function detectDevice(userAgent: string): "mobile" | "desktop" | "tablette" {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "tablette";
  if (/mobi|iphone|android/.test(ua)) return "mobile";
  return "desktop";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 200) : "";
    const userAgent = request.headers.get("user-agent") || "";

    const payload = await getPayloadClient();
    await payload.create({
      collection: "visits",
      data: { path, referrer, device: detectDevice(userAgent) },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Le suivi ne doit jamais casser la navigation du visiteur.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
