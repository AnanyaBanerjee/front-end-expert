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

---

## Prompt Examples

The skills work best when your prompts are specific about what you want. Below are detailed examples organized by use case, showing how to prompt effectively with each skill.

### Building from Scratch

#### Landing page (taste-skill)

```
Build a landing page for a developer tool called "Railgun" — it's a CLI that
deploys containers in under 3 seconds. Use a split-screen hero with the product
name left-aligned and an animated terminal demo on the right. Include a features
section using a bento grid (not a 3-column card row), a testimonials section, and
a footer. Dark theme with a single emerald accent color. Use Geist for headings
and Geist Mono for code snippets.
```

**Why this works:** It specifies layout (split-screen hero, bento grid), names fonts, picks a color direction, and bans the generic 3-column card pattern — all things the taste-skill enforces.

#### SaaS dashboard (minimalist-skill)

```
Build a project management dashboard. Left sidebar with navigation (projects,
inbox, settings). Main content area shows a list of tasks grouped by status
(To Do, In Progress, Done) using a kanban-style layout. Use an editorial feel —
warm off-white background, serif headings (not Playfair Display), clean
monospace for metadata like dates and IDs. No card borders or heavy shadows.
Separate sections with subtle dividers and whitespace only.
```

**Why this works:** It matches the minimalist-skill's philosophy — warm monochrome palette, serif + sans pairing, no heavy shadows, whitespace-driven hierarchy.

#### Portfolio site (soft-skill)

```
Build a photographer's portfolio. Full-screen hero with the photographer's name
in massive typography and a slow-fading background image. Below that, an
asymmetrical masonry gallery with images that tilt slightly on hover (parallax
tilt card). Navigation should be a floating glass pill that morphs into a
full-screen overlay when opened. Use warm cream tones with an editorial luxury
vibe. Every element should enter the viewport with a heavy fade-up animation.
```

**Why this works:** It references specific soft-skill concepts — the floating glass nav, parallax tilt cards, staggered scroll reveals, and the Editorial Luxury vibe archetype.

#### Data dashboard (brutalist-skill)

```
Build a server monitoring dashboard in the Tactical Telemetry / CRT Terminal
style. Dark mode only. All data in monospace (JetBrains Mono). Show a grid of
server metrics: CPU, memory, disk, network — each in its own bordered cell with
visible grid lines. Use phosphor green (#33ff33) on near-black (#0a0a0a). Add
CRT scanline effects and a subtle flicker. Headers should be massive uppercase
in a heavy grotesque font. The layout should feel like a declassified military
operations screen.
```

**Why this works:** It picks the CRT Terminal archetype from brutalist-skill and specifies exact visual details (phosphor green, scanlines, monospace data).

---

### Iterating on Existing UI

These prompts work when you already have code and want to improve it.

#### Improving typography

```
The typography feels flat — all the text sizes are too close together. Create
more contrast: make the main heading much larger (at least 4xl on mobile, 6xl
on desktop) with tight tracking. Drop the body text to a comfortable reading
width (max 65 characters per line). Use a different font for headings vs body —
pair a display sans with a readable body sans.
```

#### Fixing generic layouts

```
This features section looks like every other SaaS site — 3 equal cards in a
row with icons on top. Break it up. Try an asymmetric bento grid where one
feature gets a large tile spanning 2 columns, and the others are smaller tiles
around it. Add varied content inside each tile — one could have a mini code
snippet, another an animated chart, another a screenshot.
```

#### Adding motion

```
This page feels static and lifeless. Add entrance animations: elements should
fade up with a slight blur as they scroll into view, staggered so they don't
all appear at once. Use spring physics (not linear easing) for all hover
transitions. Buttons should scale down slightly on click to feel tactile.
Keep it subtle — this isn't a showreel, it's a product.
```

#### Making it more accessible

```
Audit this page for accessibility. Check color contrast ratios against WCAG AA.
Make sure all interactive elements have visible focus states. Add reduced-motion
support so animations are disabled for users who prefer it. Check that the tab
order makes sense and all images have meaningful alt text.
```

---

### Tuning Parameters (taste-skill variants)

The taste-skill, soft-skill, minimalist-skill, and brutalist-skill files have three dials you can adjust. You don't need to edit the file — just tell the AI in chat:

#### High creativity, lots of motion, airy layout

```
Use design variance 9, motion intensity 8, and visual density 2. I want
something that feels like an art gallery — lots of whitespace, asymmetric
layouts, and cinematic scroll animations.
```

#### Conservative layout, subtle motion, packed with data

```
Use design variance 3, motion intensity 4, and visual density 9. This is an
internal analytics tool — predictable grid layouts, minimal animation, and
every pixel should show data. Use monospace for all numbers.
```

#### Balanced defaults with extra motion

```
Keep the default design settings but bump motion intensity to 8. I want
smooth spring-physics hover effects, staggered list reveals, and a parallax
hero section.
```

---

### Using Impeccable Commands

If you're using the impeccable skill, you have access to steering commands. Use these in chat after your initial build to refine the output.

#### `/impeccable craft` — Full build with design context

