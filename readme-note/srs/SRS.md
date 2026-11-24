# SRS (Lite): README note

## 1. Purpose
Add one sentence to README.md. No application code.

## 2. Requirements
| ID | EARS requirement | Priority |
|---|---|---|
| REQ-F-001 [ANCHORED] | The README.md shall contain the sentence "This repository is the ERH connector test repository." | Must |
| REQ-C-001 [ANCHORED] | The change shall add only that sentence; no other file or content changes and no application code. | Must |

## 3. Acceptance criteria
- AC-001 (REQ-F-001): Given README.md after the change, When searched for the sentence, Then it appears exactly once.
- AC-002 (REQ-C-001): Given the base and changed README.md, When diffed, Then the only difference is the added sentence, and no other file changed.

## 4. Traceability
| REQ | AC |
|---|---|
| REQ-F-001 | AC-001 |
| REQ-C-001 | AC-002 |

REQUIREMENTS_FINALIZED: true
ANCHORED_COUNT: 2
