"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "./admin";
import { getPayloadClient } from "./payload";

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
