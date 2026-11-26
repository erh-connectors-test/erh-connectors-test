# Smoke (L4) result

Command: `npx playwright test smoke/` (run in `tests/`), page opened via file:// (no server).

| Test | Covers | Result |
|---|---|---|
| smoke: page opens and time shows after one click | REQ-F-001-AC1, REQ-F-002-AC1, REQ-F-003-AC1 | PASSED |

Total: 1 passed, 0 failed.

Notes: no backend or health endpoint exists (static page only), so the critical path is greeting visible, then one button click shows a non-empty time.

AI_LESSONS_TF: no test failures
