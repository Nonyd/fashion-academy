# Troubleshooting

## "Can't reach database server at localhost:5432"

This means the app cannot connect to PostgreSQL. Fix it as follows.

### 1. Make sure Postgres is running

Your container was in **Created** (not **Running**) state. Start it:

```powershell
# Start the stack
npm run db:up

# Or start the container directly
podman start fashion-academy-db
```

Check status:

```powershell
podman ps -a --filter "name=fashion-academy-db"
```

You should see **Status: Up** (or "Running"). If it says **Created** or **Exited**, start it with the command above and wait 10–15 seconds for Postgres to be ready.

### 2. If localhost still fails (Windows + Podman)

On Windows, Podman runs containers in a VM. Sometimes `localhost` does not reach the forwarded port. Try using `127.0.0.1` in `.env.local`:

```env
DATABASE_URL="postgresql://fashion:fashion_dev_secret@127.0.0.1:5432/fashion_academy"
```

Restart the Next.js dev server after changing `.env.local`.

### 3. Apply schema and seed data

After the database is reachable:

```powershell
npm run db:push
npm run db:seed
```

Then try logging in again (e.g. `admin@pfa.local` / `password123` if you use the seed user).
