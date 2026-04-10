# Project Rules

## ⚠️ NON-NEGOTIABLE: Everything Built Here Follows All Four Standards

**Every single file created by this repo — every `.html` page, every subpage, every legal page, every page that will ever exist in `site/` — must comply with ALL FOUR of these standards. No exceptions. No partial compliance. All four, always, on everything.**

| Standard | Skill | Every page must have |
|----------|-------|---------------------|
| **Security** | `skills/security/SKILL.md` | `_headers` via Cloudflare, SRI on CDN scripts, no secrets in source, `rel="noopener noreferrer"` on all external links |
| **Legal** | `skills/legal/SKILL.md` | Copyright footer, Privacy Policy, Terms of Use, DMCA page, `noai` meta tag, AI crawlers blocked in `robots.txt` |
| **SEO** | `skills/seo/SKILL.md` | `<title>`, meta description, Open Graph tags, JSON-LD structured data, semantic HTML, image alt attributes *(skip OG/JSON-LD on legal pages)* |
| **AEO** | `skills/aeo/SKILL.md` | `llms.txt`, speakable schema, factual headlines, FAQ section, no marketing speak in meta description |

**If you are building any page and have not applied all four — stop and apply them before delivering.**

**If you are unsure whether a rule applies to a specific page — apply it. Always default to more protection, not less.**

---

## Purpose

This repo is a toolkit for building landing pages and websites for apps, ideas, and concepts. Everything here — skills, scripts, structure — exists to help ship polished pages fast using AI tools.

## Output Policy

**All files generated for user tasks MUST follow this exact structure:**

```
output/<project-name>/           ← project root (skill files live here)
├── SKILL.md                     ← active style skill (never deploy)
├── .impeccable.md               ← quality layer (never deploy)
├── CLAUDE.md                    ← project rules (never deploy)
└── site/                        ← DEPLOY THIS FOLDER to Cloudflare
    ├── index.html               ← main page
    ├── logo.svg                 ← logo (or logo.png)
    ├── logo-light.svg           ← light variant for dark backgrounds
    ├── llms.txt                 ← AEO / AI search optimization
    ├── robots.txt               ← crawler instructions
    ├── sitemap.xml              ← site map for search engines
    └── images/                  ← product screenshots and assets
        ├── screenshot-1.png
        └── screenshot-2.png
```

Rules:
- All HTML, CSS, JS, images, and deployable files go inside `site/`
- `SKILL.md`, `.impeccable.md`, and `CLAUDE.md` stay at the project root — never inside `site/`
- Never create files at the repo root or in `skills/`
- When referencing images or assets in HTML, use relative paths: `images/screenshot-1.png`, `logo.svg`
- `site/` is what gets uploaded to Cloudflare Pages — nothing else

## Universal Rule: Security + Legal on Every Single Page

**This applies to ALL pages without exception — index.html, privacy-policy.html, terms.html, dmca.html, about.html, contact.html, any subpage, any page ever created in this repo.**

There are no exceptions. "Every page" means every `.html` file in `site/`. Not just the main page. Not just the landing page. Every one.

**Security checklist — every `.html` file must have:**
- The same `site/_headers` applies automatically via Cloudflare (no per-file action needed)
- `integrity` + `crossorigin="anonymous"` on every CDN `<script>` and `<link>` — including on legal pages
- `rel="noopener noreferrer"` on every `target="_blank"` link — including on legal pages
- No API keys, tokens, email addresses, or sensitive data in source — including on legal pages

**Legal checklist — every `.html` file must have:**
- The same navbar with logo linking back to `/`
- The same footer with copyright notice `© [year] [Owner]. All rights reserved. [Product]™`
- The same footer links to Privacy Policy, Terms of Use, and DMCA
- The same fonts, colors, spacing, and animations as `index.html`

**For legal pages specifically** (`privacy-policy.html`, `terms.html`, `dmca.html`):
- Also add `<meta name="robots" content="noindex, nofollow">` so they don't appear in search results
- Do NOT add Open Graph or Twitter card tags — these pages should not be shareable on social media
- Do NOT add JSON-LD structured data — these are utility pages, not product pages

If you are ever unsure whether a rule applies to a page you are building — apply it. Default to more protection, not less.

## Legal Protection — Apply to Every Project

**Every project must include legal protection without being asked.** Follow `skills/legal/SKILL.md` for the full process.

Before building, always ask the user:
1. Their full name or company name (for copyright ownership)
2. Their product/brand name (for ™ symbol)
3. Whether they already have a Privacy Policy — improve it if yes, generate if no
4. Whether they already have Terms of Use — improve it if yes, generate if no
5. What data they collect (emails, analytics, contact forms)
6. Where their users are primarily located (affects GDPR/CCPA)

Required on every project:
- Footer copyright notice with dynamic year: `© [year] [Owner]. All rights reserved. [Product]™`
- `<meta name="copyright">` and `<meta name="author">` in `<head>`
- `site/privacy-policy.html` — generated or improved from existing
- `site/terms.html` — generated or improved from existing
- `site/dmca.html` — DMCA protection notice
- Footer links to all three legal pages
- `noai` meta tag in `<head>` to prevent AI training
- AI training crawlers blocked in `site/robots.txt`

**CRITICAL — legal pages must match the main site design exactly:**
Before generating any legal page, read `site/index.html` and copy:
- The exact `<head>` (fonts, Tailwind config, CSS variables, meta setup)
- The exact navbar (logo, links, animations, mobile behavior)
- The exact footer (copyright, links)
- The same background color, text color, font stack, spacing scale, border radius, and entrance animations

