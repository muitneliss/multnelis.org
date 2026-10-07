# Experience Blueprint

Status: confirmed and implemented. One continuous object carries the whole page: the commit graph. It opens in 3D as an overview, lands flat as the rail, and is then replayed by scroll, one commit per scene.

## Motion grammar

Every movement on the page means one of these things. Anything that does not fit a row does not ship.

| Meaning                               | Motion                                                                       | Where             |
| ------------------------------------- | ---------------------------------------------------------------------------- | ----------------- |
| From the overview to the start        | The tilted graph swings flat and closes onto the first commit; 3D lands flat | Overture only     |
| History written up to where you read  | A lane's coloured stroke extends down to the draw head; retracts upward      | Every section     |
| History not yet read                  | The same lane as a hairline below the draw head                              | Every section     |
| A project begins                      | A lane bends off main (fork dot, S-curve) as the head passes                 | Project fields    |
| A commit: the thing beside it is here | The node lands (scale 0.6 → 1, opacity 0 → 1) when the head reaches it       | Every anchor      |
| The explanation follows the commit    | The commit's name, then its tagline, rise 16px into place after the node     | Scene anchors     |
| Shared practice                       | Every lane bends into main and out again                                     | How we work       |
| The end of the history                | Every lane merges into the last, big node                                    | Footer            |
| Pointing at a project                 | Its lane pulses along the whole page (existing, hover and keyboard focus)    | Index, field head |

The draw head is a horizontal line at 66% of the viewport height (it slides to the bottom over the last viewport of scroll, so the last commit lands when the page bottoms out). The whole page's visual state is a pure function of the scroll position: forward, reverse, a jump with the scrollbar or a refresh mid-page all resolve to the same state for the same position.

---

## Scene 1 — Overture

### Purpose

Show the whole history before any of it is read: its shape, its three branches, their names. This is the curiosity beat, and it answers "what is this team about" before a single paragraph.

### User understanding

There is one main line (the team) and three named branches (`undercroft`, `ymir`, `text-transporter`); the page is going to walk this history from the start.

### Initial visual state

The hero exactly as today (header, statement, supporting line, two actions). Below the actions, a band in which the full page graph is tilted away in perspective, receding like a road toward the horizon: main in ink, the three lanes in their colours forking and merging, nodes ringed in white, the three repository names in mono beside their commits. The near end, at the band's top, is the first commit with the three lanes converging into it; the far end, near the horizon, is the footer. At 1440×900 the converging lanes show at the bottom of the first screen; at 1920×1080 the whole labelled graph does.

### Final visual state

The camera looks straight down at the graph at 1:1 scale, aligned to the rail column; the lanes' spacing has tightened to the rail's 20/40/60/80%; the part of the graph below the draw head has receded to the hairline. This frame is pixel-identical to the flat SVG rail at the same scroll position, which takes over.

### Scroll behavior

Local progress 0 → 1 over one viewport of scroll, starting when the band's top reaches the middle of the viewport. Before that the tilted graph scrolls with the page like any content. Scrubbed, not timed. See `scroll-timeline.md` for the local ranges.

### Motion

The plane swings from tilted to flat, scales from fitting the band to 1:1, and slides its first commit onto the rail column, while the lanes close up to the rail's spacing; labels fade; the unread history rewinds to the hairline. The camera stays where it sees the page at 1:1, so landing flat is landing on the rail. Strokes have world-unit widths, so they thin with distance.

### Copy/content

No new copy. The labels are the three repository names, which are repository data (mono, per the Mono-Is-Data Rule). The hero text is unchanged and is the accessible content of this scene.

### Interaction

None beyond scroll. The band is `aria-hidden` and `pointer-events: none`; the hero actions remain the interactive elements.

### Transition in

It is the first screen.

### Transition out

From 95% of the dive the flat SVG rail is shown fully drawn under the 3D view, which is already pixel-identical to it, and the 3D view fades off over the last 5%. From here on, the flat rail is the object; scrolling back up brings the 3D view back.

### Desktop behavior

Full overture: tilt from 74° to flat, lanes spread to 22% of the viewport width at the start, labels, perspective stroke widths.

### Mobile behavior

The same overture with a tilt of 66° and the lanes spread to 50% of the viewport width, no labels at 440px and below (the hero already names the projects). The band is shorter (40svh). The page is not pinned.

### Reduced motion behavior

No overture band and no 3D view. The rail is fully drawn, as before (`html.is-static`). The band is also absent without WebGL, with Save-Data, and without JavaScript.

---

## Scene 2 — First commit: the team

### Purpose

Introduce the team as the commit on main before any project branches.

### User understanding

