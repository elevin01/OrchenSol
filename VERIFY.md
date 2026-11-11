# VERIFY.md — Remaining unresolved claims

SchoolAI comparison sources rechecked: November 3, 2026. Other competitor research retains its April 24, 2026 verification date.

All other `[VERIFY]` markers in the compare pages have been resolved and removed.
The four items below remain open — confirm before publishing.

---

## 1. SchoolAI — dedicated longitudinal advisor/counselor reporting

**File:** `compare/orchen-vs-schoolai.html`
**Location:** Table row "Insight output for advisors"; FAQ "Can advisors or counselors see longitudinal student patterns?"
**Claim to confirm:** Whether SchoolAI's Mission Control offers dedicated cross-subject, longitudinal reporting for advisors or counselors (as distinct from subject teachers monitoring their own Spaces in real time).
**Status (November 3, 2026):** SchoolAI now documents Student Insights combining Space session history, individual Sidekick activity, chats, and alerts. Access is described for rostered teachers and organization admins. A dedicated counselor workflow remains unconfirmed. The comparison must not describe SchoolAI as limited to session-only insight. [Student Insights Dashboard](https://help.schoolai.com/en/articles/16192386-student-insights-dashboard).

---

## 2. Khanmigo — district-specific DPA retention terms

**File:** `compare/orchen-vs-khanmigo.html`
**Location:** Table row "Data retention"; FAQ "What happens to student data?"
**Claim to confirm:** Specific retention windows and deletion rights under Khan Academy's Data Processing Agreement for district contracts.
**Status:** Khan Academy's privacy policy and FERPA commitments are public. District-specific DPA terms are not. Request the DPA from Khan Academy before procurement.

---

## 3. MagicSchool — specific data retention timeline

**File:** `compare/orchen-vs-magicschool.html`
**Location:** Table row "Data retention"
**Claim to confirm:** Exact data retention window for teacher and student interaction data.
**Status:** MagicSchool confirms data is not sold or used to train AI models. Specific retention windows are not publicly documented. Request their DPA.

---

## 4. MagicSchool — IDEA-specific SPED compliance audit

**File:** `compare/orchen-vs-magicschool.html`
**Location:** Table row "IEP and SPED support"; FAQ "Which is better for compliance-heavy environments?"
**Claim to confirm:** Whether MagicSchool has formal IDEA compliance documentation or third-party audit specifically covering their IEP generation tools.
**Status:** SOC 2 certified, iKeepSafe certified, Common Sense Privacy Seal 93/100 — all confirmed. IDEA-specific audit documentation: not publicly available. Confirm before deploying in a formal IEP process in SPED-heavy environments.

---

## General notes

- **Founding cohort framing and timing (November 2, 2026, latest founder direction):** The cohort is limited to three schools, with direct founder setup and support reserved for this cohort. School decisions are needed by December 15, 2026 for in-person training in January 2027. The agreed founding rate is 30% off the school license and locked for the first three paid years after the pilot; the founder states this rate will not be offered again. The founder now describes the independent security review as scheduled ahead of full rollout; the earlier requirement to complete it before any paid agreement is retained. No completed Orchen audit or customer endorsements are claimed. The reference answer invites teachers to evaluate the open demo firsthand, with student access still subject to school agreements and consent. Homepage preview selectors and their media are ordered with videos before screenshots, using unnumbered labels without durations.

- **Founding school offer (November 2, 2026):** The founder supplied the availability and offer: three spots remaining for spring 2027, with 30% off the first three years for schools that choose to stay after the pilot. Website copy clarifies that the discount covers the first three paid years of the school license after the pilot. Availability is a manually maintained count; update the homepage and founding-school page as places are filled. No countdown or claims of already-signed schools have been added.

- **Homepage school review (November 2, 2026):** Company stage, cohort timing, agreement status, and audit status were confirmed directly by the founder in this conversation. No founding year is stated. No schools have signed, no students are using Orchen, and no administrator testimonials or school references are offered. Spring 2027 is the founding cohort; school leaders in the Archdiocese of New York are evaluating Orchen this fall. Student data terms are draft only, written around FERPA and COPPA and modeled on New York Education Law 2-d; they have not been finalized or sent to a school, and no New York review has occurred. Schools receive the terms before student access, or may use their own school/diocesan agreement. No SOC 2 audit, penetration test, or independent review has been completed for Orchen. An independent security review is planned before any paid agreement, with results provided to founding schools. Supabase infrastructure is SOC 2 Type 2 audited. New York review context follows [NYSED's Parents' Bill of Rights guidance](https://www.nysed.gov/sites/default/files/programs/data-privacy-security/final-pbor-guidance-for-schools-on-2.24.25.pdf).

- **Domain:** `orchen.ai` is the live production domain. All canonical URLs, OG tags, JSON-LD, and sitemap entries use `https://orchen.ai/`. The `robots.txt` still references `orchen.co` — update that file before going live.

- **"/solutions/heads-of-school" link:** This URL does not exist yet. All four compare pages link to it. Create the page before publishing, or update the links to point to an existing page in the interim.

- **Orchen feature claims:** All Orchen claims (7-day deletion, 5-tier parent model, MacBook + Jamf + Cloudflare, weekly narratives) are taken directly from the product brief. Confirm each is accurately implemented before publishing — these are marketing claims that will be scrutinized.

## Homepage information layout and privacy wording — November 2, 2026

- Combined the two homepage FAQ blocks into one school information section with three topics: Getting started, In the classroom, and Privacy & security. Eleven distinct answers replace thirteen overlapping questions. Old answer anchors and #faq remain supported; links reveal the appropriate topic and answer.
- Removed the Beta tags from both demo calls to action and their obsolete styles. Simplified homepage headings and the Trust Center's privacy headings. The founder's supplied letter is unchanged.
- Per the founder's direction, use “Built for FERPA, COPPA, and New York Education Law 2-d” as a design statement with ordinary feature labels. No certification, government approval, completed compliance assessment, or agency endorsement is claimed. Student data terms remain described as a draft, modeled on New York Education Law 2-d, to be finalized with each school before student access.
- Guidance checked: [US Department of Education — FERPA school official exception](https://studentprivacy.ed.gov/ferpa), [FTC — COPPA and schools](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions), and [NYSED — data privacy and security FAQs](https://www.nysed.gov/data-privacy-security/frequently-asked-questions-about-data-privacy-and-security). These describe practice and contract obligations; the design labels do not represent a government certification. Existing consent gates and independent-security-review status remain unchanged.

Validation: desktop/tablet/phone layouts from 320px to 1440px; all three topic tabs and eleven answer anchors; keyboard focus, wrapping, Home/End; browser history; all answers accessible without JavaScript; structured data matches visible content; videos-first media ordering retained; no runtime errors; git diff --check passed. The hero now grows with its content on desktop as well as phones.

## FAQ banner and document placement — November 2, 2026

- Moved the “Built for FERPA, COPPA, and New York Education Law 2-d” statement into a full-width banner immediately before the homepage FAQ.
- Labeled the section “Frequently asked questions,” kept the three topic tabs, and moved answer previews inside the expandable answers so the closed rows read as questions.
- Replaced the document sidebar with a row below the questions, including links to the Trust Center, Privacy Policy, and student data terms.
- Per the founder's latest direction, public copy now says founding school spots are limited instead of describing a total capacity of three. Existing “3 spots remaining” availability and the three-paid-year offer are retained. No claims of signed schools or filled spots were added.

Validation: the banner precedes the FAQ and documents follow the questions; all eleven answers, three tabs, keyboard controls, answer links, and browser history work. Responsive checks passed at 320, 390, 820, 1024, and 1440 pixels, with all answers available without JavaScript. Structured data matches the updated answers, media ordering is retained, and no runtime errors were found. git diff --check passed.

## Direct FAQ answers — November 2, 2026

- The founder confirmed that the founding school pilot is free. Both pilot-cost answers now lead with that fact and distinguish the optional paid school license and its 30% founding discount for the first three paid years. No pilot duration or dollar price for the later license has been invented.
- The founder authorized offering to ask an evaluating school for permission to speak with a prospect. The reference answer explains that no permission to share names or arrange introductions has been received; any introduction requires the school's agreement. This concerns an evaluation, not a customer endorsement or completed implementation.
- Audited the homepage and founding-school FAQs for direct answers: company leads with the documented evaluation context, the independent-review answer explicitly says it has not happened yet, and availability, pilot exit, and alongside-existing-tools answers address their questions directly. FAQ structured data is synchronized.

## Classroom trial email requests — November 2, 2026

- Added “Request a classroom trial” to the homepage Teachers tab and live-demo section, as requested by the founder. Both native mailto links open the same editable message to emil@orchen.ai.
- The template asks for the teacher's name, school, grade/subject, class size, lesson/unit, and preferred start date, then asks Emil for setup steps and school requirements before student use. The website sends no email and creates no student accounts; the user sends the message through their own email application.

Validation: both links decode to the same intended recipient, subject, and editable template with preserved line breaks. Both descriptions resolve to unique IDs. Browser checks at 320, 390, 820, and 1440 pixels found no overflow, overlapping copy, or runtime errors, and keyboard focus is visible. Existing demo and teacher-workflow links remain available. No email was sent during verification.

## School review and assessment wording — November 2, 2026

- Per the founder's latest direction, school-data terms now use “Your school reviews and finalizes the terms with us before any student logs in.” Removed draft labels and unfinished-terms language from the homepage, Trust Center (including document cards and its FAQ), founding-school page, and Privacy Policy. References to students drafting their writing remain unchanged.
- The founder supplied these assessment milestones: the independent review and third-party penetration test are scheduled before any paid agreement; founding schools receive the results first; Orchen's own SOC 2 audit follows the founding cohort. These describe future milestones and do not assert completed Orchen audits. Supabase's infrastructure audit remains identified separately.
- The homepage security answer uses the requested scheduled-review wording and founder walkthrough. The Privacy Policy reflects the same milestones, and homepage FAQ structured data is synchronized.

## SchoolAI comparison refresh — November 3, 2026

- Founder supplied the current pilot scope: a free six-week, single-class pilot, with a flat per-school site license sized by headcount afterward. Updated the SchoolAI table and FAQ, all other Orchen comparison pricing cells, the MagicSchool pricing answer, and homepage/founding-school pilot answers to match. The existing founding discount remains unchanged.
- Added Orchen's documented crisis routing (designated counselor, 24-hour urgency indicator, and lifecycle tracking) to the SchoolAI content-moderation row, plus the optional pre-configured managed device layer for network-level enforcement in the deployment row and device-school FAQ.
- SchoolAI's [customer-stories page](https://schoolai.com/stories) confirms over one million educators. The [Spaces guide](https://help.schoolai.com/en/articles/15538519-getting-started-with-spaces) confirms 200,000+ teacher-created Spaces and rostered student access.
- [Current pricing](https://schoolai.com/pricing) replaces the old 75-sign-ins claim with five Space launches per year on its free trial. Scale includes district instructions and student-level insights. Removed the contradictory no-student-accounts/no-district-prompt assertions. [Student Insights](https://help.schoolai.com/en/articles/16192386-student-insights-dashboard) documents activity across sessions and Sidekick chats, so the session-only characterization was removed.
- [Critical alert documentation](https://help.schoolai.com/en/articles/14756370-student-safety-critical-alerts-real-time-monitoring) confirms configurable email recipients in addition to the session owner. [Data protection](https://schoolai.com/trust/data-protection) distinguishes SchoolAI's retained platform records from zero retention at its AI providers and confirms district-requested deletion. [Compliance](https://schoolai.com/trust/compliance) lists its current status and ESSA Tier 3 evidence; replaced the earlier Tier 4 description and avoided calling FERPA/COPPA government certifications.
- SchoolAI page title/OG/Twitter title now use the requested K–12 tutor/platform comparison wording. Its header and source-check dates are November 3, 2026, with direct primary-source links. Existing SVG FAQ chevrons and FAQPage JSON-LD were retained; structured answers were regenerated to match the visible answers exactly.
- Every comparison page (including the comparison index) now contains the homepage's full, static footer links. The layout is shared through assets/footer.css and stays present without JavaScript.

Validation: local links and shared footer markup checked across the homepage and all five comparison pages; all 18 footer links remain present in static HTML. Browser checks passed for those six pages at desktop and phone widths; SchoolAI also passed at 320 and 820 pixels. All six SchoolAI FAQ disclosures and the mobile menu work, with no runtime errors. Homepage, SchoolAI, and edited MagicSchool FAQ schemas match the visible answers. Table row labels now use semantic row headers and remain visible on phones instead of being hidden. Shared stylesheet references are versioned for the site's immutable asset cache. git diff --check passed.

## Brand kit rollout — November 7, 2026

- All 19 HTML pages, including 404, load the shared brand stylesheet last. The
  supplied forest/pine/cream/night/mint colors anchor the brand artwork, with
  coral actions, teal details, and gold/mint supporting panels. UI uses
  self-hosted Inter; taglines use Lora Italic 400. The Inter
  license is retained alongside the font. No third-party font requests are added.
- Headers and footers use the kit's actual small SVG wordmarks. Interior heroes
  retain the site's colorful orbital backgrounds. Favicons, Apple touch icons, and the
  new web manifest use the kit exports. All 18 shareable pages have their own
  1200×630 social card, with SVG source and PNG delivery files.
- The homepage's featured lockup uses geometry and timing generated directly
  from `OrchenMark.tsx`. It starts still, pauses offscreen/in background tabs, and
  resets to the exact still geometry when reduced motion is enabled. A supplied
  still image remains visible without JavaScript. The site stays buildless.
- Validation: all 19 pages checked in Chrome at 320 and 1440 pixels; homepage
  additionally checked at 390 and 820 pixels. Updated homepage, Trust, and parent
  layouts rechecked at all four widths. No horizontal overflow, overlapping
  header controls, failed asset requests, or JavaScript errors. Mobile menus,
  font loading, reduced-motion switching, offscreen animation pausing, local
  links/assets, social images, and manifest icons checked. No forms submitted.
  Branding changes preserve product screenshots, policy text, and FAQ content.

Color revision after founder feedback: the initial rollout made the site too
muted. Restored white surfaces, coral calls to action, pale-gold highlights, mint
panels, and teal details, keeping the new logos, forest-green accents, typography,
icons, and social cards. The revision stays on the same branding branch. Primary
coral buttons have 5.2:1 contrast with white text. Rechecked all 19 pages at phone
and desktop widths, plus homepage tablet widths, menus, assets, and motion.

## Decorative backgrounds — November 7, 2026

- Added a fine dot field and sparse connecting lines behind content on all 19
  pages, including comparison, legal, role, resource, and trust subpages. The
  homepage's existing news-wall hero is retained. A shared stylesheet and small
  SVG mask provide static decoration using each section's existing text color.
- Existing colors, section fills, typography, copy, and spacing are unchanged.
  The layers ignore pointer input, are hidden from assistive technology, and
  disappear in print. Content cards and screenshots remain above the pattern.
- Chrome checks passed at 320 and 1440 pixels for all 19 pages, including mobile
  menus, asset loading, overflow, and runtime errors. A comparison with the layers
  removed confirmed identical colors, background fills/images, fonts, sizes, and
  positions for 1,053 existing content elements. Print suppression also passed.

## Flint comparison and consistency fixes — November 10, 2026

- Added `compare/orchen-vs-flint.html`, built on the SchoolAI page's structure, with a card on the comparison index and a sitemap entry. Flint claims come from Flint's own pages, read November 10, 2026: [school leaders](https://flintk12.com/school-leaders), [pricing](https://flintk12.com/pricing), [parents](https://flintk12.com/parents), [sessions and monitoring](https://flintk12.com/features/sessions-and-monitoring), [grading and analytics](https://flintk12.com/features/grading-and-analytics), [Sparky behavior and safety](https://flintk12.com/features/sparky-behavior-and-safety), and [security](https://flintk12.com/security). Orchen cells reuse wording already published on the other comparison pages, the homepage FAQ, and the platform page.
- **Founder to confirm before merging:**
  1. *Flint retention.* The page says Flint's security page does not state a retention window for conversations. This is a statement about an absence; re-read the security page and its privacy policy.
  2. *Flint student profiles.* The page says Flint refreshes a per-student learning profile weekly from sessions across classes, and that a dedicated advisor view is not documented.
  3. *Flint pricing.* The page says school plans are priced by number of users and published on Flint's site. Dollar figures are not repeated; decide whether the pricing row should quote them.
  4. *Orchen teacher view.* The row describes assignment review as documented on the teacher page. Update it as the teacher view changes.
- The new page uses the shared `assets/social/compare.png` card. A dedicated card and a footer link across all pages were left out to keep this change small.
- Pilot scope now reads the same everywhere (one class, about six weeks, free), following the November 3 founder direction. Updated the heads-of-school "What are we committing to?" answer and the founding-schools "We ask" cell, path diagram, and step 4.
- Removed the "Learning Style" percentage bars from the teacher-page mock and the matching phrases elsewhere. The current product insight view (`shot-teacher-insight-glance.webp`) has no such panel, and the bars summed to 30%. Alt text for that screenshot on the heads-of-school and how-it-works pages now describes what the image shows.
- The two homepage links that sent general visitors to the architecture page (`/platform/`) now point to `/how-it-works/`. The platform page and footer links are unchanged.
- **Not changed:** the standards screenshots on the homepage and heads-of-school page (reshoot noted in `SHOT-LIST.md`).
