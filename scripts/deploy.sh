#!/usr/bin/env bash
# Deploy script for PFA – run on server from app directory
# Usage: ./scripts/deploy.sh   or   bash scripts/deploy.sh

set -e

# Use directory containing this script's parent (repo root), or override with APP_DIR
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="${APP_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
cd "$APP_DIR"

echo "[deploy] Pulling latest from Git..."
git pull origin main

echo "[deploy] Installing dependencies..."
npm ci

echo "[deploy] Generating Prisma client and building..."
npm run build

echo "[deploy] Applying database schema (if needed)..."
# Prisma CLI only reads .env (not .env.local). Copy .env.local → .env so db:push sees DATABASE_URL.
if [ -f .env.local ]; then cp .env.local .env; fi
if [ -f .env ]; then set -a; . ./.env; set +a; fi
npm run db:push || true

echo "[deploy] Restarting application (PM2)..."
if command -v pm2 >/dev/null 2>&1; then
  if pm2 describe pfa >/dev/null 2>&1; then
    pm2 restart pfa --update-env
  else
    pm2 start npm --name pfa -- start
    pm2 save
    pm2 startup 2>/dev/null || true
  fi
else
  echo "[deploy] PM2 not found. Install with: npm install -g pm2"
  echo "[deploy] Then start the app: pm2 start npm --name pfa -- start && pm2 save"
fi

echo "[deploy] Done."
