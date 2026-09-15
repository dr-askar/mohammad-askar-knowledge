# Ophthalmology content model

`articles.json` is the editorial source for the static ophthalmology pilot. It contains newly written summaries, not NotebookLM transcripts or copied source documents.

Each article requires a stable `slug`, German `title`, controlled `category`, `summary`, clinical `takeaway`, separate `professional` and `patient` sections, oral-exam `questions`, local NotebookLM `sourceKeys`, review `status`, `lastReviewed`, and `readingMinutes`.

Review states:

- `draft`: incomplete editorial work.
- `medical-review`: structurally complete but not medically approved and not publishable.
- `approved`: explicitly reviewed by Mohammad and eligible for `--publish`.

Preview locally with `node tools/build-ophthalmology.mjs`. Validate with `node tools/validate-ophthalmology.mjs`. The publisher must never change a status automatically.

The remaining NotebookLM Studio reports are curated through `content/ophthalmology/topic-groups.json`. Regenerate the mapping with `node tools/generate-topic-groups.mjs`, merge authored batches with their dedicated merge tool, build with `node tools/build-curated-ophthalmology.mjs`, and validate with `node tools/validate-curated-ophthalmology.mjs`. Only immediate `*/Studio/*.md` files are eligible; source-reference, README, and website-index markdown files are excluded. Reports without a sufficiently redacted German chapter remain in the local `pending-redaction` audit and are not rendered publicly.
