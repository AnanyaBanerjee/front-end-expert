# AgentChat Hub landing page redesign

## Approved direction

Lead with two differentiators: connecting compatible AI wherever it is hosted, and no data collection by AgentChat Hub. Use the real desktop interface without altering its appearance. Frame it with blue/teal lighting, clear typography, and restrained motion.

## Implementation

- `site/index.html`: iPhone showcase with its real Discover screen, accessible full-screen screenshot viewer, product showcase, three connection methods, privacy explanation, screenshot tour, tasks/tools, setup, FAQ, and App Store links.
- `site/redesign.css` and `site/redesign.js`: shared responsive presentation, mobile navigation, keyboard-operable screenshot tabs, and footer year. No external libraries or tracking.
- `site/images/*.webp`: optimized copies of the supplied desktop screenshots, preserving the app UI.
- Privacy, terms, and support retain their existing body content inside the shared shell. DMCA contact page added.
- `site/llms.txt`: synchronized product description, compatibility and privacy boundaries.

## Claims checked

The app repository at `/Users/ananyabanerjee/Desktop/agent-app/agent-messaging-app` uses local storage for conversations and Expo SecureStore for Apple-device credentials. No analytics SDK references were found in the services, stores, or app screens searched; this is not a comprehensive network audit.

Task conversations run a bounded multi-turn loop and currently do not resolve MCP servers. The page describes chat tools separately. Connection support requires a compatible, reachable endpoint. Provider data policies and API charges are separate from the app. No cross-device synchronization is promised.

## Validation

- Screenshot viewer verified at desktop and 390px: Escape dismissal returns focus; the 900px screenshot scrolls inside the dialog without overflowing the page.
- iPhone section visually checked at 390px.
- Browser verification: screenshot tour click and arrow-key selection; mobile menu open and Escape close; FAQ expansion.
- No horizontal overflow at 390px or 320px; no broken loaded images at 390px.
- Desktop and mobile screenshots reviewed, including the privacy page at 320px.
- Local link and fragment check passed for all five redesigned pages.
- JavaScript syntax and Git whitespace checks passed.

The legacy demo prototype and its `main.js` remain as existing standalone assets. This redesign has not been deployed or committed.

## Blog addition — September 9, 2026

Added a homepage blog section, a blog index, and three illustrative application guides: cloud-provider organization, using local models, and connecting custom A2A agents. Each describes a problem, concrete setup, what changes, and limitations, without invented customer outcomes. External setup facts link to official provider/protocol documentation. Navigation, sitemap, and llms.txt updated. All nine pages passed local link, fragment, external-link, heading, and JSON-LD checks. Blog card navigation and dark mobile article rendering verified in the browser.

## App gallery

Added separate Mac and iPhone screenshot rows using the latest available August 29 batch in `Desktop/Agent-Chat-Hub/New App Store Screenshots`. Nine Mac and ten iPhone screenshots cover light/dark home, chats, agent discovery, connections, tasks, and groups. Optimized WebP copies preserve the app UI. The gallery supports native horizontal scrolling, previous/next buttons, full-screen viewing, keyboard arrows, Escape dismissal, and focus restoration. Verified desktop next-image navigation and the iPhone viewer at 390px with no page overflow.
