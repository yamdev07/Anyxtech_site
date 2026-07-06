import { headers as nextHeaders } from "next/headers";
import { getPayloadClient } from "./payload";

/** Retourne l'administrateur connecté (ou null) à partir des cookies de la requête. */
export async function getAdminUser() {
  try {
    const payload = await getPayloadClient();
    const h = await nextHeaders();
    const { user } = await payload.auth({ headers: h });
    return user ?? null;
  } catch {
    return null;
  }
}
