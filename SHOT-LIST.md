# Orchen — Product Screenshot Shot List

A capture + placement plan for the real product screenshots. Goal: replace placeholder/hand-built visuals with clean, real, on-brand shots, leading with the product. Pairs with the `.stage` / `.shot-frame` components already built into the site.

---

## Naming convention

Save finals to `/assets/` using: `shot-<area>-<screen>.png` (e.g. `shot-student-socratic.png`).
Areas: `student`, `teacher`, `parent`, `compare`.
Keep an **un-annotated master** of every shot; add callouts on a copy named `...-annotated.png`.

---

## Global production checklist (applies to every shot)

- **One frame.** Full-window shots keep the app sidebar; spotlight crops cut tight to a single module, no sidebar. All live inside the same browser-chrome stage.
- **Consistent capture.** 2× / retina, same browser zoom, same window width (~1440), same corner radius, same light background.
- **Clean the data before shooting** (a sharp buyer will notice):
  - No rows reading `tentative · 0 demonstrated · 1 in progress · 5 not yet touched`. Feature classes/students with a real mix (the cleaned **linear equations** row is the model).
  - Fix the parent digest contradiction: `TIME THIS WEEK —` next to `SESSIONS 9`. Show a real time value.
  - Engagement heatmap: the "Morning" column is fully empty across every row — pick a student with some morning activity, or it reads as missing data.
  - Avoid internal bucket names in featured crops ("Math core", "Class review") — prefer real concept names.
  - Prefer a student with richer `avg response length` than 8 words for hero stats.
- **Annotate sparingly.** 1–3 callouts max, only on dense dashboards.
- **Motion where it shows behavior.** The Socratic loop and the ChatGPT-vs-Orchen contrast should be short muted loops (the stage accepts `<video>` in place of `<img>` — one-line swap).

---

## Build order (priority)

1. **Socratic chat** (student) — the hero; capture as a loop.
2. **ChatGPT vs Orchen** pair (compare) — you already have both halves.
3. **Parent weekly digest** (parent) — biggest single upgrade.
4. **Class Insights**, cleaned (teacher).
5. **Student insight + "inferred from" tooltip** (teacher/advisor).
6. **Ask about your child's learning** + **parent guide** (parent).
7. **Mood picker, learning profile, document templates, flashcards** (platform/feature spotlights).
8. **Crisis-flag notification** (trust/advisor).

---

## Hero / cross-site

| Screen | Slot | Crop | Callouts | Replaces |
|---|---|---|---|---|
| **Socratic chat — phone-plan word problem** (student derives `30 + 0.10t = 45`, flashcard toast) | Homepage hero loop (if you reopen the homepage); otherwise How-It-Works Layer 01 hero | Full chat column, include the flashcard toast | "Asks the next question — never hands over the answer" · "Auto-builds flashcards from the session" | `product-student-chat.png` |

---

## /compare/* (the differentiator pair)

| Screen | Slot | Crop | Callouts | Replaces |
|---|---|---|---|---|
| **Orchen — "Why is the sky blue"** (asks what you already know) | Left of a side-by-side stage | Chat column | "Orchen asks first" | new |
| **ChatGPT — same prompt** (dumps Rayleigh scattering) | Right of the same stage | Chat column | "ChatGPT just answers" | new |

> Present as one two-up stage (`stage--duo`). This is the single most persuasive asset for the compare pages.

---

## /for/parents (rebuild almost entirely on real shots)

| Screen | Slot | Crop | Callouts | Replaces |
|---|---|---|---|---|
| **Parent weekly digest** (narrative: "built and solved equations from word problems — the step most students skip") | Hero stage | Full digest incl. stat cards + subject-mix bar | "A weekly story, not a transcript" | `product-parent-digest.png` **and** the hand-built digest card |
| **Ask about your child's learning** (chat popup) | Feature stage | The popup, tight | "Ask the AI anything about your child's week" | new |
| **Parent assignment guide** ("What this covers / Where Maya is / How you can support") | Feature spotlight | The expanded card | "Every assignment, explained for you" | new |
| Visibility ladder (already built in CSS) | Keep | — | — | — |

---

## /for/teachers

| Screen | Slot | Crop | Callouts | Replaces |
|---|---|---|---|---|
| **Class Insights** (concept distribution + students needing attention, cleaned) | Hero stage | Main column + stat sidebar | "See the gaps before the test, not after" | `product-teacher-assignments.png` (current hero) |
| **Student insight** (Maya/Daniel: narrative, trends, concept mastery) | Feature stage | Full profile | inset the **"Inferred from 1 session, 0 quiz attempts, 7 flashcards"** tooltip | reinforces existing |
| **Assignment table** (status · active time · exchanges) | Feature spotlight | The table | "Active time + exchanges — understanding, not surveillance" | new |
| Writing workspace | Keep | — | — | keep `product-writing-workspace.png` |
| **Document Templates** grid | Feature spotlight | The card grid | "Lesson plans, rubrics, exit tickets — drafted in seconds" | upgrades hand-built tpl-grid |

---

## /for/advisors

| Screen | Slot | Crop | Callouts | Replaces |
|---|---|---|---|---|
| **Student insight** (cleaned) | Hero stage | Full profile | — | reinforces existing |
| **Engagement heatmap + What's changed** | Feature spotlight | Heatmap + "what's changed" card | "85% recent (was 60%)" | new |
| **Crisis-flag notification** | Feature spotlight | The popup | "Concerning content routes to your counselor within 24h" | new |

---

## /trust

| Screen | Slot | Crop | Callouts | Replaces |
|---|---|---|---|---|
| **"Inferred from…" tooltip** on a concept chip | Spotlight in the security/insight section | Tight on the chip + tooltip | "Every insight is traceable to its evidence" | adds proof to icon cards |
| **Crisis-flag notification** | Spotlight in the safety section | The popup | "Flagged, routed, logged" | adds proof |

---

## /platform (feature spotlights, cropped tight)

| Screen | Section | Callouts |
|---|---|---|
| Socratic chat | The Student Experience | "Guides through questions, not answers" |
| Writing workspace (keep) | The Student Experience | rubric-aware feedback |
| **Study-mood picker** (Crunch Time / Deep Dive / Unstuck…) | The Student Experience | "Adapts the session to how they need to work today" |
| **Learning Profile / "Deep Thinker" archetype** | The Student Experience | "A private read on how each student thinks" |
| Class Insights | The Insight System | "Structured insight, computed nightly" |
| Document Templates | (teacher tools) | — |
| Flashcards (mobile) | The Student Experience | "Concepts extracted automatically, graded semantically" |

---

## /how-it-works

| Layer | Shots |
|---|---|
| Layer 01 · The AI Environment | Socratic chat (loop) · study-mood picker · flashcards |
| Layer 02 · The Insight Layer | Student insight · parent weekly digest · class insights |

---

## /solutions/heads-of-school

Swap the three existing stage shots to cleaned versions:
- **Students** → Socratic chat
- **Faculty** → Class Insights / student insight
- **Parents** → parent weekly digest

---

## Notes

- Homepage left as-is per your call. If reconsidered, the Socratic loop is the obvious hero.
- `the-problem` uses data-viz (no product shots) — unchanged.
- Once finals land in `/assets/`, swapping a stage from image to video is a one-line change (`<img>` → muted autoplay `<video>`).
