# AGENTS.md — Project Instructions

## Project purpose

This repository contains the public multilingual professional website and ophthalmology knowledge base of **Mohammad Askar**. The site should present his clinical background, research, publications, and evidence-based learning notes in a clear, credible, and accessible form.

The intended audiences are ophthalmologists, researchers, medical educators, employers, colleagues, and learners who read Arabic, German, or English.

## Current architecture

The project is a lightweight static website deployed with GitHub Pages.

- `index.html`: page structure and visible professional content
- `assets/style.css`: responsive layout, typography, colour system, RTL support, and dark mode
- `assets/app.js`: translations, language switching, topic filtering, and theme preference
- `.github/workflows/static.yml`: GitHub Pages deployment
- `.github/ISSUE_TEMPLATE/`: structured content feedback
- `README.md`: public project overview

Preserve this simple static architecture unless a larger content collection clearly requires migration. Do not introduce a framework, package manager, backend, database, analytics service, cookie banner, or external CMS without explicit approval.

## Identity and professional facts

Use the name **Mohammad Askar** consistently.

Verified qualifications include:

- Specialist in Ophthalmology / Facharzt für Augenheilkunde
- PhD in Ophthalmology, focused on artificial intelligence in keratoconus diagnostics
- MSc in Quality
- MRCS Edinburgh, written as **MRCS Ed**
- ICO/FICO qualifications
- German medical licence obtained in December 2023
- German recognition as a specialist in ophthalmology in July 2026
- Clinical interests: retina, glaucoma, ophthalmic surgery, cornea, artificial intelligence, and evidence-based medicine
- Languages: Arabic, German, and English

Never change **MRCS Ed** to “MRCO”. Do not use the German academic title **Dr. med.** unless it is explicitly confirmed later. Distinguish the PhD degree from a German Dr. med.

When updating dates, qualifications, positions, publications, or operation counts, verify them against a primary document or an explicit instruction from Mohammad before publication.

## Privacy and safety

This is a public repository. Never commit or publish:

- home address
- private telephone number
- date of birth
- nationality or residence documents
- passport or identity documents
- salary documents
- full certificate or employment-reference scans
- authentication tokens, API keys, passwords, private URLs, or connector credentials
- patient information, clinical images, or case details that could identify a patient

Professional email and social links may be displayed only when Mohammad explicitly approves them for public use.

Do not copy metadata or hidden personal data from PDFs into the website. If a certificate is referenced, publish only the verified qualification name, issuing body, and year—not the scan.

## Multilingual content

The website supports:

- Arabic: `ar`, right-to-left
- German: `de`, left-to-right
- English: `en`, left-to-right and currently the default

For all core profile and navigation content:

1. Maintain semantically equivalent Arabic, German, and English versions.
2. Preserve medical meaning rather than translating word-for-word.
3. Use established medical terminology in each language.
4. Ensure Arabic switches the document to `dir="rtl"`.
5. Do not mix German or English UI labels into Arabic text unless the term is an unavoidable recognised abbreviation.
6. If a knowledge article is unavailable in a language, show its actual language availability. Do not imply that a translation exists.

Arabic prose should be clear Modern Standard Arabic. German should be professional and natural, not a literal translation. English should use consistent international medical terminology.

## Medical knowledge standard

Every medical note must separate **what a study found** from **how trustworthy and clinically important the evidence is**.

For a new paper, guideline, systematic review, or clinical topic:

1. Identify the study or evidence type first.
2. Use an appraisal method appropriate to that design.
3. State the clinical question and relevant population.
4. Report the intervention, comparator, outcomes, follow-up, and key numerical results when available.
5. Examine randomisation, masking, missing data, selective reporting, confounding, spectrum bias, and other design-specific risks.
6. Examine effect size, confidence intervals, multiplicity, power, and the difference between statistical and clinical significance.
7. Distinguish surrogate or anatomical outcomes from patient-important outcomes.
8. Discuss applicability to ophthalmic practice and whether the evidence should change practice.
9. State important limitations and uncertainty directly.
10. Compare conclusions with major guidelines or high-quality evidence when relevant.

