#!/bin/bash
#
# Create a new project with layered design skills.
#
# Usage: ./setup.sh <project-name> <style-skill>
#
# Style skills: taste-skill, soft-skill, minimalist-skill, brutalist-skill
#
# Example: ./setup.sh my-landing-page taste-skill

set -e

PROJECT_NAME="${1:?Usage: ./setup.sh <project-name> <style-skill>}"
STYLE_SKILL="${2:?Usage: ./setup.sh <project-name> <style-skill>}"

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$REPO_ROOT/output/$PROJECT_NAME"
SITE_DIR="$PROJECT_DIR/site"

# Validate style skill exists
if [ ! -f "$REPO_ROOT/skills/$STYLE_SKILL/SKILL.md" ]; then
  echo "Error: Style skill '$STYLE_SKILL' not found."
  echo "Available: taste-skill, soft-skill, minimalist-skill, brutalist-skill"
  exit 1
fi

# Create project folder structure
mkdir -p "$SITE_DIR/images"
echo "Created output/$PROJECT_NAME/site/images/"

# 1. Copy style skill as active SKILL.md (project root, not site/)
cp "$REPO_ROOT/skills/$STYLE_SKILL/SKILL.md" "$PROJECT_DIR/SKILL.md"
echo "Copied $STYLE_SKILL as SKILL.md"

# 2. Copy impeccable as secondary context (project root, not site/)
cp "$REPO_ROOT/skills/impeccable/SKILL.md" "$PROJECT_DIR/.impeccable.md"
echo "Copied impeccable as .impeccable.md"

# 3. Create CLAUDE.md at project root
cat > "$PROJECT_DIR/CLAUDE.md" << 'EOF'
# Project Rules

## Folder Structure

All deployable files go inside `site/`. Skill files stay at the project root.

```
output/<project-name>/
├── SKILL.md          ← style skill (do not deploy)
├── .impeccable.md    ← quality layer (do not deploy)
├── CLAUDE.md         ← these rules (do not deploy)
└── site/             ← DEPLOY THIS to Cloudflare Pages
    ├── index.html
    ├── logo.svg
    ├── llms.txt
    ├── robots.txt
    ├── sitemap.xml
    └── images/
        └── screenshot-1.png
```

Never create HTML, images, or assets outside of `site/`. Never put SKILL.md or CLAUDE.md inside `site/`.

## Logo

**Always ask for a logo before building.** Ask:
> "Do you have a logo for this product/app/idea? If yes, share the file (PNG, SVG, JPG). If no, I'll create a clean SVG wordmark."

- Save logo as `site/logo.svg` (and `site/logo-light.svg` for dark backgrounds)
- Use in navbar (top-left, 28–36px), footer (muted, 20–24px)
- Never stretch or distort — preserve aspect ratio

## Product Images

**Always ask for screenshots before building.** Ask:
> "Do you have screenshots or images of your product? If yes, share them and I'll present them beautifully. If no, I'll create a placeholder."

- Save all images inside `site/images/`
- Reference in HTML as `images/filename.png` (relative path, no leading slash)

## Design Skills

- **Logo**: follow `../../skills/logo/SKILL.md`
- **Branding**: follow `../../skills/branding/patterns.md` and `anti-patterns.md`
- **Product images**: follow `../../skills/product-images/SKILL.md`
- **SKILL.md** — active style skill (visual direction)
- **.impeccable.md** — design quality, anti-patterns, accessibility
- **Structure**: follow `../../skills/landing-page-design/patterns.md`, `anti-patterns.md`, `decisions.md`
- **Engineering**: follow `../../skills/emil-design-eng/SKILL.md`
- **Security**: follow `../../skills/security/SKILL.md` — apply to every page; site/_headers already stubbed
- **SEO**: follow `../../skills/seo/SKILL.md` — apply full checklist to every page
- **AEO**: follow `../../skills/llms-txt/SKILL.md` — generate `site/llms.txt` for every project
- **Copy**: follow `../../skills/copywriting/patterns.md`

## Deployment

When the project is ready, remind the user:
> "To deploy: go to pages.cloudflare.com, create a project, and upload the `site/` folder. See `how_to_deploy.md` at the repo root for full instructions including custom domain setup."
EOF
echo "Created CLAUDE.md"

# 4. Create stub files inside site/
cat > "$SITE_DIR/_headers" << 'EOF'
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-XSS-Protection: 1; mode=block
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com; font-src 'self' https://fonts.gstatic.com https://api.fontshare.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';
EOF
echo "Created site/_headers with security headers"

cat > "$SITE_DIR/robots.txt" << EOF
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
EOF
echo "Created site/robots.txt stub"

cat > "$SITE_DIR/sitemap.xml" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
EOF
echo "Created site/sitemap.xml stub"

cat > "$SITE_DIR/llms.txt" << EOF
# Product Name

> One sentence: what this product does and who it's for.

Additional context: key features, platform, pricing model, and differentiator.

## Key Pages

- [Home](https://yoursite.com/): Overview and main value proposition

## What This Product Does

- [Factual capability 1]
- [Factual capability 2]
- [Factual capability 3]
EOF
echo "Created site/llms.txt stub"

echo ""
echo "Project ready at: output/$PROJECT_NAME/"
echo ""
echo "Structure:"
echo "  output/$PROJECT_NAME/"
echo "  ├── SKILL.md          ($STYLE_SKILL)"
echo "  ├── .impeccable.md    (quality layer)"
echo "  ├── CLAUDE.md         (project rules)"
echo "  └── site/             ← deploy this folder to Cloudflare"
echo "      ├── images/       (put screenshots here)"
echo "      ├── _headers      (security headers — customise CSP domains)"
echo "      ├── robots.txt    (stub — update domain)"
echo "      ├── sitemap.xml   (stub — update domain)"
echo "      └── llms.txt      (stub — fill in product details)"
echo ""
echo "Active skill layers:"
echo "  Logo + branding, product images, structure, style ($STYLE_SKILL),"
echo "  quality (impeccable), engineering, SEO, AEO, copywriting"
echo ""
echo "Next: cd output/$PROJECT_NAME and open Claude Code"
