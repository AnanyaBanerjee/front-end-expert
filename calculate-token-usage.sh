#!/bin/bash
#
# calculate-token-usage — estimate token consumption for tasks in this repo
#
# Usage:
#   ./calculate-token-usage.sh                  → full breakdown (default: build-landing-page)
#   ./calculate-token-usage.sh build-landing-page
#   ./calculate-token-usage.sh add-page
#   ./calculate-token-usage.sh edit-navbar
#   ./calculate-token-usage.sh full-audit
#   ./calculate-token-usage.sh all              → show all task types
#
# Token estimate: characters / 4 (standard approximation for Claude models)
# Pricing (as of 2025): Claude Sonnet 4.6 at $3/MTok input, $15/MTok output
#

set -e

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
TASK="${1:-build-landing-page}"

# ─── helpers ────────────────────────────────────────────────────────────────

tokens_for() {
  local file="$REPO_ROOT/$1"
  if [ -f "$file" ]; then
    echo $(( $(wc -c < "$file") / 4 ))
  else
    echo 0
  fi
}

print_row() {
  printf "  %-52s %6s tokens\n" "$1" "$2"
}

separator() {
  printf "  %s\n" "$(printf '─%.0s' {1..62})"
}

print_header() {
  echo ""
  echo "  ┌──────────────────────────────────────────────────────────────┐"
  printf "  │  %-60s│\n" "$1"
  echo "  └──────────────────────────────────────────────────────────────┘"
  echo ""
}

cost_usd() {
  local tokens=$1
  local rate_per_mtok=$2  # in dollars
  echo "scale=4; $tokens * $rate_per_mtok / 1000000" | bc
}

# ─── measure actual file sizes ──────────────────────────────────────────────

T_CLAUDE_MD=$(tokens_for "CLAUDE.md")
T_SKILLS_INDEX=$(tokens_for "SKILLS_INDEX.md")
T_LOGO=$(tokens_for "skills/logo/SKILL.md")
T_PRODUCT_IMAGES=$(tokens_for "skills/product-images/SKILL.md")
T_IMPECCABLE=$(tokens_for "skills/impeccable/SKILL.md")
T_TASTE=$(tokens_for "skills/taste-skill/SKILL.md")
T_SOFT=$(tokens_for "skills/soft-skill/SKILL.md")
T_MINIMALIST=$(tokens_for "skills/minimalist-skill/SKILL.md")
T_BRUTALIST=$(tokens_for "skills/brutalist-skill/SKILL.md")
T_EMIL=$(tokens_for "skills/emil-design-eng/SKILL.md")
T_SECURITY=$(tokens_for "skills/security/SKILL.md")
T_LEGAL=$(tokens_for "skills/legal/SKILL.md")
T_SEO=$(tokens_for "skills/seo/SKILL.md")
T_AEO=$(tokens_for "skills/aeo/SKILL.md")
T_SYNC=$(tokens_for "skills/sync/SKILL.md")
T_LP_PATTERNS=$(tokens_for "skills/landing-page-design/patterns.md")
T_LP_ANTI=$(tokens_for "skills/landing-page-design/anti-patterns.md")
T_COPY_PATTERNS=$(tokens_for "skills/copywriting/patterns.md")
T_BRAND_PATTERNS=$(tokens_for "skills/branding/patterns.md")

# impeccable commands (only loaded when user runs /impeccable <cmd>)
T_IMP_COMMANDS=0
for f in "$REPO_ROOT/skills/impeccable/commands/"*.md; do
  [ -f "$f" ] && T_IMP_COMMANDS=$(( T_IMP_COMMANDS + $(wc -c < "$f") / 4 ))
done

# ─── task definitions ────────────────────────────────────────────────────────
# Each task lists which skills get read, plus estimated output tokens.
# Input overhead: 1.35x multiplier accounts for conversation accumulation
# (each API call re-sends the full conversation history, so files read
# early in the conversation inflate later turns' input token counts).

OVERHEAD_FACTOR="1.35"

