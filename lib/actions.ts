"use server";

import { getPayloadClient } from "@/lib/payload";

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export type ActionResult = { ok: boolean; error?: string };

/** Soumission du formulaire de contact → collection Submissions. */
export async function submitContact(input: {
  nom?: string;
  email?: string;
  telephone?: string;
  message?: string;
  website?: string; // honeypot anti-spam (doit rester vide)
}): Promise<ActionResult> {
  if (input.website) return { ok: true }; // bot détecté : on ignore silencieusement

  const name = (input.nom ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name || !email || !message)
    return { ok: false, error: "Merci de remplir les champs obligatoires." };
  if (!emailRe.test(email)) return { ok: false, error: "Adresse email invalide." };

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "submissions",
      data: {
        type: "contact",
        name,
        email,
        phone: input.telephone?.trim() || undefined,
        message,
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Une erreur est survenue. Merci de réessayer." };
  }
}

/** Soumission du formulaire de devis → collection Submissions. */
export async function submitQuote(input: {
  nom?: string;
  entreprise?: string;
  email?: string;
  telephone?: string;
  projet?: string;
  description?: string;
  services?: string[];
  budget?: string;
  delai?: string;
  website?: string;
}): Promise<ActionResult> {
  if (input.website) return { ok: true };

  const name = (input.nom ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.telephone ?? "").trim();
  const description = (input.description ?? "").trim();

  if (!name || !email || !phone || !description)
    return { ok: false, error: "Merci de remplir les champs obligatoires." };
  if (!emailRe.test(email)) return { ok: false, error: "Adresse email invalide." };

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "submissions",
      data: {
        type: "devis",
        name,
        email,
        phone,
        company: input.entreprise?.trim() || undefined,
        subject: input.projet?.trim() || undefined,
        message: description,
        meta: {
          services: input.services ?? [],
          budget: input.budget ? Number(input.budget) : undefined,
          delai: input.delai || undefined,
        },
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Une erreur est survenue. Merci de réessayer." };
  }
}
