# multnelis.org

The site of **multnelis**, an engineering team in Ho Chi Minh City that builds the tools it works with and ships them in the open. Live at [multnelis.org](https://multnelis.org).

It is a team profile told through the team's public projects, with no individual people on it. The page is a git commit graph: main is the team, each project (Undercroft, Ymir, Text Transporter) branches off it in its own colour, and every lane merges back at "How we work" and at the footer. Scroll replays that history: the page opens on the whole graph in 3D, the first scroll lays it flat onto the rail, and from there each lane is drawn as far as the visitor has read (see `docs/interactive-landing/`).

## Stack

- [Astro 7](https://astro.build) with Tailwind CSS v4, started from the [AstroWind](https://github.com/arthelokyo/astrowind) template (MIT, see `LICENSE.md`).
- Static build, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. `public/CNAME` binds the custom domain.
- Versioned by release-please (`.github/workflows/release-please.yml`): it keeps a release pull request open from Conventional Commits, and merging that PR bumps `package.json`, writes `CHANGELOG.md` and tags a GitHub release. The release PR is opened with `GITHUB_TOKEN`, so GitHub holds its `Check` and `Build` runs for approval: approve them on the PR (or close and reopen it), wait for green, then merge.
- English is server-rendered; the Vietnamese toggle swaps strings client-side on the same URL (`?lang=vi` also works).
- Mail to contact@multnelis.org is forwarded by Cloudflare Email Routing (rule "contact" on the multnelis.org zone) to the organisation owner. No mailbox is hosted.

## Where things live

| Path                        | What                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/data/site.ts`          | Every word on the site, in English and Vietnamese: profile, projects and use cases, principles. |
| `src/pages/index.astro`     | The landing page and its structured data.                                                       |
| `src/pages/contact.astro`   | The contact page: one address, then each project with its issues and site.                      |
| `src/components/site/`      | Header, hero, overture, profile, rail (the commit graph), project fields, principles, footer    |
| `src/components/site/rail/` | The graph's shape, the scroll timeline, the one controller that draws it, the 3D overture       |
| `e2e/`                      | Playwright end-to-end and visual tests, and a static server that serves `dist/` like Pages      |
| `docs/interactive-landing/` | The scroll narrative: discovery, scene blueprint, timeline, architecture, test plan             |
| `src/assets/images/`        | Project marks (Ymir, Text Transporter) and the social preview; Undercroft's is an icon.         |
| `src/assets/favicons/`      | The multnelis mark (three lanes merging into one node).                                         |
| `brand/`                    | Mark concepts and the social-preview composition (`og.html`, rendered to `out/og.png`).         |
| `mockups/`                  | The design rounds that led to this page; `b-graph.html` is the chosen direction.                |
| `PRODUCT.md`, `DESIGN.md`   | Product truth and the visual system, for humans and coding agents.                              |

## Working on it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run check    # astro check + eslint + prettier
npm test         # unit tests (Vitest) for the scroll timeline
npm run test:e2e # end-to-end and visual tests (Playwright) against a fresh build
```

Visual baselines are Linux screenshots, generated in Playwright's Docker image so they match CI: after a deliberate visual change, run `npm run test:e2e:update` (needs Docker) and review the images in `e2e/visual.spec.ts-snapshots/` before committing them. A local run on macOS writes its own baselines, which git ignores; the run that writes them reports those tests as failed, so run it a second time.

Node 22 or newer (`.nvmrc`).

## Adding or changing a project

1. Edit `src/data/site.ts`. Keep both languages filled, keep every claim backed by a public repository, and never list a private one.
2. For a new project, add its mark, give it a lane key and colour (`Lane` in `src/data/site.ts`, `Lane`, `FAR_TO_NEAR` and the lane positions in `src/components/site/rail/geometry.ts`, `COLOR` in `rail/controller.ts` and `rail/overture.ts`, and the `--lane-*` tokens in `site.css`).
3. Run `npm run build && npm run check && npm test && npm run test:e2e`, look at the page at 390px and 1440px, regenerate the visual baselines if the page changed, and open a pull request. `main` is protected: the CI checks must be green before the pull request can merge, and merging deploys the site.
