---
name: product-images
description: Present product screenshots and app images beautifully on landing pages. Covers browser frames, phone mockups, floating compositions, perspective tilts, animated reveals, and placement patterns. No design tools needed — everything is pure HTML/CSS.
---

# Product Images Skill

## Step 1: Always Ask for Screenshots First

Before building any section that shows the product, ask:

> "Do you have screenshots or images of your product/app? If yes, share the files (PNG, JPG, WebP) and I'll present them beautifully. If no, I'll create a realistic-looking placeholder that you can swap out later."

---

## Step 2: Where to Place Product Images on a Landing Page

| Section | What to show | Style |
|---------|-------------|-------|
| **Hero** | Your best single screenshot or key screen | Large, framed, slightly angled or floating |
| **Features** | One screenshot per feature | Smaller, side-by-side with text |
| **How it works** | Step-by-step screens | Numbered sequence, left/right alternating |
| **Social proof** | App in context | Small, natural, unframed |

**Rule:** Never show more than 3 screenshots above the fold. One strong hero image beats a wall of screens.

---

## Step 3: Presentation Styles

Choose ONE style per section. Do not mix styles on the same page.

---

### Style 1: Browser Frame
Wraps a screenshot in a realistic browser chrome. Best for web apps and dashboards.

```html
<div class="browser-frame">
  <!-- Browser chrome -->
  <div class="browser-bar">
    <div class="browser-dots">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
    </div>
    <div class="browser-url">app.yourproduct.com</div>
  </div>
  <!-- Screenshot -->
  <div class="browser-content">
    <img src="screenshot.png" alt="Product screenshot" />
  </div>
</div>

<style>
.browser-frame {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 32px 64px -12px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06);
  background: #fff;
}
.browser-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.browser-dots { display: flex; gap: 6px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }
.browser-url {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #888;
  background: #e8e8e8;
  padding: 4px 12px;
  border-radius: 6px;
  max-width: 300px;
  margin: 0 auto;
}
.browser-content img { width: 100%; display: block; }
</style>
```

---

### Style 2: Phone Frame
Wraps a screenshot in a phone outline. Best for mobile apps.

```html
<div class="phone-frame">
  <div class="phone-notch"></div>
  <div class="phone-screen">
    <img src="screenshot.png" alt="App screenshot" />
  </div>
</div>

<style>
.phone-frame {
  position: relative;
  width: 280px;
  border-radius: 44px;
  border: 8px solid #1a1a1a;
  background: #1a1a1a;
  box-shadow:
    0 40px 80px -20px rgba(0,0,0,0.3),
    inset 0 0 0 2px rgba(255,255,255,0.1);
  overflow: hidden;
}
.phone-notch {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 80px; height: 28px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  z-index: 2;
}
.phone-screen {
  border-radius: 36px;
  overflow: hidden;
  padding-top: 28px;
}
.phone-screen img { width: 100%; display: block; }
</style>
```

---

### Style 3: Floating Shadow (No Frame)
Screenshot with a soft shadow, slightly elevated. Clean and modern. Best for minimal designs.

```html
<div class="floating-screenshot">
  <img src="screenshot.png" alt="Product screenshot" />
</div>

<style>
.floating-screenshot {
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.04),
    0 24px 48px -8px rgba(0,0,0,0.12),
    0 0 0 1px rgba(0,0,0,0.05);
  transform: translateY(0);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.floating-screenshot:hover {
  transform: translateY(-6px);
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.04),
    0 40px 64px -8px rgba(0,0,0,0.18),
    0 0 0 1px rgba(0,0,0,0.05);
}
.floating-screenshot img { width: 100%; display: block; }
</style>
```

---

### Style 4: Perspective Tilt (Hero Statement)
Screenshot angled in 3D perspective — the signature look of Linear, Vercel, Stripe hero sections. High impact. Use only in the hero, once per page.

