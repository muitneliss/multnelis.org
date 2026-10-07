---
name: multnelis.org
description: An engineering team's profile, drawn as a commit graph. Ink on white, one lane colour per project, one rail.
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
  group: '72px'
  group-mobile: '48px'
  row: '40px'
  row-mobile: '28px'
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
  chip-handle-white:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '6px 9px'
  link-cross:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
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
  mark-tile:
    backgroundColor: '{colors.paper}'
    rounded: '{rounded.tile}'
    padding: '8px'
    size: '88px'
---

# Design System: multnelis.org

## Overview

**Creative North Star: "The Commit Graph"**

The site is the team's git history read top to bottom, and it shows the team through its work, never through its people. A rail of round-capped lanes runs down the left edge of every section: main is ink and stands for the team; each public project owns one colour that forks off main, carries the project's full-bleed field, and runs on until every lane bends back into main at "How we work" and merges for good in the footer. Time is the scroll axis; the statement is the first commit, the team profile is the second, the footer is the last. Remove every word and the page is still recognisable: one ink rail, three colour fields, a handful of ringed nodes. The `/contact` page is the same history in its compact register: the address is the first commit, and each project row forks that project's lane beside its name, white rather than full-bleed.

The material is flat and printed. White ground, near-black ink, no shadows, no gradients, no glass. Hierarchy comes from three things only: the wide, heavy display face; the lane colours owning whole regions rather than accents; and hairline rules. The three faces have strict jobs (Anybody wide for headings and the wordmark, Hanken Grotesk for reading, JetBrains Mono for refs, handles, facts and metadata) so the mono face reads as "data from the repository" wherever it appears.

Motion is one signature, not a mood: scroll replays the history. The page opens on the whole graph in 3D, tilted away under the hero (the overture), and the first scroll lays it flat onto the rail. From there every lane is drawn exactly as far as the reader has read, with the unread history ahead as a hairline; a commit lands when the line reaches it, and the scene's heading arrives after it. Scrolling back up unwinds it all. Pointing at a project (its entry in the profile's index, its name in its field or on the contact page) pulses its lane along the whole page. Under `prefers-reduced-motion` the graph is simply already drawn. The scene-by-scene plan and its reasoning are in `docs/interactive-landing/`.

**Key Characteristics:**

- White ground, ink text, three saturated lane colours used as full-bleed fields, never as tints or accents on white.
- A measured, script-built SVG rail (120px desktop / 48px mobile) with 6px round-capped strokes and white-ringed nodes; solid nodes for public commits, hollow for private.
- Anybody at width 125 and weight 700–800 for every heading; tight tracking (-0.02em); balanced wrapping.
- JetBrains Mono reserved for repository facts: handles, refs, tags, state, the branch chip, the language switch.
- Flat surfaces, hairline dividers, small radii (4–7px) on controls; circles only for avatars and lane dots.
- One motion grammar, driven by scroll position: the overture lands the 3D graph flat, lanes draw down to the reader, commits land, headings arrive after their commit; lane pulse when a project is pointed at (hover or keyboard focus); all static under reduced motion.

## Colors

Ink on paper with three lane colours, each dark enough to carry white text at AA.

### Primary

- **Ink** (`{colors.ink}`): the main lane, every heading and body word on white, the solid button, the pressed language segment, focus outlines, selection background, the scrollbar thumb.
- **Raised Ink** (`{colors.ink-raised}`): the solid button's hover fill and border. The only lighter ink the page uses.
- **Ink Two** (`{colors.ink-2}`): secondary text. Metadata keys on white (`based`, `since`, `public`, `org`, `issues`, `site`), a principle's proof line, the track under a project name in the index, the `lang` label, the footer domain line, and the repository path under a project name on the contact page.

### Secondary

- **Vermilion** (`{colors.lane-vermilion}`): Undercroft's lane (`u`, `--lane-u`). Fills the project's whole field edge to edge (right of the rail), draws its lane on the rail, and marks it with a dot in the profile index and on its contact row.
- **Cobalt** (`{colors.lane-cobalt}`): Ymir's lane (`y`, `--lane-y`). Same three jobs.
- **Jade** (`{colors.lane-jade}`): Text Transporter's lane (`t`, `--lane-t`). Same three jobs.

