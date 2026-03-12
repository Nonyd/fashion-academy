# Deploy PFA to pfa.sonshubmedia.com

Server: **159.198.47.232** · Path: **/home/sonshubco/pfa** · Domain: **pfa.sonshubmedia.com**

---

## 0. First-time: clone the repo (if you see “not a git repository”)

If `./scripts/deploy.sh` says **`fatal: not a git repository`**, the app folder was not cloned from Git. Do this once:

```bash
cd /home/sonshubco
# If you already have a 'pfa' folder with no .git, move it aside
mv pfa pfa.old
# Clone the repo (use your real GitHub URL)
git clone https://github.com/Nonyd/fashion-academy.git pfa
cd pfa
# Add env, make script executable, then deploy
cp .env.example .env.local
nano .env.local   # set DATABASE_URL, JWT_SECRET, etc.
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

After this, future deploys are just: `cd /home/sonshubco/pfa && ./scripts/deploy.sh`.

---

## 1. One-command deploy (on server)

From your server (SSH as the user that owns the app directory):

```bash
cd /home/sonshubco/pfa
./scripts/deploy.sh
```

Or from your local machine:

```bash
ssh sonshubco@159.198.47.232 'cd /home/sonshubco/pfa && ./scripts/deploy.sh'
```

(Replace `sonshubco` with the actual SSH user if different.)

### Optional: create database and role (first-time or new server)

If PostgreSQL is installed on the server but the **database and user** do not exist yet, run deploy with **CREATE_DB=1**. The script will parse `DATABASE_URL` from `.env.local` (or `.env`) and create the PostgreSQL role and database idempotently (safe to run again).

**Requirements:** PostgreSQL installed, `psql` in PATH, and ability to run `sudo -u postgres psql` (so run with `sudo` if the app user cannot connect as `postgres`).

```bash
cd /home/sonshubco/pfa
# Ensure .env.local exists with DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
CREATE_DB=1 sudo ./scripts/deploy.sh
```

Or as root:

```bash
cd /home/sonshubco/pfa
CREATE_DB=1 ./scripts/deploy.sh
```

The script will:

- Create the PostgreSQL **role** (user) if it does not exist, and set its password.
- Create the **database** if it does not exist, set owner to that user, and grant privileges.

After that, normal deploys (`./scripts/deploy.sh` without `CREATE_DB`) only run `prisma db push`; they do not create the DB again.

---

## 2. Auto-deploy on Git push

Every push to the **main** branch triggers a GitHub Actions workflow that SSHs into your server and runs `./scripts/deploy.sh`.

### GitHub repository secrets

In GitHub: **Repo → Settings → Secrets and variables → Actions**, add:

| Secret             | Value (example)                    | Required |
|--------------------|------------------------------------|----------|
| `DEPLOY_HOST`      | `159.198.47.232`                   | Yes      |
| `DEPLOY_USER`      | `sonshubco` (or your SSH user)     | Yes      |
| `DEPLOY_SSH_KEY`   | Full contents of your **private** SSH key | Yes |
| `DEPLOY_PATH`      | `/home/sonshubco/pfa`  | Yes      |
| `DEPLOY_PORT`      | `22` (only if SSH is not on 22)    | No       |

To create a key for GitHub Actions (recommended):

1. On your **local machine**:  
   `ssh-keygen -t ed25519 -C "github-deploy-pfa" -f ~/.ssh/deploy_pfa`  
   (no passphrase so Actions can use it)
2. Copy **public** key to server:  
   `ssh-copy-id -i ~/.ssh/deploy_pfa.pub sonshubco@159.198.47.232`
3. In GitHub Secrets, set **DEPLOY_SSH_KEY** to the contents of **~/.ssh/deploy_pfa** (private key).

---

## 3. Server setup (one-time)

### 3.1 Node.js (LTS, e.g. 20)

AlmaLinux 8:

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
node -v   # v20.x
```

### 3.2 Git

```bash
sudo dnf install -y git
```

### 3.3 Clone repo (if not already)

```bash
sudo mkdir -p /home/sonshubco/public_html
sudo chown sonshubco:sonshubco /home/sonshubco/public_html
# As sonshubco (or your app user):
cd /home/sonshubco/public_html
git clone https://github.com/Nonyd/fashion-academy.git pfa
cd pfa
```

(Use your actual repo URL; for private repo, set up SSH key or deploy token.)

### 3.4 Environment variables

```bash
cd /home/sonshubco/pfa
cp .env.example .env.local
# Edit and set at least:
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
# JWT_SECRET="a-long-random-string"
nano .env.local
```

The deploy script loads `.env.local` and `.env` before running `db:push`, so Prisma will see `DATABASE_URL`. You can use either file; keep `.env.local` out of Git.

Production database: use a PostgreSQL instance (same server or remote). Run migrations after first deploy:

```bash
npm run db:push
npm run db:seed   # optional
```

### 3.5 PM2 (keep app running)

The deploy script restarts the app with PM2. If PM2 is not installed, the script will print instructions and continue (build still succeeds). Install PM2 once:

```bash
sudo npm install -g pm2
cd /home/sonshubco/pfa
npm ci && npm run build
pm2 start npm --name pfa -- start
pm2 save
pm2 startup   # run the command it prints (for restart on reboot)
```

### 3.6 Reverse proxy (Nginx / Apache)

Next.js runs on port **3000**. Point **pfa.sonshubmedia.com** to it.

**Nginx example** (site config):

```nginx
server {
    listen 80;
    server_name pfa.sonshubmedia.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then enable HTTPS (e.g. certbot) and reload Nginx.

**Webuzo / Apache:** Create an app or vhost that proxies to `http://127.0.0.1:3000` for **pfa.sonshubmedia.com**.

### 3.7 Make deploy script executable

```bash
chmod +x /home/sonshubco/pfa/scripts/deploy.sh
```

---

## 4. Summary

| Task                    | Command / action |
|-------------------------|-------------------|
| Deploy once (on server) | `cd /home/sonshubco/pfa && ./scripts/deploy.sh` |
| Deploy from local       | `ssh user@159.198.47.232 'cd /home/sonshubco/pfa && ./scripts/deploy.sh'` |
| Auto-deploy on push     | Add GitHub Actions secrets; push to **main** runs deploy |

After first setup, pushing to **main** will run the deploy script on the server automatically.
