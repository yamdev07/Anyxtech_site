import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Administration" },
  access: { read: () => true, create: isAdmin, update: isAdmin, delete: isAdmin },
  upload: true,
  fields: [{ name: "alt", type: "text", label: "Texte alternatif" }],
};
