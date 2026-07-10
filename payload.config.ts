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
  // Pré-remplit la collection Services avec les valeurs par défaut si elle est vide,
  // pour que le contenu du site soit visible et modifiable depuis le dashboard.
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

      const { totalDocs } = await payload.count({ collection: "services" });
      if (totalDocs === 0) {
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
    } catch (e) {
      payload.logger.error("Seed échoué : " + (e as Error).message);
    }
  },
});
