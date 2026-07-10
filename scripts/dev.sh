#!/bin/sh

EMAIL=$(grep '^ADMIN_EMAIL=' .env 2>/dev/null | cut -d= -f2)
PASSWORD=$(grep '^ADMIN_PASSWORD=' .env 2>/dev/null | cut -d= -f2)
EMAIL="${EMAIL:-admin@anyxtech.com}"
PASSWORD="${PASSWORD:-AnyxTech@2025}"

if [ ! -f payload.db ]; then
  echo ""
  echo "========================================"
  echo "  Nouveau compte admin (auto-créé)"
  echo "  Email       : $EMAIL"
  echo "  Mot de passe: $PASSWORD"
  echo "========================================"
  echo ""
fi

exec npx next dev
