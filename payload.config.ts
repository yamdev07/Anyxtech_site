import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Jobs } from "./collections/Jobs";
import { Partners } from "./collections/Partners";
import { News } from "./collections/News";
import { Testimonials } from "./collections/Testimonials";
import { Submissions } from "./collections/Submissions";
import { Services } from "./collections/Services";
import { Visitors } from "./collections/Visitors";
import { SiteSettings } from "./globals/SiteSettings";
import { HomeContent } from "./globals/HomeContent";
import { services as defaultServices } from "./lib/services";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const partnersData = [
  { name: "Moov Africa", website: "https://moov-africa.bj", description: "Opérateur de télécommunications au Bénin", order: 1, showOnSite: true },
  { name: "MTN Bénin", website: "https://mtn.com/benin", description: "Réseau mobile et services numériques", order: 2, showOnSite: true },
  { name: "Celtis Bénin", website: "https://celtisinternational.com", description: "Solutions de paiement mobile", order: 3, showOnSite: true },
  { name: "EtriLabs", website: "https://etrilabs.com", description: "Incubateur et accélérateur tech au Bénin", order: 4, showOnSite: true },
  { name: "Joko", website: "https://joko.bj", description: "Plateforme de services numériques", order: 5, showOnSite: true },
  { name: "PayerNet", website: "https://payernet.com", description: "Solutions de paiement électronique", order: 6, showOnSite: true },
  { name: "Bénin Telecoms", website: "https://benintelecoms.bj", description: "Opérateur télécom national du Bénin", order: 7, showOnSite: true },
  { name: "Société Générale Bénin", website: "https://societegenerale.bj", description: "Banque et services financiers au Bénin", order: 8, showOnSite: true },
  { name: "Afrique Télécoms", website: "https://afriquetelecoms.com", description: "Infrastructure télécoms en Afrique de l'Ouest", order: 9, showOnSite: true },
  { name: "Digital Benin", website: "https://digitalbenin.com", description: "Agence de transformation digitale", order: 10, showOnSite: true },
  { name: "GreenTech Africa", website: "https://greentechafrica.com", description: "Solutions solaires et énergies renouvelables", order: 11, showOnSite: true },
  { name: "Fintech Solutions", website: "https://fintechsolutions.bj", description: "Solutions de paiement et microfinance", order: 12, showOnSite: true },
];

const jobsData = [
  { title: "Développeur Web Full Stack", slug: "developpeur-web-full-stack", location: "Cotonou, Bénin", type: "CDI", department: "Technologie", excerpt: "Rejoignez notre équipe technique pour développer des solutions web innovantes utilisant Next.js, React et Node.js.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Ingénieur Réseau & Systèmes", slug: "ingenieur-reseau-systemes", location: "Cotonou, Bénin", type: "CDI", department: "Infrastructure", excerpt: "Concevez et maintenez les infrastructures réseau et serveurs de nos clients entreprise au Bénin.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Chargé de Communication Digitale", slug: "charge-communication-digitale", location: "Cotonou, Bénin", type: "CDD", department: "Marketing", excerpt: "Pilotez la stratégie de communication digitale et les campagnes publicitaires de nos clients.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Stage en Développement Mobile", slug: "stage-developpement-mobile", location: "Cotonou, Bénin", type: "Stage", department: "Technologie", excerpt: "Stage de 6 mois en développement d'applications mobiles avec React Native et Flutter.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Administrateur Système & Réseau", slug: "admin-systeme-reseau", location: "Cotonou, Bénin", type: "CDI", department: "Infrastructure", excerpt: "Gérez les serveurs, pare-feu et infrastructures cloud de nos clients entreprise.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Designer UI/UX", slug: "designer-ui-ux", location: "Cotonou, Bénin", type: "Freelance", department: "Design", excerpt: "Concevez des interfaces utilisateur modernes et intuitives pour nos applications web et mobiles.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Technicien Solaire", slug: "technicien-solaire", location: "Parakou, Bénin", type: "CDD", department: "Énergie", excerpt: "Installation et maintenance de panneaux solaires et systèmes d'énergie renouvelable.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Commercial terrain", slug: "commercial-terrain", location: "Porto-Novo, Bénin", type: "CDI", department: "Commercial", excerpt: "Développez le portefeuille client en prospectant les entreprises à Porto-Novo et environs.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Chef de projet Digital", slug: "chef-de-projet-digital", location: "Cotonou, Bénin", type: "CDI", department: "Management", excerpt: "Pilotez les projets digitaux de A à Z : planification, coordination technique, suivi client et livraison.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
  { title: "Stage Marketing Digital", slug: "stage-marketing-digital", location: "Cotonou, Bénin", type: "Stage", department: "Marketing", excerpt: "Stage de 3 mois en marketing digital : SEO, réseaux sociaux, publicité en ligne et création de contenu.", status: "open", showOnSite: true, publishedAt: new Date().toISOString() },
];

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "dark",
    meta: {
      titleSuffix: " — AnyxTech Admin",
      icons: [{ rel: "icon", type: "image/x-icon", url: "/images/favicon.ico" }],
    },
    components: {
      graphics: {
        Logo: "/components/admin/Logo",
        Icon: "/components/admin/Icon",
      },
      beforeDashboard: ["/components/admin/AdminStyles", "/components/admin/DashboardBanner"],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Jobs, Partners, News, Testimonials, Submissions, Visitors],
  globals: [SiteSettings, HomeContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./payload.db" },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  onInit: async (payload) => {
    try {
      const { totalDocs: userCount } = await payload.count({ collection: "users" });
      if (userCount === 0) {
        const email = process.env.ADMIN_EMAIL || "admin@anyxtech.com";
        const password = process.env.ADMIN_PASSWORD || "AnyxTech@2025";
        const name = process.env.ADMIN_NAME || "Admin";

        await payload.create({
          collection: "users",
          data: { email, name, password },
        });

        payload.logger.info("========================================");
        payload.logger.info("  Compte admin créé avec succès !");
        payload.logger.info("  Email       : " + email);
        payload.logger.info("  Mot de passe: " + password);
        payload.logger.info("========================================");
      }

      const { totalDocs: serviceCount } = await payload.count({ collection: "services" });
      if (serviceCount === 0) {
        for (let i = 0; i < defaultServices.length; i++) {
          const s = defaultServices[i];
          await payload.create({
            collection: "services",
            data: {
              title: s.title,
              slug: s.slug,
              category: s.category,
              icon: s.icon,
              color: s.color,
              short: s.short,
              features: s.features.map((feature) => ({ feature })),
              order: i,
            },
          });
        }
        payload.logger.info(`Seed : ${defaultServices.length} services créés.`);
      }

      const { totalDocs: partnerCount } = await payload.count({ collection: "partners" });
      if (partnerCount === 0) {
        for (const p of partnersData) {
          await payload.create({ collection: "partners", data: p });
        }
        payload.logger.info(`Seed : ${partnersData.length} partenaires créés.`);
      }

      const { totalDocs: jobCount } = await payload.count({ collection: "jobs" });
      if (jobCount === 0) {
        for (const j of jobsData) {
          await payload.create({ collection: "jobs", data: j });
        }
        payload.logger.info(`Seed : ${jobsData.length} offres d'emploi créées.`);
      }
    } catch (e) {
      payload.logger.error("Seed échoué : " + (e as Error).message);
    }
  },
});
