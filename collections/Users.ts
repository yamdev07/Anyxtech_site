import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Administration" },
  fields: [{ name: "name", type: "text", label: "Nom" }],
};
