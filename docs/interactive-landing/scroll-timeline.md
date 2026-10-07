# Scroll Timeline

Status: implemented. The page is not pinned, so scene boundaries are the sections' own heights. The code re-measures; nothing here is hard-coded.

## The pen

The pen is where the drawing ends, in document coordinates. Each frame it moves toward where the scroll says it belongs:

```text
target = scrollY + vh * (0.85 + 0.15 * smoothstep(endProgress))
endProgress = normalize(scrollY, maxScroll - vh, maxScroll)   // 0 until the last viewport of scroll

pen += (target - pen) * (1 - exp(-dt / 140ms))               // eases in; snaps when within 0.5px
if |target - pen| > vh: pen = target - sign * vh             // a long jump draws out only its last screen
```

On load the pen starts at `scrollY` (the top of the screen), so the visible rail draws itself in. Frames run only while the pen is moving; at rest nothing runs.

## Global timeline

Measured on the build at 1440×900 in English; a scene starts as its section's top passes the pen.

| Range of the scroll | Scene                    | Behavior                                                       |
| ------------------- | ------------------------ | -------------------------------------------------------------- |
| on load             | 1 First commit           | The visible rail draws itself in; the big first commit lands   |
| 3–18%               | 2 The team (profile)     | Main draws; the profile commit lands                           |
| 18–37%              | 3 Fork: Undercroft       | Lane forks; the commit lands at the name                       |
| 37–56%              | 4 Fork: Ymir             | Same, Undercroft lane running through                          |
| 56–73%              | 5 Fork: Text Transporter | Same, both lanes running through                               |
| 73–88%              | 6 Merge: How we work     | All lanes bend into main and out; the commit lands             |
| 88–100%             | 7 Last commit            | Lanes run through the closing and merge into the footer's node |

## Per path

Every rail path comes from the geometry as a polyline (straight runs cut every 8px, each S-curve into 24 pieces); at measure time it becomes a table from document y to length along the path. Paths only ever run downward, so y → length is monotonic. Per frame:

```text
drawn(path) = lengthAt(path, pen)                    // 0 above the path, full below it
stroke-dasharray = totalLength + 40
stroke-dashoffset = totalLength + 40 - drawn(path)   // hidden past the start when drawn is 0
```

## Per commit

```text
t = ease(normalize(pen, nodeY, nodeY + 0.04 * vh))
scale = lerp(0.6, 1, t); opacity = t
```

## Ease

A commit landing uses the site's `--ease` curve, `cubic-bezier(0.19, 1, 0.22, 1)`, evaluated in script. The pen's slide at the end of the page uses smoothstep, and its following of the scroll is exponential, so scrubbing never starts or stops with a jolt. The constants live in one object, `TIMELINE` in `src/components/site/rail/timeline.ts`; component code repeats none of them.
