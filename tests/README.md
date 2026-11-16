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
- Numbers are stable. A new test takes the number the control station assigned, otherwise the next free number above the highest one and outside the reserved list; retired gaps are never refilled.
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
| t27 | week-preview | t27.js | A-015: 6-week simulation of the 3 audit profiles: the preview for today equals today's recommendation, kickboxing days and the day-before rule (no Strength C/hard run), legs ≥ 2 per week shown, the forecast for tomorrow comes true when followed, no state change (kz_app_v3, memory, TODAY, names), logged day marked done; EMOM/AMRAP explanations, favourites unchanged; Playwright 390×844: 7-day strip, tap detail with duration, render time, screenshot |
| t28 | minimal-kit | t28.js | A-019: Field kit for the 3 audit profiles × Strength A/B/C × 6 kits (fresh week and with history): "Nothing" bodyweight only, "Pull-up bar" adds bar pulls, every muscle group of the gym session covered, anchor and leg block kept, estimate 60–90 min; 2 taps with a remembered kit, options and preselection, hero mark, week preview unaffected, logging under the kit (leg session counts, gym record untouched, progression per variant), off the next day, combined with Limited time, backup round trip and junk refused, old backup; Playwright 390×844 screenshots |
| t29 | love-finish | t29.js | A-020: finish sentence pick always differs from the daily note and is fixed per day; unlocked love theme shows exactly one sentence after a finished workout (from the encrypted notes, not the daily note, once, not stored); locked love theme or another theme: nothing new; no fixture plaintext in sources/build/localStorage, love file and tool unchanged; WCAG AA contrast of every visible text in the love theme (start + training view); old backup; Playwright 390×844 screenshots |
| t30 | goals-basic | t30.js | P-1: fresh state and old backup without goal; one tap in onboarding step 2 and under More sets a complete goal (catalogue default, start value, date set), "No goal yet" keeps none, Strong legs → squat/hip thrust, skill goal switches the skill on with a hint, exactly 1 active goal; progress from profile, D.ex (kg by exercise name), run records and the new time records from saveRun without an extra tap; milestone toast, reached goal toast + archive; Adjust value/date/remove; "No goal" leaves plan and recommendation unchanged; backup round trip, junk goal/archive refused, old backup; Plain theme without Warhammer words; Playwright 390×844 screenshots (onboarding, start line, status ladder, More) |
| t31 | goals-plan | t31.js | P-2: regression without a goal (6-week simulation of 4 profiles equals `fixtures/t31-nogoal.json`, recorded before P-2; shared simulation `fixtures/sim.js`, profiles `fixtures/profiles.json`); 6-week simulations per goal type: skill goal first and long (shortened only after favourites ≤ 2), weekly skill target 5; strength goals (pull-ups, squat kg, hip thrust kg) with a goal anchor right after the warm-up ≥ 2× per training week, never trimmed, no duplicate, every session ≤ 90 min; 10 km with strength focus ≥ 2 runs and 1 long run per week, time goal with interval runs; date: taper exactly the 7 days before (40–60 % fewer working sets, same exercises), run test / Skill Trial on the date, no deload/test in the last 10 days, ended after the date; trend label on course/tight; one-time focus hint; never list vs goal exercise (alternative variant, else kept with hint); Field kit bodyweight goal anchor; additions outside the precedence; backup |
| t38 | add-exercise | t38.js | A-021: kickbacks join a session without a glute block in ≤ 3 taps (block "Your additions" before the cool-down, target from target(), rest of the session unchanged, new duration in the header, kept beyond 90 min), only the pain filter hides one (with hint), reload keeps them, gone the next day, one-tap remove keeps the other inputs, logged with progression, "Keep as favourite?" once; "+ Easy run" on a day without a planned run and after/along a training (both entries, training progress kept, order hint, day before kickboxing stays easy, week preview follows); backup round trip of the new fields, junk refused, old backup; Playwright 390×844 screenshots (add search, additions block, Today with "+ Easy run") |
| t39 | import-keys | t39.js | A-022: variant choices (`D.vr`, keys `<g|h|m>|<key>` incl. mx_/fav_/iso and `f:<name>`) set by taps in gym, home and Field kit survive file and text round trips into fresh storage identically and show the same variants; crafted keys (`__proto__`, `g|__proto__`, constructor, overlong, wrong prefix, markup) refused, values 0–20, max 300, no prototype pollution; ex/pr/kitD/fav/log keys kept, junk refused; old backups (no vr, bare old keys) load |
| t40 | never-suggest-backlog | t40.js | A-021: "Never suggest" over the 3 audit profiles × Strength A/B/C × gym/home (+ Field kit): excluded exercise gone, replaced within the same muscle group (other variant or catalogue equivalent with "Instead of" hint), estimate ≤ 90; exclusion beats favourite, today's addition stays, More list and favourites page bring it back, week preview refreshes; "Log a past day" (14 days back, no today): training counts for Chronicle, leg frequency, pause rule (no step back, stored values untouched), recommendations and XP; run updates records, kickboxing, validation and tampered date refused; backup round trip, junk, old backup |

## Retired numbers

These numbers are not used and must not be reused.

| Number | Note |
|---|---|
| t01 | Retired before the repo was created; purpose not recorded |
| t02 | Retired before the repo was created; purpose not recorded |
| t10 | Retired before the repo was created; purpose not recorded |
| t17 | Dropped before the repo was created; purpose not recorded |

## Reserved numbers

Assigned by the control station to planned orders. A reserved number may stay a gap until its test exists; the row goes when the test is added (checked by t19).

| Number | Order |
|---|---|
| t32 | P-3 Skill Trial |
| t33 | P-4 total load |
| t34 | P-6 run control |
| t35 | P-5 progression |
| t36 | P-7 pause and injury mode |
| t37 | P-8 daily form tip |
