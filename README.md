# Front-End Tech

A toolkit for building landing pages and websites for apps, ideas, and concepts — powered by AI design skills.

Every page Claude builds is automatically **secured** (Cloudflare security headers, SRI on CDN scripts, no secrets in source, safe external links), **SEO-optimized** (meta tags, Open Graph, JSON-LD structured data), and **AEO-optimized** (`llms.txt`, speakable schema) for AI search engines like Perplexity and ChatGPT — without you having to ask.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONT-END TECH REPO                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   skills/                          output/                          │
│   ├── STYLE (pick one)             └── my-project/                  │
│   │   ├── taste-skill                  ├── SKILL.md  ──────────┐   │
│   │   ├── soft-skill                   ├── .impeccable.md       │   │
│   │   ├── minimalist-skill             ├── CLAUDE.md            │   │
│   │   └── brutalist-skill             └── site/  ◄── DEPLOY    │   │
│   │                                       ├── index.html        │   │
│   ├── STRUCTURE                           ├── logo.svg          │   │
│   │   └── landing-page-design            ├── llms.txt           │   │
│   │                                       ├── robots.txt        │   │
│   ├── QUALITY                             ├── sitemap.xml       │   │
│   │   └── impeccable/                    └── images/            │   │
│   │       └── commands/ (17)                 └── screenshot.png │   │
│   │                                                              │   │
│   ├── ENGINEERING                      ┌────────────────────────┘   │
│   │   └── emil-design-eng              │  Claude reads all layers:  │
│   │                                    │  SKILL.md (style)          │
│   ├── BRAND                            │  .impeccable.md (quality)  │
│   │   ├── logo                         │  CLAUDE.md → references    │
│   │   └── branding                     │  all other skills          │
│   │                                    └────────────────────────    │
│   ├── CONTENT                                                        │
│   │   ├── copywriting                                               │
│   │   └── product-images                                            │
│   │                                                                  │
│   ├── DISCOVERABILITY                                               │
│   │   ├── seo                                                        │
│   │   └── llms-txt                                                   │
│   │                                                                  │
│   └── SECURITY                                                       │
│       └── security                                                   │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│   GUIDES                           TOOLING                          │
│   ├── HOW_TO_USE.md                └── setup.sh                     │
│   ├── how_to_improve_SEO.md                                         │
│   ├── how_to_improve_agent_engine_optimization.md                   │
│   └── how_to_deploy.md                                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Skill Layers

Every project uses all layers simultaneously. The layers never conflict — they cover different concerns.

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER          SKILL(S)              WHAT IT DOES          │
├─────────────────────────────────────────────────────────────┤
│  Structure  →   landing-page-design   sections, hero, CTAs  │
│  Style      →   taste / soft /        how it looks          │
│                 minimalist / brutalist                       │
│  Quality    →   impeccable + 17 cmds  anti-patterns, a11y   │
│  Engineering→   emil-design-eng       motion, transforms    │
│  Brand      →   logo + branding       logo, color systems   │
│  Content    →   copywriting +         copy, screenshots     │
│                 product-images                               │
│  SEO        →   seo                   meta, structured data │
│  AEO        →   llms-txt              llms.txt, AI search   │
│  Security   →   security              headers, SRI, no      │
│                                       secrets, safe links   │
└─────────────────────────────────────────────────────────────┘
          All wired automatically by setup.sh + CLAUDE.md
```

---

## Project Structure

Every project in `output/` follows this layout:

```
output/my-product/
├── SKILL.md           ← active style skill      ┐
├── .impeccable.md     ← quality layer            ├── Claude reads these
├── CLAUDE.md          ← all layer references     ┘  (never deployed)
│
└── site/              ← drag this folder to Cloudflare Pages
    ├── index.html     ← your page
    ├── logo.svg       ← logo (logo-light.svg for dark backgrounds)
    ├── _headers       ← Cloudflare security headers (auto-created)
    ├── llms.txt       ← AI search optimization
    ├── robots.txt     ← crawler instructions
    ├── sitemap.xml    ← site map
    └── images/        ← product screenshots
        └── screenshot-1.png
