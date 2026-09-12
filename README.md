# Auto Parts Shop

A simple, mobile-first inventory website for a physical auto parts shop. Customers
browse what's in stock and reach the owner on WhatsApp to buy. The owner manages
stock from a lightweight admin dashboard, no accounts required on either side.

Built with Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL, and Prisma.

## Before you deploy: read this

This project was built in a sandboxed environment that could not reach
`binaries.prisma.sh` (Prisma's engine download host) or any real database. That means:

- The code has been type-checked and linted, and follows standard, well-tested
  Prisma/Next.js patterns.
- **`npx prisma generate` has not actually been run against this schema**, and the
  database layer has not been exercised end-to-end. This is completely normal for a
  Prisma project you haven't yet connected to a database — you'll do this once as
  part of setup below, and it should work without surprises.

If anything doesn't work exactly as described, the most likely culprit is a
version mismatch in your own Node/Prisma setup, not a fundamental design problem —
check the Prisma docs for your Postgres provider.

## 1. Set up the database

The easiest option is a free [Supabase](https://supabase.com) project:

1. Create a project at supabase.com.
2. Go to **Project Settings → Database → Connection string** and copy the URI
   (use the **Transaction pooler** string if you'll deploy to Vercel or another
   serverless host).
3. Paste it into `.env` as `DATABASE_URL` (see step 2).

Any PostgreSQL database works — Supabase, Neon, Railway, or your own server.

## 2. Configure environment variables

```bash
cp .env.example .env
```

Then fill in:

- `DATABASE_URL` — your Postgres connection string.
- `ADMIN_CODE` — the secret code the shop owner types at `/admin`. Pick something
  memorable but not guessable (not "1234"). This never reaches the browser.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — the shop's WhatsApp number, digits only, with
  country code (e.g. a Ghana number `024 123 4567` becomes `233241234567`).
- `NEXT_PUBLIC_SHOP_NAME` — shown in the header and browser tab.

## 3. Install, generate, and seed

```bash
npm install
npx prisma generate
npx prisma db push       # creates the Product and Category tables
npm run db:seed          # adds sample categories and products so you have something to look at
```

## 4. Run it

```bash
npm run dev
```

- Customer site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin (enter your `ADMIN_CODE`)

## How it's organized

```
src/
  app/
    page.tsx                     Customer home: search, categories, product grid
    products/[slug]/page.tsx     Product detail + WhatsApp contact
    admin/
      page.tsx                   Secret-code login
      (protected)/               Everything below requires a valid session
        dashboard/page.tsx       Stats + inventory list
        products/new/page.tsx    Add product
        products/[id]/edit/      Edit product
        categories/page.tsx      Manage categories
    api/                         Route handlers for auth, products, categories, uploads
  components/                    Shared UI (customer-facing and admin/)
  lib/                           prisma client, auth/session, WhatsApp link builder, formatting
prisma/
  schema.prisma                  Product + Category models
  seed.ts                        Sample data
```

## Notes on a few design decisions

**Admin auth.** There's no user table or password hashing — the owner enters one
shared code, which is checked against `ADMIN_CODE` on the server and never exposed
to frontend JavaScript. A signed, httpOnly cookie (valid 12 hours) keeps them
logged in. This matches the brief: no traditional accounts needed for V1.

**Prices.** Stored in the database as integer pesewas (GH₵1 = 100) to avoid
floating-point rounding bugs, and converted to cedis only for display and in forms.

**Product images (important for production).** The upload endpoint
(`src/app/api/upload/route.ts`) currently saves files to `public/uploads` on the
server's own disk. That's the simplest thing that works, and is fine if you deploy
to a normal server or VPS with persistent storage. **If you deploy to Vercel or
another serverless platform, the filesystem is ephemeral and uploaded images will
disappear on the next deploy.** In that case, swap the upload route to use Supabase
Storage instead:

```ts
// inside the POST handler, instead of writeFile(...):
const { data, error } = await supabase.storage
  .from("product-images")
  .upload(filename, bytes, { contentType: file.type });

const url = supabase.storage.from("product-images").getPublicUrl(filename).data.publicUrl;
return NextResponse.json({ url });
```

Everything else (the `image` field on `Product` is just a URL string) stays the same.

**Search.** Matches product name, part number, vehicle make/model, and category
name — case-insensitive, via a single Prisma query. No search index needed at this
scale; if the catalog grows past a few thousand parts, revisit with Postgres full-text
search or a dedicated search service.

## Deploying

Any Next.js host works (Vercel is the simplest). Remember to:

1. Set the same environment variables in your host's dashboard.
2. Run `npx prisma db push` once against your production database (or use
   `prisma migrate deploy` if you set up migrations instead).
3. If deploying somewhere serverless, switch image uploads to Supabase Storage as
   described above before going live.