### Neutral

- **Paper** (`{colors.paper}`): the page ground and the text colour on every lane field; the ring around nodes; the mark tile a project's own mark sits on.
- **Hair** (`{colors.hair}`): the only divider on white. Header underline; profile, closing, contact-row and footer `border-top`; the rules between index entries and between principles; the branch chip border.
- **Ink Tint** (`{colors.ink-tint}`): the language segment's hover wash.

### Named Rules

**The Whole-Region Rule.** A lane colour is applied to a project's entire field, the rail stroke and its lane dots, and nothing else. It is never a tint, a link colour, a heading colour on white, or a border. On white the page is monochrome.

**The White-Text Rule.** Inside a lane field all text is full white: headings, body, mono keys and values, links, focus outlines. A dimmed white drops under 4.5:1 on vermilion, so it is never used for text; only borders take alpha (the path chip and code frame at 70%, use-case rules at 45%). Selection inverts to white on the lane colour.

**The Contrast Floor.** Each lane colour passes 4.5:1 with white text; Ink Two passes on white. Do not lighten a lane to "soften" it.

## Typography

**Display Font:** Anybody, variable weight 100–900 with the width axis 50–150 (self-hosted via Astro Fonts, latin + vietnamese subsets; fallback sans-serif)
**Body Font:** Hanken Grotesk, 300–800, normal and italic (fallback sans-serif)
**Label/Mono Font:** JetBrains Mono, 400 and 500 (fallback monospace)

**Character:** Wide and heavy over plain and quiet. Every heading is Anybody stretched to 125% width, weight 700–800, tracked -0.02em and balanced; it reads like a wordmark. Hanken Grotesk carries paragraphs at a relaxed 1.5–1.55 leading. JetBrains Mono, with contextual ligatures off and tabular numerals, marks anything that comes from the repository.

### Hierarchy

- **Display** (800, `clamp(2.75rem, 1.1rem + 5.4vw, 5.5rem)`, 0.98; `clamp(1.75rem, 0.2rem + 8vw, 2.5rem)` / 1.0 at ≤720px, so the longest word fits a 320px phone): the hero statement of each page only. Max width 1140px; `text-wrap: balance` on desktop, `pretty` on phones.
- **Headline** (800, `clamp(2.125rem, 1.4rem + 2.2vw, 3.25rem)`, 1.0): a project's name inside its field, in white (`clamp(1.625rem, 0.9rem + 3.4vw, 2.125rem)` on phones, so `Transporter` fits at 320px); the section headings on white (the profile title, `How we work`, the closing line, `Project questions and issues` on the contact page).
- **Title** (700, `clamp(1.75rem, 1.1rem + 1.8vw, 2.375rem)`, 1.08): a project's tagline in its field (max 26ch), and a project's name in the profile index (1.5rem under 440px).
- **Title Small** (700, 1.25rem, 1.1): the `What we build` and `Use cases` headings, a principle's title, a project's name on a contact row; the wordmark uses the same face at 800 / 1.375rem (1.25rem on phones, 1.125rem under 440px).
- **Lead** (400, 1.25rem, 1.5, max 62ch; 1.125rem at ≤720px): the hero supporting line on both pages and the closing line's paragraph.
- **Body** (400, 1.125rem, 1.55, max 62–64ch): the profile paragraph and a project's detail. **Body Small** (1.0625rem, 1.5–1.55): a use case's text, a principle's text. A use case's title and a track name are Hanken 600 at 1.0625–1.125rem.
- **Label** (400, 0.8125rem, 1.55, mono): the facts `dl` in the profile (`based`/`since`/`public`/`org`) and in a project field (`repo`/`site`/`install`|`image`/`stack`/`license`/`status`), a contact row's `issues`/`site`, a principle's proof line, the branch chip, the footer domain. **Label Medium** (0.875rem): the repository chip under a project name in its field, the repository path under a contact row name (Ink Two, 1.2 leading); the footer line, the hero address and the header cross-link are 0.9375rem (the cross-link in Hanken 600, not mono). The language segment is 500 / 0.8125rem / +0.02em.

### Named Rules

