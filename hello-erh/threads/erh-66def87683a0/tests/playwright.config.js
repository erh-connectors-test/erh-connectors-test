const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: '.',
  testMatch: ['e2e/*.spec.js', 'smoke/*.spec.js'],
  use: { browserName: 'chromium' },
  reporter: 'list',
});
