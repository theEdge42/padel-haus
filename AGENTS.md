# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build
npm run lint     # ESLint (no test suite exists)
```

No test runner is configured.

## Architecture

This is a marketing/landing site for Padel Haus Bucharest — a 4-court indoor padel facility. It is a Next.js 16 App Router project with React 19, Tailwind CSS v4, and `next-intl` for bilingual (RO/EN) support.

### Routing & i18n

All pages live under `app/[locale]/`. The root `app/page.tsx` immediately redirects to `/ro` (the default locale). `i18n/routing.ts` declares the two supported locales (`ro`, `en`).

`app/[locale]/layout.tsx` is the real shell: it wraps every page in `NextIntlClientProvider`, `<Navbar>`, and `<Footer>`. When adding a new page, create `app/[locale]/<slug>/page.tsx`. Translation strings go in `messages/ro.json` and `messages/en.json` under a matching namespace key.

In components, use `useTranslations("<namespace>")` (client) or `getTranslations` (server). Never hardcode display text — always use the translation hook.

### Component organization

- `components/ui/` — shadcn/ui primitives (Button, Badge, Card, etc.). Add new primitives via `npx shadcn add <component>`.
- `components/layout/` — `Navbar` and `Footer` (rendered once in the locale layout).
- `components/home/` — sections assembled on the home page (`Hero`, `ExperienceSection`, etc.).
- `components/shop/` — `ProductCard` and `CartDrawer`, used only in the shop page.
- `components/courts/` — `CourtsCarousel`.

### State management

Cart state (`CartContext`) is the only global state. It lives in `context/CartContext.tsx` and is an in-memory React context (no persistence). `CartProvider` is mounted at the shop page level, not at the root layout, so cart state is scoped to the shop and resets on navigation.

### Styling conventions

Brand book palette (`media/Padel Haus Brand Book_compressed.pdf`), defined as tokens in `app/globals.css`. Use the tokens, not hex values:
- Backgrounds: `mov` `#341743`, `noapte` `#1C0C25`, `deep` `#15091C`
- Text: `crem` `#EFE6D9`, `lilac` `#CFBFD8`, `label` `#8B7A94` (decoration or large text only: too little contrast for small text). No pure white or black.
- `amber` `#D98C3F`: buttons and the tagline
- `led` (Violet LED) `#8B4FE8`: lines only
- `verde` `#2E4034`: utility pieces such as prices, replacing Mov

Two font families only: Nunito Sans, and `font-editorial` (Times New Roman MT Italic, fallback Tinos Italic). Shared pieces (`pill`, `Dots`, `Eyebrow`, `PageHero`) are in `components/shared/Brand.tsx`.

Tailwind CSS v4 is used. There is no `tailwind.config.js` — configuration is done via `postcss.config.mjs` and CSS variables. `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging.

Animations use Framer Motion (`motion.div` with `initial`/`animate`/`whileInView`). Prefer `viewport={{ once: true }}` for scroll-triggered animations so they only fire on entry.

### Images

Photos on the home and events pages are pre-sized WebP files in `public/brand/` rendered with `unoptimized`. On self-hosted Next 16.2.1 an aborted first request leaves `/_next/image` hanging for that size until restart, so don't switch them back without checking that this is fixed.

### Booking integration

Court bookings go through Playtomic. Desktop links to the web club page; mobile links to the Play Store app. Both URLs are defined as constants at the top of `components/layout/Navbar.tsx`.
