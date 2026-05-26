# Scrolls — Article Workflow

This folder holds long-form writings linked from the **VI · Scrolls** section
of the main site. Every article is a single self-contained HTML file built
from `_template.html`. No build step, no Jekyll — push and it ships.

## Publishing a new article

1. **Copy the template**
   ```
   cp articles/_template.html articles/2026-05-26-boss-encounter.html
   ```
   Filename convention: `YYYY-MM-DD-slug.html` (chronological in `ls`, no
   ambiguity if you ever rename).

2. **Edit the article file**
   - Update `<title>`, meta description, and `<link rel="canonical">`
   - Fill in the front-matter block (folio number, title, deck, date,
     read time, tags)
   - Write the body inside `<div class="prose">`

3. **Link it from the main page**
   - Open `index.html`, find the matching `.scroll-card.forthcoming`
     placeholder in the `#scrolls` section
   - Drop the `forthcoming` class
   - Change `<a class="scroll-card">` to include `href="articles/<your-file>.html"`
   - Replace title, excerpt, tags, folio number, and date
   - Delete the `<div class="scroll-forthcoming-stamp">Forthcoming</div>` line

4. **(Optional) Cross-post**

   Recommended targets for gamedev writing:
   - **dev.to** — paste into their editor, set canonical URL to the
     `ngalochkin.github.io/articles/...` link in front matter
   - **Habr** — Russian-speaking audience; same canonical trick
   - **Medium** — use "Import a story" with your URL; Medium auto-sets
     the canonical for you
   - **Reddit r/gamedev, LinkedIn** — link posts, not full reposts

   Then add the mirror URLs to the `.mirrors` block in the article footer.

## Why this setup

- **SEO stays on your domain.** Canonical links on cross-posts mean
  Google credits ngalochkin.github.io, not Medium.
- **Design stays consistent.** Articles inherit the codex aesthetic —
  no generic platform chrome around your writing.
- **No platform risk.** If dev.to or Medium changes policy, your articles
  still live here.
- **Analytics included.** The GoatCounter snippet is in the template, so
  every article reports views to the same dashboard as the main site.
