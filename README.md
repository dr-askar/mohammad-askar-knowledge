# Mohammad Askar — Ophthalmology & Knowledge

Multilingual professional profile and ophthalmology knowledge base by Mohammad Askar.

## Features

- Arabic, German, and English interface
- Professional profile and career timeline
- Selected publications
- Filterable ophthalmology knowledge cards
- Responsive layout and dark mode
- GitHub issue template for evidence-based feedback

## Ophthalmology knowledge pilot

The local branch contains a German-first pilot generated from structured, medically unapproved drafts. Raw NotebookLM source text and full transcripts remain outside this public repository. The public-facing pages are learning summaries assembled from multiple lectures and supplementary sources; they are intended for physician education and exam preparation only, not for individual medical advice. Rights in original lectures, videos and slides remain with their respective rights holders.

```bash
node tools/build-ophthalmology.mjs
node tools/validate-ophthalmology.mjs
node tools/build-source-attributions.mjs
node tools/build-release.mjs
node tools/validate-release.mjs
```

The normal ophthalmology build is a local preview and includes `draft` and `medical-review` records with `noindex`. The release build always creates a clean `_site` artifact; only entries that pass the internal `content/ophthalmology/release-register.json` gates can be copied into it. Patient-facing panels, raw JSON, source exports, audit files and tools are never part of `_site`.

## Release register and first charge

The register covers all 230 source records (20 ophthalmology articles plus 210 curated lecture groups). Mohammad Askar documented human medical approval and confirmed the independent-rewrite basis for this exact 230-record scope on 2026-09-16. All 230 records are marked approved. The generated attribution index contains the available title, lecturer/author or a transparent missing-data reason, publisher/channel, verified `https` URL or a transparent missing-URL reason, source type and access date for every chapter. It is generated from 53 local source manifests plus the curated topic-source mapping; unknown metadata is never guessed.

Run `node tools/build-release.mjs --publish` only after the legal pages are complete. It fails closed if any publish gate is missing. `node tools/validate-release.mjs` checks the register count, exact attribution coverage, artifact allowlist, multilingual notice, absence of patient panels/external fonts, canonical and relative links, release metadata, and crawler metadata.

## Private source → public `dr-askar/knowledge` model

Keep this working repository private and treat `dr-askar/knowledge` as a separate public Pages repository. A human reviewer starts the `Build reviewable release artifact` workflow from the approved source revision. The workflow builds and validates `_site`, then uploads only that directory as a reviewable artifact; it deliberately does not deploy this private repository's Pages environment. A separate, owner-controlled sync process must review the artifact diff and copy it to `dr-askar/knowledge`, where the public repository's own Pages configuration can publish it. No token, permission, or cross-repository secret is invented here; use only a narrowly scoped GitHub credential supplied by the owner.

An example Pages workflow for the separate public repository is documented at [`docs/examples/public-pages.yml`](docs/examples/public-pages.yml). It is not active in this private source repository and must be copied only after the reviewed `_site` contents have been synchronized to the public repository root.

The Impressum and privacy notice contain the public provider details supplied or expressly approved by the site owner. They have not been independently legally reviewed.

## Privacy

Certificate scans, home address, date of birth, nationality, and other sensitive personal documents are intentionally excluded.

## Medical disclaimer

Educational content only. It does not replace individual medical assessment or treatment. Source attribution does not imply endorsement, cooperation or recommendation.