Legal pages that use plain white backgrounds or default browser fonts when the main site has a custom design are WRONG. Every legal page must look like it belongs to the same product as `index.html`. Add `<meta name="robots" content="noindex">` to legal pages so they don't appear in search results.

## Security — Apply to Every Page

**Every page built must include full security implementation without being asked.** Follow `skills/security/SKILL.md` for the complete checklist.

Required on every project:
- `site/_headers` file with all Cloudflare security headers (CSP, X-Frame-Options, HSTS, Permissions-Policy, etc.)
- `integrity` and `crossorigin="anonymous"` on every CDN `<script>` and `<link>`
- No API keys, email addresses, or sensitive data in HTML source
- `rel="noopener noreferrer"` on every `target="_blank"` link
- Honeypot field on any contact or signup form
- Forms use a third-party service (Formspree, Web3Forms) — never custom handlers

After completing a project, remind the user to enable Bot Fight Mode, Always Use HTTPS, and Hotlink Protection in their Cloudflare dashboard.

## SEO — Apply to Every Page

**Every page built must include full SEO implementation without being asked.** Follow `skills/seo/SKILL.md` for the complete checklist.

Required on every page:
- Optimized `<title>` (under 60 chars, includes product name)
- `<meta name="description">` (120–160 chars, factual and specific)
- Full Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- Twitter card tags
- JSON-LD structured data (SoftwareApplication, WebSite, or FAQPage as appropriate)
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`, correct heading hierarchy)
- Image `alt` attributes and `width`/`height` on all images
- `loading="lazy"` on below-fold images
- `robots.txt` and `sitemap.xml` stubs

Ask the user for their domain URL and OG image if not provided. Mark as TODO if unavailable.

## Agent Engine Optimization (AEO) — Apply to Every Page

**Every page built must include AEO implementation without being asked.** Follow `skills/aeo/SKILL.md` for the complete checklist.

Required on every project:
- `/llms.txt` file at the project root with product name, one-sentence summary, key pages, and factual capabilities
- Speakable JSON-LD schema marking the `product-summary` paragraph
- All headlines state what things ARE — not how they feel
- Feature copy leads with specific capability, not vague benefit
- At least one FAQ section with direct, citable answers
- Meta description uses factual language — no marketing speak

Ask the user for a factual one-sentence product description and 3–5 capability bullet points if not clear from context.

## Product Images

**Always ask for product screenshots before building any landing page.**

Ask:
> "Do you have screenshots or images of your product/app? If yes, share the files and I'll present them beautifully. If no, I'll create a realistic placeholder you can swap out later."

Follow `skills/product-images/SKILL.md` for all screenshot presentation decisions — browser frames, phone mockups, perspective tilts, floating compositions, and scroll reveals.

## Logo Handling

**Always ask for a logo before building any landing page or website.**

When starting a new project, ask:
> "Do you have a logo for this product/app/idea? If yes, please share the file (PNG, SVG, JPG) or describe it. If no, I'll create a text-based or SVG logo using the product name and brand colors."

### If the user provides a logo file:
- Place it in the project subfolder (e.g., `output/my-project/logo.png`)
- Use it in the navbar (top-left), hero section, and footer
- Never stretch or distort it — preserve aspect ratio
- On dark backgrounds use a light version if available; ask if unsure

### If the user has no logo:
- Create a clean SVG or CSS text-based logo using the product name
- Use the brand's primary color and a premium font (from the active SKILL.md)
- Keep it simple: wordmark or lettermark only — no clip art or generic icons
- Place it consistently across navbar, hero, and footer

### Logo placement rules:
- **Navbar**: top-left, linked to homepage (`href="/"`), height 28–36px
- **Hero**: optional — only if it reinforces brand; never duplicate the navbar logo right above the hero headline
- **Footer**: bottom-left or centered, smaller (20–24px), muted opacity (`opacity-60`)
- Never use a logo as a giant hero image unless the brand specifically calls for it

## Sync — Run After Every Change

**After completing any edit to any file in a project, automatically check if other files need updating.** Follow `skills/sync/SKILL.md` for the full cascade map.

Do this proactively — do not wait for the user to ask. After every change:
1. Identify what changed
2. Check the cascade map for what else needs updating
3. Present the sync plan to the user
4. Apply all changes after confirmation

Common triggers:
- Navbar or footer edited in `index.html` → update all other `.html` pages
- Product name changed anywhere → update titles, llms.txt, legal pages, OG tags
- Domain URL changed → update robots.txt, sitemap.xml, llms.txt, canonical tags
- New CDN script added → update `_headers` CSP + add `integrity` hash
- New page added → update sitemap.xml
- Analytics added → update privacy-policy.html + `_headers` CSP

## Deployment Guidance

When a project is complete, always remind the user:
> "To deploy this, take everything inside `output/[project-name]/` and upload it to Cloudflare Pages at pages.cloudflare.com. See `how_to_deploy.md` for step-by-step instructions including custom domain setup."

## Skill Evaluation

When asked to evaluate or add a new skill, judge it from two angles:
1. "Does this help build better landing pages and websites?"
2. "Does a non-developer benefit from this, or does it require frontend knowledge to use?"

Focus on skills that improve: page structure, visual design, hero sections, CTAs, conversion patterns, motion, and accessibility. Reject skills about app internals (state management, routing, testing) or framework-specific guides (shadcn/ui, Tailwind, React patterns) that require frontend knowledge to use.
