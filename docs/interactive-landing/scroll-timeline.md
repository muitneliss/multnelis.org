# Scroll Timeline

Status: implemented. The page is not pinned, so scene boundaries are the sections' own heights; the global ranges below were measured on the build at 1440×900 in English (a scene starts when its section's top reaches the draw head). The code re-measures; nothing here is hard-coded.

## Inputs

- `scrollY`, the viewport height `vh`, and the document height, read once per animation frame. Nothing else is read per frame: section and anchor positions are measured into document coordinates at build time (load, font load, resize, language change).
- The **draw head**: a horizontal line in document coordinates.

```text
headY = scrollY + vh * (0.66 + 0.34 * smoothstep(endProgress))
endProgress = normalize(scrollY, maxScroll - vh, maxScroll)   // 0 until the last viewport of scroll
```

The head sits at 66% of the viewport and slides to the viewport bottom over the last viewport of scroll, so the footer's big node lands exactly when the page bottoms out.

## Global timeline

| Range of the scroll | Scene                    | Behavior                                                                                   |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| 0–21%               | 1 Overture               | The whole history in 3D; held until 6%, then laid flat onto the rail by 21%                |
| 14–27%              | 2 First commit (profile) | Main draws; profile node lands; title, body arrive (the 3D view shows its start until 21%) |
| 27–45%              | 3 Fork: Undercroft       | Lane forks; node lands at the name; head row, tagline arrive                               |
| 45–63%              | 4 Fork: Ymir             | Same, Undercroft lane running through                                                      |
| 63–78%              | 5 Fork: Text Transporter | Same, both lanes running through                                                           |
| 78–91%              | 6 Merge: How we work     | All lanes bend into main and out; node lands; heading arrives                              |
| 91–100%             | 7 Close and last commit  | Lanes run through the closing and merge into the footer's big node                         |

## Rail: per path

Every rail path comes from the geometry as a polyline; at measure time it becomes a table from document y to length along the path (paths only ever run downward, so y → length is monotonic). Per frame:

```text
drawn(path) = lengthAt(path, headY)                 // 0 above the path, full below it
stroke-dasharray = totalLength + 40
stroke-dashoffset = totalLength + 40 - drawn(path)   // or hidden past the start when drawn is 0
```

The hairline copy of each path is always fully drawn underneath. A node lands over a short window after the head reaches it:

```text
t = ease(normalize(headY, nodeY, nodeY + 0.04 * vh))
scale = lerp(0.6, 1, t); opacity = t
```

## Arrivals: per scene anchor

An element marked `data-arrive` (a scene's name or title, then its tagline or body) arrives after its commit's node:

```text
start = nodeY + order * 0.06 * vh
t = ease(normalize(headY, start, start + 0.12 * vh))
translate = (1 - t) * 16px; opacity = t   // 12px on phones; focus inside forces t = 1
```

Elements already above the head at load are simply in place; there is no entrance on load.

## Scene 1 local timeline: Overture

Local progress `p = normalize(scrollY, bandTop - 0.5 * vh, bandTop + 0.5 * vh)`: one viewport of scroll, starting when the band's top reaches the middle of the viewport. Before that the tilted graph scrolls with the page.

```text
0.00–0.20  hold: the whole graph tilted 74° (66° on phones), fitted to the band, labels visible
0.20–0.50  labels fade out
0.20–0.85  the plane swings flat, scales to 1:1, the lanes close up to the rail's spacing,
           and the first commit slides onto the rail column
0.50–0.90  the history below the draw head rewinds from colour to the hairline
0.85–0.95  the 3D view is flat at 1:1, identical to the rail
0.95–1.00  the flat rail shows fully drawn underneath; the 3D view fades off it
1.00       the 3D view is hidden and no longer rendered
```

## Ease

Things that land (a commit, an arriving heading) use the site's `--ease` curve, `cubic-bezier(0.19, 1, 0.22, 1)`, evaluated in script so the CSS and the script share one curve. Moves that run continuously under the scroll (the overture's camera and rewind, the draw head's slide at the end) use smoothstep instead, so scrubbing never starts or stops with a jolt. Ranges and constants live in one config object, `TIMELINE` in `src/components/site/rail/timeline.ts`; component code repeats none of them.
