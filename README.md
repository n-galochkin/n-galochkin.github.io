# n-galochkin.github.io

Personal portfolio — Nikita Galochkin, Senior Unreal Engine Programmer.

Live: <https://n-galochkin.github.io/>

## Structure

- `index.html` — single self-contained page (CSS + JS inlined).
- `media/` — project screenshots, grouped by title.
- `media/og-cover.jpg` — 1200×630 social preview image (used by LinkedIn / Twitter / Telegram / etc.).
- `.nojekyll` — disables Jekyll processing so GitHub Pages serves files as-is.

## Deploy

Push to the `main` branch of the `n-galochkin.github.io` repo.
In **Settings → Pages**, set:

- **Source:** Deploy from a branch
- **Branch:** `main` / `(root)`

GitHub Pages will rebuild on every push. First deploy takes ~1 minute.

## Refreshing the LinkedIn link preview

LinkedIn caches link previews for ~7 days. After deploying:

1. Open <https://www.linkedin.com/post-inspector/>
2. Paste `https://n-galochkin.github.io/` and click **Inspect**.
3. The card refreshes — now any new post will use the updated preview.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