Prefer primary and reliable sources:

- peer-reviewed original research
- systematic reviews and meta-analyses
- recognised professional guidelines
- trial registries
- PubMed, DOI, journal, or official organisation pages

Do not use blogs, unsourced summaries, press releases, or general news as the principal medical evidence.

Each published knowledge item should include, where applicable:

- title
- specialty category
- language availability
- concise clinical takeaway
- evidence type
- source citation with DOI or PubMed link
- key quantitative result
- evidence strengths
- evidence limitations
- clinical relevance
- publication date
- last-reviewed date
- reading time

Never present educational content as individual medical advice. Keep the medical disclaimer visible.

## Content taxonomy

Use stable categories:

- Retina
- Glaucoma
- Cornea
- Cataract and anterior segment
- Neuro-ophthalmology
- Strabismus
- Oculoplastics and orbit
- Ophthalmic surgery
- Imaging and diagnostics
- Artificial intelligence
- Evidence reading / Critical appraisal

Add a new category only when several articles require it. Avoid duplicate or overlapping tags.

## Editorial style

Write for medically informed readers while remaining readable.

- Lead with the clinically useful conclusion.
- Use short paragraphs and descriptive headings.
- Avoid promotional claims, inflated expertise, and vague statements.
- Define uncommon abbreviations on first use.
- Preserve exact study names, drug names, outcome measures, and units.
- Use cautious language that matches certainty.
- Do not claim that an intervention is effective or practice-changing when evidence supports only association, anatomical change, non-inferiority under limited conditions, or exploratory findings.
- Correct factual or translation errors transparently.

## Design and accessibility

Maintain the current visual direction: academic, modern, calm, and ophthalmology-oriented.

- Preserve responsive behaviour on mobile and desktop.
- Maintain readable contrast in light and dark modes.
- Keep body text at least 16 px.
- Support keyboard navigation and visible focus states.
- Provide meaningful alternative text for informative images.
- Avoid unnecessary animations and respect reduced-motion preferences.
- Test Arabic layouts for clipping, alignment, and mixed-direction text.
- Do not add decorative imagery that distracts from the professional or educational purpose.

## Daily update routine

Use this small publishing loop:

1. Capture a paper, clinical question, or correction in a GitHub Issue.
2. Label it by specialty and status.
3. Verify the source and extract the key clinical question.
4. Draft the note in its strongest working language.
5. Perform the evidence appraisal before writing the conclusion.
6. Add citations, evidence limitations, and a last-reviewed date.
7. Add translations progressively.
8. Review privacy, medical accuracy, spelling, links, RTL behaviour, and mobile layout.
9. Commit with a focused message.
10. Confirm that the GitHub Pages workflow succeeds.

Do not publish automatically generated medical text without a human review.

## GitHub workflow

- Keep `main` deployable.
- Prefer small, focused commits.
- Use Issues for content ideas, corrections, references, and translation feedback.
- For substantial changes, use a feature branch and pull request.
- Link changes to the relevant Issue.
- Do not rewrite repository history or force-push unless explicitly requested.
- Preserve unrelated existing work.
- Do not delete legacy files merely because they appear unused; confirm first.
- Do not commit generated secrets, local environment files, editor caches, or private source documents.

Suggested commit prefixes:

- `content:` medical or profile content
- `i18n:` translation changes
- `design:` visual and accessibility work
- `fix:` defect correction
- `docs:` repository documentation
- `ci:` GitHub Pages workflow

## Validation before every public update

Confirm all of the following:

- The page loads without missing local assets.
- JavaScript has no syntax errors.
- Arabic, German, and English switching works.
- Arabic uses RTL and remains readable.
- Topic filters and dark mode work.
- Mobile layout has no horizontal overflow.
- Links use HTTPS and point to the intended source.
- Medical claims have suitable references and calibrated certainty.
- No personal, patient, or credential secrets are present.
- GitHub Pages deployment completes successfully.

If any identity, privacy, medical, or publishing decision is uncertain, leave the content unpublished and open an Issue describing the exact uncertainty.