```

---

## Skills

| Category | Skill | What it does | Source |
|----------|-------|-------------|--------|
| **Style** | taste-skill | Core modern UI — layout, typography, color, motion | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **Style** | soft-skill | Premium agency-level aesthetics | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **Style** | minimalist-skill | Editorial, Notion/Linear-inspired | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **Style** | brutalist-skill | Swiss typographic / CRT terminal | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **Structure** | landing-page-design | Hero formulas, section stacks, conversion patterns | [vibeship](https://github.com/vibeforge1111/vibeship-spawner-skills) |
| **Quality** | impeccable | 21 commands, anti-patterns, typography, a11y | [impeccable](https://github.com/pbakaus/impeccable) |
| **Engineering** | emil-design-eng | Animation craft, transforms, gestures, performance | [skill](https://github.com/emilkowalski/skill) |
| **Brand** | logo | Ask for logo, place correctly, or create SVG wordmark | custom |
| **Brand** | branding | Logo systems, color architecture, brand identity | [vibeship](https://github.com/vibeforge1111/vibeship-spawner-skills) |
| **Content** | copywriting | PAS/AIDA frameworks, headlines, CTAs | [vibeship](https://github.com/vibeforge1111/vibeship-spawner-skills) |
| **Content** | product-images | Browser frames, phone mockups, perspective tilts, compositions | custom |
| **SEO** | seo | Meta tags, Open Graph, JSON-LD, semantic HTML, page speed | custom |
| **AEO** | llms-txt | llms.txt, speakable schema, AI search optimization | custom |
| **Security** | security | Cloudflare `_headers`, SRI, no-secrets policy, safe links, form hardening | custom |

---

## Quick Start

```bash
# Scaffold a new project with all layers wired up
./setup.sh my-landing-page taste-skill
# Style options: taste-skill, soft-skill, minimalist-skill, brutalist-skill

# Open Claude Code in the project folder
cd output/my-landing-page
```

The script creates your project folder, wires all skill layers, and pre-creates `site/` with stubs for `llms.txt`, `robots.txt`, and `sitemap.xml`. Claude will ask for your logo and screenshots before building.

### Redesign an existing page

```bash
# Use the setup script — it wires up all layers automatically
./setup.sh your-project taste-skill
```

Or manually for an existing folder:

```bash
cd output/your-project

cp ../../skills/taste-skill/SKILL.md ./SKILL.md
cp ../../skills/impeccable/SKILL.md ./.impeccable.md

cat > CLAUDE.md << 'EOF'
# Project Rules
## Folder Structure
All deployable files go inside site/. Skill files stay at the project root.
## Design Skills
- **Logo**: follow `../../skills/logo/SKILL.md` — save logo as site/logo.svg
- **Product images**: follow `../../skills/product-images/SKILL.md` — save to site/images/
- **SKILL.md** — active style skill (visual direction)
- **.impeccable.md** — design quality and anti-patterns
- **Structure**: follow `../../skills/landing-page-design/`
- **Engineering**: follow `../../skills/emil-design-eng/SKILL.md`
- **SEO**: follow `../../skills/seo/SKILL.md` — apply to every page automatically
- **AEO**: follow `../../skills/llms-txt/SKILL.md` — generate site/llms.txt
- **Copy**: follow `../../skills/copywriting/patterns.md`
EOF
```

Then open Claude Code and prompt:
```
Redesign this page following all the loaded design skills. Start by auditing
the current page against the landing-page-design structure — check the hero
formula, section stack, and anti-patterns. Tell me what you're changing and
why before you rewrite anything.
```

---

## Deployment

Take the `site/` folder from your project and drag it to [Cloudflare Pages](https://pages.cloudflare.com). Free, unlimited bandwidth, custom domains available. See [how_to_deploy.md](how_to_deploy.md) for step-by-step instructions.

---

## Guides

| Guide | What it covers |
|-------|---------------|
| [HOW_TO_USE.md](HOW_TO_USE.md) | Prompt examples, commands, skill layering, full workflow |
| [how_to_improve_SEO.md](how_to_improve_SEO.md) | What SEO is, what Claude does automatically, what you provide |
| [how_to_improve_agent_engine_optimization.md](how_to_improve_agent_engine_optimization.md) | AEO, llms.txt, how AI search engines read your page |
| [how_to_deploy.md](how_to_deploy.md) | Cloudflare Pages deployment, custom domains, DNS setup |

---

## Credits

- **taste-skill, soft-skill, minimalist-skill, brutalist-skill** — by [Leonxlnx](https://github.com/Leonxlnx), sourced from [taste-skill](https://github.com/Leonxlnx/taste-skill). Licensed under the original repository's terms.
- **impeccable** — by [pbakaus](https://github.com/pbakaus), sourced from [impeccable](https://github.com/pbakaus/impeccable). Licensed under Apache 2.0.
- **emil-design-eng** — by [Emil Kowalski](https://github.com/emilkowalski), sourced from [skill](https://github.com/emilkowalski/skill). Licensed under the original repository's terms.
- **landing-page-design**, **branding**, **copywriting** — sourced from [vibeship-spawner-skills](https://github.com/vibeforge1111/vibeship-spawner-skills). Licensed under the original repository's terms.
- **logo**, **product-images**, **seo**, **llms-txt**, **security** — custom skills written for this repo.
