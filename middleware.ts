import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Payload affiche son propre tableau de bord et son propre écran de
 * connexion sur /admin. On remplace les deux par nos pages maison :
 * - session active  -> /dashboard
 * - pas de session   -> /connexion
 */
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("payload-token");
  return NextResponse.redirect(new URL(hasSession ? "/dashboard" : "/connexion", request.url));
}

export const config = {
  matcher: ["/admin"],
};
