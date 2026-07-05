import type { CollectionConfig } from "payload";

const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: { singular: "Message", plural: "Messages reçus" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "email", "handled", "createdAt"],
    group: "Messages",
  },
  access: {
    // Le site public peut créer (soumission de formulaire)
    create: () => true,
    // Seuls les administrateurs connectés peuvent lire / modifier / supprimer
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "type",
      type: "select",
      label: "Type",
      defaultValue: "contact",
      options: [
        { label: "Contact", value: "contact" },
        { label: "Devis", value: "devis" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "handled", type: "checkbox", label: "Traité", admin: { position: "sidebar" } },
    { name: "name", type: "text", label: "Nom" },
    { name: "email", type: "email", label: "Email" },
    { name: "phone", type: "text", label: "Téléphone" },
    { name: "company", type: "text", label: "Entreprise" },
    { name: "subject", type: "text", label: "Sujet / Projet" },
    { name: "message", type: "textarea", label: "Message" },
    { name: "meta", type: "json", label: "Détails supplémentaires (devis)" },
  ],
};
