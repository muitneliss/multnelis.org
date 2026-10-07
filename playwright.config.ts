import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;

// End-to-end and visual checks against the production build. Visual baselines
// are committed for Linux only (they are generated in Playwright's Docker
// image, see `npm run test:e2e:update`); a local run on another platform
// writes its own baselines, which git ignores.
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  updateSnapshots: process.env.CI ? 'none' : 'missing',
  // The pen eases toward the scroll position; on a busy machine frames come slowly, so allow it time to settle.
  expect: { timeout: 10_000, toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    {
      name: 'phone',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true },
    },
  ],
  webServer: {
    command: `npm run build && node e2e/serve.mjs`,
    env: { PORT: String(PORT) },
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
