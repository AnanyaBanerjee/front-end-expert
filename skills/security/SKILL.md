---
name: security
description: Secure every static HTML landing page and website. Covers Cloudflare security headers, subresource integrity, no-secrets policy, safe external links, email protection, form security, and an HTML security audit. Apply to every project by default — no need to ask.
---

# Security Skill

## Rule: Apply to Every Page by Default

Security is not optional. Every page built using this repo must implement the full checklist below without being asked.

---

## 1. Cloudflare `_headers` File

This is the single most important security file. Create `site/_headers` in every project. Cloudflare Pages reads this file and attaches these headers to every response from your site.

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-XSS-Protection: 1; mode=block
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com; font-src 'self' https://fonts.gstatic.com https://api.fontshare.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';
```

**What each header does:**

| Header | What it prevents |
|--------|-----------------|
| `X-Frame-Options: DENY` | Clickjacking — stops your page being embedded in someone else's iframe |
| `X-Content-Type-Options: nosniff` | MIME sniffing — browser won't guess file types, preventing some XSS attacks |
| `Referrer-Policy` | Leaking your full URL to external sites when users click links |
| `Permissions-Policy` | Stops scripts from accessing camera, microphone, location, payments without permission |
| `Strict-Transport-Security` | Forces HTTPS even if user types `http://` — prevents man-in-the-middle attacks |
| `X-XSS-Protection` | Older XSS filter in legacy browsers (belt-and-suspenders) |
| `Content-Security-Policy` | Restricts which scripts, styles, fonts can load — blocks injected malicious scripts |

**Customise CSP for your project:**

The `Content-Security-Policy` line above includes common CDN domains. Adjust `script-src` and `style-src` to include only the domains your page actually loads from. Remove any you don't use — every entry you remove reduces your attack surface.

Examples:
- Using Google Fonts? Keep `https://fonts.googleapis.com` in `style-src`
- Not using Tailwind CDN? Remove `https://cdn.tailwindcss.com` from `script-src`
- Using Phosphor Icons CDN? Add `https://unpkg.com` to `script-src`

---

## 2. Subresource Integrity (SRI) on All External Scripts

Every `<script>` or `<link>` that loads from a CDN must have an `integrity` attribute. SRI means the browser checks a hash of the file — if the CDN is compromised and the file changes, the browser refuses to run it.

**Without SRI (unsafe):**
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**With SRI (safe):**
```html
<script
  src="https://cdn.tailwindcss.com/3.4.1"
  integrity="sha384-[hash]"
  crossorigin="anonymous"
></script>
```

