# Research copy audit

Reviewed October 5, 2026. This is a curated update, not a systematic review.
Homepage cards link indirectly through the existing research CTA; the research and brief pages link to original sources. Keep the six existing research sections and six brief cards.

| Source | Publication / status | Editorial guardrail |
|---|---|---|
| [Harrison et al.](https://arxiv.org/abs/2609.14789) | September 13, 2026; preprint | Preliminary GCSE revision trial. Report attrition and assessment limits beside the result; do not claim proven effectiveness. |
| [Liu et al.](https://edworkingpapers.com/ai26-1598) ([full paper](https://edworkingpapers.com/sites/default/files/ai26-1598.pdf)) | October 2026; working paper | Grade estimate is the same-course comparison. Access intervention, mostly direct-instruction mode; low uptake. Not a general estimate for Socratic tutoring or K–12. |
| [Bastani et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/) | June 25, 2025; peer-reviewed PNAS | Relative reduction in unaided exam performance, not percentage points. Safeguarded tutor removed the loss but did not establish an exam improvement. |
| [College Board](https://research.collegeboard.org/media/pdf/ai-research-brief-3-vf.pdf) | February 2026; faculty survey, Figure 10 | Attitudes of higher-education faculty, not measured cognitive decline. |
| [RAND](https://www.rand.org/pubs/research_reports/RRA4742-1.html) | March 17, 2026; December 2025 survey | General beliefs and reported use across ages 12–29; neither measures personal skill loss or dependence. |
| [OECD](https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html) | January 19, 2026; evidence review | Supports evaluation and teaching goals, not an endorsement of Orchen. |
| [Kosmyna et al.](https://arxiv.org/abs/2506.08872) | June 2025; revised December 31, 2025; preprint | Small adult essay-writing EEG study. No inference of permanent brain injury or child-development effects. |

## Corrections

- Removed the claim that 95% of all student-AI sessions complete assigned work. [The original Education Week reporting](https://www.edweek.org/technology/real-time-data-shows-exactly-how-students-use-ai-on-school-technology/2026/03) says this was the share of deflected queries; roughly 80% of all conversations were within district policy. Corrected the repeated claim on the heads-of-school page and in the downloadable brief.
- Removed unsupported universal claims about dependency, fastest-ever adoption, tool choice for evading detection, and the prevalence of school bans.
- Replaced older population-level NAEP/PISA headline blocks with AI-specific trials. General achievement trends cannot establish an AI effect.
- Replaced unrelated news screenshots and sensational headlines on the homepage with attributed research cards. Kept the existing card geometry and hero copy.
- Synchronized the brief PDF with the web edition. Original sources are linked in both.

These studies concern other interventions. Do not describe them as Orchen efficacy evidence.

## Updating the download

Run `python scripts/generate-policy-brief.py` after editing the brief HTML. The generator requires ReportLab and DejaVu fonts under `/usr/share/fonts/truetype/dejavu`. It reads the six evidence cards, three policy options, disclosure, and twelve checklist items directly from the web edition. Render and inspect all PDF pages before committing the result.