build_landing_page() {
  print_header "Task: build-landing-page  (e.g. 'build a landing page for abc')"

  # Always-read context
  local always=$(( T_CLAUDE_MD + T_SKILLS_INDEX ))
  echo "  ALWAYS-LOADED CONTEXT"
  print_row "CLAUDE.md (auto-loaded as system context)" "$T_CLAUDE_MD"
  print_row "SKILLS_INDEX.md (routing reference)" "$T_SKILLS_INDEX"
  separator

  # Pre-build skills
  local prebuild=$(( T_LOGO + T_PRODUCT_IMAGES + T_IMPECCABLE ))
  echo "  PRE-BUILD SKILLS (logo, screenshots, design context)"
  print_row "skills/logo/SKILL.md" "$T_LOGO"
  print_row "skills/product-images/SKILL.md" "$T_PRODUCT_IMAGES"
  print_row "skills/impeccable/SKILL.md (teach mode)" "$T_IMPECCABLE"
  separator

  # Style skill — show range
  local style_min=$T_MINIMALIST
  local style_max=$T_TASTE
  local style_avg=$(( (T_TASTE + T_SOFT + T_MINIMALIST + T_BRUTALIST) / 4 ))
  echo "  STYLE SKILL (one of these, not all)"
  print_row "skills/taste-skill/SKILL.md" "$T_TASTE"
  print_row "skills/soft-skill/SKILL.md" "$T_SOFT"
  print_row "skills/minimalist-skill/SKILL.md" "$T_MINIMALIST"
  print_row "skills/brutalist-skill/SKILL.md" "$T_BRUTALIST"
  printf "  %-52s %6s tokens (avg)\n" "  → counted as average" "$style_avg"
  separator

  # Mandatory 4 standards
  local mandatory=$(( T_SECURITY + T_LEGAL + T_SEO + T_AEO ))
  echo "  MANDATORY STANDARDS (all 4, every project)"
  print_row "skills/security/SKILL.md" "$T_SECURITY"
  print_row "skills/legal/SKILL.md" "$T_LEGAL"
  print_row "skills/seo/SKILL.md" "$T_SEO"
  print_row "skills/aeo/SKILL.md" "$T_AEO"
  separator

  # Content/copy reference
  local content=$(( T_LP_PATTERNS + T_LP_ANTI + T_COPY_PATTERNS + T_BRAND_PATTERNS ))
  echo "  CONTENT REFERENCE (read if writing copy)"
  print_row "skills/landing-page-design/patterns.md" "$T_LP_PATTERNS"
  print_row "skills/landing-page-design/anti-patterns.md" "$T_LP_ANTI"
  print_row "skills/copywriting/patterns.md" "$T_COPY_PATTERNS"
  print_row "skills/branding/patterns.md" "$T_BRAND_PATTERNS"
  separator

  # Post-build
  local postbuild=$T_SYNC
  echo "  POST-BUILD"
  print_row "skills/sync/SKILL.md (after completing the build)" "$T_SYNC"
  separator

  # Totals
  local raw_input=$(( always + prebuild + style_avg + mandatory + content + postbuild ))
  local input_with_overhead=$(echo "scale=0; $raw_input * $OVERHEAD_FACTOR / 1" | bc)
  local conv_overhead=$(( input_with_overhead - raw_input ))

  # Estimated output: index.html (~3k) + 3 legal pages (~4.5k) + configs (~500)
  local output_est=8000

  local total=$(( input_with_overhead + output_est ))

  echo ""
  echo "  INPUT BREAKDOWN"
  printf "  %-52s %6s tokens\n" "Skill files (unique tokens read)" "$raw_input"
  printf "  %-52s %6s tokens\n" "Conversation accumulation overhead (×${OVERHEAD_FACTOR})" "$conv_overhead"
  separator
  printf "  %-52s %6s tokens\n" "Total input" "$input_with_overhead"
  echo ""
  echo "  OUTPUT BREAKDOWN (estimated)"
  print_row "index.html (full landing page)" "~3,000"
  print_row "privacy-policy.html + terms.html + dmca.html" "~4,500"
  print_row "llms.txt, robots.txt, sitemap.xml, _headers, logo.svg" "~500"
  print_row "Conversational responses (questions, confirmations)" "~500"
  separator
  printf "  %-52s %6s tokens\n" "Total output" "~$output_est"

  echo ""
  separator
  printf "  %-52s %6s tokens\n" "TOTAL (input + output)" "~$total"
  echo ""

  # Cost
  local input_cost=$(cost_usd $input_with_overhead 3)
  local output_cost=$(cost_usd $output_est 15)
  local total_cost=$(echo "scale=4; $input_cost + $output_cost" | bc)

  echo "  COST ESTIMATE (Claude Sonnet 4.6 — \$3/MTok in, \$15/MTok out)"
  printf "  %-52s \$%s\n" "Input cost" "$input_cost"
  printf "  %-52s \$%s\n" "Output cost" "$output_cost"
  printf "  %-52s \$%s\n" "Total cost per build" "$total_cost"

  # Opus
  local opus_input=$(cost_usd $input_with_overhead 15)
  local opus_output=$(cost_usd $output_est 75)
  local opus_total=$(echo "scale=4; $opus_input + $opus_output" | bc)
  echo ""
  echo "  COST ESTIMATE (Claude Opus 4.6 — \$15/MTok in, \$75/MTok out)"
  printf "  %-52s \$%s\n" "Input cost" "$opus_input"
  printf "  %-52s \$%s\n" "Output cost" "$opus_output"
  printf "  %-52s \$%s\n" "Total cost per build" "$opus_total"
  echo ""
}

