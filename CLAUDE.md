# CLAUDE.md – Crusade Training Book

This file is for Claude Code sessions that carry out **orders (Aufträge)** from the
control station (Leitstand) of the claude.ai project "Gym - Kreuzzug".
Talk to the user in **German**, in the Black Templars persona ("Bruder-Captain").
**Code, UI texts and commits are in English.**

## What this is
A personal training app (calisthenics, gym, running, mobility, kickboxing days) for the captain and a partner profile.
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
| `tests/` | Playwright/JSDOM tests, `tests/run.sh` runs all of them, `tests/README.md` lists every test and the retired numbers |
| Repo root | **Generated** – never edit by hand, only via `tools/build.py` |

## Workflow per order
1. Read the order fully. If anything is unclear, ask **once** before building.
2. Change only `src/` (plus tests/docs). Then `python3 tools/build.py`.
3. Run `sh tests/run.sh` (setup once: `npm install && npx playwright install chromium`). It prints one line per test (`PASS tNN name` / `FAIL tNN name – reason`) and a summary `n passed, m failed (m)`; the exit code is non-zero on any failure. The summary must show `(0)`. `t13 persona-report` is a report: it passes if it runs, but read its output (`node tests/t13.js`) and judge it yourself.
4. For new features, add a **new test** `tests/tNN.js` (next free number above the highest; gaps are never refilled). Line 1: `// @name <kebab-name>`; it prints a result line `=== AUFFÄLLIGKEITEN (n) ===` with issues as ` - …` lines. Add a row to `tests/README.md` (t19 suite-naming enforces both).
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

## Naming
The app speaks its own language. **No terms from other training programmes, templates, brands or authors** in display texts
(e.g. programme names, protocols named after researchers, device/brand names). Name everything yourself: English, in the
crusade tone, but clear; explain the rhythm where needed (e.g. "20 s work, 10 s rest"). Generic exercise names
(Squat, Hip Thrust, Muscle-up, Plank, Nordic curl …) stay. Every future order follows this rule; `t24 naming-doctrine`
holds the list of banned terms (`BAN`) and scans sources and build.
Internal IDs and data keys never change, only the display name:

| Internal ID / key | Display name |
|---|---|
| `CH` (session, `NAMES.CH`) | Skill Trial |
| `c.phase` (cycle part 1/2) | Phase 1 / Phase 2 |
| `abs`, `abs-T`, `ABS`, `TB`, `tb*` (20 s / 10 s ab interval block and its timer) | Core Blitz (tag "Blitz", button "Start Blitz") |
| honour `zealot` | default/Plain: Blitz Master · templar: Zealot of the Blitz (other themes keep their own names) |
| run file import (`gfile`, `parseTrack`) | Import run file (GPX/TCX), settings section "Watch import" |

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
  - Legs ≥ 2× per training week (A-009): `ctx().legB` adds `LEGMINI` to KA/KB/CH; logs carry `lg` (`legSets`/`legLog`). Lower/glute emphasis: fixed anchor per session (`ANCH`, `it.anc`), CH no longer replaces KC.
  - Duration (A-010, redesigned A-013): `S()` ends with `design()` → `s.min` (`estMin`), `s.ab` (Core Blitz or null). Sessions are **put together** for an estimate of 60–90 min (`DURLO`/`DURMAX`); nothing is trimmed afterwards and the header shows only "≈ n min", no trim list. Precedence: warm-up, cool-down, anchor and a needed leg block > favourites and Shoulder stability (`b.sh`) > pure accessory (`b.acc`: Forearms, Kickboxing power). Over 90 min, in this order: pure accessory gives way first (fewer rounds, compact form: Kickboxing power keeps Copenhagen plank + neck, Forearms one exercise), fewer circuit rounds, Core Blitz compact then out, emphasis extras, favourites down to 2, compact accessory out (Forearms first), long skill block to its standard form (`b.lng`), Shoulder stability to its compact form (`shMini`), then secondary blocks; one favourite only as a last resort once no accessory is left. Under 60 min (strength sessions `BANDIDS` only, not Limited time or deload) it adds sensible extras that keep it ≤ 90: more favourites (`b.more`), a further emphasis exercise, full Core Blitz, a 4th emphasis round. No filler: home sessions with little equipment can stay under 60.
  - Limited time (`D.short`) still drops `p>1` blocks, but `shortLegs()` keeps a needed `LEGMINI` (`ctx().legB`: week < 2 leg sessions or Strength C > 7 days ago) by setting it to `p:1` and taking one round off the first main upper-body circuit. With ≥ 2 leg sessions it may go as before. Leg days get `LEGWARM()`; heavy lifts (`HEAVY`) show display-only warm-up sets (`wuSets`).
  - IDs: KA/KB/KC (gym strength), CH, SK, RS, DL, TE, HO/HK (home), RE/RH/RI (running), KI (kickboxing), MO (morning).
