# Swiflora Logistics — Brand & Build Reference

This file is the single source of truth for rebranding pages ported from the
Swift Express Logistics reference codebase into this new Swiflora Logistics project.
The CSS class architecture is intentionally unchanged (same class names in
css/main.css, css/components.css, css/dashboard.css, css/responsive.css,
css/print.css) — only copy, brand tokens, and identifiers change.

## Identity
- Company name: **Swiflora Logistics**
- Tagline: **"Rooted in Reliability. Built for Speed."**
- Domain (placeholder until a real domain is bought): `https://www.swifloralogistics.com/`
- Support phone: **+1 364 547 2182** — always link as `tel:+13645472182`
- Support email: **support@swifloralogistics.com**
- Physical address: **4080 Jenkins Road, Chattanooga, TN 37421 USA** — use this
  wherever an office address appears (footer, contact page, `company_info` CMS row).
- Business hours placeholder: "Mon - Sat: 8:00 AM - 9:00 PM EST" (editable)
- Copyright line: `&copy; 2026 Swiflora Logistics Inc. All rights reserved.`

## Visual system (already implemented in css/) — "Manifest" corporate/enterprise redesign, Aug 2026
- Primary: `#163A58` (harbor navy) — `var(--primary)`. Dark mode brightens this to
  `#6FA0C4` for contrast (see `[data-theme="dark"]` in css/main.css).
- Accent: `#C1791E` (cargo amber) — `var(--accent)`.
- Ink (permanently-dark surfaces — hero, footer, dark bands): `#0D1B26` —
  `var(--ink)` / `var(--ink-2)` / `var(--ink-border)`. These do NOT flip with the
  light/dark theme toggle — the hero and footer stay dark ink regardless of site
  theme, by design. Text/icons on those bands use `var(--on-ink)` /
  `var(--on-ink-muted)`, which are likewise constant across themes.
- Navbar (`.navbar` and friends) is the one exception: it uses its own
  theme-adaptive tokens (`--nav-bg`, `--nav-text`, `--nav-text-muted`,
  `--nav-border`, `--nav-btn-bg`, `--nav-btn-border`, `--nav-shadow`, defined in
  `css/main.css`) so it renders white with dark text in light mode and ink-dark
  with light text in dark mode — added Aug 2026 so the site isn't dark-only.
- Headings font: 'Roboto Slab' — `var(--font-heading)` (industrial slab serif,
  replaces Poppins).
- Body font: 'IBM Plex Sans' — `var(--font-body)` (replaces Inter).
- Mono/data font: 'IBM Plex Mono' — `var(--font-mono)` (replaces JetBrains Mono),
  used for tracking numbers, stats, timestamps — anything read like a manifest
  entry.
- Logo mark: `./favicon.svg` — a flat ink hexagon "cargo seal" badge (`#0D1B26`)
  with an amber hexagon outline (`#C1791E`) and a bold off-white zigzag "S"
  chevron (`#E7EDF1`) inside, evoking a stamped customs/waybill seal rather than
  the old leaf mark. Rendered as `<img src="favicon.svg">` inside `.brand-icon`.
  Wordmark markup pattern unchanged: `SWIFLORA<span>LOGISTICS</span>` (see
  js/components/header.js / footer.js) — the `<span>` renders in `--accent`
  amber instead of `--primary`, since amber reads cleanly against both the
  theme-adaptive navbar and the permanently dark-ink footer. Keep the mark
  flat — no gradient fills, drop shadows, or glow.
- Buttons are flat fills with no colored glow shadow: `.btn-primary` uses `--ink`,
  `.btn-accent` uses `--accent` amber, `.btn-outline` is theme-adaptive (for
  content on light backgrounds), `.btn-line` is the equivalent outline treatment
  for content sitting on permanently-dark ink bands (hero, footer). Don't
  reintroduce colored box-shadow "glow" under buttons.
- Corners are sharp/industrial, not soft-consumer: `--radius-sm: 3px`,
  `--radius-md: 4px`, `--radius-lg: 5px` (`--radius-full` still exists for true
  circles/pills — avatars, status badges).
- Do NOT reintroduce the old emerald (#0F7B4E) / gold (#E8A33D) or the earlier
  Swift Express blue (#0057B8) / orange (#FF8C00) anywhere.
- `admin/css/` is a stale, unreferenced duplicate of the old pre-redesign
  stylesheets (admin/index.html actually links `../css/...`). Safe to delete;
  left in place only because it wasn't explicitly requested.

## Data model conventions
- Tracking number prefix: **SWF** (format `SWF-YYYYMMDD-XXXXXX`, see
  js/utils/trackingGenerator.js). Sample seeded tracking numbers:
  `SWF-20260811-884920` and `SWF-20260811-339102`.
- localStorage key prefix: **swf_** (e.g. `swf_current_user`, `swf_theme`,
  `swf_cms`) — see js/services/supabaseClient.js `storageKey()`.
- Demo admin login (client-side fallback only, replace once real Supabase Auth
  roles exist): `admin@swifloralogistics.com` / `swifloraadmin2026`.
- Company name string used in shipment records: `"Swiflora Logistics"`.

## Already-built shared foundation (do not duplicate/recreate)
- css/main.css, css/components.css, css/dashboard.css, css/responsive.css, css/print.css
- js/config/supabase.js, js/services/* (supabaseClient, authService, shipmentService,
  quoteService, cmsService, driverService, notificationService)
- js/utils/* (formatters, toast, trackingGenerator, pdfLabelGenerator)
- js/components/header.js, footer.js, map.js
- favicon.svg, manifest.webmanifest, index.html

Every page includes `<div id="header-container">` / `<div id="footer-container">`
and calls `renderHeader()` / `renderFooter()` from the shared components — follow
that exact pattern used in index.html, don't hand-roll a new nav/footer per page.
