#!/bin/sh
# Runs the whole test suite against the single-file build.
# Needs: node, npm install (playwright, jsdom), npx playwright install chromium
#
# Output: one line per test, then a summary line.
#   PASS tNN name
#   FAIL tNN name – reason
#   <n> passed, <m> failed (<m>)
# Exit code is non-zero as soon as one test fails.
#
# A test file declares its name in line 1 ("// @name <kebab-name>").
# "// @report" marks a manual report: it passes if it runs without crashing.
# "// @longrun" (line 2) marks a long run: skipped here, run by tests/longterm.sh.
# A test passes when it exits 0 and every result line ("... (n)") shows (0).
cd "$(dirname "$0")/.." || exit 2
python3 tools/build.py >/dev/null || { echo "FAIL build – tools/build.py failed"; echo "0 passed, 1 failed (1)"; exit 1; }

pass=0; fail=0
for t in $(ls tests/t*.js | sed 's/^tests\/t\([0-9]*\)\.js$/\1/' | sort -n); do
  f="tests/t$t.js"; id=$(printf 't%02d' "$t")
  sed -n '2p' "$f" | grep -q '^// @longrun' && continue
  name=$(sed -n '1s/^\/\/ @name \([a-z0-9-]*\).*$/\1/p' "$f"); [ -n "$name" ] || name="(unnamed)"
  out=$(timeout 300 node "$f" 2>&1); rc=$?
  reason=""
  if [ $rc -ne 0 ]; then
    reason="exit $rc: $(printf '%s\n' "$out" | grep -v '^\s*$' | grep -E 'Error|error' | head -1 | cut -c1-120)"
  elif grep -q '^// @report' "$f"; then
    [ -n "$out" ] || reason="no output"
  else
    res=$(printf '%s\n' "$out" | grep -E '(AUFF|FOKUS|ISSUES)[^(]*\([0-9]+\)')
    if [ -z "$res" ]; then
      reason="no result line"
    else
      bad=$(printf '%s\n' "$res" | grep -vE '\(0\)' | head -1)
      if [ -n "$bad" ]; then
        n=$(printf '%s' "$bad" | sed 's/^[^(]*(\([0-9]*\)).*$/\1/')
        first=$(printf '%s\n' "$out" | grep -E '^ - ' | head -1 | sed 's/^ - //' | cut -c1-120)
        reason="$n issue(s)${first:+: $first}"
      fi
    fi
  fi
  if [ -z "$reason" ]; then
    pass=$((pass+1)); echo "PASS $id $name"
  else
    fail=$((fail+1)); echo "FAIL $id $name – $reason"
  fi
done
echo "$pass passed, $fail failed ($fail)"
[ $fail -eq 0 ]
