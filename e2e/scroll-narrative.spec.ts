import { type Page, expect, test } from '@playwright/test';

/* The page is drawn as far as the reader has scrolled; these read what a visitor sees. */

const opacity = (page: Page, selector: string) =>
  page
    .locator(selector)
    .first()
    .evaluate((el) => Number(getComputedStyle(el).opacity));

/** Scroll so the top of `selector` sits at `share` of the viewport height, then let a frame render. */
async function scrollTopTo(page: Page, selector: string, share: number) {
  await page
    .locator(selector)
    .first()
    .evaluate((el, share) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - innerHeight * share, behavior: 'instant' });
    }, share);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

/** Vertical distance between a section's commit node and the centre of its anchor. */
const nodeOffset = (page: Page, section: string) =>
  page.locator(section).evaluate((sec) => {
    const nodes = sec.querySelectorAll(':scope > svg.rail .node circle');
    const node = nodes[nodes.length - 1].getBoundingClientRect();
    const anchor = sec.querySelector('[data-anchor]')!.getBoundingClientRect();
    return Math.abs(node.top + node.height / 2 - (anchor.top + anchor.height / 2));
  });

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
}

test('the page loads without errors in English and in Vietnamese', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  await scrollTopTo(page, '#text-transporter', 0.2);
  await page.goto('/?lang=vi');
  await expect(page.locator('h1')).toHaveText('Một nhóm kỹ sư tự làm công cụ cho mình, và công khai mã nguồn.');
  expect(errors).toEqual([]);
});

test('scrolling to a project lands its commit and brings in its name', async ({ page }) => {
  await page.goto('/');
  await scrollTopTo(page, '#ymir .head', 0.3);
  await expect.poll(() => opacity(page, '#ymir .head')).toBe(1);
  await expect.poll(() => opacity(page, '#ymir svg.rail .node:last-child')).toBe(1);
});

test('scrolling back up takes the commit and the name away again', async ({ page }) => {
  await page.goto('/');
  await scrollTopTo(page, '#ymir .head', 0.3);
  await scrollTopTo(page, '#ymir .head', 0.95);
  await expect.poll(() => opacity(page, '#ymir .head')).toBe(0);
  await expect.poll(() => opacity(page, '#ymir svg.rail .node:last-child')).toBe(0);
});

test('arriving mid-page by a link shows everything above the reader in place', async ({ page }) => {
  await page.goto('/#ymir');
  /* The jump to the fragment scrolls smoothly, which can be slow on a loaded machine: read the page once it lands. */
  const offset = () => page.locator('#ymir').evaluate((el) => Math.abs(el.getBoundingClientRect().top));
  await expect.poll(offset, { timeout: 15_000 }).toBeLessThan(1);
  await expect.poll(() => opacity(page, '#ymir .head')).toBe(1);
  await expect.poll(() => opacity(page, '#undercroft .tagline')).toBe(1);
});

test('under reduced motion the history is drawn in full and nothing waits to arrive', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-overture]')).toBeHidden();
  for (const selector of ['#profile-title', '#text-transporter .tagline', '#principles-title']) {
    expect(await opacity(page, selector)).toBe(1);
  }
  expect(await opacity(page, '.end svg.rail .node')).toBe(1);
});

test('the 3D overture hands over to the flat rail, and takes it back on the way up', async ({ page }, info) => {
  test.skip(info.project.name === 'phone', 'the hand-over is the same code at every size');
  await page.goto('/');
  await expect(page.locator('.stage')).toBeVisible();
  await scrollTopTo(page, '#what-we-build', 0.5);
  await expect(page.locator('.stage')).toBeHidden();
  expect(await opacity(page, '.profile svg.rail')).toBe(1);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.locator('.stage')).toBeVisible();
});

test('Explore the projects leads to the project index', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore the projects' }).click();
  await expect(page).toHaveURL(/#what-we-build$/);
  await expect(page.locator('#what-we-build')).toBeInViewport();
});

test('Contact the team opens the contact page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact the team' }).click();
  await expect(page).toHaveURL(/\/contact\/?$/);
  await expect(page.locator('h1')).toHaveText('Talk to the team.');
});

test('switching to Vietnamese keeps every commit on its heading', async ({ page }) => {
  await page.goto('/');
  await scrollTopTo(page, '#undercroft', 0);
  await page.getByRole('button', { name: 'VI' }).click();
  await expect(page.locator('#profile-title')).toHaveText('Làm cho công việc của mình trước.');
  /* The switch is in the header, so clicking it scrolled to the top; read the commits where they have landed. */
  await scrollTopTo(page, '#undercroft', 0);
  await expect.poll(() => nodeOffset(page, '.profile')).toBeLessThan(1.5);
  await expect.poll(() => nodeOffset(page, '#undercroft')).toBeLessThan(1.5);
});

test('resizing from desktop to phone keeps commits on their headings without sideways scroll', async ({
  page,
}, info) => {
  test.skip(info.project.name === 'phone', 'starts at desktop size');
  await page.goto('/');
  await scrollTopTo(page, '#undercroft', 0);
  await page.setViewportSize({ width: 390, height: 844 });
  await scrollTopTo(page, '#undercroft', 0);
  await expect.poll(() => nodeOffset(page, '#undercroft')).toBeLessThan(1.5);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBe(0);
});

test('the contact page has no overture and its rail follows the reader', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('[data-overture]')).toHaveCount(0);
  const last = '.path:last-of-type svg.rail .node:last-child';
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await expect.poll(() => opacity(page, last)).toBe(1);
});

test('a repository link reached by keyboard is shown in place before its heading has arrived', async ({ page }) => {
  await page.goto('/');
  /* On screen but still below the draw head, as a link is when Tab reaches it near the bottom edge. */
  await scrollTopTo(page, '#text-transporter .head', 0.85);
  expect(await opacity(page, '#text-transporter .head')).toBe(0);
  await page.locator('#text-transporter .chip').evaluate((el: HTMLElement) => el.focus({ preventScroll: true }));
  await expect.poll(() => opacity(page, '#text-transporter .head')).toBe(1);
});
