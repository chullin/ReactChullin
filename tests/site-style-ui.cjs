// Run against a local production build: TEST_BASE_URL=http://127.0.0.1:3200 node tests/site-style-ui.cjs
const { chromium, expect } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
const screenshotDir = process.env.STYLE_SCREENSHOT_DIR;
const routes = [
  '/', '/blog', '/projects', '/about', '/hub', '/contact', '/demo',
  '/flashcards', '/vocab-quiz', '/snake', '/tetris-battle', '/video-player',
  '/image-compressor', '/trading-cost', '/stock-health', '/market-explorer',
  '/market-watch', '/memory', '/temporary-files', '/temporary-files/privacy',
  '/market-watch/privacy', '/qr-transfer', '/qr-transfer/send',
  '/qr-transfer/receive', '/qr-transfer/transfers', '/blog/js/ep01-js-basics',
];
const redirects = {
  '/post': '/blog',
  '/segmented-video-player': '/video-player',
  '/tool/stock/stock-watchlist': '/market-watch',
};

(async () => {
  const browser = await chromium.launch({ channel: process.env.TEST_BROWSER || 'chrome', headless: true });
  if (screenshotDir) fs.mkdirSync(screenshotDir, { recursive: true });
  try {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 } });
      await context.addInitScript(() => {
        localStorage.setItem('reactchullin-language-prompt-dismissed', 'true');
        // An existing profile must hydrate without replacing the server-rendered page.
        if (!localStorage.getItem('reactchullin-user-memory:v1')) {
          localStorage.setItem('reactchullin-user-memory:v1', JSON.stringify({
            version: 1, enabled: true, events: [], memories: [{
              id: 'style-review', title: '版型驗證記憶', detail: '保留既有本機記憶',
              category: 'preference', source: 'manual', confidence: 1, pinned: false,
              createdAt: '2026-11-01T00:00:00Z', updatedAt: '2026-11-01T00:00:00Z',
            }],
          }));
        }
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const route of [...routes, ...Object.keys(redirects)]) {
        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
        assert.equal(response.status(), 200, route);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).toBeVisible();
        await page.waitForTimeout(650);
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), { message: `${route} horizontal overflow` }).toBeLessThanOrEqual(1);
        const layout = await page.evaluate(() => {
          const heading = document.querySelector('h1');
          const rect = heading.getBoundingClientRect();
          return {
            viewport: document.documentElement.clientWidth,
            width: document.documentElement.scrollWidth,
            titleSize: parseFloat(getComputedStyle(heading).fontSize),
            sharedTitle: heading.classList.contains('site-title'),
            titleRight: rect.right,
          };
        });
        assert.ok(layout.width <= layout.viewport + 1, `${route} overflows at ${width}px: ${layout.width}`);
        assert.ok(layout.titleSize >= (layout.sharedTitle ? 36 : 24), `${route} is missing its heading styles`);
        assert.ok(layout.titleRight <= width + 1, `${route} title is clipped`);
        if (redirects[route]) assert.equal(new URL(page.url()).pathname, redirects[route]);
        if (route === '/tetris-battle') {
          for (const label of ['Hold', 'Score', 'Level', 'Lines']) {
            const rect = await page.getByText(label, { exact: true }).first().boundingBox();
            assert.ok(rect.x >= 24 && rect.x + rect.width <= width - 24, `Tetris ${label} is clipped`);
          }
          const board = await page.locator('main canvas').first().evaluate(el => {
            const rect = el.getBoundingClientRect();
            return { left: rect.left, right: rect.right, ratio: rect.height / rect.width, expectedRatio: el.height / el.width };
          });
          assert.ok(board.left >= 24 && board.right <= width - 24, 'Tetris board is clipped');
          assert.ok(Math.abs(board.ratio - board.expectedRatio) < 0.01, 'Tetris board is distorted');
        }
        if (route === '/memory') await expect(page.getByText('版型驗證記憶', { exact: true })).toBeVisible();
        if (route === '/contact') {
          // HeroUI flat variants must use our warm palette, including intermediate shades.
          const color = await page.locator('main a[href="https://github.com/chullin"]').evaluate(el => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = getComputedStyle(el).color;
            ctx.fillRect(0, 0, 1, 1);
            return Array.from(ctx.getImageData(0, 0, 1, 1).data);
          });
          assert.ok(color[0] > color[2], 'flat primary links must be orange');
        }
        if (screenshotDir) {
          const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
          await page.screenshot({ path: path.join(screenshotDir, `${width}-${name}.png`) });
        }
      }
      assert.deepEqual(errors, [], `browser errors at ${width}px`);
      console.log(`PASS: ${routes.length + Object.keys(redirects).length} routes at ${width}px; headings, styles, overflow, redirects and hydration`);
      await context.close();
    }

    const compactPage = await browser.newPage();
    await compactPage.addInitScript(() => localStorage.setItem('reactchullin-language-prompt-dismissed', 'true'));
    for (const width of [320, 1024]) {
      await compactPage.setViewportSize({ width, height: 1000 });
      for (const route of ['/tetris-battle', '/flashcards']) {
        await compactPage.goto(`${baseUrl}${route}`);
        await expect.poll(() => compactPage.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
        if (screenshotDir) await compactPage.screenshot({ path: path.join(screenshotDir, `${width}-${route.slice(1)}.png`) });
      }
    }
    await compactPage.close();
    console.log('PASS: game and learning layouts at 320px and 1024px');

    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => localStorage.setItem('reactchullin-language-prompt-dismissed', 'true'));
    await page.goto(`${baseUrl}/flashcards`);
    await page.getByRole('button', { name: /^簡單/ }).click();
    await expect(page.getByRole('heading', { name: '選擇學習模式' })).toBeVisible();
    await page.getByRole('button', { name: /瀏覽模式/ }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('每日單字卡');
    await expect(page.getByRole('button', { name: /返回|退出/ }).first()).toBeVisible();

    await page.goto(`${baseUrl}/vocab-quiz`);
    await page.getByRole('button', { name: /^簡單/ }).click();
    await expect(page.getByText('設定您的測驗偏好')).toBeVisible();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'quiz setup overflows');
    await page.getByRole('button', { name: '返回選擇難度' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('英文單字測驗');

    await page.goto(`${baseUrl}/qr-transfer/send`);
    await page.locator('input[type="file"]').first().setInputFiles({
      name: 'style-check.txt', mimeType: 'text/plain', buffer: Buffer.from('Local QR style verification'),
    });
    await expect(page.getByRole('img', { name: 'QR transfer frame' })).toBeVisible();
    await page.getByRole('button', { name: 'Start', exact: true }).click();
    await expect(page.getByText('Sending', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    await expect(page.getByText('Paused', { exact: true })).toBeVisible();
    console.log('PASS: mobile flashcard navigation, quiz setup/back, local QR generation and start/pause');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
