import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Actualité", plural: "Actualités" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
    group: "Contenu",
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", label: "Titre", required: true },
    {
      name: "slug",
      type: "text",
      admin: { position: "sidebar", description: "Identifiant d'URL" },
    },
    { name: "excerpt", type: "textarea", label: "Chapô / résumé" },
    { name: "cover", type: "upload", relationTo: "media", label: "Image de couverture" },
    { name: "content", type: "richText", label: "Contenu" },
    {
      name: "status",
      type: "select",
      label: "Statut",
      defaultValue: "draft",
      options: [
        { label: "Brouillon", value: "draft" },
        { label: "Publié", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "publishedAt", type: "date", label: "Date de publication", admin: { position: "sidebar" } },
  ],
};
