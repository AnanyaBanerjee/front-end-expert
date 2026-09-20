"""Build the static portfolio. Run from any directory with Python 3."""
from pathlib import Path
from html import escape as e
import json
import hashlib
import base64
from datetime import date

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / 'site'
DATA = json.loads((ROOT / 'docs/ventures.json').read_text())
DOMAIN = 'https://www.ananyabanerjee.org'
YEAR = date.today().year
DESCRIPTION = 'Explore Ananya Banerjee’s apps, games, AI ecosystems, writing, and creative ventures, with product previews and links to her work.'
SOCIALS = [('LinkedIn', 'https://www.linkedin.com/in/ananyabanerjee15/'), ('Instagram', 'https://www.instagram.com/ananya_banerjee_official/'), ('YouTube', 'https://www.youtube.com/channel/UC8GDhhyYjgv8xzZncA3BBUQ'), ('GitHub', 'https://github.com/AnanyaBanerjee'), ('Medium', 'https://ananya-banerjee.medium.com/')]

def link(label, url, css='text-link'):
    return f'<a class="{css}" href="{e(url, quote=True)}" target="_blank" rel="noopener noreferrer" title="{e(label, quote=True)}">{e(label)} <span aria-hidden="true">↗</span></a>'

def picture(filename, alt, css='', eager=False):
    from PIL import Image
    w, h = Image.open(SITE / 'images' / filename).size
    loading = 'eager' if eager else 'lazy'
    return f'<img class="{css}" src="images/{filename}" alt="{e(alt, quote=True)}" width="{w}" height="{h}" loading="{loading}" decoding="async">'

NAV = '''<a class="skip-link" href="#main" title="Skip navigation">Skip to content</a>
<header class="site-header"><div class="nav-wrap">
<a class="wordmark" href="/" title="Ananya Banerjee home">ananya<span class="brand-dot">.</span><span class="sr-only"> Banerjee</span></a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
<nav id="site-nav" aria-label="Main navigation"><a href="index.html#work" title="Explore products">The work</a><a href="index.html#ecosystem" title="Explore AI ecosystems">The systems</a><a href="index.html#media" title="Explore writing and media">The words</a><a href="index.html#about" title="About Ananya">The person</a></nav>
<a class="nav-contact" href="index.html#connect" title="Connect with Ananya">Let’s connect <span aria-hidden="true">↗</span></a>
</div></header>'''

FOOTER = f'''<footer class="site-footer"><div class="footer-top"><a class="wordmark" href="/" title="Ananya Banerjee home">ananya<span class="brand-dot">.</span><span class="sr-only"> Banerjee</span></a><p>Built with curiosity. Always a work in progress.</p><a href="#main" title="Back to top">Back to top ↑</a></div><div class="footer-bottom"><p>© <span data-year>{YEAR}</span> Ananya Banerjee. All rights reserved. Ananya Banerjee™</p><nav aria-label="Legal"><a href="privacy-policy.html" title="Privacy Policy">Privacy</a><a href="terms.html" title="Terms of Use">Terms</a><a href="dmca.html" title="DMCA and copyright">DMCA</a></nav></div></footer>'''

FAQ = [
    ('What does Ananya build?', 'Ananya builds consumer apps, games, AI tools, and connected learning systems. Her work also includes writing, a podcast, and creative ventures.'),
    ('Can I try the products?', 'Products with a public website or App Store listing include direct links in their previews. Internal tools and projects in development are labeled separately.'),
    ('What is the self-improving AI ecosystem?', 'It connects a persistent knowledge base, a learning and evaluation pipeline, and a shared library of agent skills. Task routing and local agents support the workflow.'),
    ('Where can I follow the work?', 'Read Ananya’s Build Room on Substack, or follow the LinkedIn, Instagram, YouTube, and Medium links below. DramaBubble has its own Instagram and YouTube channels.'),
]

