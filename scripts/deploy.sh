#!/usr/bin/env bash
# Deploy script for PFA – run on server from app directory
# Usage: ./scripts/deploy.sh   or   bash scripts/deploy.sh
#
# Optional: create PostgreSQL database and role before deploy (first-time or new server):
#   CREATE_DB=1 ./scripts/deploy.sh
# Requires: PostgreSQL installed, script run with sudo so "sudo -u postgres psql" works.

set -e

# Use directory containing this script's parent (repo root), or override with APP_DIR
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="${APP_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
cd "$APP_DIR"

# Load env so we have DATABASE_URL for optional DB creation and for db:push
if [ -f .env.local ]; then set -a; . ./.env.local; set +a; fi
if [ -f .env ]; then set -a; . ./.env; set +a; fi

# -----------------------------------------------------------------------------
# Optional: create PostgreSQL database and role (idempotent)
# Run with CREATE_DB=1 when the database/user do not exist yet.
# Parses DATABASE_URL (postgresql://USER:PASS@HOST:PORT/DATABASE).
# -----------------------------------------------------------------------------
if [ "${CREATE_DB:-0}" = "1" ] && [ -n "${DATABASE_URL:-}" ]; then
  echo "[deploy] Creating database and role (CREATE_DB=1)..."
  if [[ "$DATABASE_URL" =~ postgresql://([^:]+):([^@]+)@([^:/]+):?([0-9]*)/?([^?]*)(\?.*)? ]]; then
    DB_USER="${BASH_REMATCH[1]}"
    DB_PASS="${BASH_REMATCH[2]}"
    DB_HOST="${BASH_REMATCH[3]:-127.0.0.1}"
    DB_PORT="${BASH_REMATCH[4]:-5432}"
    DB_NAME="${BASH_REMATCH[5]:-fashion_academy}"
    if [ -z "$DB_NAME" ]; then DB_NAME="fashion_academy"; fi
    # Escape single quotes in password for use in SQL
    DB_PASS_ESC="${DB_PASS//\'/\'\'}"
    if command -v psql >/dev/null 2>&1 && sudo -u postgres psql -tAc "SELECT 1" >/dev/null 2>&1; then
      sudo -u postgres psql <<SQLEOF
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASS_ESC}';
  END IF;
END
\$\$;
ALTER ROLE ${DB_USER} WITH PASSWORD '${DB_PASS_ESC}';
SELECT 'CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};
\c ${DB_NAME}
GRANT ALL ON SCHEMA public TO ${DB_USER};
SQLEOF
      echo "[deploy] Database and role ready: ${DB_NAME} / ${DB_USER}"
    else
      echo "[deploy] Skipping DB create: psql or postgres user not available (install PostgreSQL and run with sudo if needed)."
    fi
  else
    echo "[deploy] Could not parse DATABASE_URL; skipping database creation."
  fi
fi

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
