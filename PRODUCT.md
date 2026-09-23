# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 + Tailwind CSS v4 on the AstroWind template (arthelokyo/astrowind), pinned by the user. Static build deployed to GitHub Pages from the repository `muitneliss/muitnelis.org`, served at https://muitnelis.org. Node 26 locally; template requires Node >= 22.

## Users

Developers and open-source maintainers who land on muitnelis.org from GitHub (the org page, a repo README, a skills.sh listing) or from a member's personal site. They want to know, within seconds, who this collective is, what it builds, and where to find the code. A secondary audience is Vietnamese-speaking developers in Ho Chi Minh City; the site ships English by default with a Vietnamese toggle.

## Product Purpose

A single landing page that introduces the muitnelis team as an open-source collective: the members, the tools they ship, and how to reach them. Success means a visitor can name the team's focus (agent-era developer tooling and data infrastructure), recognise the three members and their domains, and click through to a repository.

## Positioning

A small Ho Chi Minh City collective shipping tools for the coding-agent era: harness generators (Ymir), autonomous implementation orchestration (Symphony), a self-hostable raw data lake (Undercroft), and cross-device utilities (Text Transporter). Not an agency, not a company: a group of engineers publishing what they build for themselves.

## Operating Context

- GitHub organisation: https://github.com/muitneliss (two "s"). Domain: muitnelis.org (one "s"). The domain spelling is the brand spelling on the page; the org URL is linked as-is.
- Members shown (confirmed by user): cuongtranba, thanh-dong, yanmad27. ArcticaLam, ducdmdev, loclam812 are org members but excluded from the page by user decision.
- Projects shown (confirmed by user): undercroft (public), ymir (public), symphony-its-everdred (public, displayed as "Symphony"), text-transporter (private; described, not linked).
- Hosting: GitHub Pages with a CNAME file. DNS for muitnelis.org is not yet configured.

## Capabilities and Constraints

- Single landing page; no blog at launch. AstroWind blog routes are removed or disabled.
- Language: English default, Vietnamese toggle. Undecided: whether the toggle is client-side (one page, swapped strings) or a `/vi` route. Default reading: client-side toggle with strings in one dictionary, so the page stays a single URL.
- Member avatars come from GitHub (`avatars.githubusercontent.com/u/<id>`), cached locally under `research/avatars/`.
- Branding imagery (logo, favicon, member domain icons, OG image) is generated with the Codex CLI's image generation, per user instruction.
- No analytics, no forms, no backend.

## Brand Commitments

- Name: "muitnelis" (lowercase on the page, matching the domain).
- Existing project marks may be reused as-is: Undercroft's arch mark (`research/refs/undercroft-mark.svg`, single ink, 32x32) and Ymir's frost-rune icon (`research/refs/ymir-minimal.svg`, navy tile with ice-blue strokes). Symphony and Text Transporter have no marks.
- The org has no logo yet; the GitHub org avatar is an auto-generated identicon and is not a brand asset.

## Evidence on Hand

Member facts from GitHub (September 2026):

- **cuongtranba** (Cuong Tran, Ho Chi Minh City, on GitHub since 2013). 124 public repos. Languages: C#, Go, JavaScript, TypeScript, Python, Rust. Recent work: Claude Code and Codex tooling (agent-teams-setup, skill-stack, zsh-claude-resume, claude-code-qa, tinkaria web UI for Claude Code and Codex, wtguard), Go scaffolding with clean architecture, Rust ETL and hexagonal-architecture templates, Vietnamese accounting agent skills, narrated-video Remotion kit. Personal site: trancuong.me (Astro). Org billing owner.
- **thanh-dong** (on GitHub since 2015). 28 public repos. Languages: TypeScript, JavaScript, Go, Python, Rust. Recent work: harness-repository-cc (Rust; turns any repo into an agent-ready workspace), claude-routing-optimizer, herdr-rich-preview (browser preview of agent-touched files), magikarp_skill (learn-features skill tuned by autoresearch), Symphony (autonomous implementation runs), read-things (camera-first vocabulary app, Expo + ML Kit + on-device Gemma).
- **yanmad27** (Doan Phan, "Yan", Ho Chi Minh City, on GitHub since 2018). Bio: "Make life easy". Full-stack engineer: TypeScript, JavaScript, Go, Rust; React, Next.js, NestJS, GraphQL, PostgreSQL, MongoDB, Docker Swarm, k6. Projects: windows-rectangle (Rust window manager, 6 stars), ask-jev (Claude Code plugin answering AskUserQuestion from context), money-note-bot (Go Telegram expense bot), tiny-url NestJS service, translate-json-i18n, text-transporter. Site: doanphan.com. LinkedIn: linkedin.com/in/yanmad27.

Project facts:

- **Undercroft**: immutable, content-addressed raw lake (S3/MinIO) plus declarative YAML connectors, one generic Postgres table, dbt models on top, multi-tenant with AES-256-GCM sealed credentials. Pre-alpha. Homepage undercroft.lowbit.link. Topics: bun, data-lake, dbt, elt, metabase, minio, postgres, self-hosted, typescript.
- **Ymir**: agent skill that explores a codebase, runs a Socratic interview, and emits a harness spec (`.ymir/harness-profile.yaml`, `.ymir/harness-playbook.md`); `ymir apply` generates rules, lint, CI, wiki, CLAUDE.md/AGENT.md. Works with Claude Code, Cursor, Codex via skills.sh. Has releases.
- **Symphony** (repo symphony-its-everdred): fork/extension of openai/symphony. Turns tracker work into isolated autonomous implementation runs with proof of work (CI, PR review, walkthrough videos). Adds Claude support, GitHub Issues, live agent logs, Phoenix dashboard. Apache 2.0. Engineering preview.
- **Text Transporter**: quickly share text between devices (TypeScript). Private in the org; a public copy lives on yanmad27's profile.

Absent, must not be fabricated: testimonials, user counts, download numbers, company clients, funding, and a team founding story beyond "org created April 2025".

## Product Principles

1. Proof over pitch: every claim on the page points at a real repository or a real member.
2. Members are engineers, not headshots: each intro is grounded in what they actually ship.
3. Zero maintenance burden: content lives in one data file; no CMS, no backend.
4. GitHub is the destination: every project and member links out to code.
5. Bilingual by design: Vietnamese is a first-class toggle, not an afterthought.

## Accessibility & Inclusion

WCAG 2.1 AA as the working floor: contrast, keyboard reachable toggle and links, reduced-motion respected.
