# How to Use This Repo

This repo is a collection of front-end projects, experiments, and AI design skills. Here's how to get the most out of it.

## Repo Structure

```
front-end-tech/
├── skills/              # AI design instruction files (SKILL.md)
│   ├── taste-skill/     # Core modern UI design
│   ├── soft-skill/      # Premium, agency-level aesthetics
│   ├── minimalist-skill/# Editorial, Notion/Linear-inspired
│   ├── brutalist-skill/ # Swiss typographic / CRT terminal
│   └── impeccable/      # Design quality, anti-patterns, a11y
├── output/              # Generated output (gitignored)
├── README.md
└── HOW_TO_USE.md
```

## Browsing and Learning

- **Skills** (`skills/`) are reference files — read them to learn design principles like typography, color, spacing, motion, and accessibility even if you never use them with an AI tool.
- **Output** (`output/`) is gitignored and holds generated artifacts from experiments.

## Using the Design Skills with AI Tools

The `skills/` folder contains `SKILL.md` files that AI coding tools (Claude Code, Cursor, Copilot, etc.) automatically detect and follow when generating UI code.

### Quick start

```bash
# Clone the repo
git clone https://github.com/AnanyaBanerjee/front-end-tech.git

# Start a new project
mkdir my-app && cd my-app

# Copy a skill into your project root
cp ../front-end-tech/skills/taste-skill/SKILL.md ./SKILL.md

# Open your AI coding tool and start building — it picks up the SKILL.md automatically
```

### Picking a skill

| Skill | Best for |
|-------|----------|
| **taste-skill** | General-purpose modern UI (SaaS, apps, landing pages) |
| **soft-skill** | Premium, high-end feel (agency sites, luxury products) |
| **minimalist-skill** | Content-heavy, editorial (docs, blogs, dashboards) |
| **brutalist-skill** | Bold, data-heavy (portfolios, dashboards, experimental) |
| **impeccable** | Design quality layer — audits, anti-patterns, accessibility |

### Switching skills

Replace the `SKILL.md` in your project root:

```bash
cp ../front-end-tech/skills/minimalist-skill/SKILL.md ./SKILL.md
```

### Combining skills

Each `SKILL.md` is standalone — AI tools read one at a time. To combine:

1. **Layer impeccable + a style skill (recommended):** Use a style skill as your `SKILL.md` and copy impeccable as `.impeccable.md` alongside it. Impeccable handles quality/a11y while the style skill handles the visual direction.
2. **Merge manually:** Cherry-pick sections from multiple skills into a single `SKILL.md` (e.g., typography from minimalist + motion from taste + anti-patterns from impeccable).
3. **Ask in chat:** Tell your AI tool to follow specific principles from another skill alongside the active one.

## Contributing

This is an evolving collection. To add a new project or skill:

- **New project:** Create a folder at the root with a descriptive name. Keep it self-contained.
- **New skill:** Add a folder under `skills/` with a `SKILL.md` inside. Update `README.md` with credits and source.
