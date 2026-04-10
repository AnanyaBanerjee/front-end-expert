# Project Rules

## Purpose

This repo is a toolkit for building landing pages and websites for apps, ideas, and concepts. Everything here — skills, scripts, structure — exists to help ship polished pages fast using AI tools.

## Output Policy

**All files generated for user tasks MUST be created inside a subfolder within `output/`.**

- Never create generated files (HTML, CSS, JS, images, etc.) in the repo root or inside `skills/`.
- For each task, create a descriptively named subfolder: `output/<project-name>/`.
- The `output/` directory holds all generated work. Each project gets its own subfolder.
- The `skills/` folder is for design instruction files only — never write generated code there.

Examples:
```
output/landing-page/index.html       # Correct
output/dashboard-v2/src/App.tsx      # Correct
landing-page/index.html              # WRONG — not inside output/
index.html                           # WRONG — not inside output/
skills/my-project/index.html         # WRONG — skills/ is for SKILL.md files only
```

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

## Skill Evaluation

When asked to evaluate or add a new skill, judge it from two angles:
1. "Does this help build better landing pages and websites?"
2. "Does a non-developer benefit from this, or does it require frontend knowledge to use?"

Focus on skills that improve: page structure, visual design, hero sections, CTAs, conversion patterns, motion, and accessibility. Reject skills about app internals (state management, routing, testing) or framework-specific guides (shadcn/ui, Tailwind, React patterns) that require frontend knowledge to use.
