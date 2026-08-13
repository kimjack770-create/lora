# Swiflora Logistics

A global courier, freight & fulfillment website — public marketing site, live
shipment tracking, a customer portal, and an admin console — built as a
standalone static site (no build step, no framework) backed by Supabase
(PostgreSQL + Auth + RLS).

This project was scaffolded from a working reference architecture and fully
rebranded/restyled for **Swiflora Logistics**. See [BRAND.md](./BRAND.md) for
the full brand token reference (colors, tagline, contact info, tracking number
format, etc).

## Tech stack

- Plain HTML/CSS/JavaScript (ES modules) — no bundler, no framework, no `npm install`
- [Supabase](https://supabase.com) for the database, auth, and row-level security
- Font Awesome (icons), Leaflet (live map), Chart.js, QRCode.js, JsBarcode — all loaded via CDN `<script>`/`<link>` tags, no local install needed

## Project structure

```
swiflora-logistics/
├── index.html, about.html, services.html, ...   Public marketing pages
├── admin/index.html                              Admin console (shipments, drivers, quotes, CMS)
├── customer/index.html                           Customer portal (login, own shipments)
├── css/                                           Design system (main, components, dashboard, responsive, print)
├── js/
│   ├── config/supabase.js                         Your Supabase project URL + anon key go here
│   ├── services/                                  Data layer (auth, shipments, quotes, CMS, drivers, notifications)
│   ├── components/                                 Shared header/footer/map
│   └── utils/                                      Formatters, toast, tracking number generator, label/PDF printing
├── supabase_schema.sql                             Full DB schema, RLS policies, triggers, seed data
└── BRAND.md                                        Brand tokens reference for future edits
```

## Running it locally

Because the pages use ES module `<script type="module">` imports, you can't
just double-click `index.html` — it needs to be served over `http://`. Any
static file server works, for example:

```bash
# Python 3
python -m http.server 8080

# or Node
npx serve .
```

Then open `http://localhost:8080`.

**Out of the box, no setup required:** the site works immediately using a
local-storage mock data layer pre-seeded with sample shipments, testimonials,
and FAQs — try tracking numbers `SWF-20260811-884920` or
`SWF-20260811-339102` on the homepage. This is how you can preview and demo
the site before connecting a real backend.

## Connecting your Supabase backend

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL Editor in your new project and run the entire contents of
   [`supabase_schema.sql`](./supabase_schema.sql). This creates all tables,
   RLS policies, triggers (including auto-generated `SWF-YYYYMMDD-XXXXXX`
   tracking numbers), and seeds sample shipments/testimonials/FAQs.
3. In your Supabase project settings, copy the **Project URL** and the
   **anon/publishable key**.
4. Paste them into [`js/config/supabase.js`](./js/config/supabase.js):
   ```js
   export const SUPABASE_CONFIG = {
     SUPABASE_URL: "https://YOUR-PROJECT-REF.supabase.co",
     SUPABASE_ANON_KEY: "your-anon-key",
     USE_MOCK_FALLBACK: true
   };
   ```
5. Reload the site — it will automatically detect the real Supabase
   connection and switch from local-storage mock data to your live database
   (check the browser console for "🌿 Connected to Swiflora Supabase Cloud
   Engine").

## Demo logins

- **Admin console** (`/admin/index.html`): `admin@swifloralogistics.com` /
  `swifloraadmin2026` — this is a client-side fallback credential defined in
  `js/services/authService.js`, useful for demos before you've created real
  Supabase Auth users with roles. Replace/remove it once you have real staff
  accounts with the `Super Admin`/`Admin`/`Dispatcher`/`Manager` role set in
  the `profiles` table.
- **Customer portal** (`/customer/index.html`): any email/password works in
  mock mode (any non-admin email is treated as a `Customer` role); once
  Supabase Auth is connected, customers sign up/sign in for real.

## Things to fill in before launch

- **Office address**: currently a placeholder `[Add your office address
  here]` in the footer, contact page, and `cms_content`/`company_info` row in
  Supabase — search the project for that string and replace it.
- **Social media links**: footer social icons currently link to `#`.
- **Logo**: `favicon.svg` is a custom-designed mark — a flat emerald tile
  with a hand-drawn leaf and a flat gold vein line (no gradients). Swap it for your own artwork any time —
  just keep the filename or update the references in `js/components/header.js`
  and `js/components/footer.js`.
- **Domain**: canonical/OG meta tags currently point to
  `https://www.swifloralogistics.com/` as a placeholder — update once you've
  registered a real domain.

## Deployment

Since this is a static site with no build step, it can be deployed anywhere
that serves static files — Railway, Netlify, Vercel, GitHub Pages, Cloudflare
Pages, etc. Just make sure `js/config/supabase.js` has your real Supabase
credentials before deploying to production, and that `USE_MOCK_FALLBACK`
behavior is acceptable as a fallback if the Supabase connection ever fails.
