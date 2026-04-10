# How to Deploy Your Landing Page

This guide covers deploying your landing page to the internet using **Cloudflare Pages** — the simplest and most reliable free option for the HTML pages built in this repo. It also covers buying a custom domain through Cloudflare.

---

## What to Deploy

Every project has this structure:

```
output/my-product/
├── SKILL.md            ← skill file — DO NOT deploy
├── .impeccable.md      ← skill file — DO NOT deploy
├── CLAUDE.md           ← instructions — DO NOT deploy
└── site/               ← DEPLOY THIS FOLDER
    ├── index.html
    ├── logo.svg
    ├── logo-light.svg
    ├── llms.txt
    ├── robots.txt
    ├── sitemap.xml
    └── images/
        ├── screenshot-1.png
        └── screenshot-2.png
```

**Deploy only the `site/` folder.** The skill files (`SKILL.md`, `.impeccable.md`, `CLAUDE.md`) are instructions for Claude — they should never be uploaded to your live website.

---

## Deploy to Cloudflare Pages

Cloudflare Pages is free for unlimited sites with unlimited bandwidth. No credit card needed.

### Option A: Direct Upload (Easiest — No GitHub Needed)

1. **Go to** [pages.cloudflare.com](https://pages.cloudflare.com) and sign in or create a free account

2. **Click** "Create a project" → "Direct Upload"

3. **Name your project** — this becomes your free subdomain:
   `your-project-name.pages.dev`

4. **Upload the `site/` folder:**
   - Click "Upload assets"
   - Drag and drop the entire `site/` folder from `output/my-product/site/`
   - Cloudflare accepts the whole folder — no need to select files individually

5. **Click Deploy** — your site is live in seconds at `your-project-name.pages.dev`

That's it. No configuration needed for a simple HTML site.

---

### Option B: Deploy from GitHub (Best for Ongoing Updates)

If you want to push updates by committing to this repo:

1. **Go to** [pages.cloudflare.com](https://pages.cloudflare.com) → "Create a project" → "Connect to Git"

2. **Connect your GitHub account** and select the `front-end-tech` repo

3. **Configure the build:**
   - **Framework preset**: None
   - **Build command**: *(leave empty)*
   - **Build output directory**: `output/my-product/site` ← the site subfolder for your project

4. **Click Save and Deploy**

Now every time you push changes to that subfolder, Cloudflare automatically redeploys.

> **Note:** If you have multiple projects (e.g., `output/product-a/` and `output/product-b/`), create a separate Cloudflare Pages project for each one, pointing to its own output subfolder.

---

## After Deploying: Verify Everything Works

Check these after your first deploy:

1. **Open your site** at `your-project.pages.dev` — does it look correct?
2. **Check your llms.txt** — visit `your-project.pages.dev/llms.txt` — it should show your AI briefing file
3. **Check robots.txt** — visit `your-project.pages.dev/robots.txt`
4. **Check images** — do all logos and screenshots load? If not, check that image filenames in the HTML match the actual filenames exactly (case-sensitive)
5. **Check on mobile** — open on your phone and verify the layout looks right

---

## Add a Custom Domain

Your free Cloudflare Pages URL looks like `my-product.pages.dev`. A custom domain makes it look like `myproduct.com`. You can buy one directly through Cloudflare.

### Buy a Domain on Cloudflare

Cloudflare is a domain registrar with **no markup pricing** — you pay exactly what it costs, unlike GoDaddy or Namecheap which add fees. There's also no "gotcha" renewal pricing (price stays the same every year).

1. **Go to** [cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/) and sign in

2. **Click** "Register Domains" in your Cloudflare dashboard sidebar

3. **Search for your domain name** — try variations if your first choice is taken:
   - `myproduct.com` (most valuable, most expensive ~$10–15/year)
   - `myproduct.io` (~$30–40/year — popular for tech/app products)
   - `myproduct.app` (~$14/year — great for mobile apps)
   - `myproduct.co` (~$25/year — short and clean)
   - `getmyproduct.com` — add "get" prefix if .com is taken
   - `myproductapp.com` — add "app" suffix

4. **Add to cart and purchase** — you'll need to add a payment method. Domain privacy (WHOIS protection) is included free.

### Connect Your Domain to Cloudflare Pages

Once you own the domain and it's in your Cloudflare account:

1. Go to your Cloudflare Pages project
2. Click **"Custom domains"** → **"Set up a custom domain"**
3. Enter your domain: `myproduct.com`
4. Cloudflare will automatically configure the DNS since both the domain and Pages project are in the same Cloudflare account
5. Click **"Activate domain"**
6. Wait 2–5 minutes for DNS to propagate

Your site is now live at `myproduct.com`. Cloudflare also automatically adds **free HTTPS** (the padlock in the browser address bar).

---

### If You Already Own a Domain (Bought Elsewhere)

If you bought your domain on GoDaddy, Namecheap, Google Domains, etc.:

**Option 1: Transfer to Cloudflare** (recommended)
- Transfer the domain to Cloudflare registrar for the at-cost renewal pricing
- Takes 5–7 days but you only do it once
- Go to Cloudflare dashboard → "Transfer Domains"

**Option 2: Point DNS to Cloudflare**
- Keep the domain at your current registrar
- Change the nameservers at your registrar to Cloudflare's nameservers
- Add a CNAME record pointing your domain to `your-project.pages.dev`
- Cloudflare support docs: [developers.cloudflare.com/pages/custom-domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

---

## What Cloudflare Receives

When you drag the `site/` folder to Cloudflare, this is what it sees:

```
✅ Correct — drag output/my-product/site/ folder:
index.html
logo.svg
llms.txt
robots.txt
sitemap.xml
images/
  screenshot-1.png
  screenshot-2.png

❌ Wrong — don't drag the whole output/my-product/ folder:
SKILL.md            ← this would become public on your website
CLAUDE.md           ← this would become public on your website
.impeccable.md      ← this would become public on your website
site/
  index.html
  ...
```

---

## Free vs Paid on Cloudflare Pages

| Feature | Free | Paid ($20/month) |
|---------|------|-----------------|
| Sites | Unlimited | Unlimited |
| Bandwidth | Unlimited | Unlimited |
| Custom domains | 1 per project | Unlimited |
| Deploys per month | 500 | Unlimited |
| Build minutes | 500/month | Unlimited |

For simple landing pages, the free tier is more than enough. You'd only need paid if you're doing very frequent automated deploys.

---

## Quick Reference

| Task | Where to go |
|------|------------|
| Deploy a site | [pages.cloudflare.com](https://pages.cloudflare.com) |
| Buy a domain | Cloudflare dashboard → Registrar → Register Domains |
| Connect domain to site | Pages project → Custom Domains |
| Check deploy status | Pages project → Deployments tab |
| View site analytics | Pages project → Analytics tab |
| Update site (direct upload) | Pages project → Deployments → Upload new version |
