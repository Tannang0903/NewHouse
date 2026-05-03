# NewHouse

NewHouse is a full-stack web application for a construction and design business, built with **Next.js 14**, **TypeScript**, and **Prisma**.

It includes a public landing experience (home, services, projects, blog) and an admin area for managing site content.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, MUI
- **Backend:** Next.js API routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth
- **Editor/Content:** Tiptap
- **Media:** Cloudinary

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`.

3. Run database setup:

```bash
npm run db:push
npm run db:seed
```

4. Start development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Useful Scripts

- `npm run dev` — Start local development server
- `npm run build` — Build for production
- `npm run start` — Run production build
- `npm run lint` — Run ESLint
- `npm run db:migrate` — Create and apply Prisma migration
- `npm run db:push` — Push Prisma schema to database
- `npm run db:seed` — Seed database
- `npm run db:studio` — Open Prisma Studio
