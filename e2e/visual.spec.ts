import { type Page, expect, test } from '@playwright/test';

/* What the reader sees at fixed points of the scroll. Once the pen settles, the
   page's state depends only on the scroll position, so scrolling there reproduces it. */

const STOPS = [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1];

/** Scroll there and wait until the pen has caught up and the rail stops moving. */
async function scrollToShare(page: Page, share: number) {
  await page.evaluate((share) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo({ top: Math.round(max * share), behavior: 'instant' });
  }, share);
  let last = '';
  await expect
    .poll(
      async () => {
        const now = await page.evaluate(() =>
          Array.from(document.querySelectorAll<SVGPathElement>('svg.rail path'), (p) => p.style.strokeDashoffset).join()
        );
        const still = now === last;
        last = now;
        return still;
      },
      { intervals: [250] }
    )
    .toBe(true);
}

async function open(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
}

for (const share of STOPS) {
  test(`the page at ${share * 100}% of the scroll`, async ({ page }) => {
    await open(page);
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