add_page() {
  print_header "Task: add-page  (e.g. 'add an about page')"

  local input_raw=$(( T_CLAUDE_MD + T_SKILLS_INDEX + T_SECURITY + T_LEGAL + T_SEO + T_SYNC ))
  local input=$(echo "scale=0; $input_raw * $OVERHEAD_FACTOR / 1" | bc)
  local output=2000
  local total=$(( input + output ))

  echo "  SKILLS READ"
  print_row "CLAUDE.md" "$T_CLAUDE_MD"
  print_row "skills/security/SKILL.md" "$T_SECURITY"
  print_row "skills/legal/SKILL.md" "$T_LEGAL"
  print_row "skills/seo/SKILL.md" "$T_SEO"
  print_row "skills/sync/SKILL.md" "$T_SYNC"
  print_row "existing index.html (to copy navbar/footer)" "~800"
  separator
  printf "  %-52s %6s tokens\n" "Total input (with overhead)" "$input"
  printf "  %-52s %6s tokens\n" "Total output (new page)" "~$output"
  printf "  %-52s %6s tokens\n" "TOTAL" "~$total"
  echo ""
  printf "  Cost (Sonnet 4.6): \$%s\n" "$(echo "scale=4; $input * 3 / 1000000 + $output * 15 / 1000000" | bc)"
  echo ""
}

edit_navbar() {
  print_header "Task: edit-navbar  (e.g. 'update the navbar links')"

  local input_raw=$(( T_CLAUDE_MD + T_SYNC + 1200 ))  # +1200 for reading existing HTML files
  local input=$(echo "scale=0; $input_raw * $OVERHEAD_FACTOR / 1" | bc)
  local output=800
  local total=$(( input + output ))

  echo "  SKILLS READ"
  print_row "CLAUDE.md" "$T_CLAUDE_MD"
  print_row "skills/sync/SKILL.md" "$T_SYNC"
  print_row "existing .html files (to propagate change)" "~1,200"
  separator
  printf "  %-52s %6s tokens\n" "Total input (with overhead)" "$input"
  printf "  %-52s %6s tokens\n" "Total output (updated pages)" "~$output"
  printf "  %-52s %6s tokens\n" "TOTAL" "~$total"
  echo ""
  printf "  Cost (Sonnet 4.6): \$%s\n" "$(echo "scale=4; $input * 3 / 1000000 + $output * 15 / 1000000" | bc)"
  echo ""
}