**The Mono-Is-Data Rule.** JetBrains Mono appears only on strings that exist in a repository: repo refs, repository paths, install commands and image names, stack tags, licence, status, dates and counts, the branch name, the language code, the email address. Never on prose, headings, buttons or navigation links.

**The Name-Then-Path Rule.** Wherever a thing has both a display name and a repository fact, the name comes first in Anybody and the fact sits under it in mono: a project's name then `muitneliss/repo` in its field, or `/repo` on a contact row. The fact is never promoted above the name.

**The Wide Display Rule.** Anybody is always set with `font-stretch: 125%` / `'wdth' 125`, weight 700–800, tracking -0.02em. There is no regular-width or light display setting.

## Layout

The page is a single column set to the right of the rail. Every section is a `.gs` graph section: `position: relative`, an absolutely positioned `svg.rail` on its left edge (width `--rail`), and content padded `calc(var(--rail) + var(--gutter))` on the left and `var(--gutter)` on the right. Project fields skip the column padding and instead `margin-left: var(--rail)` so their colour runs from the rail to the right edge of the viewport.

- **Reading order (landing):** hero statement → team profile and the `What we build` index → one field per project (Undercroft, Ymir, Text Transporter) → `How we work` → the closing call to action → footer. **Contact:** hero with the address → `Projects` → one compact row per project → footer.
- **Rail:** 120px desktop, 48px at ≤720px. Lanes sit at 20 / 40 / 60 / 80% of the rail width (main, Undercroft, Ymir, Text Transporter). Stroke 6px, 4px on phones.
- **Gutter:** 64px desktop, 20px on phones.
- **Vertical rhythm (desktop → ≤720px):** header row 22px → 16px padding; hero 112px top / 136px bottom → 56 / 88 (both pages); profile, project field and principles 104 / 112 → 56 / 64; closing 112 / 120 → 64 / 72; footer 128 / 120 → 72 / 80.
- **Contact rhythm (desktop → ≤720px):** the hero's bottom padding is 88px → 56 (shorter than the landing hero, so the project rows follow the address closely); the heading section is 56px top / 28px bottom → 40 / 20; a project row is 40 / 44 → 28 / 32, the compact register of a field.
- **Profile grid:** `minmax(0,1fr) 300px`, gap 32px × 72px: title and paragraph left, facts `dl` right; stacks at ≤1100px. The index below it is a list of full-width rows, `minmax(0,1fr) minmax(0,300px) 32px` (name with lane dot, track, arrow), 22px vertical padding, Hair rules; at ≤1100px the track drops under the name, and under 440px the arrow is removed so the name has the whole row.
- **Project field grid:** `minmax(0,1fr) 300px`, gap 40px × 72px, max width 1400px: mark tile and name, tagline (40px down), detail (24px), `Use cases` (56px) as a two-column list (gap 40px, max 920px) left; the facts `dl` right. At ≤1100px it is one column with the `dl` last; at ≤720px the mark tile sits above the name and the use cases are one column.
- **Principles:** a list of rows, `minmax(0,0.9fr) minmax(0,1.2fr) 220px` (title, text, proof), gap 12px × 56px, Hair rules; one column at ≤1100px.
- **Contact row grid:** `minmax(0,1fr) 260px 300px`, gap 16px × 40px, max width 1400px: name and path, the lane dot with the track, the `dl`. At ≤1100px it is a single column with 14px gaps, in the same order.
- **Header row:** flex, wrapping, gap 12px × 20px (12px on phones, 10px under 440px); wordmark, branch chip, cross-link (never wraps), then the language switch pushed right with `margin-left: auto`. The branch chip hides at ≤440px, where the wordmark drops to 1.0625rem and the language buttons to 7px 9px padding; the `lang` label hides at ≤720px. From 390px up the row fits on one line in both languages; at 320px the switch wraps to its own line rather than overflow.
- **Actions row:** `.actions` in `site.css`, flex, wrap, 12px gap; at ≤720px it stacks full-width. On the contact page the solid button and the mono address share the row at gap 12px × 24px, and the address centres under the button on phones.
- **Breakpoints:** 1100px (grids stack), 720px (rail, gutter, stroke, type scale, section padding, stacked actions, mark tile above the name), 440px (branch chip removed, index arrow removed, smaller wordmark). Minimum body width 320px with no horizontal overflow; `overflow-x: hidden`.
- **Anchors:** the rail is measured, not styled. Each section marks one `[data-anchor]` (the hero h1, the contact actions row, the profile title, a project's name, a contact row's name, the `How we work` heading, the footer line) and the script places the commit node at that element's vertical centre, rebuilding on resize, font load and language change. A `through` section has no anchor and no node.

