import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Administration" },
  // Seul un administrateur déjà connecté peut consulter ou gérer les comptes.
  // (La création du tout premier compte, elle, passe par /premier-compte,
  // qui utilise l'API locale de Payload et n'est donc pas bloquée par ceci.)
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [{ name: "name", type: "text", label: "Nom" }],
};
