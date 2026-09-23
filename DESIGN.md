---
name: multnelis.org
description: A small collective in Ho Chi Minh City, drawn as a commit graph. Ink on white, three lane colours, one rail.
colors:
  ink: '#101214'
  ink-2: '#4a4f57'
  ink-raised: '#262a2f'
  hair: 'rgb(16 18 20 / 14%)'
  ink-tint: 'rgb(16 18 20 / 7%)'
  paper: '#ffffff'
  lane-vermilion: '#c9461f'
  lane-cobalt: '#2457f5'
  lane-jade: '#168459'
typography:
  display:
    fontFamily: 'Anybody, sans-serif'
    fontSize: 'clamp(2.75rem, 1.1rem + 5.4vw, 5.5rem)'
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: '-0.02em'
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: 'Anybody, sans-serif'
    fontSize: 'clamp(2.125rem, 1.4rem + 2.2vw, 3.25rem)'
    fontWeight: 800
    lineHeight: 1
    letterSpacing: '-0.02em'
    fontVariation: "'wdth' 125"
  title:
    fontFamily: 'Anybody, sans-serif'
    fontSize: 'clamp(1.75rem, 1.1rem + 1.8vw, 2.375rem)'
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: '-0.02em'
    fontVariation: "'wdth' 125"
  title-sm:
    fontFamily: 'Anybody, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: '-0.02em'
    fontVariation: "'wdth' 125"
  lead:
    fontFamily: 'Hanken Grotesk, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 400
    lineHeight: 1.5
  subhead:
    fontFamily: 'Hanken Grotesk, sans-serif'
    fontSize: '1.375rem'
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: 'Hanken Grotesk, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: 'Hanken Grotesk, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: 'JetBrains Mono, monospace'
    fontSize: '0.8125rem'
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'calt' 0, tabular-nums"
  label-md:
    fontFamily: 'JetBrains Mono, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1
    fontFeature: "'calt' 0, tabular-nums"
rounded:
  focus: '3px'
  xs: '4px'
  sm: '5px'
  md: '6px'
  lg: '7px'
  tile: '18px'
  tile-sm: '14px'
  full: '50%'
spacing:
  rail: '120px'
  rail-mobile: '48px'
  gutter: '64px'
  gutter-mobile: '20px'
  stroke: '6px'
  stroke-mobile: '4px'
  xs: '8px'
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  col-gap: '60px'
  col-gap-wide: '72px'
  section: '104px'
  section-mobile: '56px'
components:
  button-solid:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    typography: '{typography.body}'
    rounded: '{rounded.lg}'
    padding: '15px 22px'
  button-solid-hover:
    backgroundColor: '{colors.ink-raised}'
    textColor: '{colors.paper}'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.lg}'
    padding: '15px 22px'
  button-ghost-hover:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
  chip-branch:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '7px 10px 7px 8px'
  chip-handle:
    backgroundColor: 'transparent'
    textColor: '{colors.paper}'
    typography: '{typography.label-md}'
    rounded: '{rounded.sm}'
    padding: '6px 9px'
  segment-lang:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.xs}'
    padding: '7px 11px'
  segment-lang-hover:
    backgroundColor: '{colors.ink-tint}'
    textColor: '{colors.ink}'
  segment-lang-pressed:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
  field-vermilion:
    backgroundColor: '{colors.lane-vermilion}'
    textColor: '{colors.paper}'
    padding: '104px 64px 112px'
  field-cobalt:
    backgroundColor: '{colors.lane-cobalt}'
    textColor: '{colors.paper}'
    padding: '104px 64px 112px'
  field-jade:
    backgroundColor: '{colors.lane-jade}'
    textColor: '{colors.paper}'
    padding: '104px 64px 112px'
  avatar-commit:
    backgroundColor: '{colors.paper}'
    rounded: '{rounded.full}'
    size: '212px'
  domain-tile:
    backgroundColor: '{colors.paper}'
    rounded: '{rounded.tile}'
    padding: '8px'
    size: '88px'
---

# Design System: multnelis.org

## Overview

