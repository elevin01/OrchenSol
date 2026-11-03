# VERIFY.md — Remaining unresolved claims

Last verified against primary sources: April 24, 2026.

All other `[VERIFY]` markers in the compare pages have been resolved and removed.
The four items below remain open — confirm before publishing.

---

## 1. SchoolAI — dedicated longitudinal advisor/counselor reporting

**File:** `compare/orchen-vs-schoolai.html`
**Location:** Table row "Insight output for advisors"; FAQ "Can advisors or counselors see longitudinal student patterns?"
**Claim to confirm:** Whether SchoolAI's Mission Control offers dedicated cross-subject, longitudinal reporting for advisors or counselors (as distinct from subject teachers monitoring their own Spaces in real time).
**Status:** Mission Control is confirmed for real-time teacher oversight within Spaces. Advisor/counselor cross-subject longitudinal view is not publicly documented.

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