SCHEMA = {'@context': 'https://schema.org', '@graph': [
    {'@type': 'Person', '@id': DOMAIN + '/#person', 'name': 'Ananya Banerjee', 'url': DOMAIN + '/', 'jobTitle': 'Senior Software Engineer', 'sameAs': [url for _, url in SOCIALS]},
    {'@type': 'WebSite', '@id': DOMAIN + '/#website', 'name': 'Ananya Banerjee', 'url': DOMAIN + '/', 'author': {'@id': DOMAIN + '/#person'}},
    {'@type': 'WebPage', 'url': DOMAIN + '/', 'name': 'Ananya Banerjee — Builder & Creator', 'isPartOf': {'@id': DOMAIN + '/#website'}, 'speakable': {'@type': 'SpeakableSpecification', 'cssSelector': ['#product-summary']}},
    {'@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ]},
]}
SCHEMA_TEXT = json.dumps(SCHEMA, ensure_ascii=False, separators=(',', ':'))

def head(title, desc, filename='index.html', legal=False):
    url = DOMAIN + ('/' if filename == 'index.html' else '/' + filename)
    social = '' if legal else f'''<meta property="og:type" content="website"><meta property="og:site_name" content="Ananya Banerjee"><meta property="og:title" content="{e(title, quote=True)}"><meta property="og:description" content="{e(desc, quote=True)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{DOMAIN}/images/ananya.webp"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{e(title, quote=True)}"><meta name="twitter:description" content="{e(desc, quote=True)}"><meta name="twitter:image" content="{DOMAIN}/images/ananya.webp"><script type="application/ld+json">{SCHEMA_TEXT}</script>'''
    robots = 'noindex, nofollow' if legal else 'index, follow, noai, noimageai'
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>{e(title)}</title><meta name="description" content="{e(desc, quote=True)}"><meta name="author" content="Ananya Banerjee"><meta name="copyright" content="© {YEAR} Ananya Banerjee. All rights reserved."><meta name="robots" content="{robots}"><meta name="noai" content="noai, noimageai"><meta name="theme-color" content="#f7f7f4"><link rel="canonical" href="{url}"><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="preload" href="fonts/manrope-regular.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="styles.css">{social}<script src="main.js" defer></script></head><body>'''

def preview(v, eager=False):
    kind = v['preview']
    if kind in ('phones', 'single', 'desktop'):
        imgs = ''.join(picture(f, v['name'] + (' — product screen' if i == 0 else ' — another view'), 'product-shot shot-' + str(i), eager) for i, f in enumerate(v['images']))
        return f'<div class="preview-{kind}">{imgs}</div>'
    if kind == 'video':
        return f'''<video class="product-video" muted playsinline loop preload="none" poster="images/{v['images'][0]}" aria-label="Vent Your Feelings product preview"><source src="images/{v['video']}" type="video/mp4"></video><span class="video-note">A LITTLE ROOM TO LET GO</span>'''
    if kind == 'wave':
        bars = ''.join(f'<span class="bar bar-{i % 7}"></span>' for i in range(31))
        return f'<div class="type-preview"><span class="preview-eyebrow">{e(v["type"])}</span><strong>{"<br>".join(e(w) for w in v["words"])}</strong><div class="wave" aria-hidden="true">{bars}</div></div>'
    if kind == 'pipeline':
        return '<div class="pipeline-preview"><span class="preview-eyebrow">THE LEARNING LOOP</span>' + ''.join(f'<span class="pipeline-step">{e(w)}<span aria-hidden="true">↘</span></span>' for w in v['words']) + '</div>'
    words = '<br>'.join(e(w) for w in v.get('words', [v['name']]))
    return f'<div class="type-preview"><span class="preview-eyebrow">{e(v["type"])}</span><strong>{words}</strong><span class="preview-signature">by ananya.</span></div>'

def card(v, compact=False, eager=False):
    features = ''.join(f'<li>{e(s)}</li>' for s in v['features'])
    links = ''.join(link(label, url) for label, url in v['links'])
    destinations = f'<div class="destination-links">{links}</div>' if links else '<p class="availability-note">A look inside my body of work.</p>'
    peek = '<div class="hover-peek" aria-hidden="true"><span>' + e(v['features'][0]) + '</span><span>' + e(v['features'][1]) + '</span>' + ('<b>' + ' · '.join(e(label) for label, _ in v['links']) + '</b>' if v['links'] else '') + '</div>'
    return f'''<article class="venture theme-{v['theme']} {'compact' if compact else ''}" id="{v['id']}">
<div class="venture-media">{preview(v, eager)}<span class="status">{e(v['status'])}</span>{peek}<span class="preview-hint" aria-hidden="true">Explore ↗</span></div>
<div class="venture-info"><div class="venture-label">{e(v['type'])}</div><div class="venture-heading"><h3>{e(v['name'])}</h3><button class="detail-toggle" type="button" aria-expanded="false" aria-controls="details-{v['id']}" aria-label="Explore {e(v['name'], quote=True)}"><span aria-hidden="true">↗</span></button></div><p>{e(v['summary'])}</p>
<div class="venture-details" id="details-{v['id']}"><p>{e(v['description'])}</p><ul>{features}</ul>{destinations}</div></div></article>'''

def cards(group, compact=False):
    return ''.join(card(v, compact, group == 'products' and i < 2) for i, v in enumerate(x for x in DATA if x['group'] == group))

def section_head(num, label, title, desc=''):
    return f'<div class="section-head"><div><p class="eyebrow"><span>{num}</span> {label}</p><h2>{title}</h2></div>' + (f'<p class="section-intro">{desc}</p>' if desc else '') + '</div>'

def main_page():
    hero = f'''<section class="hero" aria-labelledby="hero-title"><div class="hero-top"><p class="eyebrow">ANANYA BANERJEE <span class="line"></span> BUILDER & CREATOR</p><span class="edition">A continuing collection</span></div><div class="hero-body"><h1 id="hero-title">Apps. Ideas.<br>Entire <span class="outlined-word">ecosystems.</span></h1><div class="hero-note"><span class="asterisk" aria-hidden="true">✳</span><p id="product-summary">I’m Ananya. I build apps, games, and AI systems — and share the ideas and stories behind them.</p><a class="primary-link" href="#work" title="Explore my work">Come explore <span aria-hidden="true">↓</span></a></div></div><div class="hero-bottom"><span>Software engineer. Writer. Endlessly curious.</span><span class="hover-instruction">Hover to peek. Click to explore.</span></div></section>'''
    products = f'<section id="work" class="section"><div class="section-head work-heading"><p class="eyebrow"><span>01</span> APPS & EXPERIENCES</p><p class="section-intro">Things I wanted to exist.<br>So I started building them.</p></div><div class="venture-grid">{cards("products")}</div></section>'
    quotes = f'''<section id="quotes" class="section quotes-section">{section_head('02', 'A CONNECTED WORKFLOW', 'Capture. Keep. Create.', 'Three projects, connected by a love of words.')}<div class="workflow-strip" aria-label="Quote workflow"><span>01 / Extract a quote</span><span aria-hidden="true">→</span><span>02 / Revisit it daily</span><span aria-hidden="true">→</span><span>03 / Share it as a post</span></div><div class="venture-grid small-grid">{cards('quotes', True)}</div></section>'''
    ai = f'''<section id="ecosystem" class="section ecosystem-section">{section_head('03', 'THE SYSTEMS BEHIND THE WORK', 'Building the tools<br>that help me build.', 'A connected AI ecosystem for remembering, learning, routing tasks, and putting agents to work.')}<div class="ecosystem-map" aria-label="Memory feeds learning, then shared skills feed the next session"><div><span>01 / MEMORY</span><h3>Knowledge base</h3><p>Capture the lessons.</p></div><span class="map-arrow" aria-hidden="true">→</span><div><span>02 / LEARNING</span><h3>Self-Improving AI</h3><p>Evaluate what helps.</p></div><span class="map-arrow" aria-hidden="true">→</span><div><span>03 / SHARED SKILLS</span><h3>My AI Brain</h3><p>Bring it to the next session.</p></div><p class="map-caption">A learning loop, supported by task routing and local agents.</p></div><div class="venture-grid small-grid">{cards('ecosystem', True)}</div><div class="supporting-tools"><span>ALSO IN THE TOOLBOX</span><p>Agent orchestration · Marketing agents · Product distribution tools · This website toolkit</p></div></section>'''
    media = f'''<section id="media" class="section">{section_head('04', 'WRITING, AUDIO & CREATIVE VENTURES', 'Some ideas<br>become words.', 'Newsletters, a podcast, and creative projects — including earlier chapters of the journey.')}<div class="venture-grid media-grid">{cards('media', True)}</div><div class="writing-link"><p>More writing on AI, technology, and the way we live.</p>{link('Read on Medium', 'https://ananya-banerjee.medium.com/')}</div></section>'''
    lab = f'''<section id="lab" class="section lab-section">{section_head('05', 'THE EXPERIMENTS', 'Still following<br>the curiosity.', 'Projects in development, prototypes, and tools made to explore an idea.')}<div class="venture-grid lab-grid">{cards('lab', True)}</div><div class="research-note"><p class="eyebrow">EARLIER EXPLORATIONS</p><h3>Before the apps, there were questions.</h3><p>My earlier projects explored scene graphs, language understanding, information extraction, search algorithms, and games.</p>{link('Explore public repositories', 'https://github.com/AnanyaBanerjee')}</div></section>'''
    about = f'''<section id="about" class="section about-section"><div class="portrait-wrap">{picture('ananya.webp', 'Ananya Banerjee', 'portrait')}<span>THE PERSON BEHIND THE PROJECTS</span></div><div class="about-copy"><p class="eyebrow"><span>06</span> HELLO AGAIN</p><h2>I follow an idea<br>until it’s a thing.</h2><p>I’m Ananya Banerjee, a senior software engineer, builder, and creator. I’m interested in what technology can do for people — and what happens when you keep following your curiosity.</p><p>Sometimes that becomes a game. Sometimes it’s a small app for everyday life. Sometimes it grows into a whole ecosystem of tools that learn from the work.</p><p>And sometimes, it becomes a story worth sharing.</p>{link('Find me on LinkedIn', SOCIALS[0][1])}</div></section>'''
    faq = '<section class="section faq-section" aria-labelledby="faq-title"><div><p class="eyebrow">A FEW DETAILS</p><h2 id="faq-title">In case you’re curious.</h2></div><div class="faq-list">' + ''.join(f'<details><summary>{e(q)}<span aria-hidden="true">+</span></summary><p>{e(a)}</p></details>' for q,a in FAQ) + '</div></section>'
    connect = f'''<section id="connect" class="connect-section"><p class="eyebrow">THE NEXT CONVERSATION</p><h2>Have something<br>in mind<span>?</span></h2><div class="connect-bottom"><p>A collaboration, an idea, or just a hello.<br>I’d love to hear it.</p><div class="social-links">{''.join(link(label, url) for label,url in SOCIALS)}</div></div></section>'''
    return head('Ananya Banerjee — Builder & Creator', DESCRIPTION) + NAV + '<main id="main">' + hero + products + quotes + ai + media + lab + about + faq + connect + '</main>' + FOOTER + '</body></html>'

LEGAL = {
 'privacy-policy.html': ('Privacy Policy', 'How Ananya Banerjee’s portfolio handles website visits, external links, browser storage, and privacy questions, without analytics or signup forms.', [
 ('About this site', 'This policy covers Ananya Banerjee’s personal portfolio. It does not cover the separate apps, websites, or social platforms linked from the portfolio.'),
 ('What the portfolio collects', 'The portfolio has no account system, contact form, advertising, or analytics code. Its code does not set cookies or store visitor information in browser storage. Fonts, images, and preview videos are served with the site; social content is linked rather than embedded.'),
 ('Hosting and requests', 'Loading any website sends technical information, such as an IP address and browser request details, to its hosting provider. The deployment configuration determines which hosting provider handles these requests and how long its operational logs are kept. No separate visitor database is maintained by this portfolio.'),
 ('External services', 'Following a product, newsletter, or social link takes you to a separate service. Those services apply their own privacy policies and may collect data. Contacting Ananya through LinkedIn is governed by LinkedIn’s data practices.'),
 ('Privacy choices and requests', 'For questions about personal information associated with this website, contact Ananya through the LinkedIn link below. Depending on applicable law, you may have rights to access, correct, delete, or restrict use of personal information. Any applicable rights remain unaffected by this notice.'),
 ('Policy updates', 'This page will be updated if the site’s data practices change. The date above identifies the latest revision.'),
 ]),
 'terms.html': ('Terms of Use', 'Terms for exploring Ananya Banerjee’s portfolio, including content ownership, external product links, permitted use, and website availability.', [
 ('Scope', 'This website presents work by Ananya Banerjee. Separate products and services have their own terms. A listing here does not create a promise about a product’s availability, future features, or results.'),
 ('Content and ownership', 'Original portfolio content belongs to Ananya Banerjee unless otherwise credited. Third-party names, marks, and content belong to their respective owners. You may browse and link to this site. Reuse must respect applicable law and any relevant licenses.'),
 ('Responsible use', 'Do not use the site to impersonate its owner, disrupt access, bypass security, or infringe another person’s rights.'),
 ('Availability and external links', 'Information may change as projects develop. The portfolio is provided as available, without a promise of uninterrupted access or error-free content. Ananya does not control external websites or their terms.'),
 ('Applicable rights', 'These terms do not exclude rights or protections that cannot lawfully be excluded. Questions about the website or its content can be raised through the contact link below.'),
 ('Changes', 'This page may be updated as the portfolio changes. The date above identifies the latest revision.'),
 ]),
 'dmca.html': ('Copyright & DMCA', 'Copyright information for Ananya Banerjee’s portfolio and a way to report content concerns, identify affected material, and request a review.', [
 ('Ownership and attribution', 'Original work on this portfolio is protected by applicable copyright law. Product names and third-party materials retain their respective owners’ rights. This notice does not claim ownership of third-party content.'),
 ('Report a concern', 'If you believe this portfolio contains material that infringes your copyright, contact Ananya through the link below. Identify the copyrighted work and the specific page or material at issue so the concern can be reviewed.'),
 ('Information to include', 'Include your contact information and signature, identification of the original work, the location of the disputed material, a good-faith statement that the use is unauthorized, and a statement of accuracy and authority made under penalty of perjury. Do not submit claims you know to be inaccurate.'),
 ('Review', 'Reports will be reviewed and appropriate action considered. This informational page is not a claim of registered DMCA-agent status or automatic safe-harbor eligibility.'),
 ])
}

def build():
    (SITE / 'index.html').write_text(main_page())
    # Shared NAV, FOOTER and stylesheet are taken from the just-rendered main site.
    for filename, (title, desc, sections) in LEGAL.items():
        body = ''.join(f'<section><h2>{e(h)}</h2><p>{e(p)}</p></section>' for h,p in sections)
        source = link('U.S. Copyright Office: notice and takedown', 'https://www.copyright.gov/512/') if filename == 'dmca.html' else ''
        content = f'<main id="main" class="legal-main"><p class="eyebrow">ANANYA BANERJEE</p><h1>{title}</h1><p class="legal-date">Last updated: {date.today().strftime("%B %d, %Y")}</p><article class="legal-content">{body}<section><h2>Contact</h2>{link("Contact Ananya on LinkedIn", SOCIALS[0][1])}{source}</section></article></main>'
        (SITE / filename).write_text(head(title + ' — Ananya Banerjee', desc, filename, True) + NAV + content + FOOTER + '</body></html>')
    hash_value = base64.b64encode(hashlib.sha256(SCHEMA_TEXT.encode()).digest()).decode()
    (SITE / '_headers').write_text(f"""/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-{hash_value}'; style-src 'self'; font-src 'self'; img-src 'self'; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests;
""")
    (SITE / 'robots.txt').write_text('User-agent: *\nAllow: /\n\n' + ''.join(f'User-agent: {bot}\nDisallow: /\n\n' for bot in ['GPTBot','CCBot','ClaudeBot','anthropic-ai','Google-Extended','Bytespider','Omgilibot']) + f'Sitemap: {DOMAIN}/sitemap.xml\n')
    (SITE / 'sitemap.xml').write_text(f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{DOMAIN}/</loc><lastmod>{date.today().isoformat()}</lastmod></url></urlset>')
    lines = ['# Ananya Banerjee', '', '> Senior software engineer, builder, and creator of apps, games, AI systems, writing, and creative ventures.', '', '## Pages', f'- [Portfolio]({DOMAIN}/): Products, systems, writing, experiments, and contact links.', '', '## Work']
    for v in DATA:
        lines.append(f'- {v["name"]} ({v["status"]}): {v["summary"]}')
        lines.extend(f'  - [{label}]({url})' for label,url in v['links'])
    lines += ['', 'Internal systems and projects in development are labeled. No audience, download, or revenue metrics are claimed.']
    (SITE / 'llms.txt').write_text('\n'.join(lines) + '\n')
    (SITE / 'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#c94735"/><text x="16" y="46" fill="#f7f7f4" font-family="sans-serif" font-size="48" font-weight="700">a</text></svg>')
    print(f'Built {len(LEGAL)+1} pages and {len(DATA)} venture previews.')

if __name__ == '__main__':
    build()
