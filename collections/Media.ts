import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Administration" },
  access: { read: () => true },
  upload: true,
  fields: [{ name: "alt", type: "text", label: "Texte alternatif" }],
};
