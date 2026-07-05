import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Témoignage", plural: "Témoignages" },
  admin: { useAsTitle: "author", defaultColumns: ["author", "company", "featured"], group: "Contenu" },
  access: { read: () => true },
  fields: [
    { name: "author", type: "text", label: "Auteur", required: true },
    { name: "role", type: "text", label: "Fonction" },
    { name: "company", type: "text", label: "Entreprise" },
    { name: "quote", type: "textarea", label: "Témoignage", required: true },
    { name: "rating", type: "number", label: "Note (1-5)", min: 1, max: 5, defaultValue: 5 },
    { name: "avatar", type: "upload", relationTo: "media", label: "Photo" },
    { name: "featured", type: "checkbox", label: "Mis en avant sur l'accueil", admin: { position: "sidebar" } },
  ],
};
