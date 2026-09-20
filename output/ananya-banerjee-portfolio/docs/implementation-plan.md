# Interactive portfolio implementation plan

**Goal:** Showcase Ananya’s ventures with accessible animated previews and genuine external destinations.
**Architecture:** Static HTML with shared local CSS and JavaScript; product data rendered into HTML at build time by a small Python build script. Existing site directory stays deployable to Cloudflare Pages.
**Tech stack:** HTML, CSS, vanilla JavaScript, Python standard library.
**Spec:** portfolio-plan.md

## Files and verification

- [ ] `docs/ventures.json`: curated public-safe venture catalog with source references, features, links, and media. Keep unverified metrics out.
- [ ] `docs/build_site.py`: generate all HTML pages, llms.txt, sitemap, and security headers. Shared header/footer keep all pages synchronized.
- [ ] `site/images/`: copy selected real product assets, preserve aspect ratio, and resize to display-appropriate WebP files when tools are available.
- [ ] `site/styles.css`: responsive two-column gallery, per-product preview compositions, hover/focus/open states, keyboard focus styles, reduced motion, safe areas, and 44px controls.
- [ ] `site/main.js`: detail-panel toggle, mobile navigation, dynamic year, and Escape handling. No network calls or persistent browser storage.
- [ ] `site/index.html`: rendered catalog, ecosystem relationships, writing, about, FAQ, factual metadata and structured data.
- [ ] `site/privacy-policy.html`, `site/terms.html`, `site/dmca.html`: matching pages describing actual site behavior and available contact channels.
- [ ] `site/_headers`, `robots.txt`, `sitemap.xml`, `llms.txt`: same-origin CSP, crawler controls, public page map, factual machine-readable summary.
- [ ] Validate HTML references, no missing media, unique IDs, title/description, all external rel/title attributes, all legal pages, CSP hashes for JSON-LD, JavaScript syntax, and HTTP responses.
- [ ] Open local preview. Report any missing verified handles or figures. Do not replace the live website without publishing authorization.

## Interaction checks
Confirm every detail button targets a unique section and maintains aria-expanded; focus remains on the trigger, Escape closes expanded previews, mobile menu updates aria-expanded, and reduced motion disables animations. No hidden links may remain keyboard-focusable. Verify 320px layout structurally; do not claim browser interaction checks unless actually performed.
