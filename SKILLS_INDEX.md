# Skills Index

A routing guide for Claude. Use this to determine which skills apply, in what order, and under what conditions — without reading every SKILL.md file first.

---

## Build Sequence (follow this order every time)

```
PHASE 1 — Before writing any code
  1. logo/SKILL.md         ← ask for logo (or create SVG wordmark)
  2. product-images/SKILL.md ← ask for screenshots (or create placeholder)
  3. impeccable/SKILL.md [teach] ← gather design context (.impeccable.md)

PHASE 2 — Choose one style skill
  → see Style Skill Routing below

PHASE 2.5 — Craft guide (read before writing hero/flow/motion)
  landing-page-craft/SKILL.md ← first-section storytelling, copy rules,
  section flow, motion timing, product-demo fidelity, working-from-feedback
  interpretation rules. Cross-cutting, not a visual style — pairs with
  whichever style skill you picked.

PHASE 3 — Build the page
  Mandatory on EVERY page, no exceptions:
  4. security/SKILL.md     ← _headers, SRI on CDN scripts, safe links
  5. legal/SKILL.md        ← copyright, privacy policy, terms, DMCA, noai
  6. seo/SKILL.md          ← title, meta, OG tags, JSON-LD, semantic HTML
  7. aeo/SKILL.md          ← llms.txt, speakable schema, factual copy, FAQ
  8. mobile/SKILL.md       ← safe area insets, Core Web Vitals, AVIF images, touch targets, responsive type, mobile nav, content-visibility, scroll snap, hover fix, 35-point audit

PHASE 4 — After any change
  9. sync/SKILL.md         ← propagate changes across all affected files
```

---

## Style Skill Routing

Pick exactly ONE style skill per project. Never mix two style skills on the same site.

| User signals | Use this skill |
|---|---|
| "modern SaaS", "React app", "dashboard", wants motion | `taste-skill/SKILL.md` |
| "luxury", "agency-level", "Awwwards", "cinematic", high-end branding | `soft-skill/SKILL.md` |
| "minimal", "editorial", "clean", "Notion-like", "document-style" | `minimalist-skill/SKILL.md` |
| "brutalist", "raw", "industrial", "terminal", "tactical", "bold typography" | `brutalist-skill/SKILL.md` |
| User asks for animation review, motion QA, or "make this feel right" | `emil-design-eng/SKILL.md` |
| No clear preference | Default to `taste-skill/SKILL.md` |

**Note:** `soft-skill` produces React/Next.js. `minimalist-skill` and `brutalist-skill` work with plain HTML/CSS. `taste-skill` defaults to React but can adapt.

---

## All Skills — Quick Reference

### Mandatory (apply to every project, every page)

| Skill | File | What it does |
|---|---|---|
| Security | `skills/security/SKILL.md` | `_headers` for Cloudflare, SRI `integrity` + `crossorigin` on all CDN tags, no secrets in source, `rel="noopener noreferrer"` on external links, honeypot on forms |
| Legal | `skills/legal/SKILL.md` | Copyright footer, `noai` meta tag, `privacy-policy.html`, `terms.html`, `dmca.html` — all matching the main site design exactly |
| SEO | `skills/seo/SKILL.md` | `<title>`, `<meta description>`, Open Graph, Twitter card, JSON-LD structured data (SoftwareApplication/WebSite on index, **WebPage on every secondary page**), semantic HTML, image alt attributes, `robots.txt`, `sitemap.xml`; **every `<a>` must have `title` attribute**; navbar logo `href="/"` not `#`; external links `rel="noopener noreferrer"` (both tokens); internal nav links on secondary pages point to `index.html#section` |
| AEO | `skills/aeo/SKILL.md` | `llms.txt` at site root, speakable JSON-LD schema on index, **WebPage JSON-LD on every secondary page**, factual headlines, FAQ section, no marketing speak in meta, `title` attributes on all links |
| Mobile | `skills/mobile/SKILL.md` | Phone-first layout, safe area insets (`env(safe-area-inset-*)` + `viewport-fit=cover`), Core Web Vitals targets (LCP < 2.5s / CLS < 0.1 / INP < 200ms), AVIF + WebP images via `<picture>`, touch targets ≥ 44px, responsive type with clamp(), mobile nav (hamburger + drawer), thumb zone CTAs, 16px inputs (no iOS zoom), `content-visibility: auto` on below-fold sections, `overscroll-behavior: contain` on modals, scroll snap, `@media (hover: hover)` fix, `prefers-reduced-motion`, 35-point mobile audit |

