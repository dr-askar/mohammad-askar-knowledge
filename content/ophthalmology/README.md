# Ophthalmology content model

`articles.json` is the editorial source for the static ophthalmology pilot. It contains newly written summaries, not NotebookLM transcripts or copied source documents.

Each article requires a stable `slug`, German `title`, controlled `category`, `summary`, clinical `takeaway`, separate `professional` and `patient` sections, oral-exam `questions`, local NotebookLM `sourceKeys`, review `status`, `lastReviewed`, and `readingMinutes`.

Review states:

- `draft`: incomplete editorial work.
- `medical-review`: structurally complete but not medically approved and not publishable.
- `approved`: explicitly reviewed by Mohammad and eligible for `--publish`.

Preview locally with `node tools/build-ophthalmology.mjs`. Validate with `node tools/validate-ophthalmology.mjs`. The publisher must never change a status automatically.
