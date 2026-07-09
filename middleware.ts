import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Payload affiche son propre tableau de bord sur /admin. On veut que les
 * administrateurs atterrissent directement sur notre dashboard maison
 * (/dashboard), aussi bien après la création du tout premier compte que
 * lors d'une connexion classique.
 *
 * On ne redirige que si un cookie de session Payload est présent : un
 * visiteur non connecté doit toujours pouvoir voir l'écran de connexion /
 * de création du premier utilisateur sur /admin.
 */
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("payload-token");

  if (hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
