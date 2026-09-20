# Visual redesign directions

## Feedback

Ananya rejected the first draft: the visual design was boring, lacked life, and had no distinctive typography or spacing. The content inventory remains useful. The presentation needs a new composition, not another styling pass on the same grid.

## What the current design gets wrong

- A single sans-serif family does almost all the work; scaling it does not create typographic character.
- Most content repeats the same preview rectangle, description, arrow, and expandable details pattern.
- Nineteen of the 24 previews use type, editorial lettering, waves, or pipeline labels rather than actual product media.
- Repeated section numbering, uppercase labels, dividers, and similar gaps make the page predictable.
- The dominant hover behavior moves screenshots or reveals text. It rarely demonstrates the identity of the venture itself.

## Ranked proposals — option 1 selected

### 1. Creator’s playground — recommended

The opening is an art-directed composition of real work around Ananya’s name: a game screen, an app window, a piece of writing, and a podcast cover. A broad, expressive display face carries the name; a narrow, crisp secondary face handles captions. Typography has contrast in width and weight, not just size. Neutral surroundings let each product’s own color show.

Layout alternates dense compositions with generous quiet space, large featured projects with smaller discoveries, and full-width moments with offset media. Hover activates a venture-specific preview; selecting it brings features and destinations into a stable reading area. Mobile becomes a deliberate sequence rather than a shrunken collage.

Tradeoff: requires careful composition and more real media; strongest fit for showing the range and personality of the work.

### 2. Living atlas

The opening presents connected clusters of products, media, and AI tools. Typography shifts from large condensed category names to precise product labels. Hovering a venture reveals its preview and connected work; selecting it opens a readable project section.

Tradeoff: communicates ecosystems most directly, but needs a parallel linear reading order and a carefully designed mobile treatment.

### 3. Moving editorial

A visually bold publication about the work: very large condensed headlines, a contrasting expressive italic for selected editorial moments, full-width product media, narrow captions, and deliberate blank space. Selected ventures receive distinct spreads; the complete collection remains easy to browse below.

Tradeoff: strongest reading rhythm and typography, but fewer ventures appear in the opening screen.

## Next step

After selection, build the opening and one representative venture interaction first. Review that visual result before extending it across the complete inventory. Existing site remains intact until the replacement direction is approved. No animation or production CSS has been changed in this turn.

## First slice

User selected option 1. Isolated implementation: `output/ananya-playground/site/`. Opening collage and Thought Escape four-world interaction are ready for visual review; the existing portfolio files were preserved.