### Pre-build (run before any visual work)

| Skill | File | What it does |
|---|---|---|
| Logo | `skills/logo/SKILL.md` | Ask for logo → handle file, OR create SVG wordmark. Covers navbar/hero/footer placement. |
| Product Images | `skills/product-images/SKILL.md` | Ask for screenshots → present beautifully (browser frame, phone, floating, tilt, layered). Placeholder if none. |
| Impeccable (teach) | `skills/impeccable/SKILL.md` | Gather design context into `.impeccable.md`. Required before any style skill produces output. |

### Style (pick one per project)

| Skill | File | Aesthetic | Stack |
|---|---|---|---|
| Taste | `skills/taste-skill/SKILL.md` | High-agency SaaS. DESIGN_VARIANCE:8, MOTION_INTENSITY:6, VISUAL_DENSITY:4. Magnetic buttons, bento grids, spring physics. | React/Next.js + Tailwind |
| Soft | `skills/soft-skill/SKILL.md` | $150k agency-level. Double-bezel components, cinematic motion, haptic depth, Awwwards-tier variance engine. | React/Next.js + Tailwind |
| Minimalist | `skills/minimalist-skill/SKILL.md` | Editorial, warm monochrome, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows. | HTML/CSS or any |
| Brutalist | `skills/brutalist-skill/SKILL.md` | Swiss typographic print OR CRT terminal. Rigid grids, extreme type scale, 90° corners, monospace, one accent color (red). | HTML/CSS |
| Emil Design Eng | `skills/emil-design-eng/SKILL.md` | Animation review/philosophy. Not a visual style — use for QA and motion decisions. | Any |

### Post-change (run after every edit)

| Skill | File | What it does |
|---|---|---|
| Sync | `skills/sync/SKILL.md` | Detects what changed, maps cascade of affected files, presents sync plan, applies after confirmation. |

### Standalone generators (invoke directly, not part of the build sequence)

| Skill | File | What it does |
|---|---|---|
| LinkedIn Banner | `skills/banner-design/SKILL.md` | Generates a production-ready 1584×396 HTML banner with PNG export. Auto-extracts branding from a URL, repo, or idea. Includes live text editing, color pickers, style variants, draggable phone mockups, CTA presets, and multi-select. |
| Mockups | `skills/mockups/SKILL.md` | Generates device mockups for app store screenshots and landing pages. iPhone 15 Pro (Dynamic Island), iPhone 15 (notch), Android Pixel (punch-hole), iPad Pro — all pure HTML/CSS. Outputs to `output/<project>/mockups/` (not deployed). Produces branded export slides at exact App Store / Google Play dimensions, plus a preview.html showing all devices. Also works as embeddable frames in site/index.html. |

### Content reference (consult when writing copy or brand)

| Skill | Files | What it covers |
|---|---|---|
| Landing Page Craft | `skills/landing-page-craft/SKILL.md` | Cross-cutting build guide: first-section storytelling, copy rules, product-demo fidelity, section flow, motion timing/rhythm, connected-sequence diagrams, working-from-feedback interpretation, final review checklist. Read alongside whichever style skill is active. |
| Copywriting | `skills/copywriting/SKILL.md` | Consolidated: awareness levels, all frameworks (PAS/AIDA/BAB/PASTOR/4U), psychology triggers, social proof hierarchy, objection handling, CTA rules, scoring rubric, slash commands, industry guidance for tech/entertainment/motivation |
| Branding | `skills/branding/` | patterns, anti-patterns, decisions, sharp-edges for brand voice and identity |
| Landing Page Design | `skills/landing-page-design/` | patterns, anti-patterns, layout decisions, sharp-edges for page structure |
| Social Proof | `skills/social-proof/SKILL.md` | Visual execution of social proof: social media post formats (LinkedIn/X), credibility strips, platform branding, avatar treatment, placeholder→real proof transition, testimonial collection |

