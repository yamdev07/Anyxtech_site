"use server";

import { cookies } from "next/headers";
import { getPayloadClient } from "./payload";

export interface SetupResult {
  ok: boolean;
  error?: string;
}

/**
 * Crée le tout premier compte administrateur, puis le connecte
 * automatiquement (pose le cookie de session Payload) pour qu'il
 * atterrisse directement sur /dashboard.
 *
 * Ne fonctionne que si aucun utilisateur n'existe encore : une fois le
 * premier compte créé, cette action se bloque définitivement — la
 * création de comptes supplémentaires se fait ensuite depuis /admin.
 */
export async function createFirstAdmin(formData: FormData): Promise<SetupResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const name = String(formData.get("name") || "").trim();

  if (!email || !password) return { ok: false, error: "Email et mot de passe requis." };
  if (password.length < 8) return { ok: false, error: "Le mot de passe doit contenir au moins 8 caractères." };
  if (password !== confirmPassword) return { ok: false, error: "Les mots de passe ne correspondent pas." };

  try {
    const payload = await getPayloadClient();

    const { totalDocs } = await payload.count({ collection: "users" });
    if (totalDocs > 0) {
      return { ok: false, error: "Un compte administrateur existe déjà. Utilisez la page de connexion." };
    }

    await payload.create({
      collection: "users",
      data: { email, password, ...(name ? { name } : {}) },
    });

    const loginResult = await payload.login({
      collection: "users",
      data: { email, password },
    });

    if (!loginResult.token) {
      return { ok: false, error: "Compte créé, mais la connexion automatique a échoué. Connectez-vous depuis /admin." };
    }

    const cookieStore = await cookies();
    cookieStore.set("payload-token", loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: loginResult.exp ? new Date(loginResult.exp * 1000) : undefined,
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message || "Une erreur est survenue." };
  }
}
