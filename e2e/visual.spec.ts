import { type Page, expect, test } from '@playwright/test';

/* What the reader sees at fixed points of the scroll. The page's state is a pure
   function of the scroll position, so scrolling there is enough to reproduce it. */

const STOPS = [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1];

async function scrollToShare(page: Page, share: number) {
  await page.evaluate((share) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo({ top: Math.round(max * share), behavior: 'instant' });
  }, share);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

async function open(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
}

for (const share of STOPS) {
  test(`the page at ${share * 100}% of the scroll`, async ({ page }) => {
    await open(page);
    await expect(page.locator('.stage')).toBeVisible();
    await scrollToShare(page, share);
    await expect(page).toHaveScreenshot(`scroll-${share * 100}.png`);
  });
}

for (const share of [0, 0.5]) {
  test(`the page under reduced motion at ${share * 100}% of the scroll`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await scrollToShare(page, share);
    await expect(page).toHaveScreenshot(`still-${share * 100}.png`);
  });
}
