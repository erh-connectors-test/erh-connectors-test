# 実装計画: hello-erh (Hello ERH 単一静的ページ)

Thread: erh-66def87683a0 / Variant: Full
SA-2: spec.md の [ANCHORED] 要件 8 件を確認。矛盾する方針なし (SPEC_DRIFT なし)。

## 1. 方針
- 成果物は `/workspace/hello-erh/impl/index.html` 1 ファイル (インライン CSS/JS、外部参照ゼロ)。
- バックエンド・DB・ビルドなし。FastAPI/SQLite/Next.js は使わない (spec §2)。
- 構造は design.md §2 の DOM と data-testid 正準辞書 (`greeting` / `show-time-button` / `time-output`) に従う。

## 2. タスク
| ID | 内容 | REQ |
|---|---|---|
| T-01 | `index.html` の骨格: `<html lang="en">`、meta charset/viewport、title、main | REQ-N-001, N-002 |
| T-02 | `h1[data-testid=greeting]` に `Hello ERH` | REQ-F-001 |
| T-03 | `button[type=button][data-testid=show-time-button]` ラベル `Show time` | REQ-F-002 |
| T-04 | `p[data-testid=time-output][aria-live=polite]` を初期空で配置 | REQ-F-004, N-003 |
| T-05 | インライン script: click で `output.textContent = new Date().toLocaleTimeString()` (innerHTML 不使用) | REQ-F-003 |
| T-06 | 最小限のインライン CSS (中央寄せ、読みやすさ) | - |
| T-07 | 外部参照チェック (`script src` / `link href` / `http(s)://` が 0 件) | REQ-N-001 |

実装順 (TDD green): L3 E2E テストを先に red 確認 → T-01〜T-06 → T-07。

## 3. テスト戦略
- L1 unit: ロジックが 1 行のため独立 unit は設けない。静的解析テスト (HTML 文字列検査: 外部参照 0 件、`aria-live`、testid、`innerHTML` 不在、impl 内ファイルが index.html のみ) を軽量に実施。
- L2 integration: 該当なし (API/DB なし)。
- L3 E2E (Playwright, Chromium, `file://`): 見出し表示、ボタン 1 つ、クリックで時刻表示、再クリックで更新 (時計を固定/進めて確認)、初期空、Enter/Space 操作、ネットワーク要求 0 件。
- L4 Smoke: `file://` で開き Hello ERH とボタンが見え、1 クリックで時刻が出る。
- REQ-N-004 は手動確認 (自動は Chromium のみ)。
- PBT: 適用対象なし (純粋関数・ラウンドトリップ等なし) → PBT_SKIPPED: no applicable targets。
- Mutation: 対象ロジックが極小。実行は test phase の判断 (任意)。

### 回帰テスト対象 (Impact Analysis 由来)
新規プロジェクトで既存機能なし。Impact Level Low。全 AC を対象とする。

## 4. Behavioral Coverage Plan
| AC | 内容 | Layer | 理由 |
|---|---|---|---|
| AC-F-001-1 | h1 に Hello ERH | L3 | 実描画の確認が必要 |
| AC-F-002-1 | button 1 つ・操作可能 | L3 | 表示と有効状態は実ブラウザで検証 |
| AC-F-003-1 | クリックで時刻表示 | L3 | DOM 更新の E2E |
| AC-F-003-2 | 再クリックで更新 | L3 | 時計操作で差分確認 |
| AC-F-004-1 | 初期は出力空 | L3 | 読み込み直後状態 |
| AC-N-001-1 | file:// でネットワーク 0 件 | L3 | request 監視 |
| AC-N-001-2 | 外部参照 0 件 | L1 | ソース静的検査 |
| AC-N-002-1 | impl は index.html のみ | L1 | ファイル列挙 |
| AC-N-003-1 | aria-live=polite | L1 + L3 | 属性検査 |
| AC-N-003-2 | Enter で時刻表示 | L3 | キーボード操作 |

## 5. Traceability Matrix (Skeleton)
| REQ-ID | ADR-IDs | AC-IDs | Test Files | Impl Files |
|---|---|---|---|---|
| REQ-F-001 | PENDING | PENDING | PENDING | PENDING |
| REQ-F-002 | PENDING | PENDING | PENDING | PENDING |
| REQ-F-003 | PENDING | PENDING | PENDING | PENDING |
| REQ-F-004 | PENDING | PENDING | PENDING | PENDING |
| REQ-N-001 | PENDING | PENDING | PENDING | PENDING |
| REQ-N-002 | PENDING | PENDING | PENDING | PENDING |
| REQ-N-003 | PENDING | PENDING | PENDING | PENDING |
| REQ-N-004 | PENDING | PENDING | PENDING | PENDING |

## 6. リスク
- ロケール依存の時刻書式: テストは書式固定ではなく「空でない・時刻らしい文字列・再クリックで変化」を検証する。
- Playwright は dev 用途のみ。`index.html` 自体は依存を持たない (テスト用 node_modules は `impl/` 配下に置く)。
