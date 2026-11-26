# TEST_GEN_LOG
- Anchors: 8 anchored requirements read; no drift.
- TESTID dictionary used: greeting, show-time-button, time-output (no others).
- L2 integration: not applicable (no API/DB).
- eADR: ADR-001 (single static HTML) verified by AC-N-002-1 and AC-N-001-2.
- PBT_SKIPPED: no applicable targets
- Mutation: deferred to test phase (logic is one line).
- SIDECAR_GENERATED: package-additions.json
- Tests run from the impl folder after merge; INDEX_HTML env var overrides the target. Config: tests/playwright.config.js.
- TDD red: impl/index.html does not exist yet; all tests are expected to fail until impl.
