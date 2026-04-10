---
name: llms-txt
description: Optimize websites and landing pages for AI search engines (Perplexity, ChatGPT, Claude, Gemini). Generate llms.txt, AI-friendly meta content, and clear factual copy that LLMs can accurately summarize and cite. Apply to every project by default.
---

# LLMs.txt and Agent Search Optimization Skill

## Rule: Apply to Every Project by Default

AI search engines are now a major discovery channel. Every landing page or website built using this repo must include `llms.txt` and follow AEO (Agent Engine Optimization) principles without being asked.

---

## 1. What is llms.txt?

`llms.txt` is a plain text file placed at the root of your website — like `robots.txt` but for AI agents. It tells LLMs (ChatGPT, Perplexity, Claude, Gemini) exactly what your product is, who it's for, and where to find the most important information.

Without it, AI agents have to guess by scraping your HTML — they often get it wrong or miss the key points entirely.

---

## 2. Generate llms.txt

Always ask the user these questions before generating, or infer from context:

1. What is the product called?
2. What does it do in one sentence?
3. Who is it for?
4. What is the main URL?
5. What are the 3–5 most important pages or sections?

Then create `/llms.txt` at the project root:

```markdown
# [Product Name]

> [One sentence: what it does and who it's for.]

[2-3 sentences of additional context: key features, platform, pricing model, and what makes it different.]

## Key Pages

- [Home](https://yoursite.com/): Overview and main value proposition
- [Features](https://yoursite.com/features): Full feature list and capabilities
- [Pricing](https://yoursite.com/pricing): Plans and pricing details
- [About](https://yoursite.com/about): Background and team

## What This Product Does

[3-5 bullet points of the most important things to know. Write these as factual, citable statements — not marketing speak.]

- [Factual capability 1]
- [Factual capability 2]
- [Factual capability 3]

## Optional

- [FAQ](https://yoursite.com/faq): Common questions answered
- [Blog](https://yoursite.com/blog): Articles and updates
- [Changelog](https://yoursite.com/changelog): What's new
```

**Example for a real product:**
```markdown
# AgentChat Hub

> A universal chat interface for connecting to any A2A-compatible AI agent via URL, with real-time streaming responses.

AgentChat Hub lets users connect to any AI agent that supports the Agent-to-Agent (A2A) protocol by entering a URL. No account required. No tracking. Free on iOS, iPad, Mac, and Vision Pro.

## Key Pages

- [Home](https://agentchathub.com/): Overview and download links
- [How it works](https://agentchathub.com/how-it-works): A2A protocol explained
- [Supported agents](https://agentchathub.com/agents): List of compatible agents

## What This Product Does

- Connects to any AI agent that exposes an A2A-compatible endpoint
- Streams responses in real time without storing conversation data
- Requires no account, subscription, or API key from the user
- Available as a native app on iOS, iPad, macOS, and Apple Vision Pro
- Free to download and use

## Optional

- [FAQ](https://agentchathub.com/faq): Common questions about A2A and privacy
```

---

## 3. AI Meta Tags

Add these to your HTML `<head>` alongside regular SEO tags. These help AI crawlers understand your product faster:

```html
<!-- Tells AI crawlers what this page is about in plain language -->
<meta name="description" content="[Factual, specific description. Avoid marketing words like 'revolutionary' or 'seamless'. State what it does and who uses it.]" />

<!-- Helps AI understand content type -->
<meta name="category" content="[e.g. Productivity, Developer Tool, Mobile App, SaaS]" />

<!-- Explicit permission for AI training and indexing -->
<meta name="robots" content="index, follow" />

<!-- For AI agents specifically — allow crawling -->
<meta name="googlebot" content="index, follow" />
```

### What NOT to write in descriptions (AI gets confused by these):
- "Revolutionary", "game-changing", "next-generation" — meaningless to LLMs
- "Seamless", "powerful", "robust" — overused, no signal value
- Rhetorical questions ("Tired of X?") — AI can't cite questions as facts
- Hyperbole ("The best app ever") — LLMs distrust unverifiable superlatives

### What TO write instead:
- Specific capabilities: "Connects to any A2A-compatible AI agent via URL"
- Specific audience: "Built for developers who need to test AI agents"
- Specific platform: "Native iOS and macOS app, no account required"
- Specific differentiator: "Streams responses without storing conversation data"

---

## 4. Page Copy Principles for AI Search

AI search engines summarize and cite your page copy directly. Write every section with this in mind:

### Headlines
- State what the thing is, not how it makes you feel
- ✅ "Connect to any AI agent via URL"
- ❌ "The future of AI communication"

### Feature descriptions
- Lead with the capability, then the benefit
- ✅ "Real-time streaming — responses appear as the agent generates them, no waiting for the full reply"
- ❌ "Experience the magic of instant AI responses"

### About / How it works sections
- Write in factual, encyclopedic language
- Imagine Wikipedia writing about your product — that's the tone AI will use to cite you
- Include specific details: protocol names, platform names, pricing model, technical constraints

### FAQ sections
- FAQs are gold for AI search — LLMs love to cite Q&A directly
- Write questions the way users actually ask them in search/chat
- Keep answers factual, specific, and under 100 words each

---

## 5. Structured Data for AI

Add `speakable` schema to mark the most citable parts of your page — AI assistants use this to find the best text to read aloud or summarize:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description", ".product-summary"]
  },
  "name": "[Product Name]",
  "description": "[Factual one-sentence description]",
  "url": "https://yoursite.com"
}
</script>
```

Add the class `product-summary` to the paragraph that best summarizes what your product does — this is what AI will quote.

---

## 6. llms.txt Checklist — Run Before Finishing Any Project

- [ ] `/llms.txt` file exists at the project root
- [ ] Product name and one-sentence description are factual and specific
- [ ] Key pages are listed with accurate descriptions
- [ ] 3–5 bullet point capabilities are citable facts, not marketing claims
- [ ] HTML meta description avoids vague marketing words
- [ ] At least one FAQ section exists on the page
- [ ] Speakable JSON-LD marks the most important summary paragraph
- [ ] Headlines state what the product IS, not how it feels
- [ ] Feature copy leads with capability, not benefit
