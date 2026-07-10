"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "./admin";
import { getPayloadClient } from "./payload";
import { textToLexical } from "./lexical";

type Collection =
  | "services"
  | "jobs"
  | "partners"
  | "news"
  | "testimonials"
  | "submissions";

export async function deleteDoc(collection: Collection, id: string, path: string) {
  const user = await getAdminUser();
  if (!user) return { ok: false };
  try {
    const payload = await getPayloadClient();
    await payload.delete({ collection, id });
    revalidatePath(path);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function setHandled(id: string, handled: boolean) {
  const user = await getAdminUser();
  if (!user) return { ok: false };
  try {
    const payload = await getPayloadClient();
    await payload.update({ collection: "submissions", id, data: { handled } });
    revalidatePath("/dashboard/messages");
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

// --- Offres d'emploi -------------------------------------------------
// Formulaires natifs du dashboard : plus besoin de passer par /admin.

export type ActionResult = { ok: boolean; id?: string; error?: string };

function jobData(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    location: String(formData.get("location") || "Cotonou, Bénin"),
    type: String(formData.get("type") || "CDI"),
    department: String(formData.get("department") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    status: String(formData.get("status") || "open"),
    description: textToLexical(String(formData.get("description") || "")),
  };
}

export async function createJob(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "jobs",
      data: { ...jobData(formData), publishedAt: new Date().toISOString() },
    });
    revalidatePath("/dashboard/offres");
    revalidatePath("/dashboard");
    return { ok: true, id: String(doc.id) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function updateJob(id: string, formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const payload = await getPayloadClient();
    await payload.update({ collection: "jobs", id, data: jobData(formData) });
    revalidatePath("/dashboard/offres");
    revalidatePath("/dashboard");
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// --- Partenaires -------------------------------------------------------

async function uploadLogoIfProvided(formData: FormData) {
  const file = formData.get("logo");
  if (!(file instanceof File) || file.size === 0) return undefined;
  const payload = await getPayloadClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const media = await payload.create({
    collection: "media",
    data: { alt: file.name },
    file: { data: buffer, mimetype: file.type, name: file.name, size: file.size },
  });
  return String(media.id);
}

export async function createPartner(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const logoId = await uploadLogoIfProvided(formData);
    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "partners",
      data: {
        name: String(formData.get("name") || ""),
        website: String(formData.get("website") || ""),
        description: String(formData.get("description") || ""),
        ...(logoId ? { logo: logoId } : {}),
      },
    });
    revalidatePath("/dashboard/partenaires");
    revalidatePath("/dashboard");
    return { ok: true, id: String(doc.id) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function updatePartner(id: string, formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const logoId = await uploadLogoIfProvided(formData);
    const payload = await getPayloadClient();
    await payload.update({
      collection: "partners",
      id,
      data: {
        name: String(formData.get("name") || ""),
        website: String(formData.get("website") || ""),
        description: String(formData.get("description") || ""),
        ...(logoId ? { logo: logoId } : {}),
      },
    });
    revalidatePath("/dashboard/partenaires");
    revalidatePath("/dashboard");
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// --- Contenu de l'accueil (global) -------------------------------------

async function uploadImageIfProvided(formData: FormData, fieldName: string) {
  const file = formData.get(fieldName);
  if (!(file instanceof File) || file.size === 0) return undefined;
  const payload = await getPayloadClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const media = await payload.create({
    collection: "media",
    data: { alt: file.name },
    file: { data: buffer, mimetype: file.type, name: file.name, size: file.size },
  });
  return String(media.id);
}

function parseJsonArray<T>(formData: FormData, fieldName: string): T[] {
  try {
    const raw = formData.get(fieldName);
    if (typeof raw !== "string") return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// --- Services ------------------------------------------------------------

async function uploadIfProvided(formData: FormData, fieldName: string) {
  const file = formData.get(fieldName);
  if (!(file instanceof File) || file.size === 0) return undefined;
  const payload = await getPayloadClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const media = await payload.create({
    collection: "media",
    data: { alt: file.name },
    file: { data: buffer, mimetype: file.type, name: file.name, size: file.size },
  });
  return String(media.id);
}

function serviceData(formData: FormData) {
  const featuresRaw = formData.get("features");
  const features =
    typeof featuresRaw === "string"
      ? (JSON.parse(featuresRaw) as { feature: string }[])
      : [];
  return {
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || "communication"),
    icon: String(formData.get("icon") || "Sparkles"),
    color: String(formData.get("color") || ""),
    short: String(formData.get("short") || ""),
    features,
    order: formData.get("order") ? Number(formData.get("order")) : undefined,
  };
}

export async function createService(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const imageId = await uploadIfProvided(formData, "image");
    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "services",
      data: { ...serviceData(formData), ...(imageId ? { image: imageId } : {}) },
    });
    revalidatePath("/dashboard/services");
    revalidatePath("/dashboard");
    return { ok: true, id: String(doc.id) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function updateService(id: string, formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const imageId = await uploadIfProvided(formData, "image");
    const payload = await getPayloadClient();
    await payload.update({
      collection: "services",
      id,
      data: { ...serviceData(formData), ...(imageId ? { image: imageId } : {}) },
    });
    revalidatePath("/dashboard/services");
    revalidatePath("/dashboard");
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// --- Actualités ------------------------------------------------------------

function newsData(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    status: String(formData.get("status") || "draft"),
    content: textToLexical(String(formData.get("content") || "")),
  };
}

export async function createNews(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const coverId = await uploadIfProvided(formData, "cover");
    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "news",
      data: {
        ...newsData(formData),
        ...(coverId ? { cover: coverId } : {}),
        publishedAt: new Date().toISOString(),
      },
    });
    revalidatePath("/dashboard/actualites");
    revalidatePath("/dashboard");
    return { ok: true, id: String(doc.id) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function updateNews(id: string, formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const coverId = await uploadIfProvided(formData, "cover");
    const payload = await getPayloadClient();
    await payload.update({
      collection: "news",
      id,
      data: { ...newsData(formData), ...(coverId ? { cover: coverId } : {}) },
    });
    revalidatePath("/dashboard/actualites");
    revalidatePath("/dashboard");
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// --- Témoignages ------------------------------------------------------------

function testimonialData(formData: FormData) {
  return {
    author: String(formData.get("author") || ""),
    role: String(formData.get("role") || ""),
    company: String(formData.get("company") || ""),
    quote: String(formData.get("quote") || ""),
    rating: Number(formData.get("rating") || 5),
    featured: formData.get("featured") === "on",
  };
}

export async function createTestimonial(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const avatarId = await uploadIfProvided(formData, "avatar");
    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "testimonials",
      data: { ...testimonialData(formData), ...(avatarId ? { avatar: avatarId } : {}) },
    });
    revalidatePath("/dashboard/temoignages");
    revalidatePath("/dashboard");
    return { ok: true, id: String(doc.id) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function updateTestimonial(id: string, formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const avatarId = await uploadIfProvided(formData, "avatar");
    const payload = await getPayloadClient();
    await payload.update({
      collection: "testimonials",
      id,
      data: { ...testimonialData(formData), ...(avatarId ? { avatar: avatarId } : {}) },
    });
    revalidatePath("/dashboard/temoignages");
    revalidatePath("/dashboard");
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function updateHomeContent(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Non autorisé." };
  try {
    const heroImageId = await uploadImageIfProvided(formData, "heroImage");
    const aboutImageId = await uploadImageIfProvided(formData, "aboutImage");

    const stats = parseJsonArray<{ value: number; suffix: string; label: string }>(formData, "stats").slice(0, 4);
    const steps = parseJsonArray<{ title: string; text: string }>(formData, "steps").slice(0, 3);
    const marquee = parseJsonArray<{ item: string }>(formData, "marquee");

    const payload = await getPayloadClient();
    await payload.updateGlobal({
      slug: "home-content",
      data: {
        heroBadge: String(formData.get("heroBadge") || ""),
        heroTitlePrefix: String(formData.get("heroTitlePrefix") || ""),
        heroTitleHighlight: String(formData.get("heroTitleHighlight") || ""),
        heroTitleSuffix: String(formData.get("heroTitleSuffix") || ""),
        heroSubtitle: String(formData.get("heroSubtitle") || ""),
        ...(heroImageId ? { heroImage: heroImageId } : {}),

        aboutBadge: String(formData.get("aboutBadge") || ""),
        aboutTitlePrefix: String(formData.get("aboutTitlePrefix") || ""),
        aboutTitleHighlight: String(formData.get("aboutTitleHighlight") || ""),
        aboutText1: String(formData.get("aboutText1") || ""),
        aboutText2: String(formData.get("aboutText2") || ""),
        ...(aboutImageId ? { aboutImage: aboutImageId } : {}),
        aboutBadgeValue: String(formData.get("aboutBadgeValue") || ""),
        aboutBadgeLabel: String(formData.get("aboutBadgeLabel") || ""),
        stats,

        processTitlePrefix: String(formData.get("processTitlePrefix") || ""),
        processTitleHighlight: String(formData.get("processTitleHighlight") || ""),
        steps,

        marquee,
        ctaTitle: String(formData.get("ctaTitle") || ""),
        ctaSubtitle: String(formData.get("ctaSubtitle") || ""),
      },
    });

    revalidatePath("/dashboard/contenu-accueil");
    revalidatePath("/");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
