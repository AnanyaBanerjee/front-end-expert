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

# Validate style skill exists
if [ ! -f "$REPO_ROOT/skills/$STYLE_SKILL/SKILL.md" ]; then
  echo "Error: Style skill '$STYLE_SKILL' not found."
  echo "Available: taste-skill, soft-skill, minimalist-skill, brutalist-skill"
  exit 1
fi

# Create project folder
mkdir -p "$PROJECT_DIR"

# 1. Copy style skill as active SKILL.md
cp "$REPO_ROOT/skills/$STYLE_SKILL/SKILL.md" "$PROJECT_DIR/SKILL.md"
echo "Copied $STYLE_SKILL as SKILL.md"

# 2. Copy impeccable as secondary context
cp "$REPO_ROOT/skills/impeccable/SKILL.md" "$PROJECT_DIR/.impeccable.md"
echo "Copied impeccable as .impeccable.md"

# 3. Create CLAUDE.md that references all other layers
cat > "$PROJECT_DIR/CLAUDE.md" << 'EOF'
# Project Rules

## Design Skills

This project uses layered design skills:
- **SKILL.md** — Active style skill (visual direction)
- **.impeccable.md** — Design quality, anti-patterns, and accessibility
- For page structure, hero formulas, and conversion patterns, also follow `../../skills/landing-page-design/patterns.md`, `../../skills/landing-page-design/anti-patterns.md`, and `../../skills/landing-page-design/decisions.md`
- For animation and interaction implementation, also follow `../../skills/emil-design-eng/SKILL.md`

## Output

All generated files must stay in this folder.
EOF
echo "Created CLAUDE.md with all skill layer references"

echo ""
echo "Project ready at: output/$PROJECT_NAME/"
echo ""
echo "Active layers:"
echo "  Structure:   landing-page-design (via CLAUDE.md)"
echo "  Style:       $STYLE_SKILL (SKILL.md)"
echo "  Quality:     impeccable (.impeccable.md)"
echo "  Engineering: emil-design-eng (via CLAUDE.md)"
echo ""
echo "cd output/$PROJECT_NAME and start building!"
