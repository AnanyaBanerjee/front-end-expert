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

## Skill Evaluation

When asked to evaluate or add a new skill, judge it from two angles:
1. "Does this help build better landing pages and websites?"
2. "Does a non-developer benefit from this, or does it require frontend knowledge to use?"

Focus on skills that improve: page structure, visual design, hero sections, CTAs, conversion patterns, motion, and accessibility. Reject skills about app internals (state management, routing, testing) or framework-specific guides (shadcn/ui, Tailwind, React patterns) that require frontend knowledge to use.
