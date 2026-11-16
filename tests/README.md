# Tests

`sh tests/run.sh` builds and runs everything. Setup once: `npm install && npx playwright install chromium`.

## Output format

One line per test, then a summary line. The exit code is non-zero as soon as one test fails.

```
PASS t03 weekly-plan
FAIL t11 records-honours – 1 issue(s): Erste Ehrung fehlt
13 passed, 1 failed (1)
```

A test passes when it exits with 0 and every result line (`=== AUFFÄLLIGKEITEN (n) ===` etc.) shows `(0)`.
Tests marked as **report** pass if they run without crashing; read their output manually (`node tests/t13.js`).

## Conventions

- Every Playwright test calls `tests/netguard.js`: any request that leaves the machine is blocked and fails the test.

- Line 1 of every test file declares its name: `// @name <kebab-case-name>` (English, short, unique).
- `// @report` in line 2 marks a manual report.
- Numbers are stable. A new test takes the next free number above the highest one; gaps are never refilled.
- Every test must be listed in the table below (checked by t19 suite-naming).

## Tests

| Test | Name | File | Checks |
|---|---|---|---|
| t03 | weekly-plan | t3.js | Weekly plan, schedule, progression targets, coverage |
| t04 | ui-flow | t4.js | UI flow (JSDOM): tabs, training, short session, home screen |
| t05 | data-migration | t5.js | Data migration of old states, focus UI |
| t06 | focus-sims | t6.js | Focus simulations (bal/str/run), deselected skills |
| t07 | front-lever | t7.js | Front lever progression, skill logging, stall hint |
| t08 | morning-cooldown | t8.js | Morning routine modules, cool-down |
| t09 | import-security | t9.js | Backup import security (`cleanImport`) |
| t11 | records-honours | t11.js | Records, honours, themes |
| t12 | welcome-restore | t12.js | Welcome/restore, one-tap set entry |
| t13 | persona-report | t13.js | 10-persona simulation – **report, read manually** |
| t14 | entry-edit | t14.js | Edit entries, how-to, hold timer |
| t15 | love-lock | t15.js | Love theme lock (A-008): no code hash shipped, verifier unlock, min. length, no-file hint, A-006 migration, forged key, old backup (Playwright, 390×844) |
| t16 | emphasis-favs | t16.js | Emphasis block and favourites in sessions (Playwright) |
| t18 | emphasis-matrix | t18.js | All emphases × gym/home, favourites page UI (Playwright, 390×844) |
| t19 | suite-naming | t19.js | Meta: every test has a name, is listed here, gaps are documented |
| t20 | love-crypto | t20.js | Encrypted daily love note: Python encrypt (v2: random salt, verifier, min. length) ↔ app decrypt, wrong code, broken verifier, daily pick, card, restart, backup (Playwright, 390×844) |
| t21 | hardening | t21.js | Hardening (A-012): no external URLs in sources/build, off-site links stripped, frame-buster in an iframe (only a note with the real URL, nothing rendered or stored), normal open unchanged, net guard self-check (Playwright, 390×844) |
| t22 | leg-frequency-anchor | t22.js | A-009: 6-week simulation of the 3 audit profiles: ≥ 2 leg sessions per week (deload excepted), fixed anchor per session that progresses, CH no longer replaces KC with lower/glute emphasis, 14-day pause rule, old backup + favourites, anchor mark in the UI |
| t23 | duration-warmup | t23.js | A-010: 6-week simulation of the 3 audit profiles plus a favourites-heavy captain: no session estimated over 90 min and no trim list (A-013), warm-up/cool-down/anchor/leg block kept, warm-up first and cool-down last, leg warm-up on leg days only, warm-up sets with derived loads before heavy lifts (display only: volume, records and log unchanged), duration in the header, short-session hint, old backup |
| t24 | naming-doctrine | t24.js | A-011: no programme/brand/author terms (banned list) in sources or build, CLAUDE.md naming glossary, old backup loads with abs/CH entries, honour `zealot` keeps counting, own names in stats, hero, settings and ab block |
| t25 | session-design | t25.js | A-013: 6-week simulation of the 3 audit profiles plus the captain with 6 favourites: every strength session (Limited time, deload, test, recovery excepted) designed for 60–90 min, warm-up/cool-down/anchor kept, Shoulder stability at least compact on Strength A, ≥ 2 favourites on Strength C while accessory work stays, no trim list, duration in the header, Limited time keeps a needed leg block (and may drop it with 2 leg sessions) with estimate, legSets, render and log consistent, old backup |
| t26 | backup-watch | t26.js | A-014: backup reminder rules (> 7 days, ≥ 5 new entries, from the 3rd entry without any backup, old date-only stamp), one tap saves the file, share counted only on success, text counted on copy, file and text round trip into fresh storage (logs, profile, progress, days identical), no love key or UI state in backups, old backup without days/stamp, oversized file/text gives a hint and changes nothing |

## Retired numbers

These numbers are not used and must not be reused.

| Number | Note |
|---|---|
| t01 | Retired before the repo was created; purpose not recorded |
| t02 | Retired before the repo was created; purpose not recorded |
| t10 | Retired before the repo was created; purpose not recorded |
| t17 | Dropped before the repo was created; purpose not recorded |
