#!/bin/sh
# Runs the whole test suite against the single-file build. Needs: node, npm i playwright jsdom, npx playwright install chromium
cd "$(dirname "$0")/.." && python3 tools/build.py >/dev/null || exit 1
fail=0
for t in tests/t*.js; do
  out=$(timeout 300 node "$t" 2>&1); last=$(printf '%s\n' "$out" | grep -E 'AUFF|FOKUS|ISSUES' | tail -1)
  case "$t" in *t13.js) printf '%-16s persona report (read manually)\n' "$t"; continue;; esac
  printf '%-16s %s\n' "$t" "${last:-NO RESULT LINE}"
  printf '%s' "$last" | grep -q '(0)' || fail=1
done
exit $fail
