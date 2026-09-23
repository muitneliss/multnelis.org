# multnelis.org

The landing page of **multnelis**, a small collective in Ho Chi Minh City building tools for the coding-agent era. Live at [multnelis.org](https://multnelis.org).

The page is a git commit graph: each member owns a coloured lane, projects are the merge commits where lanes meet, and reading down the page is reading history.

## Stack

- [Astro 7](https://astro.build) with Tailwind CSS v4, started from the [AstroWind](https://github.com/arthelokyo/astrowind) template (MIT, see `LICENSE.md`).
- Static build, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. `public/CNAME` binds the custom domain.
- English is server-rendered; the Vietnamese toggle swaps strings client-side on the same URL (`?lang=vi` also works).
- Mail to contact@multnelis.org is forwarded by Cloudflare Email Routing (rule "contact" on the multnelis.org zone) to the organisation owner. No mailbox is hosted.

## Where things live

| Path                         | What                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/data/site.ts`           | Every word on the page, in English and Vietnamese, plus members and projects. Edit this file.  |
| `src/pages/index.astro`      | The landing page and its structured data.                                                      |
| `src/pages/contact.astro`    | The contact page, laid out like a CODEOWNERS file: paths and the people who answer for them.   |
| `src/components/site/`       | Header, hero, rail (the commit graph), member fields, project commits, footer, language toggle |
| `src/assets/images/members/` | GitHub avatars and the per-member domain icons.                                                |
| `src/assets/favicons/`       | The multnelis mark (three lanes merging into one node).                                        |
| `brand/`                     | Mark concepts, member icon sources, and the social-preview composition (`og.html`).            |
| `mockups/`                   | The design rounds that led to this page; `b-graph.html` is the chosen direction.               |
| `PRODUCT.md`, `DESIGN.md`    | Product truth and the visual system, for humans and coding agents.                             |

## Working on it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run check    # astro check + eslint + prettier
```

Node 22 or newer (`.nvmrc`).

## Adding or changing a member or project

1. Edit `src/data/site.ts`. Keep both languages filled and keep every claim backed by a repository or a profile.
2. For a new member, add a 400px avatar and a 512px domain icon under `src/assets/images/members/`, and give them a lane in `src/components/site/Rail.astro`.
3. Run `npm run build && npm run check`, look at the page at 390px and 1440px, and open a pull request.
