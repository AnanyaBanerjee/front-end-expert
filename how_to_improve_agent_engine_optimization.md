# How to Improve Agent Engine Optimization (AEO)

AEO is the newer cousin of SEO — it's about being found, cited, and recommended by AI search engines like Perplexity, ChatGPT search, Claude, and Gemini. This guide explains what it is, why it matters, and what Claude will automatically implement on every page.

---

## What is Agent Engine Optimization?

When someone asks Perplexity "what's the best app for connecting to AI agents?" or asks ChatGPT "how do I deploy containers fast?" — AI search engines crawl the web, read pages, and synthesize answers. They cite the pages they found most useful.

AEO is about making your page the one that gets cited.

It's different from traditional SEO in a key way:
- **SEO** = rank high in a list of links
- **AEO** = be the source an AI quotes directly to a user

Being cited by AI search is often more valuable than a page-2 Google ranking — the user gets your answer without even clicking, and your name/product gets mentioned directly.

---

## What Claude Will Do Automatically

Every page built with this repo includes:
- ✅ `/llms.txt` file at the project root
- ✅ Factual, specific meta description (not marketing speak)
- ✅ Speakable JSON-LD schema marking the most citable paragraph
- ✅ FAQ section with Q&A formatted for AI to cite directly
- ✅ Headlines that state what things ARE, not how they feel
- ✅ Feature copy that leads with capability, not vague benefits

---

## What You Need to Provide

### 1. A factual one-sentence description of your product
AI agents need this to introduce your product accurately. It must be specific — vague marketing copy gets ignored or misrepresented.

**Good:**
> AgentChat Hub is a native iOS and macOS app that connects to any A2A-compatible AI agent via URL, streaming responses in real time without storing data.

**Bad:**
> AgentChat Hub is a revolutionary platform that transforms the way you experience AI.

The test: Could this sentence appear in a Wikipedia article about your product? If yes, it's good for AEO.

### 2. A list of factual capabilities (3–5 bullets)
These go into your `llms.txt` and your page copy. Write them as citable facts, not feature names.

**Good:**
- Connects to any agent that exposes an A2A-compatible HTTP endpoint
- Streams responses in real time as they are generated
- Requires no account, API key, or subscription from the user
- Available as a native app on iOS 17+, iPadOS 17+, macOS 14+, visionOS 1+

**Bad:**
- Powerful AI connectivity
- Lightning-fast responses
- Zero friction experience

### 3. Answers to common questions about your product
FAQ sections are the highest-value AEO content on a page. AI agents love to cite Q&A directly because the format is already structured for an answer.

Write questions the way users would actually ask them in a chat interface:
- "What is [Product]?"
- "How does [Product] work?"
- "Is [Product] free?"
- "What platforms does [Product] support?"
- "How is [Product] different from [Competitor]?"

---

## The llms.txt File — Your Most Important AEO Asset

`llms.txt` is a plain text file at your website root (`yoursite.com/llms.txt`). It's the single most important thing you can do for AI discoverability right now.

Think of it as a briefing document for AI agents. When Perplexity or ChatGPT crawls your site, it reads `llms.txt` first and uses it to understand your product before reading anything else.

**What it includes:**
- Product name and one-sentence summary
- Links to your most important pages with descriptions
- 3–5 bullet-point facts about what your product does
- Optional: FAQ, changelog, blog links

Claude generates this automatically for every project. See `skills/llms-txt/SKILL.md` for the full template.

---

## How AI Search Engines Read Your Page

Understanding this helps you write better AEO content.

### Step 1: Crawl
AI crawlers fetch your HTML (or `llms.txt` if it exists). They strip out navigation, ads, and decorative elements.

### Step 2: Parse
The AI reads your headings, paragraphs, and structured data to build a model of what your page is about.

### Step 3: Summarize
The AI creates an internal summary of your page — what it does, who it's for, what it claims.

### Step 4: Cite
When a user asks a relevant question, the AI quotes from pages whose summary best matches the query.

**Implication:** The clearer and more factual your content, the more accurately the AI summarizes it, and the more likely it is to cite you for the right queries.

