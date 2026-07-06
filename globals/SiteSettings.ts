import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Paramètres du site",
  admin: { group: "Configuration" },
  access: { read: () => true },
  fields: [
    {
      type: "collapsible",
      label: "Identité",
      fields: [
        { name: "tagline", type: "text", label: "Slogan", defaultValue: "Vos besoins avant les nôtres" },
        {
          name: "description",
          type: "textarea",
          label: "Description (pied de page)",
          defaultValue:
            "Votre partenaire en solutions digitales innovantes au Bénin et en Afrique de l'Ouest.",
        },
      ],
    },
    {
      type: "collapsible",
      label: "Coordonnées",
      fields: [
        { name: "phone", type: "text", label: "Téléphone (affiché)", defaultValue: "+229 01 52415241" },
        { name: "phoneHref", type: "text", label: "Téléphone (lien tel:)", defaultValue: "tel:+2290152415241" },
        { name: "email", type: "email", label: "Email", defaultValue: "contact@anyxtech.com" },
        { name: "whatsapp", type: "text", label: "Lien WhatsApp", defaultValue: "https://wa.me/22952415241" },
        { name: "address", type: "textarea", label: "Adresse complète", defaultValue: "C/1539 L Missekple, Maison SAIBOU, Cotonou, Bénin" },
        { name: "addressShort", type: "text", label: "Adresse courte", defaultValue: "Cotonou, Bénin" },
        { name: "hours", type: "text", label: "Horaires", defaultValue: "Lun-Ven : 8h-18h" },
      ],
    },
    {
      type: "collapsible",
      label: "Réseaux sociaux",
      fields: [
        {
          type: "row",
          fields: [
            { name: "facebook", type: "text", label: "Facebook", defaultValue: "https://facebook.com/AnyxTechBenin" },
            { name: "twitter", type: "text", label: "Twitter / X", defaultValue: "https://twitter.com/AnyxTechBenin" },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "linkedin", type: "text", label: "LinkedIn", defaultValue: "https://linkedin.com/company/AnyxTechBenin" },
            { name: "instagram", type: "text", label: "Instagram", defaultValue: "https://instagram.com/AnyxTechBenin" },
          ],
        },
      ],
    },
  ],
};
