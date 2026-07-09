import type { CollectionConfig } from "payload";
import { iconNames, colorPresets } from "../lib/services";
import { autoSlugHook } from "../lib/slugify";

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order"],
    group: "Contenu",
  },
  access: { read: () => true },
  hooks: { beforeValidate: [autoSlugHook("title")] },
  fields: [
    { name: "title", type: "text", label: "Titre", required: true },
    { name: "slug", type: "text", label: "Identifiant d'URL", admin: { position: "sidebar" } },
    {
      name: "category",
      type: "select",
      label: "Catégorie",
      defaultValue: "communication",
      options: [
        { label: "Communication Digitale", value: "communication" },
        { label: "Infrastructure & Réseaux", value: "infrastructure" },
        { label: "Support & Accompagnement", value: "support" },
        { label: "Hébergement & Domaine", value: "hosting" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "icon",
          type: "select",
          label: "Icône",
          defaultValue: "Sparkles",
          options: iconNames.map((n) => ({ label: n, value: n })),
        },
        {
          name: "color",
          type: "select",
          label: "Couleur",
          defaultValue: colorPresets[0].value,
          options: colorPresets,
        },
      ],
    },
    { name: "image", type: "upload", relationTo: "media", label: "Image (accueil)" },
    { name: "short", type: "textarea", label: "Description courte" },
    {
      name: "features",
      type: "array",
      label: "Prestations",
      labels: { singular: "Prestation", plural: "Prestations" },
      fields: [{ name: "feature", type: "text", label: "Prestation" }],
    },
    { name: "order", type: "number", label: "Ordre d'affichage", admin: { position: "sidebar" } },
  ],
};
