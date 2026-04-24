# Ogya Ntom Prayer Army

Responsive Next.js website for Ogya Ntom Prayer Army, an online ministry and community of prayer warriors led by Chief Prayer Warrior Watchman Opanin Thomas.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Bun
- Phosphor Icons

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Use local `.env.local` files for anything environment-specific and keep production values in Vercel or Sanity-hosted deployment settings.

```bash
cp .env.example .env.local
cp studio-ogya-ntom-prayer-army/.env.example studio-ogya-ntom-prayer-army/.env.local
```

For Vercel-managed local env sync:

```bash
vercel env pull .env.local --yes
```

The Studio only exposes `SANITY_STUDIO_*` variables to the browser bundle. Keep deploy-only values such as hostnames, app ids, and tokens on non-`SANITY_STUDIO_*` names.

## Assets

Ministry brand assets live in `public/brand/`. App favicon assets are generated from the ministry logo in `src/app/icon.png` and `src/app/apple-icon.png`.
