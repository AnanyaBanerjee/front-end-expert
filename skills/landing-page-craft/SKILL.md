---
name: landing-page-craft
description: Creates and refines polished product landing pages with concise copy, strong first-section storytelling, real product visuals, intentional flow, and accessible responsive layouts. Use whenever building or revising a landing page, homepage, product-marketing site, launch page, or feature-story page.
source: https://github.com/AnanyaBanerjee/Daily-Cross-Off/blob/main/.agents/skills/landing-page-craft/SKILL.md
---

# Landing Page Craft

Build landing pages that explain the product quickly, show the real experience, and feel deliberately composed rather than assembled from generic sections.

## Start with the product

Before editing:

1. Read the existing design system and use its tokens and components as the source of truth.
2. Inspect the actual product UI, screenshots, and supplied assets.
3. Identify the core repeated behavior or transformation the product provides.
4. Preserve established branding, typography, illustration style, and interaction patterns.

Do not invent a separate visual language for the landing page.

## The first section

Treat the first section as the main product story, not only a headline and button.

- Lead with a specific problem in plain language.
- Follow with one short line that explains the product's central idea.
- If the user says to add content "after this," place it directly after that content in the same section unless they explicitly request a new section.
- Include the strongest product proof or demonstration in the first section.
- Show real product behavior rather than a generic mockup.
- Keep the primary action and a useful secondary link visible.
- Make secondary links scroll to the exact section their labels promise.

The first section may contain a compact animated example, sequence, or interaction when it helps users understand the product immediately. It must not become crowded or excessively tall.

## Copy rules

- Prefer short, concrete sentences.
- Keep each card or numbered point to one concise line when possible.
- Remove explanatory copy that repeats the heading.
- Use product language instead of broad marketing claims.
- Preserve the user's requested wording exactly unless asked to rewrite it.
- Break long copy into hierarchy, not more cards.
- Avoid guilt, pressure, exaggerated urgency, and unsupported claims.
- Do not repeat the same headline or positioning statement in nearby sections, videos, or mockups.

Example:

```text
Problem: Stop rewriting the same things every day.
Idea: Your routine already repeats. Your checklist should too.
Proof: Show a routine appearing once, being completed, and returning reset tomorrow.
```

## Show, then explain

Use visual evidence before detailed explanation:

- Embed the real app, a faithful interactive demo, or a product-only animation.
- Keep continuously useful product demonstrations visible on desktop and mobile.
- Product videos should show actual screens and actions, not duplicate landing-page slogans.
- Match demo UI to the current product, including real illustrations and layout details.
- If a visual element overlaps copy, move it away and reduce its visual weight rather than shrinking the text.
- Keep demo percentages, badges, and decorative UI secondary to the core message.

### Product-demo fidelity

Treat every demo as part of the product rather than a decorative video.

- Use the real app's interface, artwork, terminology, states, and interaction sequence.
- Demonstrate the defining behavior before secondary features.
- Keep the loop useful; do not add a slogan-only intro or outro.
- A white product should not sit inside a peach-tinted video unless that tint exists in the product.
- Reserve coral and peach for controls, progress, labels, checks, and editorial emphasis—not full-frame color washes.
- Verify both the phone wrapper and its internal composition at narrow widths.
- Scale fixed-size mockups proportionally instead of distorting individual internals.
- Ensure transformed mockups reserve their transformed height; CSS transforms do not change document layout.
- Keep iframe and video backgrounds consistent during scene transitions to prevent colored flashes.

## Color balance

Prefer a white or near-white main canvas with deliberate warm accents.

- Use the primary accent for actions, progress, sequence, and important editorial emphasis.
- Use secondary tones as supporting warmth, not as the dominant page or video color.
- Do not tint large areas merely to make them feel designed.
- Neutral space is necessary when the page already has accent illustrations, buttons, labels, and underlines.
- Match repeated accent text to the established token instead of inventing nearby colors.
- If the page has too much of one accent color, inspect every contributing layer: section background, gradient, ambient blob, iframe canvas, transition layer, shadow, and image background.
- Removing one tinted layer is insufficient when other layers still create the same cast.

This composes with [[../../feedback_color_palette]] — pull the accent from the logo, not a muted default.

## Section flow

Choose the order based on comprehension. A strong default is:

1. First-section problem, promise, proof, and action
2. Trust or low-friction reassurance
3. Simple repeated workflow
4. Product screenshots or interactive demonstration
5. Deeper features and details
6. Objection handling and closing action

Do not create a new section for content that belongs to the first section. Do not preserve a section merely because it is conventional.

## Visual storytelling

- Use sequences, connected journeys, and diagrams when ideas have an order.
- Do not turn an existing graph or process into a generic list.
- Preserve visible relationships between numbered steps.
- On smaller screens, adapt the graph while keeping its sequence visually connected.
- Use supplied imagery instead of substituting generic icons.
- Match each image to the correct feature in the user's intended order.
- Remove unwanted image backgrounds before compositing.
- Size detailed icons to support the content, not dominate it.
- Use selective hand-drawn accents for emphasis; do not underline everything.
- Motion should clarify sequence or state change and respect reduced-motion preferences.

### Connected sequences

When steps or milestones form a journey:

- Use an ordered semantic structure in addition to visual connectors.
- Keep connectors inside valid list markup; an `ol` may only have `li` elements as direct content.
- Give desktop cards equal columns. Position connectors in gaps so they do not change card width.
- Replace horizontal connectors with vertical ones on mobile instead of removing the relationship.
- Draw the path in the same order that nodes appear, revealing a node when the path reaches it.
- Do not describe vertically stacked disconnected cards as a graph.

