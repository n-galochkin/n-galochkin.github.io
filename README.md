# n-galochkin.github.io

Personal portfolio — Nikita Galochkin, Senior Unreal Engine Programmer.

Live: <https://n-galochkin.github.io/>

## Structure

- `index.html` — single self-contained page (CSS + JS inlined).
- `media/` — project screenshots, grouped by title.
- `.nojekyll` — disables Jekyll processing so GitHub Pages serves files as-is.

## Deploy

Push to the `main` branch of the `n-galochkin.github.io` repo.
In **Settings → Pages**, set:

- **Source:** Deploy from a branch
- **Branch:** `main` / `(root)`

GitHub Pages will rebuild on every push. First deploy takes ~1 minute.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
