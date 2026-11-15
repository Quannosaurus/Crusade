# Crusade Training Book

Personal training app (calisthenics, mobility, running). Runs fully in the browser; all training data stays in the local storage of the device. No backend, no tracking, no external requests.

Live: https://quannosaurus.github.io/Crusade/

## Develop
- Sources: `src/` (`head.html`, `pics.js`, `app.js`, icons, fonts)
- Build: `python3 tools/build.py` – writes the PWA into the repo root (served by GitHub Pages) and `.build/index.html` for tests
- Test: `npm install && npx playwright install chromium`, then `sh tests/run.sh`
- Files in the repo root are generated – edit `src/` instead.

See `CLAUDE.md` for architecture and rules.
