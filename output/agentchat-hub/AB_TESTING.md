# A/B Testing agent-chat-hub.com

Goal: show different visitors different landing page variants on the same domain, split traffic randomly, measure which converts (App Store clicks) better.

## Plan

1. **Build the variant(s).** Duplicate `site/index.html` → `site/index-b.html` (and `index-c.html` if doing 3-way). Change only what you're testing (headline, hero, CTA copy, etc.) — keep navbar/footer/legal/security identical per this project's rules.
2. **Preview side-by-side.** Open `options.html` in this folder to compare variants before shipping either.
3. **Add a Cloudflare Worker** in front of Pages that:
   - On first visit, randomly assigns a variant and sets a cookie (e.g. `variant=a` / `variant=b`) so the same visitor always sees the same version.
   - Rewrites `/` to serve `index.html` or `index-b.html` based on the cookie.
4. **Wire the Worker to the Pages project** via a route (`agent-chat-hub.com/*`) in the Cloudflare dashboard, or a `wrangler.toml` route binding if you deploy the Worker with Wrangler.
5. **Track conversions per variant.** Tag your existing analytics events (or App Store link clicks) with the `variant` cookie value so you can compare click-through rate per variant.
6. **Run for 1–2 weeks minimum** (enough traffic to be meaningful), then check which variant has the higher CTA click rate.
7. **Ship the winner** as `index.html`, delete the loser and the Worker (or keep the Worker for the next test).

## Why a Worker (not two separate Cloudflare Pages projects on subpaths)

A Worker keeps both variants on the same URL (`agent-chat-hub.com/`) with no query params or subpaths needed — visitors, App Store reviewers, and SEO crawlers all see one canonical URL. Cheaper than running real A/B testing infra, and Cloudflare Workers are free up to 100k requests/day.

## Next step

Say the word and I'll write the actual Worker script + wrangler config once variant B's content is decided.