Use this when starting from scratch. It walks you through a design context interview first (who are your users, what's the brand personality, what should this feel like) and then builds with that context.

```
/impeccable craft a pricing page for a B2B analytics platform targeting
enterprise data teams
```

The AI will ask you questions about your audience, brand, and preferences before writing any code. This produces much better results than jumping straight to code.

#### `/impeccable teach` — Set up design context for your project

Run this once per project. It scans your codebase, asks you UX-focused questions, and writes a `.impeccable.md` context file that all future design work will reference.

```
/impeccable teach
```

After answering the questions, the AI saves your design context. Every subsequent prompt in that project will use it.

#### `/audit` — Full design quality check

```
/audit

Check this landing page against all design quality rules. Flag any AI slop
patterns: generic card grids, gray text on colored backgrounds, overused
fonts, bounce animations, gradient text, side-stripe borders on cards.
Score each section and tell me what to fix.
```

#### `/critique` — Honest design feedback

```
/critique

Be brutally honest about this dashboard design. What feels generic? What
would a senior designer at Linear or Vercel change? Don't sugarcoat it —
tell me what's wrong and why.
```

#### `/polish` — Refine spacing, alignment, consistency

```
/polish

The layout feels "almost there" but something is off. Tighten up the spacing
system — make sure there's a consistent rhythm. Fix any alignment issues.
Make the padding between sections feel intentional, not random.
```

#### `/typeset` — Fix typography

```
/typeset

The fonts feel bland and the hierarchy is unclear. Pick better fonts (nothing
from the banned list), create more contrast between heading and body sizes,
fix the line heights, and make sure code snippets use a proper monospace
font with generous letter-spacing.
```

#### `/colorize` — Improve color palette

```
/colorize

The colors feel disconnected. Build a cohesive palette using OKLCH. Tint the
neutrals toward the brand hue. Make sure accent colors are used sparingly
(60-30-10 rule). Check that nothing looks washed out or clashes.
```

#### `/animate` — Add or improve motion

```
/animate

Add meaningful motion to this page. Focus on one hero moment: a staggered
reveal on page load. Then add subtle hover transitions on cards and buttons.
Use exponential easing (ease-out-quart), not bounce. Respect prefers-reduced-motion.
```

#### `/harden` — Accessibility and robustness

```
/harden

Make this production-ready. Check all contrast ratios. Add focus-visible
styles to every interactive element. Make sure the page works with a
keyboard only. Add aria labels where needed. Test the tab order.
Support prefers-reduced-motion and prefers-color-scheme.
```

#### `/arrange` — Fix layout and spatial hierarchy

```
/arrange

The layout feels cramped in some places and wasteful in others. Create a
clear spatial hierarchy: more space between major sections, tighter spacing
within groups. Use CSS Grid instead of flexbox hacks. Make sure it collapses
cleanly on mobile.
```

#### `/distill` — Simplify and remove noise

```
/distill

There's too much going on. Strip out anything that doesn't serve a clear
purpose. Remove decorative elements that don't reinforce the brand.
Simplify the card structures. If something can be communicated with
whitespace instead of a border, use whitespace.
```

#### `/optimize` — Performance improvements

```
/optimize

Audit for performance. Are there expensive animations running on layout
properties? Is backdrop-blur being applied to scrolling content? Are
images properly sized? Check for unnecessary re-renders in React
components with motion.
```

---

### Combining Commands in a Workflow

You can chain commands for a complete design review cycle:

```
Step 1: /impeccable teach          — Set up design context (once per project)
Step 2: /impeccable craft [feature] — Build with full context
Step 3: /critique                   — Get honest feedback on what was built
Step 4: /typeset                    — Fix typography issues from the critique
Step 5: /colorize                   — Fix color issues from the critique
Step 6: /polish                     — Final pass on spacing and alignment
Step 7: /harden                     — Make it accessible and robust
Step 8: /audit                      — Final quality check before shipping
```

You don't need to run every command every time. Pick the ones relevant to what needs improvement.

---

### Pro Tips

1. **Be specific about what you DON'T want.** "No 3-column card grids, no gradient text, no Inter font" is more useful than "make it look premium."

2. **Reference the skill's vocabulary.** If you're using soft-skill, say "use the Ethereal Glass vibe archetype" or "apply the Double-Bezel card pattern." The AI knows what these mean because they're defined in the SKILL.md.

3. **Give real content, not placeholders.** Instead of "add a hero section," say "add a hero for a climate tech startup called Canopy that helps companies track their carbon footprint." The skill's anti-slop rules ban generic names and filler copy — help it out.

4. **Iterate in layers.** Don't try to get everything perfect in one prompt. Build the structure first, then layer on typography, color, motion, and polish in separate passes.

5. **Override parameters when needed.** The skill defaults are a starting point. If you're building a dense data dashboard, say "visual density 9" upfront instead of fighting the default airy spacing.

6. **Use impeccable alongside style skills.** Copy your chosen style skill as `SKILL.md` and impeccable as `.impeccable.md`. You get visual direction from one and quality enforcement from the other.

---

## Contributing

This is an evolving collection. To add a new project or skill:

- **New project:** Create a folder at the root with a descriptive name. Keep it self-contained.
- **New skill:** Add a folder under `skills/` with a `SKILL.md` inside. Update `README.md` with credits and source.
