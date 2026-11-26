# AT_GEN_LOG
Variant Full. Threat model: T-1 (XSS), T-2 (external comms), T-3 (supply chain).
- T-1 -> tests/e2e/adversarial.spec.js (child-element check, URL-injection check)
- T-2 -> tests/e2e/adversarial.spec.js (no external requests, no console errors); unit external-reference scan
- T-3 -> unit AC-N-001-2 (no script src / link href / URLs)
Not applicable (no server/DB/auth/user input): injection against API, authn/z, rate limiting, file upload.
