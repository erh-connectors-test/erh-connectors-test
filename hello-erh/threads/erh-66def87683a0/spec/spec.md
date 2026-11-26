# 仕様書: hello-erh (Hello ERH 単一静的ページ)

Thread: erh-66def87683a0 / Pattern: web-app / Variant: Full

## 1. 概要
単一の静的ファイル `index.html` に「Hello ERH」というテキストと、クリックすると現在時刻を表示するボタンを置く。サーバー・外部依存・ビルド工程は持たない。

## 2. スコープ
- 対象: `index.html` 1 ファイル (HTML + インラインの CSS/JavaScript)。
- 対象外: サーバー、バックエンド API、データベース、外部ライブラリ/CDN、ネットワーク通信、時刻の永続化。
- 本アプリは web-app pattern だが、FastAPI/SQLite/Next.js は使わない (制約「サーバーなし・依存なし」による)。API 契約、DB スキーマ、状態機械は該当なし。

## 3. 前提・決定事項
- 時刻はブラウザのローカル時刻 (`new Date()`) を用いる。
- 表示書式は端末のロケールに従う `toLocaleTimeString()` とする。 [確定: spec-refine で承認]
- ボタンを再度押すと表示は最新の時刻に更新される。
- ボタンのラベルは「Show time」(英語) とする。 [確定: spec-refine で承認]

## 4. 要件 (EARS)

### REQ-F-001 見出しテキストの表示 (Must) [ANCHORED]
ページが読み込まれたとき、システムは本文に文字列 `Hello ERH` を表示しなければならない。
- AC-F-001-1: Given `index.html` をブラウザで開く / When ページの読み込みが完了する / Then 文字列 `Hello ERH` が見出し (`h1`) として表示されている。

### REQ-F-002 時刻ボタンの表示 (Must) [ANCHORED]
ページが読み込まれたとき、システムは時刻を表示するためのボタンを 1 つ表示しなければならない。
- AC-F-002-1: Given ページが読み込まれている / When 画面を確認する / Then `button` 要素が 1 つ表示され、操作可能である。

### REQ-F-003 クリックで現在時刻を表示 (Must) [ANCHORED]
ユーザーがボタンをクリックしたとき、システムはクリック時点の現在時刻をページ上に表示しなければならない。
- AC-F-003-1: Given ページが読み込まれ時刻が未表示である / When ボタンをクリックする / Then 現在時刻を示す文字列が出力領域に表示される。
- AC-F-003-2: Given 時刻が表示済みである / When 時間をおいて再度クリックする / Then 表示がその時点の時刻に更新される。

### REQ-F-004 初期状態 (Should) [ANCHORED]
ボタンが一度も押されていない間、システムは時刻を表示してはならない。
- AC-F-004-1: Given ページを読み込んだ直後 / When ボタンを押していない / Then 時刻の出力領域は空である。

### REQ-N-001 サーバー・依存なし (Must) [ANCHORED]
システムは HTTP サーバー、外部ライブラリ、外部リソースへの通信なしに、`file://` で開いた状態で動作しなければならない。
- AC-N-001-1: Given `index.html` を `file://` で開く / When 全操作を行う / Then ネットワーク要求が 0 件で、REQ-F-001〜003 が満たされる。
- AC-N-001-2: Given `index.html` のソース / When `script src`、`link href`、外部 URL を検索する / Then 該当が 0 件である。

### REQ-N-002 単一ファイル (Must) [ANCHORED]
システムは成果物を `index.html` 1 ファイルのみで構成しなければならない。
- AC-N-002-1: Given 成果物ディレクトリ / When ファイルを列挙する / Then アプリ本体は `index.html` のみである。

### REQ-N-003 アクセシビリティ (Should) [ANCHORED]
時刻の出力領域は、更新内容がスクリーンリーダーに通知されるよう `aria-live="polite"` を持たなければならない。ボタンはキーボード (Enter/Space) で操作できなければならない。
- AC-N-003-1: Given 出力領域の要素 / When 属性を確認する / Then `aria-live="polite"` が設定されている。
- AC-N-003-2: Given ボタンにフォーカスがある / When Enter を押す / Then 時刻が表示される。

### REQ-N-004 ブラウザ互換 (Should) [ANCHORED]
システムは最新の Chromium・Firefox・Safari で動作しなければならない。

## 5. 受入基準カバレッジ
全 Must/Should 要件 (REQ-F-001〜004, REQ-N-001〜003) に AC あり。REQ-N-004 は手動確認 (自動 AC は Chromium のみ)。

## AC Coverage Gaps
なし (P0/P1 要件はすべて AC を持つ)。

## 6. トレーサビリティ (RTM 初期)
| REQ | AC | 優先度 |
|---|---|---|
| REQ-F-001 | AC-F-001-1 | Must |
| REQ-F-002 | AC-F-002-1 | Must |
| REQ-F-003 | AC-F-003-1, -2 | Must |
| REQ-F-004 | AC-F-004-1 | Should |
| REQ-N-001 | AC-N-001-1, -2 | Must |
| REQ-N-002 | AC-N-002-1 | Must |
| REQ-N-003 | AC-N-003-1, -2 | Should |
| REQ-N-004 | (手動) | Should |

## 7. 未解決事項
なし (時刻書式とボタンラベルは spec-refine で確定済み)。

## Visual Gate

VISUAL_GATE: declined

ANCHOR_COMPLETE: 8 requirements anchored
