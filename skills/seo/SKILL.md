---
name: seo
description: Technical and on-page SEO for landing pages and websites. Covers meta tags, Open Graph, JSON-LD structured data, semantic HTML, page speed rules, and URL structure. Implement on every page by default.
---

# SEO Skill

## Rule: Apply to Every Page by Default

SEO is not optional. Every landing page or website built using this repo must implement the full checklist below without being asked. Do not wait for the user to request SEO — it should be baked in from the start.

---

## 1. HTML Head — Required Tags

Add all of the following inside `<head>` on every page:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary SEO -->
  <title>[Product Name] — [One-line value proposition, max 60 chars]</title>
  <meta name="description" content="[2-sentence description of what this is and who it's for. Max 160 characters.]" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://yoursite.com/" />

  <!-- Open Graph (Facebook, LinkedIn, iMessage previews) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="[Same as <title>]" />
  <meta property="og:description" content="[Same as meta description]" />
  <meta property="og:url" content="https://yoursite.com/" />
  <meta property="og:image" content="https://yoursite.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="[Product Name]" />

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Same as <title>]" />
  <meta name="twitter:description" content="[Same as meta description]" />
  <meta name="twitter:image" content="https://yoursite.com/og-image.png" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
```

**Always ask the user for:**
- Their canonical URL (the real domain)
- A one-line value proposition for the title
- Whether they have an OG image (1200×630px). If not, note it as a TODO comment in the code.

---

## 2. JSON-LD Structured Data

Add this inside `<head>` or before `</body>`. Structured data helps Google show rich results and helps AI search engines understand what your product is.

### For a SaaS / App product:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Product Name]",
  "description": "[What it does in one sentence]",
  "applicationCategory": "[e.g. BusinessApplication, MobileApplication]",
  "operatingSystem": "[e.g. iOS, Android, Web]",
  "url": "https://yoursite.com",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "[Creator name]"
  }
}
</script>
```

### For a general landing page / idea:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[Product Name]",
  "description": "[What it does]",
  "url": "https://yoursite.com"
}
</script>
```

### If there are FAQs on the page:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
</script>
```

---

## 3. Semantic HTML

Use the correct HTML elements — search engines and AI use these to understand page structure.

| Use this | Instead of | Why |
|----------|-----------|-----|
| `<header>` | `<div class="header">` | Marks the page header |
| `<nav>` | `<div class="nav">` | Marks navigation |
| `<main>` | `<div class="main">` | Marks main content |
| `<section>` | `<div class="section">` | Groups related content |
| `<article>` | `<div class="post">` | Self-contained content |
| `<footer>` | `<div class="footer">` | Marks the footer |
| `<h1>` | `<p class="hero-text">` | Only ONE h1 per page |
| `<h2>`, `<h3>` | `<div class="subtitle">` | Hierarchy matters |

**Rules:**
- One `<h1>` per page — it should be your main value proposition
- `<h2>` for section headings, `<h3>` for sub-sections
- Never skip heading levels (don't go from h1 to h3)
- Every image needs a descriptive `alt` attribute
- Every link needs meaningful text — never "click here"

---

## 4. Page Speed Rules

Page speed is a Google ranking factor. Follow these on every page:

- **Fonts**: Use `font-display: swap` to prevent invisible text while fonts load
- **Images**: Always add `width` and `height` attributes on `<img>` to prevent layout shift
- **Images**: Use `loading="lazy"` on images below the fold
- **Images**: Prefer WebP format over PNG/JPG
- **Critical CSS**: Inline above-the-fold styles in `<style>` tags when possible for HTML-only pages
- **No unused JS**: Don't load scripts for features you're not using
- **Preconnect**: Add `<link rel="preconnect">` for any external font or asset domains

```html
<!-- Example: preconnect for Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

---

## 5. URL and Content Rules

- Page URL should describe the content: `/features` not `/page2`
- Title tag should be unique on every page — never duplicate
- Meta description should be unique on every page
- First paragraph of each section should clearly state what that section is about
- Use keywords naturally in headings and first 100 words — never stuff them
- Every CTA button should have descriptive text: "Start free trial" not "Click here"

---

## 6. sitemap.xml and robots.txt

For multi-page sites, create these two files at the root:

**robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 7. SEO Checklist — Run Before Finishing Any Page

- [ ] `<title>` is under 60 characters and includes the product name
- [ ] `<meta name="description">` is 120–160 characters
- [ ] Canonical URL is set correctly
- [ ] Open Graph tags are all filled in
- [ ] Twitter card tags are filled in
- [ ] OG image exists (1200×630px) or is marked as TODO
- [ ] JSON-LD structured data is included
- [ ] One and only one `<h1>` on the page
- [ ] All images have `alt` attributes
- [ ] All images have `width` and `height` attributes
- [ ] `loading="lazy"` on below-the-fold images
- [ ] `<header>`, `<main>`, `<footer>`, `<nav>` used correctly
- [ ] No "click here" link text
- [ ] `robots.txt` exists (for deployed sites)
- [ ] `sitemap.xml` exists (for multi-page sites)
