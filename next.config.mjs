import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Contournement temporaire : "sharp" pose problème sous Windows sur cette
    // machine (erreur ERR_DLOPEN_FAILED). À retirer une fois sharp réparé.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
