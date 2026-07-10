"use server";

import { cookies } from "next/headers";
import { getPayloadClient } from "./payload";

export interface LoginResult {
  ok: boolean;
  error?: string;
}

export async function loginAdmin(formData: FormData): Promise<LoginResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) return { ok: false, error: "Email et mot de passe requis." };

  try {
    const payload = await getPayloadClient();
    const result = await payload.login({ collection: "users", data: { email, password } });

    if (!result.token) return { ok: false, error: "Email ou mot de passe incorrect." };

    const cookieStore = await cookies();
    cookieStore.set("payload-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: result.exp ? new Date(result.exp * 1000) : undefined,
    });

    return { ok: true };
  } catch {
    // Message volontairement générique : on ne révèle pas si l'email existe.
    return { ok: false, error: "Email ou mot de passe incorrect." };
  }
}
