import { type Page, expect, test } from '@playwright/test';

/* The rail is drawn as far as the reader has scrolled; these read what a visitor sees. */

const opacity = (page: Page, selector: string) =>
  page
    .locator(selector)
    .first()
    .evaluate((el) => Number(getComputedStyle(el).opacity));

/** The commit beside a section's anchor (the last node of its rail). */
const commit = (section: string) => `${section} > svg.rail .node:last-child`;

/** Scroll so the top of `selector` sits at `share` of the viewport height. */
async function scrollTopTo(page: Page, selector: string, share: number) {
  await page
    .locator(selector)
    .first()
    .evaluate((el, share) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - innerHeight * share, behavior: 'instant' });
    }, share);
}

/** Vertical distance between a section's commit node and the centre of its anchor. */
const nodeOffset = (page: Page, section: string) =>
  page.locator(section).evaluate((sec) => {
    const nodes = sec.querySelectorAll(':scope > svg.rail .node circle');
    const node = nodes[nodes.length - 1].getBoundingClientRect();
    const anchor = sec.querySelector('[data-anchor]')!.getBoundingClientRect();
    return Math.abs(node.top + node.height / 2 - (anchor.top + anchor.height / 2));
  });

test('the page loads without errors in English and in Vietnamese', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto('/');
  await scrollTopTo(page, '#text-transporter', 0.2);
  await page.goto('/?lang=vi');
  await expect(page.locator('h1')).toHaveText('Một nhóm kỹ sư tự làm công cụ cho mình, và công khai mã nguồn.');
  expect(errors).toEqual([]);
});

test('every heading and paragraph is visible however far the rail is drawn', async ({ page }) => {
  await page.goto('/');
  for (const selector of ['#profile-title', '#ymir .head', '#ymir .tagline', '#principles-title', '#closing-title']) {
    expect(await opacity(page, selector)).toBe(1);
  }
});

test('scrolling to a project draws its lane down to its commit', async ({ page }) => {
  await page.goto('/');
  expect(await opacity(page, commit('#ymir'))).toBe(0);
  await scrollTopTo(page, '#ymir .head', 0.3);
  await expect.poll(() => opacity(page, commit('#ymir'))).toBe(1);
});

test('scrolling back up takes the lane and its commit away again', async ({ page }) => {
  await page.goto('/');
  await scrollTopTo(page, '#ymir .head', 0.3);
  await expect.poll(() => opacity(page, commit('#ymir'))).toBe(1);
  await scrollTopTo(page, '#ymir', 1.2);
  await expect.poll(() => opacity(page, commit('#ymir'))).toBe(0);
});

test('arriving mid-page by a link draws everything above the reader', async ({ page }) => {
  await page.goto('/#ymir');
  /* The jump to the fragment scrolls smoothly, which can be slow on a loaded machine: read the page once it lands. */
  const offset = () => page.locator('#ymir').evaluate((el) => Math.abs(el.getBoundingClientRect().top));
  await expect.poll(offset, { timeout: 15_000 }).toBeLessThan(1);
  await expect.poll(() => opacity(page, commit('#ymir'))).toBe(1);
  await expect.poll(() => opacity(page, commit('#undercroft'))).toBe(1);
});

test('the last commit lands when the page reaches its bottom', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await expect.poll(() => opacity(page, '.end > svg.rail .node')).toBe(1);
});

test('under reduced motion the whole history is drawn from the start', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/is-static/);
  /* Nothing scrolled: the last commits are drawn as soon as the rail is built. */
  await expect.poll(() => opacity(page, '.end > svg.rail .node')).toBe(1);
  await expect.poll(() => opacity(page, commit('#text-transporter'))).toBe(1);
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

test('the contact page rail follows the reader', async ({ page }) => {
  await page.goto('/contact');
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await expect.poll(() => opacity(page, '.end > svg.rail .node')).toBe(1);
});
