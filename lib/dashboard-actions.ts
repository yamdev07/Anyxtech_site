"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getPayloadClient } from "./payload";
import { getAdminUser } from "./admin";

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

export async function login(email: string, password: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.login({
      collection: "users",
      data: { email, password },
    });
    return { ok: true, token: result.token };
  } catch {
    return { ok: false };
  }
}

export async function logout() {
  const c = await cookies();
  const cookieNames = c.getAll().map((ck) => ck.name);
  for (const name of cookieNames) {
    if (name.startsWith("payload-")) {
      c.delete(name);
    }
  }
  return { ok: true };
}

export async function saveDoc(
  collection: Collection,
  id: string | null,
  data: Record<string, unknown>,
  path: string
) {
  const user = await getAdminUser();
  if (!user) return { ok: false };
  try {
    const payload = await getPayloadClient();
    if (id) {
      await payload.update({ collection, id, data });
    } else {
      await payload.create({ collection, data });
    }
    revalidatePath(path);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function saveGlobal(
  slug: string,
  data: Record<string, unknown>,
  path: string
) {
  const user = await getAdminUser();
  if (!user) return { ok: false };
  try {
    const payload = await getPayloadClient();
    await payload.updateGlobal({ slug, data });
    revalidatePath(path);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
