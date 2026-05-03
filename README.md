# Card Vault

Digital collectibles showcase platform. The differentiator is the experience layer: items render as living, dimensional, theme-driven displays.

This repo currently contains the **V0 magic-moment prototype** — a single Next.js web app where anyone can upload front/back images of one card, pick one of three themes, see it come alive on an immersive detail page, and share an unguessable URL.

## Stack (V0)

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config)
- react-three-fiber + three (added in week 1)
- Supabase (Postgres + Storage, no auth in V0) — added in week 2
- Hosted on Vercel

## Local development

```bash
nvm use            # Node 20 (Vercel parity)
pnpm install
pnpm dev           # http://localhost:3000
```

Required env vars are documented in `.env.example`. None are needed for the week-1 `/demo` work.

## Routes

- `/` — landing
- `/demo` — week-1 visual spike target (hardcoded card)
- `/new` — create flow (week 2)
- `/s/[token]` — public share view (week 2)

## Scope

V0 is intentionally narrow. Out of scope: auth, accounts, multiple cards, collections, multi-category, payments, native app, search. See `/Users/tsconnely/.claude/plans/v0-implementation-plan.md` for the full plan.
