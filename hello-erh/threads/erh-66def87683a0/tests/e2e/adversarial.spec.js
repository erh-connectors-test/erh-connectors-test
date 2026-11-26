// Adversarial (threat model T-1, T-2): no script injection, no external calls, no console errors.
const { test, expect } = require('@playwright/test');
const { URL } = require('../support/paths');

test('T-1 output is text only (no child elements) after clicks', async ({ page }) => {
  // Covers: REQ-F-003-AC1
  await page.goto(URL);
  await page.getByTestId('show-time-button').click();
  expect(await page.getByTestId('time-output').evaluate((e) => e.children.length)).toBe(0);
});

test('T-1 URL hash / query cannot inject into output', async ({ page }) => {
  // Covers: REQ-F-004-AC1
  await page.goto(URL + '?x=<img src=x onerror=window.__pwn=1>#<script>window.__pwn=1</script>');
  await page.getByTestId('show-time-button').click();
  expect(await page.evaluate(() => window.__pwn)).toBeUndefined();
});

test('T-2 no console errors, no external requests, rapid clicks', async ({ page }) => {
  // Covers: REQ-N-001-AC1
  const errors = []; const ext = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('request', (r) => !r.url().startsWith('file://') && ext.push(r.url()));
  await page.goto(URL);
  for (let i = 0; i < 20; i++) await page.getByTestId('show-time-button').click();
  expect(errors).toEqual([]);
  expect(ext).toEqual([]);
});
