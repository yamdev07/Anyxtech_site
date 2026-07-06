import type { GlobalConfig } from "payload";

export const HomeContent: GlobalConfig = {
  slug: "home-content",
  label: "Contenu de l'accueil",
  admin: { group: "Contenu des pages" },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroBadge", type: "text", label: "Badge", defaultValue: "Vos besoins avant les nôtres" },
            { name: "heroTitlePrefix", type: "text", label: "Titre — début", defaultValue: "Toujours plus" },
            { name: "heroTitleHighlight", type: "text", label: "Titre — mot en couleur", defaultValue: "proche de vous" },
            { name: "heroTitleSuffix", type: "text", label: "Titre — fin", defaultValue: "pour une meilleure satisfaction" },
            { name: "heroSubtitle", type: "textarea", label: "Sous-titre", defaultValue: "Des solutions numériques innovantes pour propulser votre entreprise vers l'excellence au Bénin." },
            { name: "heroImage", type: "upload", relationTo: "media", label: "Image de fond" },
          ],
        },
        {
          label: "Qui sommes-nous",
          fields: [
            { name: "aboutBadge", type: "text", label: "Badge", defaultValue: "Qui sommes-nous ?" },
            { name: "aboutTitlePrefix", type: "text", label: "Titre — début", defaultValue: "Qui" },
            { name: "aboutTitleHighlight", type: "text", label: "Titre — mot en couleur", defaultValue: "sommes-nous" },
            { name: "aboutText1", type: "textarea", label: "Paragraphe 1", defaultValue: "Nous regroupons des professionnels passionnés par les technologies modernes et l'innovation. Notre ambition est de faire grandir votre entreprise à travers des services personnalisés et fiables au Bénin." },
            { name: "aboutText2", type: "textarea", label: "Paragraphe 2", defaultValue: "En mettant vos besoins avant les nôtres, nous construisons un partenariat durable pour votre réussite digitale en Afrique de l'Ouest." },
            { name: "aboutImage", type: "upload", relationTo: "media", label: "Image" },
            {
              type: "row",
              fields: [
                { name: "aboutBadgeValue", type: "text", label: "Badge — valeur", defaultValue: "3+" },
                { name: "aboutBadgeLabel", type: "text", label: "Badge — libellé", defaultValue: "Ans d'expérience" },
              ],
            },
            {
              name: "stats",
              type: "array",
              label: "Statistiques (4)",
              maxRows: 4,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "number", label: "Valeur" },
                    { name: "suffix", type: "text", label: "Suffixe (ex: +, /7)" },
                    { name: "label", type: "text", label: "Libellé" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Comment ça marche",
          fields: [
            { name: "processTitlePrefix", type: "text", label: "Titre — début", defaultValue: "Trois étapes," },
            { name: "processTitleHighlight", type: "text", label: "Titre — mot en couleur", defaultValue: "zéro friction" },
            {
              name: "steps",
              type: "array",
              label: "Étapes (3)",
              maxRows: 3,
              fields: [
                { name: "title", type: "text", label: "Titre" },
                { name: "text", type: "textarea", label: "Description" },
              ],
            },
          ],
        },
        {
          label: "Bandeau & CTA",
          fields: [
            {
              name: "marquee",
              type: "array",
              label: "Bandeau défilant",
              fields: [{ name: "item", type: "text", label: "Élément" }],
            },
            { name: "ctaTitle", type: "text", label: "CTA — titre", defaultValue: "Voulez-vous démarrer votre projet au Bénin ?" },
            { name: "ctaSubtitle", type: "textarea", label: "CTA — sous-titre", defaultValue: "Contactez-nous dès aujourd'hui pour discuter de vos besoins en solutions digitales." },
          ],
        },
      ],
    },
  ],
};
