// Configuration PM2 pour faire tourner l'application en production.
// Démarrage :  pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "anyxtech",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
      // PAYLOAD_SECRET et DATABASE_URI sont lus depuis le fichier .env
    },
  ],
};
