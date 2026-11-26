# ADR-001: 単一ファイル静的 HTML・フレームワーク不使用

- Status: Accepted
- Thread: erh-66def87683a0

## Context
要件は「サーバーなし・依存なし」の 1 ページ (REQ-N-001, REQ-N-002)。web-app pattern 既定の Next.js/FastAPI/SQLite は過剰。

## Decision
`index.html` 1 ファイルにインライン CSS/JS で実装し、時刻はブラウザの `new Date().toLocaleTimeString()` を使う。

## Consequences
- `file://` で動作し、ビルド・配布が不要。
- テストは Playwright (Chromium, file://) の E2E 中心とし、API/DB 層のテストは不要。
- 将来機能拡張時はファイル分割を再検討する。
