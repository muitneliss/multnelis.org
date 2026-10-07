# Test Plan

Status: implemented. The repository had no tests; CI ran `check` and `build`. This adds Vitest and Playwright (user decision) and a `Test` job.

Tests cover promises, not lines: each one names the shipped behaviour that breaks if it is deleted. Breaking the behaviour on purpose was confirmed to fail the matching test for three unit tests (the end slide of the draw head, the overture's landing, the tagline's stagger) and for the keyboard end-to-end test, which was rewritten after its first version passed without the behaviour.

## Unit (Vitest): `src/components/site/rail/timeline.test.ts`

Through the exports of `timeline.ts` and the projection in `overture.ts`. `npm test`.

| Promise                                                               | Realistic bug it catches                                   |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| The same scroll position gives the same frame, whichever way you came | State accumulated across frames, so reverse scroll drifts  |
| A lane is drawn down to the draw head at 66% of the viewport          | Off-by-one in the length lookup, a head in the wrong place |
| A commit lands only once the head reaches it                          | Nodes popping in early or late                             |
| The last commit has landed at the bottom of the page                  | The head never reaching the bottom (no end slide)          |
| A heading arrives after its commit, its tagline after the heading     | Lost stagger, or elements stuck half-arrived               |
| Under reduced motion everything is drawn and in place at the top      | Hidden content for people who turned motion off            |
| The whole history starts inside the hero band                         | The tilted graph overflowing the band                      |
| The overture lands every point on the pixel the flat rail draws       | A visible jump when the 3D view hands over to the rail     |

## End-to-end (Playwright): `e2e/scroll-narrative.spec.ts`

Against a fresh `npm run build`, served by `e2e/serve.mjs`, which serves `dist/` the way GitHub Pages does (a directory without its slash redirects; a missing path gets `404.html`). Astro's own preview could not be used: in an AI-agent environment it forces itself into the background, which Playwright reads as the server exiting. `npm run test:e2e`, projects `desktop` (1440×900) and `phone` (390×844).

| Case                                                                                    |
| --------------------------------------------------------------------------------------- |
| The page loads without errors, in English and with `?lang=vi`                           |
| Scrolling to a project lands its commit and brings in its name                          |
| Scrolling back up takes the commit and the name away again                              |
| Arriving mid-page by a link shows everything above the reader in place                  |
| Under reduced motion the history is drawn in full and nothing waits to arrive           |
| The 3D overture hands over to the flat rail, and takes it back on the way up (desktop)  |
| `Explore the projects` leads to the project index; `Contact the team` opens `/contact`  |
| Switching to Vietnamese keeps every commit on its heading                               |
| Resizing from desktop to phone keeps commits on their headings, without sideways scroll |
| The contact page has no overture, and its rail follows the reader                       |
| A repository link reached by keyboard is shown in place before its heading has arrived  |

## Visual regression: `e2e/visual.spec.ts`

The page at 0, 15, 30, 50, 70, 90 and 100% of the scroll, and under reduced motion at 0 and 50%, at both sizes: 18 baselines. Scroll is set with `window.scrollTo` and the test waits two frames: the state is a pure function of the scroll position, so no debug hook ships in production. Baselines are generated in Playwright's Linux image (`npm run test:e2e:update`, needs Docker) and were reviewed by eye; the CI job runs in the same image. A local run on macOS writes its own `-darwin` baselines, which git ignores.

## CI

`Test` job in `.github/workflows/actions.yaml`, in the container `mcr.microsoft.com/playwright:v1.63.0-noble`: `npm ci`, `npm test`, `npm run test:e2e`; the HTML report is uploaded when it fails. Making `Test` a required check, next to `Check` and `Build`, is a branch-protection change for the repository owner.

## Results (2026-10-07)

- `npm test`: 8 passed.
- `npm run test:e2e` on macOS (Chromium, desktop and phone): 22 passed, 2 skipped by design (the hand-over and resize tests run on desktop only).
- The same suite in the Linux image in CI mode, with visual baselines: 40 passed, 2 skipped.
- The end-to-end suite (without the visual tests) in Firefox, WebKit desktop and WebKit on an emulated iPhone 15: 36 passed.

## Manual QA matrix

Run with Playwright-driven Chromium, Firefox and WebKit on macOS and screenshots reviewed by eye; no physical phone was used.

| Case                | Expected                                    | Result                                                                                                                    |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Slow scroll down    | Smooth, deterministic progression           | Pass: wheel scroll through the page, no long tasks at 4× throttle                                                         |
| Fast scroll down    | Correct final state for each scene          | Pass: jumps by `scrollTo` land in the expected state                                                                      |
| Slow reverse scroll | Lanes retract, arrivals reverse             | Pass (end-to-end test, and wheel scroll back up)                                                                          |
| Scrollbar jump      | State resolves immediately                  | Pass: same as a `scrollTo` jump                                                                                           |
| Browser resize      | Nodes stay on anchors, no broken transforms | Pass (end-to-end test 1440 → 390)                                                                                         |
| Phone touch scroll  | No scroll trap, native momentum             | Not tested on a device; nothing intercepts touch or wheel events                                                          |
| Reduced motion      | Static, fully drawn, fully readable         | Pass (end-to-end and visual tests)                                                                                        |
| JavaScript delayed  | All content visible and usable              | Pass: with JavaScript off, all content shows and there is no band; with the page script blocked, headings appear after 3s |
| Refresh mid-page    | Same state as scrolling there               | Pass: arriving by `#ymir` (end-to-end test)                                                                               |
| Back navigation     | Restored scroll position resolves correctly | Pass by construction: a restored position is a scroll position                                                            |
| Safari, Firefox     | Same as Chromium                            | Pass in WebKit and Firefox engines (end-to-end suite)                                                                     |

Performance results are recorded in `architecture.md`.
