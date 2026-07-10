import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/access";

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Partenaire", plural: "Partenaires" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "website"], group: "Contenu" },
  access: { read: () => true, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: "name", type: "text", label: "Nom", required: true },
    { name: "logo", type: "upload", relationTo: "media", label: "Logo" },
    { name: "website", type: "text", label: "Site web" },
    { name: "description", type: "textarea", label: "Description" },
    { name: "order", type: "number", label: "Ordre d'affichage", admin: { position: "sidebar" } },
  ],
};
