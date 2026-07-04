# Orchen Site Upgrade Plan

*Benchmarked against Apple, Stripe, Linear, SchoolAI, and 2026 B2B SaaS conversion research. Ordered by impact-per-effort.*

The research is blunt about what moves demo bookings: interactive/real product demos lift lead rates 20–63%, social proof placed **next to the form** (not the bottom of the page) outperforms everything else, and minimalist pages with a single dominant CTA convert 15–25% better. Ungated clickable demos get 2× the engagement of static screenshots, and those leads close 20–25% faster.

Where Orchen already wins: real product captures (most competitors show illustrations), a coherent editorial design system, a genuine narrative arc (problem → design it → product), and a founder note that does honest work no testimonial could. The gaps below are ranked.

---

## Phase 1 — Conversion mechanics (days, not weeks)

### 1.1 Social proof near the form — the biggest gap
There are currently **zero trust signals** at the point of conversion. Early-stage means no customer logos yet — use what exists:
- Pull one line of the NSBA quote or the College Board stat beside the form as a "why now" anchor.
- Add a "What happens next" strip under the form: *"You'll hear from Emil within 24 hours. 30 minutes, live product, your questions."* Named-human response promises measurably reduce form abandonment.
- Founding Schools framing near the form: "Join the first cohort — work directly with the founder" turns the lack of logos into scarcity.

### 1.2 Promote the live demo from footnote to co-star
app.orchen.ai is the strongest asset and it's a secondary link. Interactive demos are the single highest-lift item in 2026 conversion data.
- Give the demo its own home section: full-width stage, one-line pitch ("No signup. Ask it something a student would."), big CTA.
- Track clicks on it separately once analytics land (see 1.5).

### 1.3 FAQ / objection handling on home
Heads of school arrive with the same six objections: privacy, FERPA/COPPA, cost, device requirements, "another tool for teachers to learn," AI accuracy. A compact FAQ accordion before the form handles them without bloating the page. Also earns featured-snippet SEO.

### 1.4 Persona routing in the nav
Nav currently has The Problem / How It Works / Trust. Add a "Who it's for" dropdown (Teachers · Parents · Advisors · Heads of School) — those pages exist but are only reachable from deep content. Persona-matched landing = higher intent retention.

### 1.5 Measurement (can't optimize blind)
- Add privacy-friendly analytics (Plausible/Fathom — fits the privacy brand; a school buyer noticing Google Analytics on a "we protect student data" site is a bad look).
- Define events: demo clicks, walkthrough form submits, tab interactions, video plays.

## Phase 2 — The Apple layer (1–2 weeks)

### 2.1 A 60–90 second product film
Apple's pattern isn't screenshots — it's one film that makes the product feel inevitable. You have all the raw captures already (student chat, teacher drill-in, parent ask). Cut them into one narrated/subtitled arc: student asks → tutor teaches → signal flows → adults act. Put it in the hero as "Watch how it works ▶" with a lightbox. This becomes the sales-call opener and social-share asset too.

### 2.2 Performance pass (Apple-grade feel is mostly speed)
- Convert hero news-wall PNGs and product shots to WebP/AVIF with `srcset` (some current PNGs are 3,500px wide).
- `preload` the hero assets, lazy-load everything below the fold.
- Target: LCP under 2s on 4G. Slow hero = every other improvement is invisible.

### 2.3 Scroll-driven product moments (selectively)
The animate-in system is good. Add one signature scrollytelling moment — e.g., the master diagram on /how-it-works drawing itself as you scroll (SVG stroke animation, ~50 lines of JS). One is memorable; five is noise.

### 2.4 Sticky mobile CTA
On mobile, a slim persistent "Book a walkthrough" bar after 50% scroll. Most school administrators will first open this site on a phone from an email.

## Phase 3 — Trust & depth (as material exists)

### 3.1 "What a pilot looks like" page
A concrete 6-week pilot timeline (week 1: configure · weeks 2–5: one class runs · week 6: review the data together). Buyers fear commitment; a small, bounded, reversible first step converts. Link it from the form area.

### 3.2 Pricing philosophy page
Even without public numbers: how pricing works (per-student/per-school), what a pilot costs, what's included. "Pricing" is a top-3 nav search on every B2B site; total silence costs credibility.

### 3.3 First-testimonial pipeline
The moment the first pilot school exists, capture: a named quote from the head of school, one concrete metric, one teacher line. Slot them beside the form (1.1) and on /founding-schools. Until then, consider 1–2 advisor/educator endorsement quotes if available.

### 3.4 Per-page OG images
Each key page (problem, how-it-works, compare) gets a designed share card. These pages will be forwarded between administrators — the link preview is a first impression.

---

## Explicitly not recommended
- **Chatbot widget** — undermines the "designed AI, not bolted-on AI" positioning.
- **Popups/exit-intent** — wrong audience; heads of school punish gimmicks.
- **Replacing the news-wall hero with a product hero** — the problem-first narrative is differentiation; Apple-style product hero is what SchoolAI et al. already do. Revisit only with A/B data.
