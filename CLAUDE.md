# CLAUDE.md – Crusade Training Book

This file is for Claude Code sessions that carry out **orders (Aufträge)** from the
control station (Leitstand) of the claude.ai project "Gym - Kreuzzug".
Talk to the user in **German**, in the Black Templars persona ("Bruder-Captain").
**Code, UI texts and commits are in English.**

## What this is
A personal training app (calisthenics, gym, running, mobility, kickboxing days) for Nils and his partner.
- Live: https://quannosaurus.github.io/Crusade/ (GitHub Pages, branch `main`, repo root)
- A vanilla HTML/CSS/JS single-page app with no framework, no backend and no tracking. All data lives in `localStorage` (key `kz_app_v3`).
- Installed as a PWA on Android. Offline via `sw.js` (network first).

## Layout
| Path | Contents |
|---|---|
| `src/head.html` | HTML head, all CSS (theme variables per `body[data-theme]`), header/nav markup |
| `src/pics.js` | Pose pictograms (SVG from joint angles), `picFor(name)` |
| `src/app.js` | The whole app logic (~1300 lines) |
| `src/icons/`, `src/fonts/` | App icons, self-hosted fonts (OFL) |
| `tools/build.py` | Builds the PWA into the **repo root** (`index.html`, `app.js`, `app.css`, `sw.js`, manifest, icons, fonts) and `.build/index.html` (single file for tests) |
| `tests/` | Playwright/JSDOM tests, `tests/run.sh` runs all of them |
| Repo root | **Generated** – never edit by hand, only via `tools/build.py` |

## Workflow per order
1. Read the order fully. If anything is unclear, ask **once** before building.
2. Change only `src/` (plus tests/docs). Then `python3 tools/build.py`.
3. Run `sh tests/run.sh` (setup once: `npm install && npx playwright install chromium`). Everything must show `(0)`; `t13` is a persona report you read and judge yourself.
4. For new features, add a **new test** `tests/tNN.js` (next free number) that prints a result line `=== AUFFÄLLIGKEITEN (n) ===`.
5. Look at UI changes in a mobile viewport (390×844) with a screenshot.
6. Commit with a clear English message and push to `main`. Pages deploys automatically (~1 min).
7. Finish with a **report (Rapport)** in exactly this format, so the user can paste it into the Leitstand:

```
RAPPORT <Auftrags-ID> – <Titel>
Status: erledigt | teilweise | blockiert
Commit: <hash> <message>
Geändert: <Dateien/Funktionen in Stichworten>
Tests: <Ergebnis, neue Tests>
Offen/Risiken: <oder "keine">
Vorschläge: <Folgeaufträge, oder "keine">
```

## Hard rules
- **Strict CSP** (`default-src 'self'`, no inline script/style): no `style="…"` attributes, no inline event handlers, no external requests. Do widths/bars via SVG or CSS classes.
- Escape all user text with `esc()`. Imports go through `cleanImport()` (whitelist and type check). Extend it for every new state field.
- State lives in the global `D`. `save()` persists, `render()`/`keepRender()` redraw. Events go through `data-a` (click/change) and `data-tab` (navigation).
- Existing data must survive: migrate new fields with defaults, never break old backups.
- Theme texts come through `W(key)` / `TH()`. New UI words get a default in `UIW`/`UIX`. The Plain theme must not contain Warhammer wording.
- Gamification stays passive (no extra clicks). The focus is training and usability.
- Sessions are research-based: ~45–90 min, warm-up first, 5 min of cool-down at the end.
- Secrets/tokens are never in the code or in chat. If needed: the user enters them himself in the app or as a GitHub secret.

## Core concepts (where to find what in `app.js`)
- **Sessions:** `S0(id,ctx)` builds the blocks, `S()` wraps them and passes them to `postBlocks()` (skill rotation, filters, emphasis block `EMB`, favourites `FAVB`, cool-down `COOL`).
  - IDs: KA/KB/KC (gym strength), CH, SK, RS, DL, TE, HO/HK (home), RE/RH/RI (running), KI (kickboxing), MO (morning).
- **Exercise types:**
  - `P` progression, `F` fixed, `I` iso hold, `T` test.
  - Options as `"Name|req|w"`: `req` is the home equipment from `EQ`, `g` = gym only, `w` = weight entry.
  - `avail()` / `curVar()` pick the variant.
- **Recommender:** `recAll`/`recTrain` with weights `W` per focus (bal/str/run) and emphasis (lower/glutes/upper/core). Hard-session limits, no hard session the day before kickboxing.
- **Morning routine:** `MPH` phases plus `MMOD` modules via `MNEED`.
- **Cool-down:** `COOLS`/`COOL(kind)`.
- **Personalisation:**
  - `D.focus`, `D.skills`, `D.emph` (`EMPH`), `D.fav` (★ favourites).
  - Management page `vFavs` (tab `favs`).
- **Stats and gamification:** `statsHTML`, `xpOf`, `RANKS`, `honours()`, `streaks()`, `D.pr`.
- **Themes:**
  - `THEMES` plus `THX`: templar, sanguine, sisters, slaanesh, nurgle, plain.
  - `love` is locked behind a code gate (`LOVEH` = FNV hash. Never write the code in plain text in the repo; the gate is a gift, not a security feature).
- **Backup:** `saveBackupFile`, `restoreText`, `askPersist`.
- **Test hook:** `window.__kz` exposes internals for tests.