---

## Writing for AI Discoverability

### Headlines
AI uses your headings to understand what each section is about.

| Write this | Not this |
|-----------|---------|
| "Connect to any AI agent via URL" | "The future is here" |
| "No account or API key required" | "Zero friction" |
| "Available free on iOS and Mac" | "Get started today" |

### Feature descriptions
Lead with the specific capability. Follow with the benefit.

| Write this | Not this |
|-----------|---------|
| "Real-time streaming — responses appear word by word as the agent generates them" | "Experience lightning-fast AI" |
| "Works with any A2A-compatible endpoint — paste a URL and connect" | "Seamlessly integrates with your workflow" |

### About section
Write it like a Wikipedia article. Factual, third-person, specific:

> AgentChat Hub is a native Apple platform application that implements the Agent-to-Agent (A2A) communication protocol. It allows users to connect to any AI agent that exposes an A2A-compatible HTTP endpoint by entering the agent's URL. The application streams responses in real time and does not store conversation data on external servers.

### FAQ
Each Q&A pair should be self-contained — AI will often cite a single answer in isolation, so it needs to make sense without context.

---

## Structured Data for AI (Speakable Schema)

The `speakable` schema explicitly marks which parts of your page are the best to quote. AI assistants that support it will prioritize these sections when generating answers.

Claude adds this to every page:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".product-summary"]
  }
}
</script>
```

Add the class `product-summary` to the paragraph that best summarizes your product in one or two sentences. This is what AI will quote when someone asks about your product.

---

## The llms.txt + SEO Relationship

These two things work together, not separately:

| Layer | Tool | Who it's for |
|-------|------|-------------|
| Technical foundation | SEO (meta tags, structured data, page speed) | Google, Bing crawlers |
| AI discoverability | AEO (llms.txt, factual copy, FAQs, speakable) | Perplexity, ChatGPT, Claude, Gemini |
| Human readability | Good design + clear copy | Actual users |

All three matter. A page optimized for AI but not humans won't convert. A page optimized for humans but not crawlers won't be found.

---

## Common AEO Mistakes to Avoid

| Mistake | Why it hurts | Fix |
|---------|-------------|-----|
| No llms.txt file | AI has to guess what your product does | Generate it for every site |
| Vague meta description | AI summarizes it wrong | Use specific, factual language |
| No FAQ section | Misses the highest-value AEO format | Add 5–8 real questions with direct answers |
| Marketing speak in headings | AI ignores or misrepresents vague claims | State capabilities directly |
| No structured data | AI can't identify product type or capabilities | Always include JSON-LD |
| Missing speakable schema | AI picks the wrong paragraph to cite | Mark your best summary paragraph |

---

## After You Launch: AEO Checks

1. **Test your llms.txt** — Go to `yoursite.com/llms.txt` and confirm it loads correctly
2. **Ask Perplexity about your product** — Search for your product name on [perplexity.ai](https://perplexity.ai). Does it describe your product accurately?
3. **Ask ChatGPT** — Same test. Note what it gets right and wrong, then improve your llms.txt and copy accordingly
4. **Test speakable schema** — Use [Google's Rich Results Test](https://search.google.com/test/rich-results) to verify structured data
5. **Check AI crawlers in analytics** — Look for visits from `PerplexityBot`, `GPTBot`, `ClaudeBot`, `Googlebot-Extended` in your server logs or analytics

---

## AEO Timeline: What to Expect

- **Immediately**: llms.txt is readable by any AI that crawls your site
- **Week 1–2**: Perplexity and other crawlers index your llms.txt
- **Week 2–4**: Your product starts appearing in AI-generated answers for direct name searches
- **Month 1–3**: Starts appearing in answers for category/use-case searches ("apps for connecting to AI agents")

AEO moves faster than SEO because AI crawlers update their indexes more frequently than Google's main index.

---

## The One Thing That Matters Most

If you only do one thing for AEO: **write a factual, specific, jargon-free one-paragraph description of your product and put it in a `<p class="product-summary">` tag near the top of your page.**

This is what AI will quote. Make it count.
