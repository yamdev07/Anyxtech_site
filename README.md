# 🌐 AnyxTech Bénin — Site Vitrine (Next.js)

Site vitrine officiel d'**AnyxTech Bénin**, entreprise spécialisée dans les
solutions digitales, réseaux informatiques et la transformation numérique à
Cotonou et en Afrique de l'Ouest.

Refonte complète en **Next.js 15** (App Router) avec un design moderne : fonds
animés, glassmorphism, dégradés de marque, mode sombre et animations au scroll.

---

## 🛠️ Stack technique

- **[Next.js 15](https://nextjs.org/)** — App Router, rendu statique (SSG)
- **React 19** + **TypeScript**
- **Tailwind CSS 3** — design system sur mesure (tokens de marque, animations)
- **Framer Motion** — animations et transitions
- **lucide-react** — icônes
- **next/font** — Poppins & Space Grotesk (auto-hébergées)

---

## 🚀 Démarrage

```bash
npm install        # installer les dépendances
npm run dev        # serveur de développement → http://localhost:3000
npm run build      # build de production
npm run start      # servir le build de production
```

---

## 📁 Structure

```
app/
├── layout.tsx           # Layout racine (header, footer, SEO, thème)
├── page.tsx             # Accueil (hero, services, à propos, CTA)
├── societe/page.tsx     # Histoire, mission, valeurs, processus, technologies
├── services/page.tsx    # Services avec filtres interactifs
├── contact/page.tsx     # Formulaire de contact (Formspree)
├── devis/page.tsx       # Demande de devis détaillée
├── sitemap.ts           # Sitemap dynamique
├── robots.ts            # robots.txt
└── globals.css          # Design system + styles globaux

components/
├── Header.tsx / Footer.tsx / ThemeToggle.tsx
├── StructuredData.tsx   # JSON-LD (SEO)
├── home/                # Sections de l'accueil
├── services/            # Explorateur de services (filtres)
├── contact/ · devis/    # Formulaires
└── ui/                  # Primitives réutilisables (Reveal, Counter, PageHero…)

lib/
├── site.ts              # Config du site (contacts, réseaux, navigation)
├── services.ts          # Données des services
└── fonts.ts             # Polices

public/images/           # Images & logos
legacy/                  # Ancien site HTML (archive de référence)
```

---

## 🎨 Design system

Les couleurs de marque sont définies dans `tailwind.config.ts` :

| Token | Valeur |
|-------|--------|
| `brand.blue` | `#1f429b` |
| `brand.light` | `#1db9ff` |
| `brand.cyan` | `#22d3ee` |
| `ink` | `#070b18` (fonds sombres) |

Classes utilitaires clés : `.text-gradient`, `.card-glow`, `.btn-primary`,
`.glass`, `.aurora-bg`, `.container-x`.

---

## 📬 Formulaires

Les formulaires **Contact** et **Devis** sont envoyés via
[Formspree](https://formspree.io/) en AJAX. Remplacez les identifiants de
formulaire dans `components/contact/ContactForm.tsx` et
`components/devis/QuoteForm.tsx` par les vôtres.

---

## 🔍 SEO

- Metadata par page (export `metadata`)
- Open Graph & Twitter Cards
- Données structurées JSON-LD (`ProfessionalService`)
- `sitemap.xml` et `robots.txt` générés automatiquement

---

## 👤 Auteur

Développé pour **AnyxTech Bénin** — © AnyxTech Bénin. Tous droits réservés.
