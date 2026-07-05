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
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — AnyxTech Admin",
      icons: [{ rel: "icon", type: "image/x-icon", url: "/images/favicon.ico" }],
    },
    components: {
      graphics: {
        Logo: "/components/admin/Logo",
        Icon: "/components/admin/Icon",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Jobs, Partners, News, Testimonials, Submissions],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./payload.db" },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
