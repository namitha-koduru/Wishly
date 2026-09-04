# Wishly — Anniversary Template

A lightweight, multi-screen anniversary experience built around your
uploaded reference photos: the hand-drawn muggulu, the pink lotus
garland, and the traditional couple illustration. CSS-only
transitions throughout — no animation library, no 3D, no particle
systems — so it stays smooth on an average phone.

## Install

Drop this folder into your project (e.g. `src/templates/anniversary/`).
Nothing outside it needs to change.

1. **Fonts** — add to your document `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Lora:ital,wght@0,400;0,500;1,400&family=Kalam:wght@400;700&display=swap" rel="stylesheet">
   ```
2. **Stylesheet** — import `wishly-anniversary.css` once, anywhere
   your app already loads global CSS:
   ```js
   import "./templates/anniversary/wishly-anniversary.css";
   ```
   (It only contains the one continuous animation used in the
   template — the garland sway — plus its `prefers-reduced-motion`
   override. Everything else is plain Tailwind utility classes, so
   no `tailwind.config.js` changes are required.)
3. **Render it**:
   ```jsx
   import AnniversaryTemplate from "./templates/anniversary/AnniversaryTemplate";

   <AnniversaryTemplate config={wishData} />
   ```

## Customization

Everything editable lives in one place — see `config.js` for the
full shape and defaults:

```js
{
  person1, person2, anniversaryYears, senderName,
  photos: [{ src, caption }, ...],   // 1–6 entries, gracefully adapts
  letterContent: [ "paragraph one", "paragraph two", ... ],
  finalWish,
}
```

Pass a partial object to `<AnniversaryTemplate config={...} />` —
anything you omit falls back to the `{{placeholder}}` default, so
this connects directly to Wishly's existing generation system by
mapping its output onto this shape.

## Structure

```
AnniversaryTemplate.jsx   — orchestrator: page order, transitions, progress dots
config.js                 — default customization values / placeholders
wishly-anniversary.css    — the one keyframe animation + fonts note
assets/                   — processed versions of your uploaded references
components/
  PageTransition.jsx      — fade/slide wrapper (CSS only)
  MugguluDecoration.jsx   — your muggulu photo, corner-mounted, multiply-blended
  GarlandDecoration.jsx   — your garland photo, gentle single sway
  LotusDecoration.jsx     — lotus cropped from the garland photo, static
  BapuIllustration.jsx    — your couple illustration, framed
  Envelope.jsx            — the open-letter interaction
  LoveLetter.jsx          — the letter, styled as physical stationery
  PhotoAlbum.jsx          — scrapbook grid + lightbox, adapts to photo count
pages/
  AnniversaryIntro.jsx    — 1. Intro
  JourneyPage.jsx         — 2. The Journey
  StoryPage.jsx           — 3. Their Story (Then / Together / Today)
  BapuArtPage.jsx         — 4. Bapu / Traditional Art
  EnvelopePage.jsx        — 5. Love Letter (envelope)
  LetterPage.jsx          — 6. Letter
  GalleryPage.jsx         — 7. Photo Memories
  FinalWishPage.jsx       — 8. Final Wish
```

## About the visual assets

`assets/` holds compressed, cropped versions of your four uploaded
references (muggulu wall drawing, garland photo, temple photo, Bapu
couple illustration) — resized and compressed for web use, and in
the garland's case, background-keyed to transparent so it reads as
a hanging strand rather than a photo on white. `temple.jpg` is
included but unused by any page in this cut — it's there if you'd
like a ninth "blessings" page later.

No actual couple photographs were included in this upload, so
`config.photos` still uses `{{photo1}}`–`{{photo6}}` placeholders —
`PhotoAlbum` will render whatever real photo URLs Wishly supplies at
generation time, and quietly collapses its grid if fewer than 6 are
given.

## Performance notes

- The **only** continuously-running animation anywhere in the
  template is the garland sway (a single 6s CSS keyframe, disabled
  under `prefers-reduced-motion`).
- Page changes are a single opacity/transform transition (500ms),
  not per-element stagger.
- All images use `loading="lazy"`.
- No SVG is generated at runtime — muggulu/garland/lotus/Bapu art
  are static, pre-compressed image files.
