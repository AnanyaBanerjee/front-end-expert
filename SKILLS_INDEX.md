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

PHASE 3 — Build the page
  Mandatory on EVERY page, no exceptions:
  4. security/SKILL.md     ← _headers, SRI on CDN scripts, safe links
  5. legal/SKILL.md        ← copyright, privacy policy, terms, DMCA, noai
  6. seo/SKILL.md          ← title, meta, OG tags, JSON-LD, semantic HTML
  7. aeo/SKILL.md          ← llms.txt, speakable schema, factual copy, FAQ

PHASE 4 — After any change
  8. sync/SKILL.md         ← propagate changes across all affected files
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
| SEO | `skills/seo/SKILL.md` | `<title>`, `<meta description>`, Open Graph, Twitter card, JSON-LD structured data, semantic HTML, image alt attributes, `robots.txt`, `sitemap.xml` |
| AEO | `skills/aeo/SKILL.md` | `llms.txt` at site root, speakable JSON-LD schema, factual headlines, FAQ section, no marketing speak in meta |

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

### Content reference (consult when writing copy or brand)

| Skill | Files | What it covers |
|---|---|---|
| Copywriting | `skills/copywriting/` | patterns, anti-patterns, decisions, sharp-edges for landing page copy |
| Branding | `skills/branding/` | patterns, anti-patterns, decisions, sharp-edges for brand voice and identity |
| Landing Page Design | `skills/landing-page-design/` | patterns, anti-patterns, layout decisions, sharp-edges for page structure |

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

**"Review my animations"**
→ `emil-design-eng/SKILL.md`

**"The legal pages look different from the main site"**
→ `legal/SKILL.md` — read `index.html` first, copy exact `<head>`, navbar, and footer

**"Add a FAQ section"**
→ Follow `aeo/SKILL.md` FAQ format (direct, citable answers, no marketing speak)
