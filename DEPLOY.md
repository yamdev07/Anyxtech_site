# 🚀 Déploiement sur VPS (avec ISPConfig)

Guide pas-à-pas pour mettre AnyxTech en ligne sur ton serveur. On garde **SQLite + médias locaux** (le VPS a un disque persistant).

> Prérequis : accès **SSH root** au VPS (IP + mot de passe root fournis par ton hébergeur).

---

## 1. Se connecter au serveur

Avec **WinSCP** : Nouvelle session → **Protocole : SFTP** → Hôte = IP du serveur, Utilisateur = `root`, mot de passe. Puis bouton **« Ouvrir la session PuTTY »** pour avoir le terminal.
(ou directement avec **PuTTY** : IP, port 22, root.)

## 2. Installer Node.js 20 (si absent)

```bash
node -v   # si < 20 ou "command not found" :
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node -v   # doit afficher v20.x
```

## 3. Récupérer le code dans le dossier du site

Le dossier web du site sous ISPConfig ressemble à `/var/www/clients/client1/web1/web`.

```bash
cd /var/www/clients/client1/web1/web     # adapte le chemin
rm -f index.html                          # retire la page par défaut d'ISPConfig
git clone https://github.com/yamdev07/Anyxtech_site.git .
git checkout main
```

## 4. Configurer, installer, builder

```bash
# Secret + base SQLite
printf "PAYLOAD_SECRET=%s\nDATABASE_URI=file:./payload.db\n" "$(openssl rand -hex 32)" > .env

npm install
npm run build
```

## 5. Lancer l'application avec PM2

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd        # exécute la commande qu'il affiche
```

L'app tourne maintenant sur `http://127.0.0.1:3000`. Vérifie : `curl -I http://127.0.0.1:3000` → `200`.

## 6. Rediriger ton domaine vers l'app (ISPConfig)

Dans **ISPConfig → Sites → ton site → onglet Options → « Directives nginx »**, colle :

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

> Si ton site est en **Apache** (pas nginx), utilise plutôt l'onglet « Directives Apache » :
> ```apache
> ProxyPreserveHost On
> ProxyPass / http://127.0.0.1:3000/
> ProxyPassReverse / http://127.0.0.1:3000/
> ```
> (modules requis : `proxy` et `proxy_http` → `a2enmod proxy proxy_http && systemctl restart apache2`)

Enregistre. Attends ~1 min qu'ISPConfig régénère la config.

## 7. Activer le HTTPS

Dans les réglages du site ISPConfig, coche **SSL** + **Let's Encrypt**, enregistre. Ton site est en ligne en `https://ton-domaine.com` 🔒

## 8. Créer ton compte admin

Va sur `https://ton-domaine.com/admin` → crée le premier administrateur. Puis gère tout depuis `https://ton-domaine.com/dashboard`.

---

## 🔄 Mettre à jour le site plus tard

```bash
cd /var/www/clients/client1/web1/web
git pull origin main
npm install
npm run build
pm2 restart anyxtech
```

## 🛟 Dépannage

- **Voir les logs de l'app** : `pm2 logs anyxtech`
- **Redémarrer** : `pm2 restart anyxtech`
- **Port déjà utilisé** : change `-p 3000` dans `ecosystem.config.js` (ex. 3001) + le `proxy_pass`.
- **502 Bad Gateway** : l'app n'est pas démarrée → `pm2 status`, puis `pm2 start ecosystem.config.js`.
