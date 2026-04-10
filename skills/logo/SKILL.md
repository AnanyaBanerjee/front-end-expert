---
name: logo
description: Ask the user for a logo, handle it correctly on a landing page, or create a clean SVG wordmark if none exists. Covers placement, sizing, and fallback creation. Non-developer friendly.
---

# Logo Skill

## Step 1: Always Ask First

Before building or redesigning any landing page, ask the user:

> "Do you have a logo for this product, app, or idea?
> - If **yes** — share the file (PNG, SVG, or JPG) or a link to it
> - If **no** — tell me the product name and I'll create a clean text-based logo for you"

Do not skip this step. Do not assume there is no logo. Do not invent a logo without asking.

---

## Step 2: If the User Provides a Logo

### File handling
- Save the logo file in the project folder (e.g., `logo.svg`, `logo.png`)
- Never rename it without asking
- Never alter, recolor, or crop the logo without asking

### Placement rules
| Location | Position | Size | Notes |
|----------|----------|------|-------|
| **Navbar** | Top-left | 28–36px height | Linked to `/`. Always present. |
| **Hero** | Optional | 40–56px height | Only if the hero is otherwise text-only and the logo adds context |
| **Footer** | Bottom-left or centered | 20–24px height | Muted (`opacity-60`). Repeat of navbar logo. |
| **Favicon** | `<link rel="icon">` | 32×32px | Use the icon/mark variant if available; fall back to first letter |

### On dark vs light backgrounds
- On a **dark background**: check if a light/white version exists — ask the user if unsure
- On a **light background**: use the standard version
- Never place a dark logo on a dark background — always ensure contrast

### What never to do
- Never stretch or squish the logo — always preserve aspect ratio
- Never put a drop shadow on a logo unless it was designed with one
- Never place the logo so large it dominates the page
- Never repeat the logo more than 3 times on a single page (navbar + hero + footer is the max)
- Never use a blurry or low-resolution version — ask the user for a better file if it looks pixelated

---

## Step 3: If the User Has No Logo

Create a clean SVG wordmark using these rules:

### Design rules
- Use the product name in title case (e.g., "AgentChat Hub" → `AgentChat Hub`)
- Choose a font from the active SKILL.md's approved typefaces — never use Inter, Roboto, or Arial
- Pick one color: the primary brand color or a neutral near-black (`#1a1a1a` for light mode, `#f5f5f5` for dark mode)
- Keep it simple: text only, no icons, no gradients, no decorative elements
- Optional: a single letter or two-letter monogram as a compact icon variant for favicon use

### SVG template
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" width="200" height="40">
  <text
    x="0" y="30"
    font-family="'Geist', 'Outfit', 'Cabinet Grotesk', sans-serif"
    font-size="28"
    font-weight="600"
    fill="#1a1a1a"
    letter-spacing="-0.5"
  >ProductName</text>
</svg>
```

Replace:
- `ProductName` with the actual product name
- `font-family` with the active skill's approved font
- `fill` with the brand's primary color
- `font-size` and `letter-spacing` to match the visual style

### Save it
- Save as `logo.svg` in the project folder
- Also create `logo-light.svg` (white fill) for use on dark backgrounds
- Reference both in the HTML as appropriate

---

## Step 4: Using the Logo Across the Page

### Navbar example
```html
<a href="/" class="flex items-center">
  <img src="logo.svg" alt="ProductName" class="h-8 w-auto" />
</a>
```

### Footer example
```html
<img src="logo.svg" alt="ProductName" class="h-5 w-auto opacity-60" />
```

### Key rules
- Always include a descriptive `alt` attribute — use the product name, not "logo"
- Always use `w-auto` alongside a fixed height to preserve aspect ratio
- Never hardcode a width — let it scale from height