## Motion system

Use motion to explain sequence, state change, and product behavior. Do not animate every object independently.

### Timing

- Main entrances: 350–500ms.
- Related-item stagger: 80–140ms.
- Hover and press feedback: 150–220ms.
- Typical travel: 8–20px.
- Storytelling animations play once on viewport entry.
- Continuous loops are reserved for genuine product behavior.

### Page-wide rhythm

1. Reveal the hero's problem and promise.
2. Draw one meaningful accent such as the headline underline.
3. Introduce product proof after the copy is readable.
4. Stagger trust statements as confirmations.
5. Animate instructional steps in semantic order.
6. Hand attention from the explanation to the interactive demo.
7. Draw connected feature or milestone paths progressively.
8. Let the closing illustration enter after the final action.

### Meaningful micro-animations

- **Add:** a row appears and settles into place.
- **Complete:** a hand-drawn line, check, press response, or progress update confirms the action.
- **Reset:** completed state clears and returns ready for the next day.
- **Trust:** use one quiet confirmation mark rather than looping decoration.
- **Screenshot:** use a restrained mask reveal while keeping the UI stable.
- **FAQ:** animate measured height and icon state without weakening semantics.
- **Graph:** draw connectors before revealing each destination node.

### Motion accessibility

Reduced Motion means immediate static content — not a slower animation.

- Render final visible states immediately.
- Do not make content visibility depend on `IntersectionObserver`.
- Remove delays, transforms, pulses, stroke interpolation, parallax, and hover movement.
- Never leave content at zero opacity.
- Keep path-based stories understandable through order, labels, and static connectors.
- Test reduced-motion paths separately from default motion.

This is required baseline behavior under [[../mobile/SKILL.md]] (`prefers-reduced-motion`) — this section adds the *content* rules, mobile skill covers the mechanism.

## Responsive accessibility

Accessibility is a design requirement, not a final check.

- Support large text without clipping, overlap, or hidden content.
- Preserve readable hierarchy and complete copy at all supported sizes.
- Keep touch targets usable (see [[../mobile/SKILL.md]] for the 44px minimum).
- Maintain contrast in light and dark modes.
- Give meaningful images useful alternative text; hide purely decorative images.
- Avoid fixed-height containers around variable text.
- Ensure animations do not gate access to content.
- Verify connected diagrams remain understandable without relying only on color or motion.
- Keep ordered processes semantically ordered with `ol` and `li`.
- Ensure tabs use tab/tabpanel relationships and keyboard navigation.
- A component marked `aria-modal="true"` must actually isolate background focus, pointer input, and assistive-technology access.
- Track and clean up delayed focus operations and animation timers.
- Restore focus to the initiating control when dialogs or sheets close.
- Validate transformed phone mockups at 320px, 375px, tablet, and desktop widths.

## Working from feedback

Treat screenshots and positional feedback literally.

- Identify which surface the user means: real app, interactive landing demo, embedded video, or static screenshot.
- Change only that surface unless consistency requires another surface to match.
- When the user says "a little," make a restrained adjustment and preserve the composition.
- When replacing assets, verify the final files are the latest supplied versions.
- If two edit processes overlap, compare final file hashes or contents before delivery.
- Do not describe a layout as corrected until the actual responsive implementation matches the request.

### Interpret visual corrections precisely

- "Move it a little" means preserve the composition and make a restrained adjustment.
- "Reduce the size a little" means reduce the container and its internal hierarchy proportionally.
- "Use these icons" means preserve the supplied order and subject mapping.
- "Remove the backgrounds" means verify alpha transparency rather than covering the background.
- "Use the same graph" means restore relationships and connectors, not only labels.
- "Make the video white" means every scene, transition canvas, and ambient layer remains white.
- "Use the same accent color" means use the established token already visible elsewhere.

## Implementation workflow (adapted for this repo)

1. Locate the exact section and current component in `output/<project>/site/index.html` before editing.
2. Confirm which style skill is active for the project (see `SKILLS_INDEX.md` Style Skill Routing) and stay inside its tokens.
3. Keep product-specific compositions local to `site/index.html`/`main.js`/`styles.css` rather than inventing a parallel system.
4. Use stable, descriptive asset filenames under `site/images/`.
5. Run through the mandatory four standards (security/legal/seo/aeo) plus mobile after any structural change — see `sync/SKILL.md`.
6. Inspect the rendered page (open in browser / screenshot) before delivering significant visual work.
7. Recheck narrow widths (320px, 375px) after transformed or fixed-size demo work.

## Final review

Before finishing, confirm:

- The first screen communicates the problem and product idea quickly.
- New content is in the section the user requested.
- Every link lands at the expected destination.
- Copy is concise and non-repetitive.
- The real product experience is visible.
- Diagrams remain diagrams rather than lists.
- Supplied assets are the correct versions and have the requested background treatment.
- No text, percentage, illustration, or badge overlaps another important element.
- Desktop and mobile both feel intentionally designed.
- Larger text remains polished and complete.
- Reduced Motion displays every section immediately and completely.
- Connected sequences remain connected at every breakpoint.
- Dialogs, tabs, accordions, and interactive demos remain keyboard accessible.
- White product surfaces are not unintentionally tinted by gradients or ambient effects.
