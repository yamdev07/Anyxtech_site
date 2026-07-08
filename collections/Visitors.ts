import type { CollectionConfig } from "payload";

const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Visitors: CollectionConfig = {
  slug: "visitors",
  labels: { singular: "Visite", plural: "Visites" },
  admin: {
    useAsTitle: "path",
    defaultColumns: ["path", "ip", "country", "createdAt"],
    group: "Analytics",
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "path", type: "text", label: "Page visitée", required: true },
    { name: "ip", type: "text", label: "Adresse IP" },
    { name: "userAgent", type: "text", label: "Navigateur" },
    { name: "country", type: "text", label: "Pays" },
    { name: "referrer", type: "text", label: "Référent" },
    { name: "duration", type: "number", label: "Durée (s)" },
  ],
};
