Calculate the token consumption and cost for a task in this repo. Always reads the current state of all skill files — never uses cached or hardcoded sizes.

## Instructions

The user may pass a task type as an argument: `$ARGUMENTS`

Valid task types: `build-landing-page`, `add-page`, `edit-navbar`, `full-audit`, `sizes`, `all`

If no argument is given, default to `build-landing-page`.

---

### Step 1 — Measure every skill file right now

Run this shell command to get current byte counts for all skill files and repo context files:

```bash
find . -path './.git' -prune -o \( -name "SKILL.md" -o -name "CLAUDE.md" -o -name "SKILLS_INDEX.md" -o -path "*/skills/*" -name "*.md" \) -print | sort | while read f; do bytes=$(wc -c < "$f" 2>/dev/null || echo 0); echo "$bytes $f"; done
```

Also run this to get the total size of the impeccable commands folder:
```bash
find ./skills/impeccable/commands -name "*.md" | xargs wc -c 2>/dev/null | tail -1
```

And this to count how many .html files exist in site/ folders (to estimate existing project size):
```bash
find ./output -name "*.html" 2>/dev/null | wc -l
```

### Step 2 — Calculate tokens for each file

Token estimate = bytes / 4 (standard approximation for Claude models)

For each file, compute:
- `tokens = bytes / 4`

### Step 3 — Identify which files get loaded for the requested task

Use this map to determine which skills Claude reads for each task type:

**`build-landing-page`** — full new project from scratch:
- Always loaded: `CLAUDE.md`, `SKILLS_INDEX.md`
- Pre-build: `skills/logo/SKILL.md`, `skills/product-images/SKILL.md`, `skills/impeccable/SKILL.md`
- Style skill: one of `taste-skill`, `soft-skill`, `minimalist-skill`, `brutalist-skill` — use the average of all four
- Mandatory standards: `skills/security/SKILL.md`, `skills/legal/SKILL.md`, `skills/seo/SKILL.md`, `skills/aeo/SKILL.md`
- Content reference: `skills/landing-page-design/patterns.md`, `skills/landing-page-design/anti-patterns.md`, `skills/copywriting/patterns.md`, `skills/branding/patterns.md`
- Post-build: `skills/sync/SKILL.md`
- Estimated output tokens: 8,000 (index.html ~3k + 3 legal pages ~4.5k + configs ~500)

**`add-page`** — adding one new page to an existing project:
- `CLAUDE.md`, `skills/security/SKILL.md`, `skills/legal/SKILL.md`, `skills/seo/SKILL.md`, `skills/sync/SKILL.md`
- Plus reading existing index.html to copy navbar/footer: ~800 tokens
- Estimated output tokens: 2,000

**`edit-navbar`** — updating the navbar and propagating the change:
- `CLAUDE.md`, `skills/sync/SKILL.md`
- Plus reading all existing .html files to update them: ~1,200 tokens
- Estimated output tokens: 800

**`full-audit`** — `/sync all` or consistency check across entire project:
- `CLAUDE.md`, `SKILLS_INDEX.md`, `skills/sync/SKILL.md`, `skills/security/SKILL.md`, `skills/legal/SKILL.md`, `skills/seo/SKILL.md`, `skills/aeo/SKILL.md`
- Plus reading all site/ .html files: ~4,000 tokens
- Estimated output tokens: 4,000

**`sizes`** — just show raw token sizes for every skill file, no task estimate.

**`all`** — show all four task estimates plus the sizes table.

### Step 4 — Apply conversation accumulation overhead

Multiply total unique input tokens by **1.35** to account for conversation accumulation. In Claude Code, every API call re-sends the full conversation history, so files read early in a session inflate the token cost of later turns.

`adjusted_input = sum_of_skill_tokens × 1.35`

### Step 5 — Calculate cost

Use current Claude pricing:

| Model | Input | Output |
|---|---|---|
| Claude Sonnet 4.6 | $3 / 1M tokens | $15 / 1M tokens |
| Claude Opus 4.6 | $15 / 1M tokens | $75 / 1M tokens |

`input_cost = (adjusted_input / 1,000,000) × input_rate`
`output_cost = (output_tokens / 1,000,000) × output_rate`
`total_cost = input_cost + output_cost`

### Step 6 — Present the results

Show a clean breakdown with:
1. **Files loaded** — list each skill file with its current token count
2. **Input subtotal** — sum before overhead
3. **Adjusted input** — after 1.35× overhead
4. **Output estimate** — with notes on what's included
5. **Grand total tokens**
6. **Cost in USD** for both Sonnet 4.6 and Opus 4.6

Flag anything that stands out — e.g. if a single skill file is unusually large, note it as a token cost hotspot worth watching.

If the task type is `sizes`, skip the task estimate and just show a table of every skill file with its current byte count and token count, sorted by size descending. This is useful for identifying which skills are the most expensive to load.
