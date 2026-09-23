# Agent Instructions

## This project

This repository is the landing page of **multnelis** (https://multnelis.org), built on the AstroWind template. Read `README.md` for the layout, `PRODUCT.md` for product truth (who the members are, which projects are shown, what must never be claimed), and `DESIGN.md` for the visual system. All page copy, in English and Vietnamese, lives in `src/data/site.ts`; the pages are `src/pages/index.astro` and `src/pages/contact.astro` (plus `404.astro`), built from `src/layouts/Layout.astro` and the components under `src/components/site/`. The blog is disabled and the template's demo pages are removed; the rest of this file documents the template conventions that still apply.

## Shipping changes

`main` is protected: nobody pushes to it directly, admins included. Every change goes through a pull request, the `Check` and `Build` jobs of the CI workflow must pass on the branch (kept up to date with `main`), and then it is merged. Merging `main` deploys to GitHub Pages. Branches are deleted on merge, and auto-merge is enabled, so `gh pr merge --squash --auto` is the normal way to land a green pull request.

## Template Overview

AstroWind is a free, open-source website template built with **Astro v7** and **Tailwind CSS v4**. It generates a fully static site optimized for performance, SEO, and accessibility.

**Stack:** Astro v7 | Tailwind CSS v4 | TypeScript 5.9 | MDX | Sharp

## Skills

Before implementing a project-specific task (Open Graph images, structured data, styling, base paths, deployments, header customisation…), check `.agents/skills/<name>/SKILL.md` for an existing skill and follow it. Most skills were written for the AstroWind template: several describe files this repository has removed (blog, landing demos, Decap CMS, Cloudflare and Docker configs), and each skill's `description` says how far it applies here. Confirm the files a skill names exist before following it.

## Agent configuration

This file is the single source of instructions for every coding agent. Codex reads it directly; `CLAUDE.md` imports it with `@AGENTS.md` for Claude Code.

- Repository-wide rules go here. Do not copy them into `CLAUDE.md`.
- Reusable task workflows are skills: `.agents/skills/<name>/SKILL.md`, with `name` and `description` frontmatter. Codex discovers them there; `.claude/skills` is a relative symlink to `../.agents/skills`, so Claude Code discovers the same files. Always edit the files under `.agents/skills/`, never a copy under `.claude/`.
- Only Claude Code runtime behaviour belongs in `CLAUDE.md` or `.claude/`.

## Quick Reference

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server at localhost:4321  |
| `npm run build`   | Production build to `./dist/`       |
| `npm run preview` | Preview production build locally    |
| `npm run check`   | Run astro check + ESLint + Prettier |
| `npm run fix`     | Auto-fix ESLint + Prettier issues   |

**Node.js requirement:** >= 22.22.3

## Architecture

### Directory Structure

```
src/
  assets/styles/tailwind.css   # Tailwind v4 config (themes, utilities, plugins); imports shadcn.css and site.css
  components/
    site/          # The multnelis page: SiteHeader, Hero, Rail, MemberField, ProjectCommit, SiteFooter, LanguageToggle…
    common/        # Shared: Image, Metadata, StructuredData, Analytics, ApplyColorMode
    ui/            # Template primitives: Button, Form, Headline, Timeline, WidgetWrapper (not used by the current pages)
    widgets/       # Template page sections: Hero, Features, Bento, Pricing, FAQs… (not used by the current pages)
    CustomStyles.astro  # CSS variables for colors and fonts
  content.config.ts    # Content Collections (currently empty; Astro requires the file)
  data/site.ts         # All page copy (English and Vietnamese), members and projects
  layouts/             # Layout.astro (used by every page); PageLayout, LandingLayout, MarkdownLayout are template leftovers
  pages/               # File-based routing: index.astro, contact.astro, 404.astro
  utils/               # images.ts, permalinks.ts, frontmatter.ts, utils.ts
  config.yaml          # Site configuration (loaded as virtual module)
  navigation.ts        # Navigation structure
  types.d.ts           # TypeScript type definitions
vendor/integration/    # Custom Astro integration for config loading
```

### Path Aliases

Use `~/` to import from `src/`:

```typescript
import Image from '~/components/common/Image.astro';
import { SITE } from 'astrowind:config';
```

### Configuration System

Site config lives in `src/config.yaml` and is loaded as a Vite virtual module `astrowind:config` by the custom integration in `vendor/integration/`. Exports: `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, `ANALYTICS`.

## Tailwind CSS v4

Configuration is CSS-first in `src/assets/styles/tailwind.css`:

- **Theme tokens:** `@theme { --color-primary: var(--aw-color-primary); ... }`
- **Custom utilities:** `@utility bg-page { ... }`
- **Dark mode:** Class-based via `@variant dark (&:where(.dark, .dark *))`, but this site is light only (`ui.theme: 'light:only'` in `src/config.yaml`) and has no dark palette
- **Plugins:** `@plugin "@tailwindcss/typography"`
- **Custom variant:** `@custom-variant intersect (&:not([no-intersect]))`

CSS variables for colors/fonts are defined in `src/components/CustomStyles.astro` (light theme only, by design).

The Vite plugin `@tailwindcss/vite` is configured in `astro.config.ts` (not as an Astro integration).

### Class Merging

Components use `twMerge` from `tailwind-merge` v3 for conditional class composition.

## Content Collections

`src/content.config.ts` exports an empty `collections` object: the landing page has no content collections, and there are no posts. Astro requires the file to exist; add a collection there (Content Layer API with a `glob()` loader) only when one is actually needed.

## Component Patterns

- Props extend interfaces from `~/types`
- Use `class:list` for conditional classes
- Use `twMerge()` when accepting className overrides
- Use named slots for layout composition
- Widget components accept standardized props (see `~/types`)

## Image Handling

`src/components/common/Image.astro` supports:

- Local images via `astro:assets` (optimized by Sharp)
- Remote images via Unpic CDN
- Allowed domains (for providers Unpic can't detect, processed by Sharp): `cdn.pixabay.com`, `images.unsplash.com` (`image.domains` in `astro.config.ts`)

Hero images use `loading="eager"` and `fetchpriority="high"`.

## Fonts

Fonts are handled by Astro's native **Fonts API**, configured in `astro.config.ts` under the `fonts` key (provider, family, `cssVariable`) and injected via the `<Font />` component in `src/layouts/Layout.astro`. Astro self-hosts, subsets, preloads, and generates metric-adjusted fallbacks. To change the typeface, edit the `fonts` entry and point `--aw-font-*` in `CustomStyles.astro` at the new `cssVariable`.

## Third-party Scripts (Partytown)

`@astrojs/partytown` is wired as an **opt-in** in `astro.config.ts`, gated behind `const hasExternalScripts = false`. Set it to `true` to offload third-party scripts (e.g. Google Analytics via `analytics.vendors.googleAnalytics.partytown`) to a web worker. It is disabled by default so the base template ships no external scripts.

## Content Security Policy

Astro's native CSP is **not** enabled. The template left it off because it conflicts with `<ClientRouter />` view transitions and arbitrary third-party scripts. This site uses neither: `src/layouts/Layout.astro` deliberately has no `ClientRouter`, because the rail is measured from the live layout, and `hasExternalScripts` is `false`. Enabling CSP is therefore an open decision, not a technical blocker.

## Verification Checklist

After changes, always verify:

1. `npm run build` succeeds
2. `npm run check` passes (astro check + ESLint + Prettier)
3. Visual check in browser: `/` and `/contact`, in English and Vietnamese (`?lang=vi`), at 390px and 1440px
4. Structured data describes the site it is on: the JSON-LD in `src/pages/index.astro` and `src/pages/contact.astro` is built from `src/config.yaml` and `src/data/site.ts`; anything you add there must be true and visible on the page