- **Week preview (A-015):** `weekPlan()` simulates the next 7 days on a deep copy of `D` (swaps `D`/`TODAY`, always restores them, never saves) by following `recAll`/`recTrain` and logging simulated sessions (`wkLog`, with `lg`/`sk`). Cached in `WK` by `wkKey()`. `weekHTML()` draws the strip on the Today page (symbol `WKSYM`, short name `WKS`, L = legs, K = kickboxing day); a tap (`data-a="wkday"`) shows name, goal and estimate without saving. EMOM/AMRAP stay as terms and are explained via `termNote()` in the "How?" hint and block hint.
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
  - `love` is locked behind the love code (A-008). No hash of the code ships anywhere (no `LOVEH`, no FNV). The only proof is cryptographic:
    - `src/love.enc.json` (v2) holds a random salt, the PBKDF2 iteration count (`LOVEIT` = 600,000), the daily notes as AES-GCM ciphertext and a **verifier** (AES-GCM ciphertext of `LOVEVER`). `tools/build.py` embeds it as `LOVEENC`.
    - Unlock (`loveUnlock`): the code (any text, min. `LOVEMIN` = 12 characters, trimmed) → PBKDF2-SHA256 key → counts only if the verifier decrypts (`loveOpen`). Both the theme gate (`data-a="unlock"`) and the start card (`data-a="lovekey"`) use it; one entry opens theme and notes.
    - Unlock state = a valid key in localStorage `kz_love_k` as `"2:<salt>:<key>"` (`loveOn()`), never in `D` or backups. A key for another salt (new file) or a bare A-006 key is void: the code is asked once again. `D.loveOK` is retired (dropped on load and import).
    - A chosen but locked love theme stays in `D.theme`, but renders as templar (`thKey()`); the start card asks for the code. Without `love.enc.json` the theme stays locked with a hint in the code field.
    - Never write the code or plaintext notes into the repo or chat. The old numeric code is in the Git history and burned.
  - **Love code and notes – the Captain's 3 steps** (locally, never committed):
    1. Write the notes into `love.txt` in the repo root (one per line, git-ignored).
    2. Run `python3 tools/encrypt_love.py` and type the new code twice (at least 12 characters). It writes `src/love.enc.json` with a fresh salt and prints only the number of notes.
    3. Run `python3 tools/build.py`, `sh tests/run.sh`, then commit `src/love.enc.json` + build and push. On each phone, enter the code once (theme gate or start card).
- **Backup:** `saveBackupFile`, `restoreText`, `askPersist`.
  - A-014: `bkJSON()` writes the full user state incl. day progress `days` (file and text alike) and stamps `bkTs` (time the backup was made). Left out: keys starting with `_` and `BKSKIP` (tab, obStep, pendingTheme, wantLove, statEx, loveOK); the love key `kz_love_k` lives outside `D`. `cleanImport()` whitelists `days` (`cleanDays`, last 14 days), `abs`, `pain`, `startP`, `bkDate`, `bkTs`, `bkAt`; optional log/record fields only when present. A restore with `bkTs` counts as backed up.
  - `markBk()` records a successful backup (`bkTs`, `bkAt` = entries, `bkDate`): share resolved, download, text copied (button or by hand via the `copy` event). Creating the text alone does not count.
  - `bkDue()` drives the quiet start-page reminder `#bkrem` (`W("bkrem")`): last backup > 7 days ago or ≥ 5 new entries; without any backup from the 3rd entry. One tap = `bkfile`.
  - `MAXBK` (10 MB): larger files or texts are refused with a hint before reading.
- **Test hook:** `window.__kz` exposes internals for tests.
