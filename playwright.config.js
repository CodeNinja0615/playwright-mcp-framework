// @ts-check
import { defineConfig } from '@playwright/test';

const isHeadless = true;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'artifacts/playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'artifacts/allure-results' }],
  ],
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://rahulshettyacademy.com',

    /* Run headless by default; set HEADLESS=false for an interactive browser. */
    headless: isHeadless,

    /* Headless browsers have no native window; use a desktop-sized viewport instead. */
    viewport: isHeadless ? { width: 1920, height: 1080 } : null,

    /* Allow test environments with self-signed or otherwise invalid certificates. */
    ignoreHTTPSErrors: true,

    /* Grant the browser permissions commonly requested by web applications. */
    permissions: [
      'camera',
      'clipboard-read',
      'clipboard-write',
      'geolocation',
      'microphone',
      'notifications',
    ],

    /* Let headed Chromium use the maximized native window dimensions. */
    launchOptions: {
      args: ['--start-maximized'],
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        viewport: isHeadless ? { width: 1920, height: 1080 } : null,
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