Who multnelis is (a team building its own tools, in the open), the facts (based, since, public, org), and the index of what it builds.

### Initial visual state

Main runs down as a hairline; the profile node is not yet landed; the title and body are lowered 16px and transparent.

### Final visual state

Main is drawn in ink through the section, the node sits beside `Built for our own work first.`, the title and body are in place. The index rows sit below, unchanged.

### Scroll behavior

The head passing down the section draws main; the node lands when the head reaches the title's centre; the title arrives over the next 12% of the viewport height, the body 6% after it.

### Motion

Stroke extension, node landing, two arrivals. Nothing else moves.

### Copy/content

Unchanged: `profile.title`, `profile.body`, the facts `dl`, `What we build` and the index.

### Interaction

Existing: pointing at an index row pulses its project's lane; each row links to its field.

### Transition in

Continuous from the overture's handoff: main continues down from the hero's big node.

### Transition out

Main continues into the first fork.

### Desktop behavior

As above.

### Mobile behavior

Same, with the phone rail geometry (48px rail, 4px stroke). Arrival distance is 12px.

### Reduced motion behavior

Everything drawn and in place.

---

## Scenes 3, 4, 5 — Fork: Undercroft, Ymir, Text Transporter

One block covers the three, because they share the grammar exactly; only the lane and the lanes passing through differ (Ymir has Undercroft's lane running through; Text Transporter has both).

### Purpose

Each project begins: its lane forks off main and carries its colour field.

### User understanding

What the project is called, where its code is, and what it is for (the tagline). The detail and use cases are there for whoever reads on.

### Initial visual state

The project's lane is a hairline forking off main; earlier project lanes pass through in colour if already reached, as hairlines if not; the node is not landed; the name and tagline are lowered and transparent. The colour field itself is fully present (it is a region, not an accent, so it is never hidden).

### Final visual state

The lane is drawn from the fork dot through its S-curve to the node beside the name and on down the section; the name and repository chip and the tagline are in place.

### Scroll behavior

Fork dot lands when the head reaches it; the lane extends with the head; the node lands at the name's centre; the head row (mark tile, name, repository chip) arrives over 12% of the viewport, the tagline 6% after.

### Motion

Fork, stroke extension, node landing, two arrivals.

### Copy/content

Unchanged project data from `src/data/site.ts`.

### Interaction

Existing: pointing at the head pulses the lane; the mark tile tilts on hover; the install `code` selects whole on click.

### Transition in

Main runs in from the scene above; any earlier lane runs through.

### Transition out

All forked lanes continue down into the next scene.

### Desktop behavior

As above.

### Mobile behavior

Same grammar; phone curve reach (96px fork), 12px arrival.

### Reduced motion behavior

Everything drawn and in place; the pulse is a static thick stroke (existing).

---

## Scene 6 — Merge: How we work

### Purpose

Show what the three projects share.

### User understanding

The three working principles, each with a mono pointer to where it can be checked.

### Initial visual state

The three lanes run toward the heading; the merge node is not landed; the heading is lowered and transparent.

### Final visual state

The lanes bend into main at the heading's node and back out; the heading is in place; the principle rows below are unchanged.

### Scroll behavior

The lanes' merge curves draw with the head; the node lands at the heading's centre; the heading arrives over 12%.

### Motion

Merge curves, node landing, one arrival. The rows do not stage in (decision: content follows the lane, not a staged reveal).

### Copy/content

Unchanged `principles`.

### Interaction

None new.

### Transition in

Lanes run in from the last project field.

### Transition out

All lanes and main continue into the closing.

### Desktop behavior

As above.

### Mobile behavior

Same grammar, phone merge reach (44px).

### Reduced motion behavior

Everything drawn and in place.

---

## Scene 7 — Last commit: close and footer

### Purpose

Turn trust into an action, then end the history.

### User understanding

Every repository takes issues; one address reaches the team.

### Initial visual state

All lanes pass through the closing as hairlines; the footer's big node is not landed.

### Final visual state

All lanes drawn through the closing and merged into the footer's big node; the CTA row and footer line in place.

### Scroll behavior

The closing has no node (a `through` section), so nothing arrives there; the CTA is always present. The head slides to the viewport bottom over the last viewport of scroll so the footer node lands exactly when the page bottoms out.

### Motion

Stroke extension and the final merge into the big node.

### Copy/content

Unchanged `closing` and footer.

### Interaction

The two CTAs (`Our repositories on GitHub`, `Contact the team`) and the footer links.

### Transition in

All lanes run in from How we work.

### Transition out

End of page.

### Desktop behavior

As above.

### Mobile behavior

Same.

### Reduced motion behavior

Everything drawn and in place.
