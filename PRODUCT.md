# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 + Tailwind CSS v4 on the AstroWind template (arthelokyo/astrowind), pinned by the user. Static build deployed to GitHub Pages from the repository `muitneliss/multnelis.org`, served at https://multnelis.org. Node 26 locally; template requires Node >= 22.

## Users

Developers and open-source maintainers who land on multnelis.org from GitHub (the org page, a repo README, a skills.sh listing) or from a link to one of the projects. They want to know, within seconds, who this team is, what it builds, what each project is for, and where to find the code. A secondary audience is Vietnamese-speaking developers in Ho Chi Minh City; the site ships English by default with a Vietnamese toggle.

## Product Purpose

A company profile for the multnelis team, told through its public projects rather than its people: who the team is, what each project does and what you would use it for, how the team works, and how to reach it. Success means a visitor can name the team's three lines of work (data infrastructure, agent tooling, everyday utilities), say what at least one project is for, and click through to a repository.

## Positioning

An engineering team in Ho Chi Minh City that builds the tools it works with and ships them in the open: a self-hostable data platform (Undercroft), a harness generator for coding agents (Ymir), and a notes board that moves text between machines (Text Transporter). Presented as a team, not as individuals, and not as an agency selling services.

## Operating Context

- GitHub organisation: https://github.com/muitneliss (spelled m-u-i-t, two "s"). Domain and brand: multnelis.org (spelled m-u-l-t, one "s"), the domain the team actually registered at Cloudflare on 2026-09-22. The page uses the domain spelling everywhere; the org URL is linked as-is. Do not "correct" one to the other.
- No people are shown (user decision, September 2026): no member names, handles, avatars or bios, on any page or in structured data.
- Projects shown: public repositories only (user decision, September 2026): undercroft, ymir, text-transporter. Private repositories are never named or described, here or on the site, since this repository is public. symphony-its-everdred is excluded because it is a fork with no commits from the team; cli-proxy-api-service and the Stirling-PDF fork are excluded as deployment config and an unmodified fork.
- Hosting: GitHub Pages with a CNAME file. DNS for multnelis.org is not yet configured.

## Capabilities and Constraints

- Two pages, the landing page and `/contact`; no blog. AstroWind blog routes are removed or disabled.
- Language: English default, Vietnamese toggle. Undecided: whether the toggle is client-side (one page, swapped strings) or a `/vi` route. Default reading: client-side toggle with strings in one dictionary, so the page stays a single URL.
- Branding imagery (logo, favicon) was generated with the Codex CLI's image generation, per user instruction. The OG image is rendered from `brand/og.html`.
- The site is versioned with release-please: merging to `main` deploys, and the release pull request records the version and changelog.
- No analytics, no forms, no backend.
- Contact: a `/contact` page (email plus GitHub, no form). contact@multnelis.org exists as a Cloudflare Email Routing address forwarding to the organisation owner (bacuongtr@gmail.com); there is no hosted mailbox and no sending from that address.

## Brand Commitments

- Name: "multnelis" (lowercase on the page, matching the domain).
- Project marks are reused as-is: Undercroft's arch mark (`src/assets/icons/undercroft.svg`, single ink, 32x32), Ymir's frost-rune tile (`src/assets/images/ymir.svg`) and Text Transporter's sticky-note icon (`src/assets/images/text-transporter.svg`, copied from the repository's `app/icon.svg`).
- The org has no logo yet; the GitHub org avatar is an auto-generated identicon and is not a brand asset.

## Evidence on Hand

Project facts:

- **Undercroft**: immutable, content-addressed raw lake (S3/MinIO) plus declarative YAML connectors, one generic Postgres table, dbt models on top, multi-tenant with AES-256-GCM sealed credentials. HubSpot, Xero, Gmail and Drive sources; search folded for Vietnamese tone marks; first-party BI; a CLI and an MCP server that act with the signed-in person's permissions. MIT. Pre-alpha, released with release-please. Homepage undercroft.lowbit.link.
- **Ymir**: agent skill that explores a codebase, runs a Socratic interview, and emits a harness spec (`.ymir/harness-profile.yaml`, `.ymir/harness-playbook.md`); `ymir apply` generates rules, lint, CI, wiki, CLAUDE.md/AGENT.md. Works with Claude Code, Cursor, Codex via skills.sh (`npx skills@latest add muitneliss/ymir`). Released with release-please; `ymir apply` backs up what it overwrites and `ymir revert` undoes it. No licence file.
- **Text Transporter**: "Type a name. Whatever you paste there follows you to any machine." Sticky-note boards at a chosen name: colours, pins, search and filters, Markdown with syntax-highlighted code. Next.js 15, React 19, SQLite (one file), published as the container image `ghcr.io/muitneliss/text-transporter`. Public, no licence file, no releases.

Absent, must not be fabricated: testimonials, user counts, download numbers, company clients, funding, and a team founding story beyond "org created April 2025".

## Product Principles

1. Proof over pitch: every claim on the page points at a real public repository.
2. The team speaks through its work: projects and their use cases carry the page, never individual people.
3. Zero maintenance burden: content lives in one data file; no CMS, no backend.
4. GitHub is the destination: every project links out to its code and its issues.
5. Bilingual by design: Vietnamese is a first-class toggle, not an afterthought.

## Accessibility & Inclusion

WCAG 2.1 AA as the working floor: contrast, keyboard reachable toggle and links, reduced-motion respected.
