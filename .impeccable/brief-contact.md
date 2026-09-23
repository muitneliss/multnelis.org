# Surface brief: src/pages/contact.astro (multnelis.org /contact)

Scope: the contact page at `/contact`. Visitor mode: Operate (the task is "write to the team").
Audience: a developer who has read the landing page, or arrived from a repository, and wants to write to the team.
Task: send an email to contact@multnelis.org. Static site, no form.
Content: one title and the address. Per-member and per-project routing was removed at the user's request (2026-09-23): the page is the address, nothing else.
Constraints: inherits DESIGN.md unchanged; English with the VI toggle; WCAG AA; nothing invented.
Unresolved: none.

## Direction contract

THESIS: A contact page that is only the address. Refuses the form-in-a-card, the icon row of social links, and any routing table.

OWN-WORLD: DESIGN.md's commit-graph world, unchanged. The three lanes converge into the first big node on the actions row; main runs down to the footer, where the lanes merge into the last commit.

STORY: The visitor reads one line, sees the address, and writes.

FIRST VIEWPORT: Header (wordmark to home, `main` chip, Home link, EN/VI). Title "One address reaches all of us." at Display scale, then the actions row on the big node: solid "Email us" button and the address in mono beside it. The hero grows so hero and footer fill exactly one screen.

FORM: Title plus action, set by the user's direct instruction after a structure round (seed d71f2a70) was interrupted; no dealt structure was chosen.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