## Elevation & Depth

There are no shadows. Depth is conveyed by the lane fields sitting flush against the white ground, by 1px hairlines (`{colors.hair}`) between white sections, and by the rail's white-ringed nodes reading as "on top of" the strokes. The mark tile is white so each project's own mark, in its own colours, reads against the lane field.

### Named Rules

**The Flat Print Rule.** No `box-shadow`, no gradients, no blur, no translucency beyond the two ink alphas (Hair 14%, Ink Tint 7%). A new surface is either white or one lane colour. The single exception is the overture: the graph is seen in perspective there, because moving from the whole history to its first commit is the story, and it is flat print again before the profile begins. Depth is never decoration anywhere else.

## Shapes

Small radii on controls, circles on lanes, right angles on regions. Buttons are 7px; the branch chip and the language segment frame are 6px with 4px inner buttons; the repository chip is 5px and the install/image code frame 4px; focus outlines round to 3px. The mark tile is 18px (14px on phones) with the mark at 56px (40px) and 8px (6px) corners. Lane dots are 10px circles (14px in the desktop index). Rail strokes are round-capped and round-joined and bend between lanes on a symmetric cubic S-curve. Fields and sections have square corners and meet on hairlines.

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
- **Handle chip on white** (owner row): the same chip in the white register: `@handle` at 0.8125rem mono, 1px Hair border, 5px radius, padding 6px 9px, Ink text, 10px under the name. Static.

### Language Segment

The EN / VI switch is a two-button segmented control, framed 1px Ink at 6px radius with 2px padding. Buttons are 500 / 0.8125rem mono, +0.02em, padding 7px 11px, 4px radius. Hover: Ink Tint. Pressed (`aria-pressed="true"`): Ink fill, white text. A `lang` mono label in Ink Two precedes it on desktop.

### Profile (signature)

The team's own commit on main, before any project branches: a white section under a hairline whose node sits beside the title. Left: the title at Headline (`Built for our own work first.`) and the profile paragraph at Body. Right: a mono facts `dl` (`based`, `since`, `public`, `org →`). Below, `What we build` at Title Small introduces the index: one full-width row per project, each a link to the project's field, with a lane dot, the name at Title, the track (`Data infrastructure`, `Agent tooling`, `Everyday utilities`) in Hanken 600 Ink Two, and an arrow that slides 6px on hover. Hover or focus on a row pulses that project's lane (`data-pulse-lane`) and underlines the name.

### Project Field (signature)

A full-bleed region in the project's lane colour, right of the rail; the project's lane forks off main above it and its commit node sits beside the name. Head: an 88px white mark tile holding the project's own mark (it tilts 4° and scales 1.04 on hover of the head), the name at Headline white, and under it the repository link as a chip (`muitneliss/repo →`, mono, 1px white-at-70% border, 5px radius, filling white with lane-coloured text on hover) followed by the status (`pre-alpha`, `released`) in mono. The repository link sits here, not only in the facts, because the code is what the page promises. Then the tagline at Title, the detail at Body, and `Use cases` at Title Small over a list of three or four use cases, each a Hanken 600 title and a Body Small sentence under a 1px white-at-45% rule. Right: the facts `dl` (`repo →`, `site →`, `install` or `image` as a 4px-framed `code` that selects whole on click, `stack`, `license`), keys at 500 weight, all full white. The head carries `data-pulse-lane`, so pointing at it pulses the lane page-wide. Selection inside the field is white on the lane colour.

### Principles (signature)

`How we work`: every project lane bends into main at the heading and back out, since the principles are what the branches share. Three rows under Hair rules: the principle at Title Small, its explanation at Body Small, and a mono proof line in Ink Two naming where in the repositories it can be checked.

### Closing

