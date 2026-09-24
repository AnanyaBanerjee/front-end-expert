"""Finalize the isolated visual preview and its matching utility pages."""
from pathlib import Path
from html import escape
from datetime import date
import base64
import hashlib
import importlib.util
import json
import re
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / 'site'
reference = ROOT.parent / 'ananya-banerjee-portfolio/docs/build_site.py'
spec = importlib.util.spec_from_file_location('portfolio_reference', reference)
old = importlib.util.module_from_spec(spec)
spec.loader.exec_module(old)

schema = {'@context': 'https://schema.org', '@graph': [
    {'@type': 'Person', '@id': 'https://www.ananyabanerjee.org/#person', 'name': 'Ananya Banerjee', 'jobTitle': 'Senior Software Engineer', 'url': 'https://www.ananyabanerjee.org/'},
    {'@type': 'WebPage', 'name': 'Ananya Banerjee — A Creator’s Playground', 'url': 'https://www.ananyabanerjee.org/', 'speakable': {'@type': 'SpeakableSpecification', 'cssSelector': ['#product-summary']}},
    {'@type': 'FAQPage', 'mainEntity': [
        {'@type': 'Question', 'name': 'What do you build?', 'acceptedAnswer': {'@type': 'Answer', 'text': 'Consumer apps, games, AI tools and connected systems, alongside newsletters, a podcast, and other creative ventures.'}},
        {'@type': 'Question', 'name': 'Where can I follow along?', 'acceptedAnswer': {'@type': 'Answer', 'text': 'Read Ananya’s Build Room on Substack for notes from the projects, or connect through the social links on the website.'}}
    ]}
]}
raw = json.dumps(schema, ensure_ascii=False, separators=(',', ':'))
index = (SITE / 'index.html').read_text()
index = re.sub(r'<!-- structured-data -->.*?(?=\n</head>)', '<!-- structured-data -->\n  <script type="application/ld+json">' + raw + '</script>', index, flags=re.S)

def dimensions(match):
    tag = match.group(0)
    src = re.search(r'src="([^"]+)"', tag).group(1)
    w, h = Image.open(SITE / src).size
    tag = re.sub(r'width="\d+"', f'width="{w}"', tag)
    return re.sub(r'height="\d+"', f'height="{h}"', tag)

index = re.sub(r'<img\b[^>]*>', dimensions, index)
(SITE / 'index.html').write_text(index)
header = re.search(r'<!-- shared-header:start -->(.*?)<!-- shared-header:end -->', index, re.S).group(1)
footer = re.search(r'<!-- shared-footer:start -->(.*?)<!-- shared-footer:end -->', index, re.S).group(1)
head = index.split('<head>')[1].split('</head>')[0]
head = re.sub(r'\s*<meta (?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>', '', head)
head = re.sub(r'\s*<!-- structured-data -->\s*<script.*?</script>', '', head, flags=re.S)
for filename, (title, desc, sections) in old.LEGAL.items():
    legal_head = re.sub(r'<title>.*?</title>', '<title>' + escape(title) + ' — Ananya Banerjee</title>', head)
    legal_head = re.sub(r'<meta name="description"[^>]*>', '<meta name="description" content="' + escape(desc, quote=True) + '">', legal_head)
    legal_head = legal_head.replace('href="https://www.ananyabanerjee.org/"', 'href="https://www.ananyabanerjee.org/' + filename + '"')
    body = ''.join('<section><h2>' + escape(h) + '</h2><p>' + escape(p) + '</p></section>' for h, p in sections)
    body += '<section><h2>Contact</h2><a href="https://www.linkedin.com/in/ananyabanerjee15/" target="_blank" rel="noopener noreferrer" title="Contact Ananya on LinkedIn">Contact Ananya on LinkedIn</a></section>'
    if filename == 'dmca.html':
        body += '<a href="https://www.copyright.gov/512/" target="_blank" rel="noopener noreferrer" title="U.S. Copyright Office guidance">U.S. Copyright Office: notice and takedown</a>'
    main = '<main id="main" class="legal-main"><h1>' + escape(title) + '</h1><p class="legal-date">Last updated: ' + date.today().strftime('%B %d, %Y') + '</p><article class="legal-content">' + body + '</article></main>'
    (SITE / filename).write_text('<!doctype html><html lang="en"><head>' + legal_head + '</head><body><a class="skip" href="#main" title="Skip navigation">Skip to content</a>' + header + main + footer + '</body></html>')

hash_value = base64.b64encode(hashlib.sha256(raw.encode()).digest()).decode()
(SITE / '_headers').write_text("/*\n  X-Frame-Options: DENY\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-" + hash_value + "'; style-src 'self'; font-src 'self'; img-src 'self'; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests;\n  X-Robots-Tag: noindex, nofollow\n")
(SITE / 'robots.txt').write_text('User-agent: *\nDisallow: /\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n')
(SITE / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>')
(SITE / 'llms.txt').write_text('# Ananya Banerjee\n\n> A local design preview of the portfolio of Ananya Banerjee, a software engineer, builder, and creator.\n\nThis preview covers the opening composition and Thought Escape. It is not the complete portfolio.\n\n## Featured work\n- [Thought Escape](https://thought-escape.com/): Arrow puzzles across four themed worlds, with daily challenges.\n- [AgentChat Hub](https://agent-chat-hub.com/): A client for communicating with AI agents.\n- [It Made My Day](https://it-made-my-day.com/): A private vault for saved moments.\n- [Ananya’s Build Room](https://buildroomananya.substack.com/): A newsletter about building.\n- [Demystifying the Journey](https://podcasts.apple.com/us/podcast/demystifying-the-journey/id1686860913): A podcast by Ananya Banerjee.\n')
(SITE / 'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#c5b8ed"/><text x="12" y="46" fill="#26232b" font-family="sans-serif" font-size="46" font-weight="700">a.</text></svg>')
print('Built the isolated preview with matching legal pages and local security configuration.')
