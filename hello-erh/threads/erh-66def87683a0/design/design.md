# 設計書: hello-erh (Hello ERH 単一静的ページ)

Thread: erh-66def87683a0 / Mode: Requirements-First

VG_CHECK: VISUAL_GATE: declined を確認 (正常続行)
ANCHOR: spec.md の [ANCHORED] 要件 8 件を確認。削除・改変・拡張なし。

## 1. 方針
`index.html` 1 ファイル (インライン CSS/JS)。サーバー・外部依存・ビルドなし。API 契約 / DB スキーマ / 状態機械は該当なし (spec §2)。

## 2. 構成 (DOM)
```
<body>
  <main>
    <h1 data-testid="greeting">Hello ERH</h1>                       REQ-F-001
    <button type="button" data-testid="show-time-button">Show time</button>   REQ-F-002
    <p data-testid="time-output" aria-live="polite"></p>           REQ-F-003/004, REQ-N-003
  </main>
  <script> インライン </script>
</body>
```
- `<html lang="en">`、`<meta charset="utf-8">`、viewport meta、`<title>Hello ERH</title>`。
- 出力領域 `time-output` は初期状態で空 (REQ-F-004)。
- ボタンは `<button>` ネイティブ要素なので Enter/Space で操作可能 (REQ-N-003)。

## 3. 振る舞い
- クリックハンドラ: `output.textContent = new Date().toLocaleTimeString();`
- 再クリックで最新時刻に上書き (AC-F-003-2)。
- `textContent` のみ使用し `innerHTML` は使わない。
- ハンドラは外部要求を発行しない (REQ-N-001)。`script src` / `link href` / 外部 URL を含めない。
- 最新 Chromium/Firefox/Safari で標準の DOM API のみ使用 (REQ-N-004)。

## 4. 要件トレース
| REQ | 設計要素 |
|---|---|
| REQ-F-001 | h1 `greeting` |
| REQ-F-002 | button `show-time-button` |
| REQ-F-003 | click ハンドラ + `time-output` |
| REQ-F-004 | 初期空の `time-output` |
| REQ-N-001 | 外部参照ゼロ・インライン完結 |
| REQ-N-002 | `index.html` のみ (ADR-001) |
| REQ-N-003 | `aria-live="polite"`、ネイティブ button |
| REQ-N-004 | 標準 API のみ |

## 5. ADR
- ADR-001: 単一ファイル静的 HTML・フレームワーク不使用 (Accepted)。

## Threat Model
信頼境界: ユーザー ↔ ブラウザ (`file://`)。サーバー、DB、外部連携は存在しない。
| ID | STRIDE | 脅威 | リスク | 緩和策 |
|---|---|---|---|---|
| T-1 | Tampering/XSS | 出力へのスクリプト注入 | Low | 出力は `new Date()` 由来の文字列のみ、`textContent` で設定。ユーザー入力なし |
| T-2 | Info disclosure | 外部通信による情報漏えい | Low | 外部リソース・通信ゼロ (AC-N-001-2) |
| T-3 | Tampering | サプライチェーン (CDN/ライブラリ) | Low | 依存なし |
High リスクの脅威なし。

## Impact Analysis
新規プロジェクトで既存コードなし。影響先: `index.html` のみ (Impact Level: Low)。
Regression Test Required: 新規のため全 AC をテスト対象とする (回帰対象の既存機能なし)。

## data-testid 正準辞書
| ID | 要素 | 種別 |
|---|---|---|
| `greeting` | h1 | 静的 |
| `show-time-button` | button | 静的 |
| `time-output` | 時刻出力 p | 静的 |
動的 ID なし。
