# Project Rules

## Output Policy

**All files generated for user tasks MUST be created inside a subfolder within `output/`.**

- Never create generated files (HTML, CSS, JS, images, etc.) in the repo root or inside `skills/`.
- For each task, create a descriptively named subfolder: `output/<project-name>/`.
- The `output/` directory is gitignored. Never stage, commit, or push anything inside it.
- The `skills/` folder is for design instruction files only — never write generated code there.

Examples:
```
output/landing-page/index.html       # Correct
output/dashboard-v2/src/App.tsx      # Correct
landing-page/index.html              # WRONG — not inside output/
index.html                           # WRONG — not inside output/
skills/my-project/index.html         # WRONG — skills/ is for SKILL.md files only
```
