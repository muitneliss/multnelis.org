---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/components/site/Profile.astro","src/components/site/ProjectField.astro","src/components/site/Principles.astro","src/components/site/Closing.astro"]
---

# Surface brief: src/pages/index.astro (multnelis.org landing page)

Scope: the landing page at `/`. Visitor mode: Persuade.
Audience: developers arriving from GitHub or a link to one of the projects. Job: know who multnelis is (an engineering team in Ho Chi Minh City), what each public project is for, and click through to its code.
Action: "Explore the projects" (primary, to the `What we build` index), "Our code on GitHub" (secondary). Proof: the three public repositories, their use cases, stack, licence and status, all from the repositories.
Constraints: no people on the page (user decision, September 2026); public repositories only, never a private one; English default with Vietnamese toggle on one URL; no invented claims; GitHub Pages static build; WCAG AA contrast.
Chosen direction: "The commit graph", kept from the approved landing page and re-mapped from members to projects: main is the team, each project owns a lane and a full-bleed field. Memorable moment: three coloured lanes converge on the statement, branch off again one per project, and merge back at "How we work" and the footer.
Unresolved: none.

## Direction contract

THESIS: The team is a git history told through its work. Main is the team; each public project is a branch with its own colour field; the principles are the merge where the branches meet. Refuses the category default of hero + feature cards + team grid, and refuses headshots.
OWN-WORLD: White ground, ink #101214. Three lane colours owning whole regions: vermilion #C9461F (Undercroft), cobalt #2457F5 (Ymir), jade #168459 (Text Transporter); main lane ink. A left rail SVG with 6px round-capped lanes and ringed nodes runs the full page. Anybody wide for display, Hanken Grotesk body, JetBrains Mono for repository facts only.
STORY: A visitor reads that multnelis is an engineering team that builds its own tools in the open, sees the three projects indexed by line of work, reads each project's outcome and use cases in its colour field, sees how the team works, and leaves for a repository or the contact page.
FIRST VIEWPORT: Header row (wordmark, `main` chip, Contact, EN/VI). Rail on the left with three lanes converging into a large ink node beside the headline. Headline in Anybody wide, supporting line naming the city and the three tools, primary ink button and ghost button beneath.
FORM: The commit graph, the approved direction for this site (seed of the original round recorded in git history), extended rather than re-rolled because the user asked to change the content, not the identity.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