A white section under a hairline with every lane passing through: the line at Headline (`Use it, fork it, tell us what breaks.`), a Lead paragraph, and the two buttons: `Our repositories on GitHub` (solid, to the organisation, since the paragraph sends project questions to issues) and `Contact the team` (ghost, to `/contact`).

### Contact Row

A project in the contact page's compact register: white, under a hairline, the project's lane forking off main with its node on the name; the whole row carries `data-pulse-lane`, so hovering it or tabbing to its links pulses the lane. Left: the name at Title Small (the anchor) with the repository path 10px under it in mono Label Medium, Ink Two. Middle: the lane dot and the track in Hanken 600. Right: a mono `dl` with `issues` (`<org>/<repo>/issues →`) and `site →` when there is one. Lanes forked above pass through.

### Links

Inherit colour, 1px underline offset 0.2em, underline colour 45% of currentColor rising to 100% on hover (160ms). Mono links wrap the label in a span so the arrow stays unstyled.

**The Nowrap-Anchor Rule.** A mono arrow link is `<a><span>label</span>&nbsp;→</a>`: the anchor is `white-space: nowrap` so the arrow never wraps alone, and the span is `white-space: normal; overflow-wrap: anywhere` so a long label may still break inside. The arrow always ends the same line as the last word.

### Overture (signature)