full_audit() {
  print_header "Task: full-audit  ('/sync all' or 'check everything is up to date')"

  local input_raw=$(( T_CLAUDE_MD + T_SKILLS_INDEX + T_SYNC + T_SECURITY + T_LEGAL + T_SEO + T_AEO + 4000 ))
  local input=$(echo "scale=0; $input_raw * $OVERHEAD_FACTOR / 1" | bc)
  local output=4000
  local total=$(( input + output ))

  echo "  SKILLS READ"
  print_row "CLAUDE.md" "$T_CLAUDE_MD"
  print_row "SKILLS_INDEX.md" "$T_SKILLS_INDEX"
  print_row "skills/sync/SKILL.md (full audit mode)" "$T_SYNC"
  print_row "skills/security/SKILL.md" "$T_SECURITY"
  print_row "skills/legal/SKILL.md" "$T_LEGAL"
  print_row "skills/seo/SKILL.md" "$T_SEO"
  print_row "skills/aeo/SKILL.md" "$T_AEO"
  print_row "all site/ .html files (read for comparison)" "~4,000"
  separator
  printf "  %-52s %6s tokens\n" "Total input (with overhead)" "$input"
  printf "  %-52s %6s tokens\n" "Total output (audit report + fixes)" "~$output"
  printf "  %-52s %6s tokens\n" "TOTAL" "~$total"
  echo ""
  printf "  Cost (Sonnet 4.6): \$%s\n" "$(echo "scale=4; $input * 3 / 1000000 + $output * 15 / 1000000" | bc)"
  echo ""
}

skill_file_sizes() {
  print_header "Skill file sizes (actual measured values)"
  echo "  These are the raw token costs of loading each skill file into context."
  echo ""
  print_row "CLAUDE.md (auto-loaded)" "$T_CLAUDE_MD"
  print_row "SKILLS_INDEX.md" "$T_SKILLS_INDEX"
  separator
  echo "  Style skills (pick one):"
  print_row "  taste-skill/SKILL.md" "$T_TASTE"
  print_row "  soft-skill/SKILL.md" "$T_SOFT"
  print_row "  minimalist-skill/SKILL.md" "$T_MINIMALIST"
  print_row "  brutalist-skill/SKILL.md" "$T_BRUTALIST"
  print_row "  emil-design-eng/SKILL.md" "$T_EMIL"
  separator
  echo "  Pre-build skills:"
  print_row "  logo/SKILL.md" "$T_LOGO"
  print_row "  product-images/SKILL.md" "$T_PRODUCT_IMAGES"
  print_row "  impeccable/SKILL.md" "$T_IMPECCABLE"
  print_row "  impeccable/commands/ (all 17 commands, if invoked)" "$T_IMP_COMMANDS"
  separator
  echo "  Mandatory standards:"
  print_row "  security/SKILL.md" "$T_SECURITY"
  print_row "  legal/SKILL.md" "$T_LEGAL"
  print_row "  seo/SKILL.md" "$T_SEO"
  print_row "  aeo/SKILL.md" "$T_AEO"
  separator
  echo "  Content reference:"
  print_row "  landing-page-design/patterns.md" "$T_LP_PATTERNS"
  print_row "  landing-page-design/anti-patterns.md" "$T_LP_ANTI"
  print_row "  copywriting/patterns.md" "$T_COPY_PATTERNS"
  print_row "  branding/patterns.md" "$T_BRAND_PATTERNS"
  separator
  echo "  Post-build:"
  print_row "  sync/SKILL.md" "$T_SYNC"
  echo ""
  echo "  NOTE: Emil design eng skill ($T_EMIL tokens) is heavy."
  echo "  Only load it when reviewing animations or doing motion QA."
  echo ""
}

# ─── dispatch ────────────────────────────────────────────────────────────────

echo ""
echo "  calculate-token-usage — front-end-tech repo"
echo "  Token approximation: characters / 4  |  Pricing: Sonnet 4.6"

case "$TASK" in
  build-landing-page) build_landing_page ;;
  add-page)           add_page ;;
  edit-navbar)        edit_navbar ;;
  full-audit)         full_audit ;;
  sizes)              skill_file_sizes ;;
  all)
    build_landing_page
    add_page
    edit_navbar
    full_audit
    skill_file_sizes
    ;;
  *)
    echo ""
    echo "  Unknown task: $TASK"
    echo "  Available tasks: build-landing-page | add-page | edit-navbar | full-audit | sizes | all"
    echo ""
    exit 1
    ;;
esac