### Build quality (use via Impeccable commands)

`skills/impeccable/commands/` contains 17 focused polish passes. Invoke as `/impeccable [command]`:

| Command | What it does |
|---|---|
| `audit` | Full quality audit against all standards |
| `animate` | Add or improve entrance animations |
| `colorize` | Refine the color palette |
| `typeset` | Improve typography hierarchy |
| `layout` | Improve spatial composition |
| `polish` | General visual refinement |
| `harden` | Security and accessibility hardening |
| `optimize` | Performance improvements |
| `bolder` / `quieter` | Increase / decrease visual intensity |
| `adapt` | Adjust for a different context or audience |
| `clarify` | Improve copy clarity |
| `critique` | Critical design review |
| `delight` | Add micro-interactions and delight |
| `distill` | Simplify and reduce clutter |
| `overdrive` | Maximum visual impact |
| `shape` | Refine component shapes and borders |

---

## Common Scenarios

**"Build me a landing page for X"**
→ Phase 1 questions (logo? screenshots?) → teach mode → pick style skill → build with all 4 mandatory standards → sync

**"Add a new page to my site"**
→ Copy navbar + footer from `index.html` → apply all 4 mandatory standards → add to `sitemap.xml` → sync

**"I updated the navbar"**
→ `sync/SKILL.md` — cascade to all other `.html` files

**"I changed the product name"**
→ `sync/SKILL.md` — update all `<title>` tags, `llms.txt`, Open Graph titles, footer copyright, `terms.html` and `privacy-policy.html` body text

**"I changed the domain URL"**
→ `sync/SKILL.md` — update `robots.txt` Sitemap URL, all `<loc>` in `sitemap.xml`, all canonical tags, all `og:url` tags, `llms.txt` links

**"I added a new CDN script or stylesheet"**
→ `security/SKILL.md` — add `integrity` + `crossorigin="anonymous"` to the tag, add the domain to `_headers` CSP `script-src` or `style-src`

**"I added analytics"**
→ `security/SKILL.md` — add analytics domain to `_headers` CSP
→ `legal/SKILL.md` — update `privacy-policy.html` third-party services section

**"Review my animations"**
→ `emil-design-eng/SKILL.md`

**"The legal pages look different from the main site"**
→ `legal/SKILL.md` — read `index.html` first, copy exact `<head>`, navbar, footer, colors, fonts, and animations

**"Add a FAQ section"**
→ `aeo/SKILL.md` — direct, citable answers, no marketing speak, use FAQPage JSON-LD schema

**"Is everything consistent / up to date?"**
→ `sync/SKILL.md` with argument "all" — full project audit against all files and standards

**"Make me a LinkedIn banner for X"**
→ `banner-design/SKILL.md` — pass product name, URL, repo path, or idea as $ARGUMENTS. Outputs a self-contained `linkedin-banner.html` ready to open in browser and export as PNG.

**"Make app store screenshots / mockups for X"**
→ `mockups/SKILL.md` — scan `output/<project>/site/images/` for existing screenshots first (use them automatically), read brand colors from `site/index.html` CSS vars, then ask only what's missing. Outputs `output/<project>/mockups/` with branded export slides at exact required dimensions + a preview.html.

**"I want a phone mockup on my landing page"**
→ `mockups/SKILL.md` embed mode — copy the iPhone Pro or Android CSS frame inline into `site/index.html`. Pair with product-images Style 4 (perspective tilt) for a premium hero.