The hero's band, under the actions (50svh, 32px down; 40svh and 24px on phones), holds the page's whole commit graph in 3D: the same lanes and commits as the rail, on a plane tilted 74° away from the viewer (66° on phones) with the first commit at the band's top and the footer's commit receding toward the horizon, the lanes spread to 22% of the viewport's width (50% on phones), and the three repository names in mono beside their commits (hidden at ≤440px). Over the next viewport of scroll the plane rotates flat, the lanes close up to the rail's spacing and the first commit slides onto the rail column; the history below the reader rewinds to the hairline; at the end every point sits on the pixel the flat rail draws, the rail is already drawn underneath, and the 3D view fades off it. Built with three.js (`Line2` strokes in world units, so they thin with distance and match the rail's 6px at 1:1), loaded on demand. It is `aria-hidden`; the hero text names every project. The band exists only under `html.has-overture` (motion allowed, WebGL available, no Save-Data); otherwise the hero is as before.

### Rail (signature)

An `aria-hidden` SVG per section built from measured layout. Lane order on the rail: main, Undercroft (`u`), Ymir (`y`), Text Transporter (`t`). Section kinds (`data-kind`): `hero` (lanes converge into the first big node), `fork` (one project lane forks off main to the anchor; `data-lane`), `merge` (the `data-merge` lanes bend in to a node on main and back out; with no lanes it is a plain commit on main, as the profile is), `through` (main and the `data-through` lanes pass straight down with no node), and `end` (every lane merges into the last big node). Any kind may list lanes in `data-through` that continue vertically without touching the commit. Nodes: regular r 8 with a 3px white ring (6 / 2.5 on phones); big r 14 / ring 4 (10 / 3) for the first and last commit; fork dot r 4.5 (3) on main where a project branches. Curve reach: fork 168px above the anchor (96 on phones), merge bends ±76px around the anchor (44), the hero lanes run 190px before converging (112). Replay: the draw head is a line at 66% of the viewport height, sliding to its bottom over the last viewport of scroll so the footer's commit lands as the page bottoms out. Each lane's coloured stroke is drawn down to the head (`stroke-dashoffset`, written per frame, never transitioned) over a 1.5px hairline of the same path in Ink at 14% on paper; a node scales 0.6→1 and fades in over the 4% of the viewport after the head reaches it, on `--ease`. Elements marked `data-arrive="0|1"` (a scene's title or project head, then its body or tagline) rise 16px (12px on phones) and fade in over 12% of the viewport after their section's commit, the second 6% later; one with keyboard focus inside is shown in place at once. The state is a pure function of the scroll position (`src/components/site/rail/timeline.ts`), measured layout is cached in document coordinates and refreshed only on load, font load, resize and `multnelis:lang`, and one controller (`src/components/site/rail/controller.ts`) is the only writer of rail, node and arrival styles. Pulse: any element with `data-pulse-lane` (an index row, a field's head, a contact row; each contains a link, so keyboard focus reaches it) sets `body[data-pulse]`; hover and focus are tracked separately and the hovered lane wins, so leaving one keeps the other, and `lane-pulse` runs 900ms ease-in-out infinite to 1.75× stroke. Reduced motion (or `?static`): `html.is-static`, lanes fully drawn, no hairline, no overture, every heading in place, the pulse becomes a static 1.75× stroke. The mode classes (`is-static`, or `is-live` and `has-overture`) are set by an inline script in the layout's head before first paint; if the controller never runs, arriving headings appear on their own after 3s.

### Navigation

The header is part of the first graph section of each page: wordmark (28px mark + `multnelis` in Anybody 800 / 1.375rem, no underline), the branch chip, one cross-link, and the language switch; a Hair rule under it starts at the rail's right edge. The header takes a `current` prop (`home` | `contact`): on the landing page the wordmark links to `#top` and the cross-link reads `Contact` (`/contact`); on the contact page the wordmark links to `/` and the cross-link reads `Home` (`/`). The cross-link is Hanken 600 / 0.9375rem (0.875rem on phones), underlined like every link; it is text, never a button or a chip. There is no menu beyond that single link; in-page movement is the `Explore the projects` solid button to `#projects` and the profile index to each project's field (`#undercroft`, `#ymir`, `#text-transporter`). Smooth scroll on, off under reduced motion.

The footer line (mono, 0.9375rem, the last commit's anchor) reads `multnelis · <place> · github.com/muitneliss · contact@multnelis.org`, each ref an underlined mono link; the domain sits under it in Ink Two.

### Language Toggle (i18n pattern)

English is server-rendered. Every translatable text node carries `data-i18n="<key>"`, images carry `data-i18n-alt`, landmarks carry `data-i18n-aria`; keys are `hero.*`, `actions.*`, `profile.{title,body,index}`, `project.<slug>.{track,tagline,detail}`, `project.<slug>.use.<n>.{title,text}`, `principles.title`, `principles.<key>.{title,text}`, `closing.{title,lead,action}`, `contact.{title,lead,action,projects}`, `footer.place`, `ui.*`. Project names, repository refs and paths, commands, stack tags, URLs and the email address are facts and are not translated. `src/data/site.ts` is the single owner of both languages and emits the Vietnamese half as `#i18n-vi` JSON; the toggle swaps `textContent` / `alt` / `aria-label`, sets `html.lang`, persists to `localStorage` (`multnelis:lang`), honours `?lang=vi`, and dispatches `multnelis:lang` so the rail re-measures.

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
- **Do** drive any scroll-linked motion from the rail controller's frame (add it to `timeline.ts`); mark a new scene's heading with `data-arrive` rather than giving it its own observer or transition.
- **Do** put a heading between rows in its own `data-kind="through"` section listing every live lane in `data-through`, so the graph never breaks between commits.
- **Do** keep people off the site: no names, handles, avatars or bios; the team speaks through its projects.
- **Do** write mono arrow links as `<a><span>label</span>&nbsp;→</a>` with the anchor nowrap and the span free to wrap (the Nowrap-Anchor Rule).
- **Do** lead with the name in Anybody and put the repository fact (`muitneliss/repo`, `/repo`) in mono beneath it, 10–12px down.

### Don't:

- **Don't** use a lane colour as a tint, link colour, heading colour, icon colour or border on white; lane colours own whole regions or rail strokes.
- **Don't** add shadows, gradients, blur or translucent panels; the world is flat print.
- **Don't** introduce a fourth accent or a dark theme; the site is light-only by configuration.
- **Don't** style the rail from a component; its paths are script-built and its rules live in the global `site.css`.
- **Don't** add a second scroll listener, IntersectionObserver or CSS transition on the rail's strokes, nodes or arriving headings; one owner writes them.
- **Don't** use depth, perspective or 3D outside the overture.
- **Don't** put prose in the mono face or set Anybody at normal width.
- **Don't** add copy that is not backed by a public repository (no user counts, testimonials, clients), and never name a private repository.
- **Don't** hardcode a colour or font: reference `--ink`, `--ink-2`, `--hair`, `--paper`, `--lane-u` / `--lane-y` / `--lane-t`, `--display` / `--body` / `--mono`.
