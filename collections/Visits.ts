import type { CollectionConfig } from "payload";

export const Visits: CollectionConfig = {
  slug: "visits",
  labels: { singular: "Visite", plural: "Visites" },
  admin: {
    useAsTitle: "path",
    defaultColumns: ["path", "device", "createdAt"],
    group: "Analytique",
    hidden: true,
  },
  access: {
    // N'importe quel visiteur du site public peut créer une visite (le
    // tracker anonyme l'appelle depuis le front). Seul un admin connecté
    // peut lire/modifier/supprimer ces données.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "path", type: "text", required: true, label: "Page visitée" },
    { name: "referrer", type: "text", label: "Provenance" },
    {
      name: "device",
      type: "select",
      label: "Appareil",
      options: ["mobile", "desktop", "tablette"],
      defaultValue: "desktop",
    },
  ],
  timestamps: true,
};
