# Landing Page Discovery

Status: confirmed with the user and implemented. Scope: the landing page `/`; `/contact` shares the rail and gets the same behaviour.

## Product

multnelis.org is the profile of a small engineering team in Ho Chi Minh City, told through its three public projects (Undercroft, Ymir, Text Transporter). Product truth lives in `PRODUCT.md`; the visual system in `DESIGN.md`. The page is built as a commit graph: a rail of lanes on the left edge, one lane colour per project, forks into each project field and a merge at "How we work".

## Primary goal

Explaining. A visitor leaves able to name the team's three lines of work, say what at least one project is for, and reach a repository.

- Primary goal: understand what the team builds, in seconds, then in depth for whoever keeps scrolling.
- Secondary goal: brand: the page should feel made by people who build developer tools carefully.
- Success condition: a click through to a repository, or to `/contact`.

## Primary CTA

Unchanged: the hero's `Explore the projects`, each project field's repository chip, the closing `Our repositories on GitHub` and `Contact the team`.

## Audience

- Primary audience: developers and open-source maintainers arriving from GitHub (org page, a README, skills.sh).
- Secondary audience: Vietnamese-speaking developers in Ho Chi Minh City (VI toggle).
- Knowledge level: high. They know what a commit graph, a fork and a merge are.
- Primary device context: desktop-first, with a real phone audience that must get the same story.
- Attention: short. They want the gist within seconds, so nothing is pinned and no text is held back.

## Narrative

Scroll replays the team's history as a git log, top to bottom: the team's first commit (the statement), the team (profile), the three project branches, the merge at "How we work", and the last commit in the footer.

## Emotional progression

- Opening emotion: curiosity. The rail draws itself in as the page opens.
- Middle emotion: clarity. Each project's branch forks off as the reader reaches it.
- Closing emotion: trust. The lanes merge on shared, checkable practice and end on links to real code.

## Visual language

Flat print (`DESIGN.md`'s Flat Print Rule). Motion is scroll-driven and reversible, and only the graph moves: lanes, forks, merges, commits. Typography, colour fields and marks never animate.

## Reference sites

- animejs.com: the interaction model (scroll drives state, reverses on scroll up), not its look or library.

## Non-goals

- No pinned or scroll-jacked sections; no smooth-scrolling library.
- No animated, hidden or faded text.
- No new content or claims; `src/data/site.ts` is unchanged.
- No depth, perspective or 3D.

## Constraints

- Astro 7 static build on GitHub Pages; vanilla TypeScript, no UI framework, no runtime dependency.
- `DESIGN.md`: lane colours own whole regions or strokes; `--ease` for movement; everything static under `prefers-reduced-motion`.
- English and Vietnamese: the language toggle changes line counts, so the rail re-measures on `multnelis:lang`.
- WCAG 2.1 AA.

## Things to avoid

Random parallax; fade-ins on every section; glass, gradients, blur; cursor followers; scroll locking; animating layout properties; animation as the only carrier of information.

## Decision history

1. **First round (rejected).** Built as planned: a 3D overture in the hero (three.js; the whole graph tilted away under the actions, laid flat onto the rail by the first viewport of scroll), headings and taglines that arrived after their commit, and a grey hairline for the history not yet read. The user reviewed it on the running site and called it too ugly, the 3D overture most of all.
2. **Second round (implemented).** The user chose "flat and refined": no 3D, text never hidden or animated, no grey lines; the rail draws like a pen as the reader scrolls, with thick, decisive strokes. Two refinements came from reviewing screenshots: the pen follows the scroll with a short lag so a wheel step draws as one stroke, and it rests 85% down the screen rather than 66%, because without a hairline the empty lower third of the rail read as unfinished.

## Assumptions

- **Assumption A1:** `/contact` gets the same scroll-drawn rail, since it shares `Rail.astro`.
- **Assumption A2:** Playwright visual baselines are generated on Linux (Playwright's Docker image) to match CI, not on macOS.

## Open questions

- **Q1 (open):** Should the new `Test` CI job become a required status check next to `Check` and `Build`? That is a branch-protection change only the repository owner can make.
