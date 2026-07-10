import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Partenaire", plural: "Partenaires" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "website"], group: "Contenu" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", label: "Nom", required: true },
    { name: "logo", type: "upload", relationTo: "media", label: "Logo" },
    { name: "website", type: "text", label: "Site web" },
    { name: "description", type: "textarea", label: "Description" },
    { name: "order", type: "number", label: "Ordre d'affichage", admin: { position: "sidebar" } },
    {
      name: "showOnSite",
      type: "checkbox",
      label: "Afficher aux visiteurs",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
  ],
};
