# ACCEPTANCE_TEST_INDEX
| AC | Layer | Test file | Test |
|---|---|---|---|
| AC-F-001-1 | L3 | e2e/hello.spec.js | greeting is an h1 |
| AC-F-002-1 | L3 | e2e/hello.spec.js | exactly one enabled button |
| AC-F-003-1 | L3 | e2e/hello.spec.js | click shows current time |
| AC-F-003-2 | L3 | e2e/hello.spec.js | re-click updates |
| AC-F-004-1 | L1+L3 | unit/static.test.js, e2e/hello.spec.js | initially empty |
| AC-N-001-1 | L3 | e2e/hello.spec.js, e2e/adversarial.spec.js | zero network requests |
| AC-N-001-2 | L1 | unit/static.test.js | no external references |
| AC-N-002-1 | L1 | unit/static.test.js | index.html only |
| AC-N-003-1 | L1+L3 | unit/static.test.js, e2e/hello.spec.js | aria-live polite |
| AC-N-003-2 | L3 | e2e/hello.spec.js | Enter/Space |
| REQ-N-004 | manual | - | Firefox/Safari manual check |

SPEC_DRIFT_ADVISORY: none (every anchored REQ has an AC; REQ-N-004 is manual by spec).
