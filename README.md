# 🌐 AnyxTech — Site vitrine + Dashboard

Site vitrine officiel d'**AnyxTech Bénin**, reconstruit en **Next.js 15** (App Router, TypeScript, Tailwind CSS) avec un **back-office Payload CMS** intégré pour gérer le contenu sans toucher au code.

---

## 🚀 Stack technique

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** + **Framer Motion** (animations) + **lucide-react** (icônes)
- **Payload CMS 3** (dashboard `/admin`, auth, base de données) — adaptateur **SQLite** en dev

---

## 📁 Structure

```
app/
├── (frontend)/         # Le site public (accueil, services, société, carrières, actualités, contact, devis)
├── (payload)/          # Le back-office Payload (panneau /admin + API)
├── sitemap.ts, robots.ts
collections/            # Modèles de données du CMS (Jobs, Partners, News, Testimonials, Submissions, Media, Users)
components/             # Composants UI + sections
lib/                    # Config site, données services, client Payload, server actions
payload.config.ts       # Configuration Payload (collections, DB, auth)
```

## 🧩 Modules gérables depuis le dashboard

| Collection | Rôle |
|---|---|
| **Offres d'emploi** | Alimente la page publique `/carrieres` |
| **Partenaires** | Bandeau « Ils nous font confiance » sur l'accueil |
| **Actualités** | Blog public `/actualites` |
| **Témoignages** | Section avis sur l'accueil (option « mis en avant ») |
| **Messages reçus** | Réception des formulaires Contact & Devis |
| **Médias** | Images (logos, couvertures…) |

---

## 🛠️ Démarrage local

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
#    puis générer un secret :
#    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
#    et le coller dans PAYLOAD_SECRET

# 3. Lancer le serveur de développement
npm run dev
```

- Site : http://localhost:3000
- Dashboard : http://localhost:3000/admin

Au **premier accès à `/admin`**, un écran vous invite à **créer le compte administrateur**. La base SQLite (`payload.db`) et les types sont générés automatiquement.

---

## ☁️ Déploiement (production)

Le site est prêt pour **Vercel** / **Netlify**. Points à prévoir pour la prod :

1. **Base de données Postgres** (le SQLite ne persiste pas en serverless). Créez une base gratuite (Neon, Supabase) et :
   - installez l'adaptateur : `npm i @payloadcms/db-postgres`
   - remplacez `sqliteAdapter` par `postgresAdapter` dans `payload.config.ts`
   - définissez `DATABASE_URI` sur l'URL Postgres
2. **Variables d'environnement** sur l'hébergeur : `PAYLOAD_SECRET`, `DATABASE_URI`.
3. **Stockage des médias** : en serverless, configurez un stockage externe (S3, Vercel Blob) via un plugin Payload, sinon les uploads ne persistent pas.
4. (Recommandé) **Adaptateur email** (Resend, SMTP…) pour les réinitialisations de mot de passe.

---

## 📌 Durcissement « production » (améliorations futures)

- Base Postgres + stockage média externe (voir ci-dessus)
- Adaptateur email
- Tests automatisés + CI/CD
- Limitation de débit (rate limiting) sur les formulaires

---

## 👤 Auteur

Développé pour **AnyxTech Bénin** — Cotonou, Bénin.
