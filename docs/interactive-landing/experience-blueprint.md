# Experience Blueprint

Status: implemented. One continuous object carries the whole page: the commit graph, drawn by scroll like a pen moving down the page. Text never moves.

## Motion grammar

Every movement on the page means one of these things. Anything that does not fit a row does not ship.

| Meaning                               | Motion                                                                    | Where             |
| ------------------------------------- | ------------------------------------------------------------------------- | ----------------- |
| History written up to where you read  | A lane's stroke extends down to the pen; retracts when you scroll back up | Every section     |
| The page opens                        | The visible rail draws itself in from the top of the screen               | On arrival        |
| A project begins                      | A lane bends off main (fork dot, S-curve) as the pen passes               | Project fields    |
| A commit: the thing beside it is here | The node lands (scale 0.6 → 1, opacity 0 → 1) when the pen reaches it     | Every anchor      |
| Shared practice                       | Every lane bends into main and out again                                  | How we work       |
| The end of the history                | Every lane merges into the last, big node                                 | Footer            |
| Pointing at a project                 | Its lane pulses along the whole page (existing, hover and keyboard focus) | Index, field head |

The pen belongs 85% down the viewport and slides to the bottom over the last viewport of scroll, so the last commit lands when the page bottoms out. It follows the scroll with a short lag (140ms time constant), so a wheel step draws as one stroke, and it always settles where the scroll says: forward, reverse, a scrollbar jump or a reload mid-page all end on the same picture. Below the pen the rail is simply empty.

---

## Scene 1 — First commit: the statement

- **Purpose:** open the history. **Understanding:** this is a team, and the page is its git log.
- **Initial state:** the hero as before (header, statement, supporting line, two actions); the rail empty.
- **Final state:** the three project lanes converge into the big first commit beside the statement; main runs on down.
- **Scroll:** on arrival the pen starts at the top of the screen and eases to its place, so the visible rail draws itself in; scrolling extends it.
- **Motion:** stroke extension and the first commit landing.
- **Copy, interaction:** unchanged; the actions are the interactive elements.
- **Transition out:** main runs into the profile.
- **Desktop / mobile:** the same; the phone rail is 48px with 4px strokes.
- **Reduced motion:** the rail is fully drawn from the start.

## Scene 2 — The team (profile)

- **Purpose:** the team's own commit on main before any project branches.
- **Final state:** main drawn through the section; the node beside `Built for our own work first.`
- **Scroll:** the node lands when the pen reaches the title's centre.
- **Copy, interaction:** unchanged; pointing at an index row pulses its project's lane.
- **Reduced motion:** drawn in full.

## Scenes 3, 4, 5 — Fork: Undercroft, Ymir, Text Transporter

- **Purpose:** each project begins: its lane forks off main and carries its colour field.
- **Initial state:** the field fully present with all its text; the project's lane not yet drawn; earlier project lanes run through as far as the pen has reached.
- **Final state:** the lane drawn from the fork dot through its S-curve to the node beside the name, and on down the section.
- **Scroll:** the fork dot lands, the lane extends with the pen, the node lands at the name's centre.
- **Interaction:** unchanged (lane pulse on the head, mark tilt on hover, install code selects whole).
- **Reduced motion:** drawn in full.

## Scene 6 — Merge: How we work

- **Purpose:** what the three projects share.
- **Final state:** the lanes bend into main at the heading's node and back out.
- **Scroll:** the merge curves draw with the pen; the node lands at the heading's centre.

## Scene 7 — Last commit: close and footer

- **Purpose:** turn trust into an action, then end the history.
- **Final state:** all lanes run through the closing and merge into the footer's big node.
- **Scroll:** the pen slides to the screen's bottom over the last viewport of scroll, so the footer node lands exactly when the page bottoms out.
