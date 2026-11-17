#!/bin/sh
# Long runs (A-030b): tests marked "// @longrun" in line 2, not part of tests/run.sh because of their duration.
# t49 longterm: 104 weeks × 5 profiles × 2 courses (about 10–20 min). Arguments go to every test,
# e.g. "sh tests/longterm.sh Runner" or "sh tests/longterm.sh --weeks=52".
# Output and exit code like tests/run.sh: one line per test, then "<n> passed, <m> failed (<m>)".
cd "$(dirname "$0")/.." || exit 2
python3 tools/build.py >/dev/null || { echo "FAIL build – tools/build.py failed"; echo "0 passed, 1 failed (1)"; exit 1; }
pass=0; fail=0
for f in $(grep -l '^// @longrun' tests/t*.js | sort -V); do
  id=$(basename "$f" .js | sed 's/^t\([0-9]*\)$/\1/' | xargs printf 't%02d')
  name=$(sed -n '1s/^\/\/ @name \([a-z0-9-]*\).*$/\1/p' "$f")
  out=$(node "$f" "$@" 2>&1); rc=$?
  printf '%s\n' "$out" | grep -vE '^=== AUFF'
  bad=$(printf '%s\n' "$out" | grep -E '(AUFF|ISSUES)[^(]*\([0-9]+\)' | grep -vE '\(0\)' | head -1)
  if [ $rc -ne 0 ] || [ -n "$bad" ]; then fail=$((fail+1)); echo "FAIL $id $name – ${bad:-exit $rc}"; else pass=$((pass+1)); echo "PASS $id $name"; fi
done
echo "$pass passed, $fail failed ($fail)"
[ $fail -eq 0 ]