**Creative North Star: "The Commit Graph"**

The page is a git history read top to bottom. A rail of round-capped lanes runs down the left edge of every section: main is ink, and each of the three members owns one colour that forks off main, carries their full-bleed field, and bends back in to merge into each project they touched. Time is the scroll axis; the statement is the first commit, the footer is the last. Remove every word and the page is still recognisable: one ink rail, three colour fields, a handful of ringed nodes.

The material is flat and printed. White ground, near-black ink, no shadows, no gradients, no glass. Hierarchy comes from three things only: the wide, heavy display face; the lane colours owning whole regions rather than accents; and hairline rules. The three faces have strict jobs (Anybody wide for headings and the wordmark, Hanken Grotesk for reading, JetBrains Mono for refs, handles, facts and metadata) so the mono face reads as "data from the repository" wherever it appears.

Motion is one signature, not a mood: the rail draws itself as sections enter the viewport, nodes pop after the line arrives, and hovering a member's avatar pulses their lane along the whole page. Under `prefers-reduced-motion` the graph is simply already drawn.

**Key Characteristics:**

- White ground, ink text, three saturated lane colours used as full-bleed fields, never as tints or accents on white.
- A measured, script-built SVG rail (120px desktop / 48px mobile) with 6px round-capped strokes and white-ringed nodes; solid nodes for public commits, hollow for private.
- Anybody at width 125 and weight 700–800 for every heading; tight tracking (-0.02em); balanced wrapping.
- JetBrains Mono reserved for repository facts: handles, refs, tags, state, the branch chip, the language switch.
- Flat surfaces, hairline dividers, small radii (4–7px) on controls; circles only for avatars and lane dots.
- One motion grammar: draw-on-scroll, node pop, lane pulse on avatar hover; all static under reduced motion.

## Colors

Ink on paper with three lane colours, each dark enough to carry white text at AA.

### Primary

- **Ink** (`{colors.ink}`): the main lane, every heading and body word on white, the solid button, the pressed language segment, focus outlines, selection background, the scrollbar thumb.
- **Raised Ink** (`{colors.ink-raised}`): the solid button's hover fill and border. The only lighter ink the page uses.
- **Ink Two** (`{colors.ink-2}`): secondary text. Metadata keys (`repo`, `tags`, `state`), the `merges` label, the `lang` label, the footer domain line, and a private repository's name.

### Secondary

- **Vermilion** (`{colors.lane-vermilion}`): cuongtranba's lane. Fills his whole member field edge to edge (right of the rail), draws his lane on the rail, and marks him with a dot in every project he merged into.
- **Cobalt** (`{colors.lane-cobalt}`): thanh-dong's lane. Same three jobs.
- **Jade** (`{colors.lane-jade}`): yanmad27's lane. Same three jobs.

### Neutral

- **Paper** (`{colors.paper}`): the page ground and the text colour on every lane field; the ring around nodes, the avatar border, the domain-icon tile.
- **Hair** (`{colors.hair}`): the only divider. Header underline, project and footer `border-top`, the branch chip border.
- **Ink Tint** (`{colors.ink-tint}`): the language segment's hover wash.

### Named Rules

**The Whole-Region Rule.** A lane colour is applied to a member's entire field, the rail stroke and the merge dots, and nothing else. It is never a tint, a link colour, a heading colour on white, or a border. On white the page is monochrome.

**The White-Text Rule.** Inside a lane field everything is white: headings, body, mono facts, links, the handle chip border (at 70% white), focus outlines. Selection inverts to white on the lane colour.

**The Contrast Floor.** Each lane colour passes 4.5:1 with white text; Ink Two passes on white. Do not lighten a lane to "soften" it.

## Typography

**Display Font:** Anybody, variable weight 100–900 with the width axis 50–150 (self-hosted via Astro Fonts, latin + vietnamese subsets; fallback sans-serif)
**Body Font:** Hanken Grotesk, 300–800, normal and italic (fallback sans-serif)
**Label/Mono Font:** JetBrains Mono, 400 and 500 (fallback monospace)

