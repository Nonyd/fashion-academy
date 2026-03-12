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
npm run db:push || true

echo "[deploy] Restarting application (PM2)..."
if pm2 describe pfa >/dev/null 2>&1; then
  pm2 restart pfa --update-env
else
  pm2 start npm --name pfa -- start
  pm2 save
  pm2 startup 2>/dev/null || true
fi

echo "[deploy] Done."