**How to get the SRI hash:**
- Go to [srihash.org](https://www.srihash.org)
- Paste the CDN URL
- Copy the `integrity` value it gives you

**Important:** SRI requires a specific version URL (e.g., `/3.4.1`), not a latest/unversioned URL. If you use `cdn.tailwindcss.com` with no version (the play CDN), SRI cannot be applied — flag this as a known limitation in a comment.

**For Google Fonts:** SRI doesn't apply to font stylesheets (they change per request). Instead, use `crossorigin="anonymous"` on the `<link>` tag and ensure `font-src` in CSP includes only `fonts.gstatic.com`.

---

## 3. No Secrets or Sensitive Data in HTML

**Never put any of the following in your HTML source code.** Anything in the HTML source is publicly visible to anyone who views page source.

| Never put this in HTML | Why |
|-----------------------|-----|
| API keys or tokens | Bots scrape GitHub and HTML for keys constantly |
| Passwords or secrets | Obvious |
| Raw email addresses | Bots harvest emails for spam lists |
| Raw phone numbers | Same — especially if the business owner's personal number |
| Private URLs or admin links | Anyone can find and access them |
| Internal system names or paths | Gives attackers information about your infrastructure |

**What to do instead:**

**Email addresses** — Use one of these approaches:
```html
<!-- Option 1: CSS obfuscation (simple) -->
<span class="email" data-user="hello" data-domain="yoursite.com"></span>
<script>
  document.querySelector('.email').textContent =
    document.querySelector('.email').dataset.user + '@' +
    document.querySelector('.email').dataset.domain;
</script>

<!-- Option 2: Link to a contact form instead of exposing email -->
<a href="#contact">Get in touch</a>

<!-- Option 3: Use a contact service URL (Formspree, etc.) -->
<a href="https://formspree.io/f/yourformid">Contact us</a>
```

**API keys** — If your landing page needs to call any API (analytics, forms, etc.), use a service that provides a public-safe key (e.g., Formspree form IDs are safe to expose). Never use private API keys in client-side HTML.

---

## 4. Safe External Links

Every link that opens a new tab or goes to an external site must have `rel="noopener noreferrer"`.

**Without it (unsafe):**
```html
<a href="https://twitter.com/yourhandle" target="_blank">Twitter</a>
```

**With it (safe):**
```html
<a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a>
```

**Why:** Without `noopener`, the opened page can access your page's `window` object via `window.opener` and redirect it. It's called a reverse tabnapping attack.

**Rule:** Every `target="_blank"` link must have `rel="noopener noreferrer"`. No exceptions.

---

## 5. Contact Form Security

If the page has a contact form or email signup:

**Use a third-party form service** — never try to handle form submissions yourself in a static HTML page. Good options:
- [Formspree](https://formspree.io) — simple, free tier available
- [Netlify Forms](https://www.netlify.com/products/forms/) — if hosting on Netlify
- [Web3Forms](https://web3forms.com) — free, no account needed

**Add a honeypot field** — a hidden input that humans never fill in but bots do. The form service filters out submissions where it's filled:
```html
<input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" />
```

**Never build your own form handler** — this introduces server-side vulnerabilities that don't exist in a static page. Always use a service.

---

## 6. HTML Security Audit Checklist

Run this before finishing any page:

**Headers & Configuration**
- [ ] `site/_headers` file exists with all security headers
- [ ] CSP `script-src` only includes domains actually used on the page
- [ ] CSP `style-src` only includes domains actually used on the page

**Source Code**
- [ ] No API keys, tokens, or passwords anywhere in HTML
- [ ] No raw email addresses in HTML source (obfuscated or replaced with form link)
- [ ] No sensitive URLs or admin paths in HTML
- [ ] No commented-out code containing credentials or internal paths

**External Resources**
- [ ] Every CDN `<script>` has `integrity` and `crossorigin="anonymous"`
- [ ] Every CDN `<link>` has `crossorigin="anonymous"`
- [ ] External font services use `crossorigin="anonymous"`
- [ ] Only CDN domains you actually use are in the CSP

**Links**
- [ ] Every `target="_blank"` link has `rel="noopener noreferrer"`
- [ ] No links to `http://` — all external links use `https://`

**Forms (if applicable)**
- [ ] Form uses a trusted third-party service (Formspree, Web3Forms, etc.)
- [ ] Honeypot field added to prevent bot submissions
- [ ] No form action pointing to a custom server endpoint

**Cloudflare (after deployment)**
- [ ] Security Level set to Medium in Cloudflare dashboard
- [ ] Bot Fight Mode enabled (free, under Security → Bots)
- [ ] HTTPS is enforced (SSL/TLS → Always Use HTTPS: On)

---

## 7. Cloudflare Dashboard Security Settings

After deploying to Cloudflare Pages, configure these in the Cloudflare dashboard (free tier):

| Setting | Where | Value |
|---------|-------|-------|
| Always Use HTTPS | SSL/TLS → Edge Certificates | On |
| Minimum TLS Version | SSL/TLS → Edge Certificates | TLS 1.2 |
| Bot Fight Mode | Security → Bots | On |
| Security Level | Security → Settings | Medium |
| Browser Integrity Check | Security → Settings | On |
| Hotlink Protection | Scrape Shield | On (prevents others embedding your images) |
| Email Address Obfuscation | Scrape Shield | On (Cloudflare obfuscates emails automatically) |

All of these are free. Enabling them takes under 5 minutes and significantly raises the bar against automated attacks and abuse.
