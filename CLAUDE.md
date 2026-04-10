# Project Rules

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

**Every page built must include AEO implementation without being asked.** Follow `skills/llms-txt/SKILL.md` for the complete checklist.

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

## Deployment Guidance

When a project is complete, always remind the user:
> "To deploy this, take everything inside `output/[project-name]/` and upload it to Cloudflare Pages at pages.cloudflare.com. See `how_to_deploy.md` for step-by-step instructions including custom domain setup."

## Skill Evaluation

When asked to evaluate or add a new skill, judge it from two angles:
1. "Does this help build better landing pages and websites?"
2. "Does a non-developer benefit from this, or does it require frontend knowledge to use?"

Focus on skills that improve: page structure, visual design, hero sections, CTAs, conversion patterns, motion, and accessibility. Reject skills about app internals (state management, routing, testing) or framework-specific guides (shadcn/ui, Tailwind, React patterns) that require frontend knowledge to use.
