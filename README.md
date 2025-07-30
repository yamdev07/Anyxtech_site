# AnyxTech Site Web

Bienvenue sur le dépôt officiel du site web d'**AnyxTech**, une entreprise spécialisée dans les solutions numériques innovantes en Afrique de l’Ouest.

Ce projet est une **application web de gestion de clientèle** conçue pour permettre à l’équipe AnyxTech de suivre les abonnements clients, les échéances, les paiements et les relances automatiques (WhatsApp).

---

## 🚀 Fonctionnalités principales

- Tableau de bord dynamique avec statistiques :
  - Total clients
  - Clients ayant payé
  - Clients actifs / suspendus
  - Réabonnements à venir ou dépassés
- Gestion des clients :
  - Ajout / édition / suppression
  - Changement de statut (actif, suspendu…)
  - Filtrage en temps réel
- Notifications de relance par WhatsApp (via Infobip API)
- Authentification avec Laravel Breeze
- Interface responsive (Bootstrap)

---

## 🛠️ Technologies utilisées

- **Backend** : Laravel 10
- **Frontend** : Blade, Bootstrap 5
- **Base de données** : MySQL / phpMyAdmin
- **Paiement** : FedaPay (sandbox intégré)
- **Relance clients** : Infobip WhatsApp API
- **Déploiement local** : XAMPP / Laragon / Docker

---

## ⚙️ Installation locale

```bash
# 1. Clonez le dépôt
git clone https://github.com/yamdev07/Anyxtech_site.git

# 2. Accédez au dossier
cd Anyxtech_site

# 3. Installez les dépendances PHP
composer install

# 4. Copiez le fichier .env
cp .env.example .env

# 5. Configurez votre base de données dans .env

# 6. Générez la clé de l'application
php artisan key:generate

# 7. Lancez les migrations
php artisan migrate

# 8. Démarrez le serveur
php artisan serve
📦 Structure du projet
pgsql
Copier
Modifier
├── app/
├── database/
├── resources/
│   └── views/
│       └── clients/
│       └── dashboard.blade.php
├── routes/
│   └── web.php
├── public/
└── .env
📌 A faire / Prochaines étapes
Gestion des rôles (admin / agent)

Journalisation des actions (logs)

Ajout de filtres avancés (date, statut)

Export PDF / Excel

Système de tickets clients

🙌 Contributeurs
Développé par @yamdev07 pour AnyxTech.

📄 Licence
Ce projet est open-source sous licence MIT.

yaml
Copier
Modifier

---

Souhaites-tu que je le place directement dans un fichier `README.md` prêt à télécharger ?








Demander à ChatGPT
Vous avez dit :
c'est avec html css


ChatGPT a dit :
Merci pour la précision ! Voici un README.md adapté pour ton projet Anyxtech_site basé sur HTML/CSS (site vitrine) :

markdown
Copier
Modifier
# 🌐 AnyxTech - Site Vitrine Officiel

Ce dépôt contient le **site vitrine d'AnyxTech**, une entreprise spécialisée dans les services numériques en Afrique de l’Ouest. Le site a été conçu pour **présenter l’entreprise, ses prestations et ses contacts** de manière professionnelle et responsive.

---

## 📸 Aperçu

![Aperçu du site](screenshot.png) <!-- Remplace ou ajoute une capture d’écran du site -->

---

## 💡 Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Présentation de l'entreprise AnyxTech
- ✅ Affichage des services proposés
- ✅ Section de contact
- ✅ Intégration des icônes via Font Awesome
- ✅ Utilisation de **Tailwind CSS** pour le style

---

## 🛠️ Technologies utilisées

- **HTML5**
- **Tailwind CSS**
- **Font Awesome**
- **Responsive Design**

---

## 🚀 Mise en route

### 🔧 1. Cloner le projet

```bash
git clone https://github.com/yamdev07/Anyxtech_site.git
cd Anyxtech_site
🌍 2. Ouvrir dans un navigateur
Il te suffit d’ouvrir le fichier index.html dans ton navigateur préféré :

bash
Copier
Modifier
start index.html    # Windows
xdg-open index.html # Linux
open index.html     # macOS
📁 Structure des fichiers
bash
Copier
Modifier
Anyxtech_site/
├── index.html
├── services.html
├── contact.html
├── css/
│   └── style.css
├── images/
│   └── (logos, illustrations…)
├── js/
│   └── script.js (si présent)
📌 À faire
Ajouter un formulaire de contact fonctionnel (PHP ou JS)

Optimiser les images pour le web

Ajouter un favicon

Ajouter l’animation des sections au scroll (avec JS)

Ajouter un footer dynamique (année actuelle, lien vers réseaux)

👤 Auteur
Développé par @yamdev07, @mystorah, @esther @abraham, @oladev 
🔗 Projet réalisé pour AnyxTech












Outils



ChatGPT p
