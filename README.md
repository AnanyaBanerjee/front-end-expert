# Front-End Tech

A toolkit for building landing pages and websites for apps, ideas, and concepts — powered by AI design skills.

## Skills

Design instruction files that guide AI tools to generate polished frontend UI:

| Skill | Style | Source |
|-------|-------|--------|
| **taste-skill** | Core design — layout, typography, colors, spacing, motion | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **soft-skill** | Premium UI with whitespace and spring animations | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **minimalist-skill** | Editorial, Linear/Notion-inspired interfaces | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **brutalist-skill** | Swiss typographic and CRT terminal aesthetics | [taste-skill](https://github.com/Leonxlnx/taste-skill) |
| **impeccable** | 21 commands, anti-patterns, typography, color, motion, a11y | [impeccable](https://github.com/pbakaus/impeccable) |
| **emil-design-eng** | Animation craft, transform patterns, gesture interactions, performance | [skill](https://github.com/emilkowalski/skill) |
| **landing-page-design** | Page structure, hero formulas, section stacks, conversion patterns, anti-patterns | [vibeship-spawner-skills](https://github.com/vibeforge1111/vibeship-spawner-skills) |
| **branding** | Logo systems, color architecture, brand identity patterns and anti-patterns | [vibeship-spawner-skills](https://github.com/vibeforge1111/vibeship-spawner-skills) |
| **logo** | Ask for logo, place it correctly, or create a clean SVG wordmark if none exists | custom |
| **product-images** | Browser frames, phone mockups, perspective tilts, floating compositions, scroll reveals | custom |

### Start a new landing page

```bash
# Scaffold a project with all skill layers wired up automatically
./setup.sh my-landing-page taste-skill
# Options: taste-skill, soft-skill, minimalist-skill, brutalist-skill

# Then open Claude Code in that folder and describe what you want
cd output/my-landing-page
```

### Redesign an existing page

Add skill layers to any existing project folder:

```bash
cd output/your-project

# 1. Copy a style skill
cp ../../skills/taste-skill/SKILL.md ./SKILL.md

# 2. Copy the quality layer
cp ../../skills/impeccable/SKILL.md ./.impeccable.md

# 3. Create CLAUDE.md to reference structure + engineering layers
cat > CLAUDE.md << 'EOF'
# Project Rules
## Design Skills
- **SKILL.md** — taste-skill (visual direction)
- **.impeccable.md** — design quality and anti-patterns
- For page structure and conversion patterns: `../../skills/landing-page-design/`
- For animation craft: `../../skills/emil-design-eng/SKILL.md`
EOF
```

Then open Claude Code in that folder and prompt:
```
Redesign this page following all the loaded design skills. Start by auditing
the current page against the landing-page-design structure — check the hero
formula, section stack, and anti-patterns. Tell me what you're changing and
why before you rewrite anything.
```

All generated output goes in `output/`, organized by project. See [HOW_TO_USE.md](HOW_TO_USE.md) for detailed prompt examples, commands, and how skill layering works.

## Credits

- **taste-skill, soft-skill, minimalist-skill, brutalist-skill** — by [Leonxlnx](https://github.com/Leonxlnx), sourced from [taste-skill](https://github.com/Leonxlnx/taste-skill). Licensed under the original repository's terms.
- **impeccable** — by [pbakaus](https://github.com/pbakaus), sourced from [impeccable](https://github.com/pbakaus/impeccable). Licensed under Apache 2.0.
- **emil-design-eng** — by [Emil Kowalski](https://github.com/emilkowalski), sourced from [skill](https://github.com/emilkowalski/skill). Licensed under the original repository's terms.
- **landing-page-design**, **branding** — sourced from [vibeship-spawner-skills](https://github.com/vibeforge1111/vibeship-spawner-skills). Licensed under the original repository's terms.
- **logo**, **product-images** — custom skills written for this repo.
