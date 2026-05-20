# Changelog

## 2026-04-24

### Added — comparison pages

New `/compare/` section with three competitor comparison pages and a hub index.

**New files:**
- `assets/compare.css` — shared stylesheet for all compare pages (tokens, nav, footer, table, FAQ accordion, decision grid, CTA)
- `compare/index.html` — hub listing all three comparisons with short intros
- `compare/orchen-vs-schoolai.html` — Orchen vs SchoolAI
- `compare/orchen-vs-khanmigo.html` — Orchen vs Khanmigo
- `compare/orchen-vs-magicschool.html` — Orchen vs MagicSchool
- `sitemap.xml` — includes homepage + all four /compare/ URLs
- `VERIFY.md` — full list of competitor claims requiring fact-check before publishing

**Page structure (all three comparison pages):**
- SEO head: title, meta description, canonical, OG, Twitter Card
- JSON-LD: BreadcrumbList + FAQPage (6 questions per page)
- Hero with H1 + "Last updated April 2026" timestamp
- Honest summary box (concedes competitor strengths upfront)
- 12-row comparison table (feature / Orchen / competitor)
- "Where [competitor] is strong" section (4-5 genuine strengths)
- "Where Orchen is different" section (5 differentiators)
- "How to decide" grid with choose-X-if routing
- FAQ accordion (6 questions, native details/summary, no JS required)
- CTA bar linking to /#contact
- Cross-links to other comparison pages and /solutions/heads-of-school

**Competitor [VERIFY] markers:** All uncertain claims are marked inline and
catalogued in `VERIFY.md`. Review before publishing.

**Note:** `/solutions/heads-of-school` is linked from all compare pages but
does not exist yet. Create it before publishing or update the links.
