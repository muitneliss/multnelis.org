# Test Plan

Status: implemented. The repository had no tests; CI ran `check` and `build`. This adds Vitest and Playwright (user decision) and a `Test` job.

Tests cover promises, not lines: each one names the shipped behaviour that breaks if it is deleted. Breaking the behaviour on purpose was confirmed to fail the matching test for the reverse-scroll end-to-end test (a rail that never retracts) and, in the first round, for three timeline tests.

## Unit (Vitest): `src/components/site/rail/timeline.test.ts`

Through the exports of `timeline.ts`. `npm test`.

| Promise                                                                | Realistic bug it catches                                  |
| ---------------------------------------------------------------------- | --------------------------------------------------------- |
| The pen rests at its place, and a lane is drawn down to it, no further | Off-by-one in the length lookup, a pen in the wrong place |
| A commit lands only once the pen reaches it                            | Nodes popping in early or late                            |
| The last commit has landed at the bottom of the page                   | The pen never reaching the bottom (no end slide)          |
| A wheel step is drawn as a stroke, not a jump                          | The follow lag removed or broken                          |
| The pen settles on the same place whichever way the reader came        | A follower that drifts or stops short, so reverse differs |
| A long jump draws out only its last screen                             | A link to the footer drawing the whole page slowly        |
| Reduced motion draws the whole history                                 | An empty rail for people who turned motion off            |

## End-to-end (Playwright): `e2e/scroll-narrative.spec.ts`

Against a fresh `npm run build`, served by `e2e/serve.mjs`, which serves `dist/` the way GitHub Pages does (a directory without its slash redirects; a missing path gets `404.html`). Astro's own preview could not be used: in an AI-agent environment it forces itself into the background, which Playwright reads as the server exiting. `npm run test:e2e`, projects `desktop` (1440×900) and `phone` (390×844).

| Case                                                                                    |
| --------------------------------------------------------------------------------------- |
| The page loads without errors, in English and with `?lang=vi`                           |
| Every heading and paragraph is visible however far the rail is drawn                    |
| Scrolling to a project draws its lane down to its commit                                |
| Scrolling back up takes the lane and its commit away again                              |
| Arriving mid-page by a link draws everything above the reader                           |
| The last commit lands when the page reaches its bottom                                  |
| Under reduced motion the whole history is drawn from the start                          |
| `Explore the projects` leads to the project index; `Contact the team` opens `/contact`  |
| Switching to Vietnamese keeps every commit on its heading                               |
| Resizing from desktop to phone keeps commits on their headings, without sideways scroll |
| The contact page rail follows the reader                                                |

## Visual regression: `e2e/visual.spec.ts`

The page at 0, 15, 30, 50, 70, 90 and 100% of the scroll, and under reduced motion at 0 and 50%, at both sizes: 18 baselines. Each shot scrolls there and waits until the rail stops changing (the pen has settled); no debug hook ships in production. Baselines are generated in Playwright's Linux image (`npm run test:e2e:update`, needs Docker) and were reviewed by eye; the CI job runs in the same image. A local run on macOS writes its own `-darwin` baselines, which git ignores.

## CI

`Test` job in `.github/workflows/actions.yaml`, in the container `mcr.microsoft.com/playwright:v1.63.0-noble`: `npm ci`, `npm test`, `npm run test:e2e`; the HTML report is uploaded when it fails. Making `Test` a required check, next to `Check` and `Build`, is a branch-protection change for the repository owner.

## Results

- `npm test`: 7 passed.
- The whole suite in the Linux image in CI mode, repeated four times with retries off: 164 passed, 4 skipped by design (the resize test runs on desktop only), 0 failed. Two flaky tests were found this way and fixed: a smooth fragment scroll outlasting a 5-second poll under load, and a reduced-motion check that read the rail before its first frame had built it.
- The end-to-end suite (without the visual tests) in Firefox, WebKit desktop and WebKit on an emulated iPhone 15: 36 passed.

## Manual QA matrix

Run with Playwright-driven Chromium, Firefox and WebKit on macOS, screenshots reviewed by eye; no physical phone was used.

| Case                | Expected                                    | Result                                                                  |
| ------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| Slow scroll down    | Smooth, deterministic progression           | Pass: wheel scroll through the page, no long tasks at 4× throttle       |
| Fast scroll down    | Correct final state for each scene          | Pass: the pen settles where the scroll says                             |
| Slow reverse scroll | Lanes retract                               | Pass (end-to-end test, and wheel scroll back up)                        |
| Scrollbar jump      | State resolves quickly                      | Pass: a jump draws out only its last screen                             |
| Browser resize      | Nodes stay on anchors, no broken transforms | Pass (end-to-end test 1440 → 390)                                       |
| Phone touch scroll  | No scroll trap, native momentum             | Not tested on a device; nothing intercepts touch or wheel events        |
| Reduced motion      | Static, fully drawn, fully readable         | Pass (end-to-end and visual tests)                                      |
| JavaScript off      | All content visible and usable              | Pass by construction: no text is hidden or animated; the rail is absent |
| Refresh mid-page    | Same state as scrolling there               | Pass: arriving by `#ymir` (end-to-end test)                             |
| Back navigation     | Restored scroll position resolves correctly | Pass by construction: a restored position is a scroll position          |
| Safari, Firefox     | Same as Chromium                            | Pass in the WebKit and Firefox engines (end-to-end suite)               |

Performance results are recorded in `architecture.md`.
