# Landing Page Discovery

Status: confirmed with the user on 2026-10-07 and implemented. Scope: the landing page `/`. The rail behaviour also applies to `/contact`, which shares `Rail.astro`; the 3D overture is `/` only.

## Product

multnelis.org is the profile of a small engineering team in Ho Chi Minh City, told through its three public projects (Undercroft, Ymir, Text Transporter). Product truth lives in `PRODUCT.md`; the visual system in `DESIGN.md`. The page is already built as a commit graph: a rail of lanes on the left edge, one lane colour per project, forks into each project field and a merge at "How we work".

## Primary goal

Explaining. A visitor leaves able to name the team's three lines of work, say what at least one project is for, and reach a repository.

- Primary goal: understand what the team builds, in seconds, then in depth for whoever keeps scrolling.
- Secondary goal: brand: the page should feel like it was made by people who build developer tools carefully.
- Primary CTA: `Explore the projects` (hero), then each project's repository link; closing CTA `Our repositories on GitHub`.
- Success condition: a click through to a repository, or to `/contact`.

## Primary CTA

Unchanged. The hero's `Explore the projects` → `#what-we-build`; every project field's repository chip; the closing `Our repositories on GitHub` and `Contact the team`.

## Audience

- Primary audience: developers and open-source maintainers arriving from GitHub (org page, a README, skills.sh).
- Secondary audience: Vietnamese-speaking developers in Ho Chi Minh City (VI toggle).
- Knowledge level: high. They know what a commit graph, a fork and a merge are, so the graph metaphor needs no explanation.
- Primary device context: desktop-first (developers coming from GitHub), with a real phone audience that must get the same story.
- Attention: short. They want the gist within seconds, which is why the page is not pinned (decision 2).

## Narrative

Scroll replays the team's history as a git log, top to bottom.

1. Overture: the whole history, seen in 3D, labelled with the three projects. The camera dives onto the first commit and the graph lands flat as the rail.
2. First commit: the team (profile): who we are, what we build.
3. Fork: Undercroft branches off main.
4. Fork: Ymir branches off main.
5. Fork: Text Transporter branches off main.
6. Merge: every lane bends back into main at "How we work": what the projects share.
7. Last commit: the closing call to action and the footer, where every lane merges for good.

## Emotional progression

- Opening emotion: curiosity. A living, three-dimensional graph with three named branches, seen whole.
- Middle emotion: clarity. Each project becomes understandable as its lane reaches it: node, name, tagline.
- Closing emotion: trust. The lanes merge on shared, checkable practice and end on links to real code.

## Visual language

- Flat 2D print for the whole page (`DESIGN.md`'s Flat Print Rule), with one exception chosen by the user: the overture is real 3D (a perspective camera over the graph's strokes and nodes, rendered with three.js). Depth exists only to move from the overview to the start, and it resolves to flat print before the profile.
- Scroll-scrubbed, reversible motion of the existing graph vocabulary: lanes, forks, merges, nodes.
- Typography, colour fields and marks are unchanged.

## Reference sites

- animejs.com: the interaction model (scroll scrubs state, reverses on scroll up), not the library or its look.
- Assumption: no other references. Add any here.

## Non-goals

- No pinned or scroll-jacked sections; native scrolling throughout.
- No smooth-scrolling library.
- No new content, claims or sections; `src/data/site.ts` copy is unchanged except any new screen-reader strings.
- No redesign of type, colour or layout outside the hero's overture band.
- No dark theme.

## Constraints

- Astro 7 static build on GitHub Pages; no UI framework, vanilla TypeScript modules.
- `PRODUCT.md`: no fabricated claims. The overture shows only the page's own graph and the three repository names.
- `DESIGN.md`: lane colours own whole regions or strokes; mono only for repository data; `--ease` for movement; everything gated on `html.is-static` / `prefers-reduced-motion`.
- English and Vietnamese: the language toggle changes line counts, so every measured position re-measures on `multnelis:lang`.
- WCAG 2.1 AA.

## Things to avoid

Random parallax; fade-ins on every section; glass, gradients, blur; cursor followers; scroll locking; animating layout properties; animation that is the only carrier of information.

## Assumptions

- **Assumption A1:** The 3D overture is decorative (`aria-hidden`); the hero text already names the three tools in words, so nothing is lost to a screen reader or with JavaScript off.
- **Decision (was A2):** The overture sits as a band under the hero's actions, the graph tilted away and receding toward the horizon, not beside the statement, so the statement keeps its current measure. Confirmed by the user.
- **Assumption A3:** `/contact` gets the scrubbed rail (it shares `Rail.astro`) but no overture.
- **Decision (was A4):** The overture is drawn with three.js. I recommended Canvas 2D with a hand-written projection (the scene is only strokes and dots); the user chose three.js. It is loaded on demand, so it costs nothing on pages and devices that do not show the overture. See `architecture.md`.
- **Decision (was A5):** Rail lines not yet reached are shown as a 1.5px hairline (Ink at 14% on paper, opaque), so the overture's full graph and the scrubbed flat rail are the same picture at the handoff. Confirmed by the user.
- **Assumption A6:** Playwright visual baselines are generated on Linux (Playwright's Docker image) to match CI, not on macOS.

## Open questions

- **Q1 (resolved):** overture placement: the band under the hero actions.
- **Q2 (resolved):** the hairline is kept as a permanent element of the rail.
- **Q3 (open):** Should the new `Test` CI job become a required status check next to `Check` and `Build`? That is a branch-protection change only you can make.
