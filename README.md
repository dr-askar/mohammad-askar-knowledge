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

The local branch contains a German-first pilot generated from structured, medically unapproved drafts. Raw NotebookLM source text and full transcripts remain outside this public repository.

```bash
node tools/build-ophthalmology.mjs
node tools/validate-ophthalmology.mjs
```

The normal build is a local preview and includes `draft` and `medical-review` records with `noindex`. A future publish build uses `node tools/build-ophthalmology.mjs --publish` and includes only records explicitly marked `approved`. Generated medical text must be reviewed by Mohammad before that status is assigned.

## Privacy

Certificate scans, home address, date of birth, nationality, and other sensitive personal documents are intentionally excluded.

## Medical disclaimer

Educational content only. It does not replace individual medical assessment or treatment.
