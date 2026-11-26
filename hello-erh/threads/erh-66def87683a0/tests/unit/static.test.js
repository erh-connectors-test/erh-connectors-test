// Traceability:
//  AC-N-001-2 -> external references are zero
//  AC-N-002-1 -> impl contains only index.html as app body
//  AC-N-003-1 -> aria-live="polite" on time-output
//  AC-F-004-1 -> time-output has no initial text (static)
//  Design     -> textContent only, no innerHTML
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const { INDEX, IMPL_DIR } = require('../support/paths');
const html = () => fs.readFileSync(INDEX, 'utf8');

// Covers: REQ-N-001-AC2
test('AC-N-001-2: no external references', () => {
  const s = html();
  assert.doesNotMatch(s, /<script[^>]*\ssrc\s*=/i);
  assert.doesNotMatch(s, /<link[^>]*\shref\s*=/i);
  assert.doesNotMatch(s, /https?:\/\//i);
  assert.doesNotMatch(s, /@import/i);
});

// Covers: REQ-N-002-AC1
test('AC-N-002-1: impl app body is index.html only', () => {
  const files = fs.readdirSync(IMPL_DIR).filter((f) => /\.(html|js|css|ts|mjs)$/.test(f) && !/config/.test(f));
  assert.deepStrictEqual(files, ['index.html']);
});

// Covers: REQ-N-003-AC1
test('AC-N-003-1: time-output has aria-live=polite', () => {
  const m = html().match(/<[^>]*data-testid="time-output"[^>]*>/);
  assert.ok(m, 'time-output element missing');
  assert.match(m[0], /aria-live="polite"/);
});

// Covers: REQ-F-004-AC1
test('AC-F-004-1: time-output is empty in source', () => {
  assert.match(html(), /<p[^>]*data-testid="time-output"[^>]*><\/p>/);
});

// Covers: REQ-F-001-AC1, REQ-F-002-AC1
test('structure: h1 greeting and single button with testids', () => {
  const s = html();
  assert.match(s, /<h1[^>]*data-testid="greeting"[^>]*>\s*Hello ERH\s*<\/h1>/);
  assert.strictEqual((s.match(/<button\b/g) || []).length, 1);
  assert.match(s, /<button[^>]*type="button"[^>]*data-testid="show-time-button"|<button[^>]*data-testid="show-time-button"[^>]*type="button"/);
  assert.match(s, /<html[^>]*lang="en"/);
});

// Covers: REQ-N-001 (T-1 XSS mitigation, design §3)
test('design: uses textContent, never innerHTML/eval', () => {
  const s = html();
  assert.match(s, /textContent/);
  assert.doesNotMatch(s, /innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval\(/);
});
