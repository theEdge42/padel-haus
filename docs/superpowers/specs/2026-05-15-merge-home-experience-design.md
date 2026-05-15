# Merge Home / Experience Page

**Date:** 2026-05-15

## Goal

Merge the home page (dashboard) and the experience page into a single unified scroll page. The Experience nav link points to the home page (`/${locale}`). The `/experience` route is kept but no longer linked from the nav.

## Page Structure (top to bottom)

### 1. Hero
No visual changes. Single tweak: the "Explore" / "Explorează Clubul" button changes its `href` from `/${locale}/experience` to `#gallery` so it anchor-scrolls to the photo gallery section.

### 2. Community Section
`CommunitySection` component dropped in unchanged. No modifications.

### 3. Concept + Design (two cards)
The two cards currently on the experience page:
- "Concept Indoor" / "Indoor Concept"
- "Design și Atmosferă" / "Design & Atmosphere"

These replace the current `ExperienceSection` (3-card block: 4 Premium Courts, Indoor Concept, Stunning Design). Translation keys used: `experience.concept` and `experience.design`.

### 4. Mexicano Events Preview
Two compact tournament cards replacing the current `EventsSection` (which uses stale mock data).

**Card 1 — Saturday Mexicano (Intermediate)**
- Badge: Saturday · Intermediate / Sâmbătă · Intermediar
- Time: 11:00–13:00
- Prize: O cutie de mingi
- CTA: Register on Playtomic

**Card 2 — Sunday Mexicano (Beginner)**
- Badge: Sunday · Beginner / Duminică · Începători
- Time: 10:00–12:00
- Prize: Wilson Premier Padel Speed balls
- CTA: Register on Playtomic

Header row includes "See all events →" link to `/${locale}/events`.

Translation keys: `events.mexicano.*` (already exist).

### 5. Photo Gallery + Video (`id="gallery"`)
Masonry grid of 6 images (`/1.png`–`/7.png` excluding `/5.png`) followed by the video (`/PadelVideo.mp4`). Anchor `id="gallery"` on the section wrapper so the Hero Explore button scrolls here. Replaces `SocialGallery`.

Translation keys: `experience.gallery.*` (already exist).

No `CTASection` — the video is a natural page ending.

## Files Changed

| File | Change |
|------|--------|
| `app/[locale]/page.tsx` | Rewrite: new section order, remove old component imports |
| `components/layout/Navbar.tsx` | Experience link → `/${locale}` |
| `components/home/Hero.tsx` | Explore button href → `#gallery` |

## Files Untouched
- `app/[locale]/experience/page.tsx` — route stays, just unreachable from nav
- `components/home/ExperienceSection.tsx` — no longer imported, not deleted
- `components/home/SocialGallery.tsx` — no longer imported, not deleted
- `components/home/EventsSection.tsx` — no longer imported, not deleted
- `components/home/CTASection.tsx` — no longer imported, not deleted
