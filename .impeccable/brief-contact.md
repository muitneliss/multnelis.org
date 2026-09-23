# Surface brief: src/pages/contact.astro (multnelis.org /contact)

Scope: the contact page at `/contact`. Visitor mode: Operate (the task is "reach the right person").
Audience: a developer who has read the landing page, or arrived from a repository, and wants to write to the team or to the people behind one project.
Task: send an email to contact@multnelis.org (primary), or reach a member or a project's issue tracker. Static site, no form: every route is a real address or URL.
Content: the address contact@multnelis.org (forwarded by Cloudflare Email Routing to the org owner), the three members with their GitHub profiles and sites, the four projects with their maintainers (the `merges` in `src/data/site.ts`, which come from PRODUCT.md) and their public issue trackers.
Constraints: inherits DESIGN.md unchanged (no new tokens, no lane colour on white except rail strokes and dots); English with the VI toggle; WCAG AA; nothing invented.
Chosen structure (surface seed d453b391, dealt lead, user-locked): "The CODEOWNERS file". Rows map paths to owners, the way a repository's CODEOWNERS does.
Unresolved: none.

## Direction contract

THESIS: A contact page that answers "who do I write to about X" before "how", laid out like a repository's CODEOWNERS file. Refuses the form-in-a-card and the icon row of social links.

OWN-WORLD: DESIGN.md's commit-graph world, unchanged. The rail continues on this page: the email is the first commit, each owner row forks that member's lane off main, each path row merges its owners' lanes into main, the footer merges all.

STORY: The visitor reads the address first and can act immediately; scrolling down they see the three owners and which paths each owns, then the paths themselves with their owners and their route (issues for public repositories, email for the private one), and leaves with the right address or link.

FIRST VIEWPORT: Header (wordmark to home, `main` chip, Home link, EN/VI). Title "Who answers for what." at Display scale, a two-line lead, then the actions row on the big node: solid "Email us" button and the address in mono beside it. The actions row is the last element fully in view at 1440×900; the "Owners" heading may begin at the fold's lower edge, since on an Operate page the index is the point.

FORM: The CODEOWNERS file, candidate 3 of my ranked list of seven structures; surface seed key d453b391.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