```html
<div class="perspective-wrapper">
  <div class="perspective-screenshot">
    <div class="browser-frame">
      <!-- use browser-frame from Style 1 inside this -->
      <img src="screenshot.png" alt="Product screenshot" />
    </div>
  </div>
</div>

<style>
.perspective-wrapper {
  perspective: 1200px;
  perspective-origin: 50% 40%;
}
.perspective-screenshot {
  transform: rotateX(8deg) rotateY(-4deg) rotateZ(1deg);
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 12px;
  box-shadow:
    0 60px 120px -20px rgba(0,0,0,0.2),
    0 0 0 1px rgba(0,0,0,0.06);
}
.perspective-screenshot:hover {
  transform: rotateX(2deg) rotateY(-1deg) rotateZ(0deg);
}
</style>
```

---

### Style 5: Layered Floating Composition
Multiple screenshots stacked at different depths — creates a rich, dynamic hero. Use when you have 2–3 good screenshots.

```html
<div class="composition">
  <div class="comp-back">
    <img src="screenshot-2.png" alt="Secondary screen" />
  </div>
  <div class="comp-front">
    <img src="screenshot-1.png" alt="Primary screen" />
  </div>
</div>

<style>
.composition {
  position: relative;
  height: 480px;
}
.comp-back {
  position: absolute;
  top: 40px; right: 0;
  width: 75%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 32px 64px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05);
  opacity: 0.85;
}
.comp-front {
  position: absolute;
  bottom: 0; left: 0;
  width: 75%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 40px 80px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);
}
.comp-back img, .comp-front img { width: 100%; display: block; }

/* Mobile: stack vertically */
@media (max-width: 768px) {
  .composition { height: auto; }
  .comp-back, .comp-front {
    position: relative;
    width: 100%;
    top: auto; right: auto; bottom: auto; left: auto;
    margin-bottom: 16px;
    opacity: 1;
  }
}
</style>
```

---

### Style 6: Animated Scroll Reveal
Screenshot fades and slides up as the user scrolls to it. Works with any of the styles above — wrap it in this.

```html
<div class="reveal" style="--delay: 0ms">
  <!-- put any screenshot style here -->
</div>

<style>
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
</style>

<script>
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
```

---

## Step 4: Placeholder When No Screenshot Exists

If the user doesn't have a screenshot yet, use this realistic placeholder that they can swap out:

```html
<div class="screenshot-placeholder">
  <div class="placeholder-ui">
    <div class="placeholder-topbar">
      <div class="placeholder-block w-24 h-4"></div>
      <div class="placeholder-block w-16 h-4 ml-auto"></div>
    </div>
    <div class="placeholder-content">
      <div class="placeholder-block w-full h-32"></div>
      <div class="placeholder-row">
        <div class="placeholder-block w-1/3 h-20"></div>
        <div class="placeholder-block w-1/3 h-20"></div>
        <div class="placeholder-block w-1/3 h-20"></div>
      </div>
      <div class="placeholder-block w-3/4 h-4"></div>
      <div class="placeholder-block w-1/2 h-4"></div>
    </div>
  </div>
</div>

<style>
.screenshot-placeholder {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fafafa;
}
.placeholder-topbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  background: #f5f5f5;
}
.placeholder-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.placeholder-row { display: flex; gap: 12px; }
.placeholder-block {
  background: linear-gradient(90deg, #ebebeb 25%, #f5f5f5 50%, #ebebeb 75%);
  background-size: 200% 100%;
  border-radius: 6px;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
```

---

## Step 5: Rules

- **Always use `width: 100%; height: auto`** on `<img>` tags — never hardcode pixel dimensions
- **Always add `alt` text** describing what the screen shows (not just "screenshot")
- **Never use `h-screen` or fixed heights** on screenshot containers — let the image define the height
- **On mobile**, all perspective tilts and layered compositions must fall back to a simple stacked layout
- **Max file size guidance**: ask the user to export screenshots at 2x resolution (e.g., 1400px wide for a screenshot that displays at 700px) for retina sharpness
- **WebP format** is preferred over PNG for performance — mention this to the user if they share PNG files
- **Never stretch** a screenshot to fill a container — use `object-fit: cover` only if cropping is intentional
