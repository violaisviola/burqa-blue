# Burka Blue — Demo v0.1

A pure-text interactive fiction prototype.

## Current scope

- Day 1 only
- Chinese text
- Choice Tree based on the current v0.1 design
- Money / Energy / relationship / independence / risk state
- Memory flags
- Fajr, Dhuhr, Asr, Maghrib and Isha as time/life events
- Browser localStorage save
- Restart
- Debug State panel

## Files

- `index.html` — interface
- `style.css` — visual style
- `game.js` — game state, scenes and choices

## Run locally

Open `index.html` directly in a modern browser.

For a more reliable local development environment, run a simple static server:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## GitHub Pages

1. Create a GitHub repository, for example `burka-blue`.
2. Upload `index.html`, `style.css`, `game.js`, and `README.md`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

GitHub will provide a public Pages URL.

## Important

This is a prototype, not a factual simulation of every Afghan woman's life. The narrative intentionally uses fictional characters and compresses real-life circumstances for interactive storytelling. The game should be developed with continued fact-checking as the setting becomes more specific.
