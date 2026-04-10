# How to Improve SEO for Your Landing Pages

SEO (Search Engine Optimization) is how Google and Bing find, understand, and rank your page. This guide covers everything you need to know — and everything Claude will automatically implement when building your pages.

---

## The Big Picture

Search engines send crawlers to read your page. The crawler looks at:
1. **What the page is about** (title, headings, content)
2. **Who should see it** (keywords, audience signals)
3. **How trustworthy it is** (structure, links, load speed)
4. **How good the experience is** (mobile-friendly, fast, accessible)

Good SEO means making all four as clear and strong as possible.

---

## What Claude Will Do Automatically

Every page built with this repo includes:
- ✅ Optimized `<title>` tag (under 60 characters)
- ✅ Meta description (120–160 characters)
- ✅ Open Graph tags (for link previews on social media and messaging apps)
- ✅ Twitter/X card tags
- ✅ JSON-LD structured data (helps Google show rich results)
- ✅ Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`)
- ✅ Correct heading hierarchy (one `<h1>`, then `<h2>`, `<h3>`)
- ✅ Image `alt` attributes
- ✅ Page speed rules (lazy loading, font display swap, preconnect)
- ✅ `robots.txt` and `sitemap.xml` stubs for deployed sites

---

## What You Need to Provide

Claude can't guess these — you need to provide them:

### 1. Your real domain URL
The canonical URL tells Google which URL is the "official" version of your page. If you don't have a domain yet, it can be added later.

### 2. A clear one-line value proposition
This becomes your `<title>` tag — the blue link text people see in Google results. It should answer: "What is this and why should I click?"

**Good examples:**
- `AgentChat Hub — Chat with Any AI Agent, No Account Needed`
- `Railgun — Deploy Containers in Under 3 Seconds`
- `Canopy — Carbon Tracking for Teams`

**Bad examples:**
- `Home` (says nothing)
- `The Best App in the World` (not credible)
- `Welcome to Our Website!!!` (wasted 60 characters)

### 3. A meta description
The gray text under the blue link in Google. Two sentences max. State what you do and who it's for.

**Good example:**
> Connect to any A2A-compatible AI agent via URL. Real-time streaming, no account required. Free on iOS and Mac.

**Bad example:**
> We are a revolutionary next-generation platform that will transform how you interact with AI forever.

### 4. An OG image (social preview image)
When someone shares your link on LinkedIn, Twitter, Slack, or iMessage, this is the image that shows up. Size: **1200 × 630 pixels**.

It should include:
- Your product name
- A short tagline or screenshot
- Your logo

If you don't have one, note it as a TODO. Claude will leave a placeholder comment in the code.

---

## The Things That Matter Most (In Order)

### 1. Page title and meta description
These are what people see before clicking. They directly affect click-through rate.

### 2. One clear H1 heading
Google uses your `<h1>` as the primary signal for what the page is about. One page, one H1. Make it count.

### 3. Fast load time
Google measures Core Web Vitals:
- **LCP** (Largest Contentful Paint): How fast the main content loads. Target: under 2.5 seconds.
- **CLS** (Cumulative Layout Shift): Does the page jump around as it loads? Target: 0.
- **INP** (Interaction to Next Paint): How responsive is the page? Target: under 200ms.

The pages built in this repo are HTML/CSS-first which naturally scores well. Common mistakes that hurt speed:
- Large unoptimized images (export at 2x but compress to WebP)
- Loading fonts without `font-display: swap`
- Embedding videos directly instead of using a thumbnail + link

### 4. Mobile-friendly layout
Over 60% of searches happen on mobile. All pages built here use responsive layouts by default.

### 5. Semantic HTML structure
Using `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` instead of generic `<div>` tags tells crawlers exactly what each part of the page does.

### 6. Descriptive links and alt text
Never use "click here" as link text. Never leave images without alt text. Both hurt accessibility AND SEO.

---

## Structured Data (JSON-LD) — Why It Matters

Structured data is hidden code that tells Google exactly what kind of thing your page describes. It can unlock **rich results** — enhanced listings with stars, prices, FAQs, or app download buttons directly in search results.

For your use case the most valuable types are:
- **SoftwareApplication** — for apps (shows ratings, price, platform)
- **FAQPage** — for FAQ sections (expands to show Q&A directly in search results)
- **WebSite** — baseline for any landing page

Claude adds this automatically based on what type of product you're building.

---

## Common SEO Mistakes to Avoid

| Mistake | Why it hurts | Fix |
|---------|-------------|-----|
| Duplicate title tags | Google doesn't know which page to rank | Make every title unique |
| No meta description | Google writes its own — usually badly | Always write yours |
| Missing alt text on images | Can't be indexed, hurts accessibility | Describe every image |
| Slow-loading images | Hurts Core Web Vitals score | Use WebP, add dimensions, lazy load |
| Using `<div>` for everything | Crawler can't understand page structure | Use semantic HTML |
| Keyword stuffing | Google penalizes this | Write naturally for humans |
| No internal links | Pages become isolated islands | Link between your pages |

---

## After You Launch: Things to Do Once

These are one-time setup tasks for any live site:

1. **Submit to Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console). Free tool. Submit your sitemap and see how Google sees your site.
2. **Submit to Bing Webmaster Tools** — [bing.com/webmasters](https://bing.com/webmasters). Same idea for Bing.
3. **Check your OG image** — paste your URL into [opengraph.xyz](https://opengraph.xyz) to see how your link preview looks.
4. **Test structured data** — paste your URL into [Google's Rich Results Test](https://search.google.com/test/rich-results) to verify JSON-LD is working.
5. **Check page speed** — run your URL through [PageSpeed Insights](https://pagespeed.web.dev) to see your Core Web Vitals score.

---

## SEO Timeline: What to Expect

- **Day 1–7**: Google discovers and crawls your page after you submit to Search Console
- **Week 2–4**: Page starts appearing in search results for your brand name
- **Month 1–3**: Non-branded keywords start ranking if content is good
- **Month 3–6**: Steady organic traffic if you've targeted the right keywords

SEO takes time. The pages you build today pay off in 3–6 months. The technical foundation (which Claude handles automatically) is what makes that growth possible.
