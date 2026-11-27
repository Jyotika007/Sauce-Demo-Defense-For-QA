import { defineConfig, devices } from '@playwright/test';

// The site under test can be overridden without touching code: BASE_URL=https://... npx playwright test
const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com';

export default defineConfig({
  testDir: './automation/tests',
  outputDir: 'evidence/test-results',

  // Tests are independent, so run them in parallel. One retry locally and two on CI
  // separate real defects (fail every time) from flaky runs (pass on retry).
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,

  timeout: 30_000,
  expect: { timeout: 5_000 },

  // The HTML report is the execution report; the list reporter prints progress in the terminal.
  reporter: [['list'], ['html', { outputFolder: 'evidence/report', open: 'never' }]],

  // Debug evidence: screenshot on failure, full trace when a test is retried.
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