**Character:** Wide and heavy over plain and quiet. Every heading is Anybody stretched to 125% width, weight 700–800, tracked -0.02em and balanced; it reads like a wordmark. Hanken Grotesk carries paragraphs at a relaxed 1.5–1.55 leading. JetBrains Mono, with contextual ligatures off and tabular numerals, marks anything that comes from the repository.

### Hierarchy

- **Display** (800, `clamp(2.75rem, 1.1rem + 5.4vw, 5.5rem)`, 0.98; 2.5rem / 1.0 at ≤720px): the hero statement only. Max width 1140px; `text-wrap: balance` on desktop, `pretty` on phones.
- **Headline** (800, `clamp(2.125rem, 1.4rem + 2.2vw, 3.25rem)`, 1.0): a member's name inside their field, in white.
- **Title** (700, `clamp(1.75rem, 1.1rem + 1.8vw, 2.375rem)`, 1.08, max 24ch): a project's tagline, the commit message the merge node sits beside.
- **Title Small** (700, 1.25rem, 1.1): a project's name beside its mark; the wordmark uses the same face at 800 / 1.375rem (1.25rem on phones).
- **Lead** (400, 1.25rem, 1.5, max 62ch; 1.125rem at ≤720px): the hero supporting line, in Ink.
- **Subhead** (600, 1.375rem, 1.3; 1.1875rem on phones): a member's role line.
- **Body** (400, 1.125rem, 1.55, max 62ch): member intros. **Body Small** (1.0625rem, 1.55, max 64ch): project detail; repo link lists at 500; the member quote in italic.
- **Label** (400, 0.8125rem, 1.55–1.6, mono, +0.01em on facts): facts, metadata `dl`, the `merges` line, the branch chip, the footer domain. **Label Medium** (0.875rem): the handle chip and member links; the footer line is 0.9375rem. The language segment is 500 / 0.8125rem / +0.02em.

### Named Rules

**The Mono-Is-Data Rule.** JetBrains Mono appears only on strings that exist in a repository or profile: handles, repo refs, tags, state, dates and counts, the branch name, the language code. Never on prose, headings or buttons.

**The Wide Display Rule.** Anybody is always set with `font-stretch: 125%` / `'wdth' 125`, weight 700–800, tracking -0.02em. There is no regular-width or light display setting.

## Layout

The page is a single column set to the right of the rail. Every section is a `.gs` graph section: `position: relative`, an absolutely positioned `svg.rail` on its left edge (width `--rail`), and content padded `calc(var(--rail) + var(--gutter))` on the left and `var(--gutter)` on the right. Member fields skip the column padding and instead `margin-left: var(--rail)` so their colour runs from the rail to the right edge of the viewport.

- **Rail:** 120px desktop, 48px at ≤720px. Lanes sit at 20 / 40 / 60 / 80% of the rail width (main, vermilion, cobalt, jade). Stroke 6px, 4px on phones.
- **Gutter:** 64px desktop, 20px on phones.
- **Vertical rhythm (desktop → ≤720px):** header row 22px → 16px padding; hero 112px top / 136px bottom → 56 / 88; member field 104 / 112 → 56 / 64; project 88 / 96 → 56 / 64; footer 128 / 120 → 72 / 80.
- **Member grid:** `212px minmax(0,1fr)`, gap 20px × 60px, max width 1180px. Stacks to one column with 24px gap at ≤720px; avatar shrinks to 132px.
- **Project grid:** `minmax(0,1fr) 300px`, gap 32px × 72px, max width 1400px, tagline left and metadata right. At ≤1100px it stacks with the name and metadata first, then the tagline (28px gap).
- **Header row:** flex, gap 20px (12px on phones); the language switch is pushed right with `margin-left: auto`. The branch chip hides at ≤440px; the `lang` label hides at ≤720px.
- **Stacks inside a block:** 10, 12, 14, 16, 22, 26, 30, 36, 44px are the observed `margin-top` steps (chip, quote, handle, intro, role, repos/links, facts/merges, lead, actions).
- **Breakpoints:** 1100px (project grid stacks), 720px (rail, gutter, stroke, type scale, section padding, member grid, stacked actions), 440px (branch chip removed). Minimum body width 320px; `overflow-x: hidden`.
- **Anchors:** the rail is measured, not styled. Each section marks one `[data-anchor]` (the h1, the avatar, the tagline, the footer line) and the script places the commit node at that element's vertical centre, rebuilding on resize, font load and language change.

