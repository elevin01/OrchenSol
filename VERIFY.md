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

- **Domain:** `orchen.ai` is the live production domain. All canonical URLs, OG tags, JSON-LD, and sitemap entries use `https://orchen.ai/`. The `robots.txt` still references `orchen.co` — update that file before going live.

- **"/solutions/heads-of-school" link:** This URL does not exist yet. All four compare pages link to it. Create the page before publishing, or update the links to point to an existing page in the interim.

- **Orchen feature claims:** All Orchen claims (7-day deletion, 5-tier parent model, MacBook + Jamf + Cloudflare, weekly narratives) are taken directly from the product brief. Confirm each is accurately implemented before publishing — these are marketing claims that will be scrutinized.
