// L4 smoke: open via file://, see greeting + button, one click shows time.
const { test, expect } = require('@playwright/test');
const { URL } = require('../support/paths');
test('smoke: page opens and time shows after one click', async ({ page }) => {
  // Covers: REQ-F-001-AC1, REQ-F-002-AC1, REQ-F-003-AC1
  await page.goto(URL);
  await expect(page.getByTestId('greeting')).toHaveText('Hello ERH');
  await page.getByTestId('show-time-button').click();
  await expect(page.getByTestId('time-output')).not.toHaveText('');
});