## Elevation & Depth

There are no shadows. Depth is conveyed by the lane fields sitting flush against the white ground, by 1px hairlines (`{colors.hair}`) between white sections, and by the rail's white-ringed nodes reading as "on top of" the strokes. The domain-icon tile and the avatar border are white so the lane-coloured artwork reads against its own field.

### Named Rules

**The Flat Print Rule.** No `box-shadow`, no gradients, no blur, no translucency beyond the two ink alphas (Hair 14%, Ink Tint 7%). A new surface is either white or one lane colour.

## Shapes

Small radii on controls, circles on people and lanes, right angles on regions. Buttons are 7px; the branch chip and the language segment frame are 6px with 4px inner buttons; the handle chip and project marks are 5px; focus outlines round to 3px. The domain-icon tile is 18px (14px on phones). Avatars are circles with a 6px white border (5px on phones); merge dots are 10px circles. Rail strokes are round-capped and round-joined and bend between lanes on a symmetric cubic S-curve. Fields and sections have square corners and meet on hairlines.

## Components

### Buttons

Two peers, same size, same face, no icons. Tactile but quiet.

- **Shape:** softly rounded (7px), 1px Ink border on both.
- **Solid:** Ink fill, white text; 600 / 1rem Hanken; padding 15px 22px; gap 10px. Hover: Raised Ink fill and border.
- **Ghost:** transparent, Ink text, hairline-weight Ink border. Hover: inverts to Ink fill, white text.
- **Active / Focus:** `translateY(1px)` on press (300ms on the world ease); background and colour transition 180ms; focus-visible is the global 2px Ink outline at 3px offset.
- **Mobile:** stacked full-width at ≤720px, 12px apart.

### Chips

Mono, hairline, square-ish.

- **Branch chip** (header `main`): 0.8125rem mono, 1px Hair border, 6px radius, padding 7px 10px 7px 8px, a 14px branch glyph at 7px gap. Static.
- **Handle chip** (inside a field): 0.875rem mono, 1px white-at-70% border, 5px radius, padding 6px 9px, white text.

### Language Segment

The EN / VI switch is a two-button segmented control, framed 1px Ink at 6px radius with 2px padding. Buttons are 500 / 0.8125rem mono, +0.02em, padding 7px 11px, 4px radius. Hover: Ink Tint. Pressed (`aria-pressed="true"`): Ink fill, white text. A `lang` mono label in Ink Two precedes it on desktop.

### Member Field (signature)

A full-bleed region in the member's lane colour, right of the rail. A 212px circular avatar with a 6px white border sits on the commit node; the avatar scales 1.03 on hover (500ms) and sets `body[data-pulse]` so the member's lane pulses page-wide. Name in Headline white, handle chip, role Subhead, intro Body, optional italic quote, mono facts (single-line with hidden horizontal scroll on desktop, wrapping on phones), a wrapped list of repo links, then mono `github →` / `site →` links. The 88px domain icon (Codex-generated, flat, in the lane colour) sits top-right on a white 18px-radius tile with 8px padding. Selection inside the field is white on the lane colour.

### Project Commit (signature)

A white section under a hairline. Left: Title tagline (the anchor), Body Small detail, then a mono `merges` line with a 10px lane dot before each contributor's handle. Right (300px): the name at Title Small with an optional 28px mark, and a mono `dl` (repo, site, tags, state) with keys in Ink Two and values in Ink; links underline at 45% currentColor and go solid on hover. A private project shows its name in Ink Two, `state private`, no link, and a hollow node on the rail.

### Links

Inherit colour, 1px underline offset 0.2em, underline colour 45% of currentColor rising to 100% on hover (160ms). Mono links wrap the label in a span so the arrow stays unstyled.

