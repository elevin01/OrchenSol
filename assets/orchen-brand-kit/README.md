# Orchen brand kit — Facets Breath · Woven

The Orchen mark is six facets on a hexagon around a solid hexagon core. The wordmark uses the mark
as its capital O, followed by "rchen" in custom monoline letters (no font needed).

Full spec, usage rules and a ready-to-paste Lovable prompt: the "Orchen Brand Kit — Mark, Wordmark
& Motion" doc. `OrchenMark.tsx` is the source of truth; every file here was generated from it.

## Files
- `OrchenMark.tsx` — React component (no dependencies). Put it at `src/components/brand/`.
  - `<OrchenMark size={80} intro={false} />` loader · `<OrchenMark animated={false} />` still mark
  - `<OrchenLockup height={24} />` header wordmark · `<OrchenLockup height={120} animated />` hero
- `svg/` and `png/` — still marks (forest, pine, mint, cream; regular + compact), wordmark lockups
  (light, dark, on cream, on night, on forest, small), stacked lockup with tagline, app icon, OG image.
- `favicon/` — favicon.svg, favicon-16/32/48.png, apple-touch-icon.png, icon-192.png, icon-512.png.
- `motion/` — orchen-mark-loop (14 s) and orchen-lockup-hero (10 s) as MP4 and GIF. Previews only;
  the product uses the component, which never repeats.
- `stills/` — frames of the animation for reference.

## Tokens
- forest #2C5F3F · pine #1A3527 · cream #F5F2EE · night #0F1A14 · mint #8FBF9F
- Tagline: Lora Italic 400 · UI: Inter
- Motion: 5 s breath · outer ring 22 s clockwise · inner ring 16 s counter-clockwise · core 36 s ·
  opens on the still logo (0.9 s hold + 2.6 s ease) · still logo only under reduced motion

## Rules
Use the files or the component, never a redraw. Never set "Orchen" in a font beside the mark.
One solid color per mark (forest on light, mint on dark, cream on forest). One large animated mark
per screen; headers and sidebars use the still lockup.

## Website integration

All 19 HTML pages load `/assets/brand.css` last. It owns the brand tokens and
self-hosted Inter UI font; taglines use the existing self-hosted Lora Italic 400.
The website pairs forest-green brand accents with white backgrounds, coral
actions, pale-gold and mint panels, and teal details. These supporting colors
preserve the site's visual variety; the supplied logo artwork keeps its colors.
Headers use `orchen-lockup-small-light.svg`, and night footers use the small dark
lockup. Favicons and `site.webmanifest` use the supplied icon exports.

The homepage signature starts as the supplied still SVG. `assets/brand-motion.js`
progressively enhances it using the exact geometry and timing extracted from
`OrchenMark.tsx`. It pauses offscreen and in background tabs and returns to the
still mark when reduced motion is enabled. No React or video loop is shipped.

Page-specific social cards live in `assets/social/`; their wordmarks come directly
from this kit, and their typography is outlined from the site's Inter and Lora
fonts. To regenerate development artifacts from the repository root:

```sh
python3 -m pip install 'fonttools[woff]'
npm install --prefix /tmp/orchen-brand-tools typescript@5.8.3 playwright@1.51.1
NODE_PATH=/tmp/orchen-brand-tools/node_modules node scripts/build-brand-motion.cjs
python3 scripts/generate-brand-social.py
# Set BROWSER_PATH to installed Chrome, or install Playwright Chromium first.
NODE_PATH=/tmp/orchen-brand-tools/node_modules node scripts/export-brand-social.cjs
```

Commit the generated JS, SVGs, and PNGs. Production remains a buildless Netlify
site; development dependencies are not needed to serve it. Bump the version on
changed styles, scripts, and social-image URLs to refresh immutable asset caches.
