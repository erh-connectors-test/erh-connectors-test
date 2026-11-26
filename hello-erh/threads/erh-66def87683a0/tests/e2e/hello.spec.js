// Traceability (AC-ID -> test):
//  AC-F-001-1 -> greeting shows Hello ERH as h1
//  AC-F-002-1 -> exactly one enabled button
//  AC-F-003-1 -> click shows time
//  AC-F-003-2 -> re-click updates (fake clock)
//  AC-F-004-1 -> initially empty
//  AC-N-001-1 -> zero network requests
//  AC-N-003-1 -> aria-live=polite
//  AC-N-003-2 -> Enter / Space operate button
const { test, expect } = require('@playwright/test');
const { URL } = require('../support/paths');

const btn = (p) => p.getByTestId('show-time-button');
const out = (p) => p.getByTestId('time-output');

test.describe('Hello ERH page', () => {
  test('AC-F-001-1 greeting is an h1 with Hello ERH', async ({ page }) => {
    // Covers: REQ-F-001-AC1
    await page.goto(URL);
    const g = page.getByTestId('greeting');
    await expect(g).toBeVisible();
    await expect(g).toHaveText('Hello ERH');
    expect(await g.evaluate((e) => e.tagName)).toBe('H1');
  });

  test('AC-F-002-1 exactly one enabled button', async ({ page }) => {
    // Covers: REQ-F-002-AC1
    await page.goto(URL);
    await expect(page.locator('button')).toHaveCount(1);
    await expect(btn(page)).toBeVisible();
    await expect(btn(page)).toBeEnabled();
  });

  test('AC-F-004-1 output empty before any click', async ({ page }) => {
    // Covers: REQ-F-004-AC1
    await page.goto(URL);
    await expect(out(page)).toHaveText('');
  });

  test('AC-F-003-1 click shows current time', async ({ page }) => {
    // Covers: REQ-F-003-AC1
    await page.clock.install({ time: new Date('2030-01-02T03:04:05') });
    await page.goto(URL);
    await btn(page).click();
    const expected = await page.evaluate(() => new Date().toLocaleTimeString());
    await expect(out(page)).toHaveText(expected);
    await expect(out(page)).toContainText(/\d/);
  });

  test('AC-F-003-2 re-click updates to the new time', async ({ page }) => {
    // Covers: REQ-F-003-AC2
    await page.clock.install({ time: new Date('2030-01-02T03:04:05') });
    await page.goto(URL);
    await btn(page).click();
    const first = (await out(page).textContent()) || '';
    expect(first).not.toBe('');
    await page.clock.fastForward('01:00:00');
    await btn(page).click();
    const second = await out(page).textContent();
    expect(second).not.toBe(first);
    expect(second).toBe(await page.evaluate(() => new Date().toLocaleTimeString()));
  });

  test('AC-N-001-1 no network requests while operating', async ({ page }) => {
    // Covers: REQ-N-001-AC1
    const reqs = [];
    page.on('request', (r) => { if (!r.url().startsWith('file://')) reqs.push(r.url()); });
    await page.goto(URL);
    await btn(page).click();
    await btn(page).click();
    expect(reqs).toEqual([]);
    await expect(page.getByTestId('greeting')).toHaveText('Hello ERH');
  });

  test('AC-N-003-1 output has aria-live=polite', async ({ page }) => {
    // Covers: REQ-N-003-AC1
    await page.goto(URL);
    await expect(out(page)).toHaveAttribute('aria-live', 'polite');
  });

  test('AC-N-003-2 Enter shows time; Space too', async ({ page }) => {
    // Covers: REQ-N-003-AC2
    await page.goto(URL);
    await btn(page).focus();
    await page.keyboard.press('Enter');
    await expect(out(page)).not.toHaveText('');
    await page.reload();
    await expect(out(page)).toHaveText('');
    await btn(page).focus();
    await page.keyboard.press('Space');
    await expect(out(page)).not.toHaveText('');
  });
});