### Rail (signature)

An `aria-hidden` SVG per section built from measured layout. Lane order on the rail: main, vermilion, cobalt, jade. Nodes: regular r 8 with a 3px white ring (6 / 2.5 on phones); big r 14 / ring 4 (10 / 3) for the first and last commit; fork dot r 4.5 (3) on main where a member branches; hollow (white fill, lane stroke) for private. Curve reach: fork 168px above the avatar (96 on phones), merge bends ±76px around the tagline (44), the hero lanes run 190px before converging (112). Draw-on: `stroke-dashoffset` 600ms on `cubic-bezier(0.19, 1, 0.22, 1)` when the section is 12% in view (`rootMargin -8%`), nodes scale 0.6→1 and fade in 220ms after. Pulse: `lane-pulse` 900ms ease-in-out infinite to 1.75× stroke. Reduced motion (or `?static`): `html.is-static`, lanes fully drawn, the pulse becomes a static 1.75× stroke.

### Navigation

The header is part of the hero's graph section: wordmark (28px mark + `multnelis` in Anybody 800 / 1.375rem, no underline) linking to `#top`, the branch chip, and the language switch; a Hair rule under it starts at the rail's right edge. There is no menu; in-page movement is the "Meet the team" ghost button to `#members`. Smooth scroll on, off under reduced motion.

### Language Toggle (i18n pattern)

English is server-rendered. Every translatable text node carries `data-i18n="<key>"`, images carry `data-i18n-alt`, landmarks carry `data-i18n-aria`; keys are `hero.*`, `actions.*`, `member.<handle>.{role,intro,facts,iconAlt}`, `project.<slug>.{tagline,detail}`, `footer.place`, `ui.*`. `src/data/site.ts` is the single owner of both languages and emits the Vietnamese half as `#i18n-vi` JSON; the toggle swaps `textContent` / `alt` / `aria-label`, sets `html.lang`, persists to `localStorage` (`multnelis:lang`), honours `?lang=vi`, and dispatches `multnelis:lang` so the rail re-measures.

## Do's and Don'ts

### Do:

- **Do** put every new section on the graph: wrap it in `.gs` with a `<Rail />`, a `data-kind`, and one `[data-anchor]` the node should sit beside.
- **Do** keep the column to the right of the rail (`.col`: `calc(var(--rail) + var(--gutter))` left, `var(--gutter)` right) and full-bleed fields at `margin-left: var(--rail)`.
- **Do** set every heading in Anybody at width 125, weight 700–800, -0.02em, balanced.
- **Do** use JetBrains Mono (`.mono`, tabular numerals, `calt` off) for handles, refs, tags, state, dates and counts, and nothing else.
- **Do** use white for all text and borders inside a lane field, and invert selection to white on the lane colour.
- **Do** keep controls on the 4–7px radius scale with a 1px Ink or Hair border and no fill at rest; fill with Ink only for the solid button and the pressed segment.
- **Do** add new strings to `src/data/site.ts` with both `en` and `vi` and mark the node with `data-i18n` (or `data-i18n-alt` / `data-i18n-aria`).
- **Do** gate any new motion on `html.is-static` and `prefers-reduced-motion`, and use `--ease` (`cubic-bezier(0.19, 1, 0.22, 1)`) for movement.

### Don't:

- **Don't** use a lane colour as a tint, link colour, heading colour, icon colour or border on white; lane colours own whole regions or rail strokes.
- **Don't** add shadows, gradients, blur or translucent panels; the world is flat print.
- **Don't** introduce a fourth accent or a dark theme; the site is light-only by configuration.
- **Don't** style the rail from a component; its paths are script-built and its rules live in the global `site.css`.
- **Don't** put prose in the mono face or set Anybody at normal width.
- **Don't** add copy that is not backed by a repository or a member profile (no counts, testimonials, clients).
- **Don't** hardcode a colour or font: reference `--ink`, `--ink-2`, `--hair`, `--paper`, `--c` / `--t` / `--y`, `--display` / `--body` / `--mono`.
