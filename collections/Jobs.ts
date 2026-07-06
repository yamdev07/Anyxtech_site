import type { CollectionConfig } from "payload";

export const Jobs: CollectionConfig = {
  slug: "jobs",
  labels: { singular: "Offre d'emploi", plural: "Offres d'emploi" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "type", "status"],
    group: "Contenu",
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", label: "Intitulé du poste", required: true },
    {
      name: "slug",
      type: "text",
      admin: { position: "sidebar", description: "Identifiant d'URL (ex: developpeur-web)" },
    },
    { name: "location", type: "text", label: "Lieu", defaultValue: "Cotonou, Bénin" },
    {
      name: "type",
      type: "select",
      label: "Type de contrat",
      defaultValue: "CDI",
      options: ["CDI", "CDD", "Stage", "Alternance", "Freelance"],
    },
    { name: "department", type: "text", label: "Département" },
    { name: "excerpt", type: "textarea", label: "Résumé (aperçu)" },
    { name: "description", type: "richText", label: "Description complète" },
    {
      name: "status",
      type: "select",
      label: "Statut",
      defaultValue: "open",
      options: [
        { label: "Ouverte", value: "open" },
        { label: "Fermée", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "publishedAt", type: "date", label: "Date de publication", admin: { position: "sidebar" } },
  ],
};
