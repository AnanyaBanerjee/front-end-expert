---
name: sync
description: After any change to any file in a project, automatically detect what other files need updating as a result, present the plan to the user, then apply all changes. Prevents inconsistencies across pages, legal docs, SEO files, and brand assets.
user-invocable: true
argument-hint: "[file that was changed, or 'all' to check the whole project]"
---

# Sync Skill — Change Propagation

## When to Run

Run this skill automatically after **any** change to a project file, and whenever the user asks to "sync", "check for updates", or "make sure everything is consistent."

**Also run on first use** to audit whether an existing project is fully in sync.

---

## Step 1: Detect What Changed

Read the file(s) that were modified. Identify which category the change falls into:

| Change type | File(s) changed |
|-------------|----------------|
| **Brand** | `site/index.html` — colors, fonts, CSS variables, logo |
| **Navbar** | `site/index.html` — nav links, logo position, mobile menu |
| **Footer** | `site/index.html` — copyright text, links, social icons |
| **Product name** | Any file — product name or brand name changed |
| **Domain/URL** | Any file — the site's URL changed |
| **New page added** | Any new `.html` file created in `site/` |
| **Page removed** | Any `.html` file deleted from `site/` |
| **Logo** | `site/logo.svg` or `site/logo.png` replaced |
| **New CDN resource** | A new external `<script>` or `<link>` added to any page |
| **Content** | Hero copy, product description, features, FAQs updated |
| **Legal content** | Privacy policy or terms content updated |
| **Analytics added** | A tracking script or analytics tool added |

---

## Step 2: Identify All Impacted Files

Use this cascade map to determine what else needs updating:

### If the NAVBAR changed in `index.html`:
→ Update navbar in: `privacy-policy.html`, `terms.html`, `dmca.html`, and every other `.html` in `site/`

### If the FOOTER changed in `index.html`:
→ Update footer in: `privacy-policy.html`, `terms.html`, `dmca.html`, and every other `.html` in `site/`

### If FONTS, COLORS, or CSS VARIABLES changed in `index.html`:
→ Update `<head>` styles in: all other `.html` files in `site/`
→ Check: do any inline styles or Tailwind config values need to change on other pages?

### If the PRODUCT NAME changed:
→ Update in: all `<title>` tags across all `.html` files
→ Update in: `site/llms.txt` (product name, description)
→ Update in: all `<meta name="description">` tags
→ Update in: all Open Graph `og:title` and `og:site_name` tags
→ Update in: footer copyright line on all `.html` files
→ Update in: `site/terms.html` and `site/privacy-policy.html` body text where product name appears
→ Update in: `site/sitemap.xml` if the site name is referenced

### If the DOMAIN/URL changed:
→ Update in: `site/robots.txt` — Sitemap URL
→ Update in: `site/sitemap.xml` — all `<loc>` URLs
→ Update in: `site/llms.txt` — all page URLs
→ Update in: all `<link rel="canonical">` tags across all `.html` files
→ Update in: all `og:url` meta tags across all `.html` files
→ Update in: `site/privacy-policy.html` and `site/terms.html` where the URL appears

### If a NEW PAGE was added to `site/`:
→ Add entry to `site/sitemap.xml`
→ Add link in footer nav if it's a primary page
→ Confirm: does the new page have the standard navbar and footer?
→ Confirm: does the new page follow all four standards (security, legal, SEO, AEO)?

### If a PAGE was REMOVED from `site/`:
→ Remove entry from `site/sitemap.xml`
→ Remove any links to it from other pages and footer nav
→ Check: does any other page link to the removed page? Update those links.

### If the LOGO file changed:
→ Confirm all `.html` files reference the correct logo filename
→ If the logo was renamed, update the `src` attribute in all `.html` files
→ Check: is there a `logo-light.svg` variant that also needs updating?

### If a NEW CDN SCRIPT or STYLESHEET was added to any page:
→ Update `site/_headers` — add the new domain to the appropriate CSP directive (`script-src` or `style-src`)
→ Add `integrity` hash and `crossorigin="anonymous"` to the new `<script>` or `<link>` tag
→ If the same resource should appear on other pages, add it there too

### If CONTENT changed (hero copy, product description, FAQs):
→ Update `site/llms.txt` — product summary and capability bullets
→ Update `<meta name="description">` on the relevant page
→ Update `og:description` on the relevant page
→ Update the `product-summary` paragraph (the one marked with speakable schema)
→ If a feature was added/removed, check if `site/sitemap.xml` needs a new page entry

### If ANALYTICS or TRACKING was added:
→ Update `site/privacy-policy.html` — add the new service to the "Third-party services" section
→ Update `site/_headers` CSP — add the analytics domain to `script-src` and `connect-src`
→ Update `site/robots.txt` if the analytics service has its own crawler

### If LEGAL CONTENT changed (`privacy-policy.html` or `terms.html`):
→ Update the "Last updated" date at the top of the changed file
→ No cascade to other files unless product name or contact method changed

---

## Step 3: Present the Plan to the User

Before making any changes, summarise what you found and what you plan to do:

```
📋 Sync Plan — [X] files need updating

CHANGE DETECTED: [what changed and in which file]

FILES TO UPDATE:
  1. site/privacy-policy.html — update navbar to match index.html
  2. site/terms.html — update navbar to match index.html
  3. site/dmca.html — update navbar to match index.html
  4. site/llms.txt — update product name from "OldName" to "NewName"
  5. site/sitemap.xml — update Sitemap URL to new domain

NOTHING TO CHANGE:
  - site/robots.txt — already correct
  - site/_headers — no new CDN domains added

Shall I apply all [X] changes now?
```

Wait for the user to confirm before applying. If the user says yes (or just says "go"), apply all changes.

---

## Step 4: Apply All Changes

Apply every change from the plan. After completing:

```
✅ Sync complete — [X] files updated:
  • site/privacy-policy.html — navbar updated
  • site/terms.html — navbar updated
  • site/dmca.html — navbar updated
  • site/llms.txt — product name updated
  • site/sitemap.xml — Sitemap URL updated
```

---

## Step 5: Full Project Audit (when called with "all")

If the user asks to sync the whole project (not a specific change), run a full audit:

1. Read `site/index.html` — extract navbar, footer, fonts, colors, product name, domain
2. Read every other `.html` file in `site/` — compare navbar, footer, `<head>` styles
3. Read `site/llms.txt` — check product name and domain match `index.html`
4. Read `site/robots.txt` — check Sitemap URL matches domain
5. Read `site/sitemap.xml` — check all `<loc>` URLs match domain, check all pages in `site/` are listed
6. Check every `.html` file for the four standards (security, legal, SEO, AEO)
7. Check every `.html` file for `<meta name="robots" content="noindex, nofollow">` on legal pages
8. Check every CDN script has `integrity` and `crossorigin="anonymous"`
9. Check `site/_headers` CSP includes all CDN domains used across all pages

Report everything found, then present a single sync plan covering all issues, then apply after user confirmation.

---

## Trigger Phrases

Run this skill automatically when the user says any of:
- "sync", "sync everything", "sync the project"
- "check for updates", "check consistency"
- "make sure everything is up to date"
- "I updated [X]" or "I changed [X]" — run to check what else needs updating
- "does anything else need to change?"
- After completing any edit to any file in the project
