const { chromium, expect } = require('@playwright/test');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: process.env.TEST_BROWSER || 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.clock.install({ time: new Date('2026-11-06T02:00:00Z') });
    await page.addInitScript(() => {
      localStorage.setItem('stock-watchlist:v1', JSON.stringify({ '庫存': [
        { symbol: '2330', market: '台股' }, { symbol: 'QQQ', market: '美股' },
      ] }));
      localStorage.setItem('stock-watchlist-fx-top-migrated:v1', 'true');
      localStorage.setItem('stock-watchlist-default-stock-migrated:v1', 'true');
    });
    let batches = 0, historyRequests = 0, historyAvailable = false;
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const history = Array.from({ length: 366 }, (_, i) => {
      const close = 100 + Math.sin(i / 5) * 20;
      return { date: new Date(Date.UTC(2025, 10, 6 + i)).toISOString().slice(0, 10),
        open: close, high: close + 2, low: close - 2, close, volume: 1000 };
    });
    await page.route('**/api/**', route => {
      const url = new URL(route.request().url());
      let data = { success: true, data: [] };
      if (url.pathname === '/api/auth/session') data = {};
      if (url.pathname === '/api/stock/quotes-batch') {
        batches++;
        data.data = Object.fromEntries(['2330|台股', 'QQQ|美股'].map(key => [key, {
          symbol: key.split('|')[0], name: key.split('|')[0], price: 100 + batches / 10,
          previousClose: 99, sparkline: [99, 100 + batches / 10], currency: 'TWD',
        }]));
      }
      if (url.pathname === '/api/stock/details') {
        assert.equal(url.searchParams.get('historyOnly'), '1');
        assert.equal(url.searchParams.get('years'), '1');
        historyRequests++;
        data.data = { history: historyAvailable ? history : [] };
      }
      return route.fulfill({ json: data });
    });
    await page.goto(`${process.env.TEST_BASE_URL || 'http://localhost:3000'}/market-watch`);
    const cards = ['TW 2330', 'US QQQ'].map(name => page.getByRole('button', { name: new RegExp(name) }));
    for (const card of cards) {
      await expect(card.getByText('歷史走勢待補齊')).toBeVisible();
      assert.equal(await card.locator('[title^="位置分數 "]').count(), 0, 'two quotes cannot establish a yearly position');
      assert.equal(await card.locator('svg[viewBox="0 0 100 100"]').count(), 0, 'two quotes must not draw a fake month trend');
    }
    await expect.poll(() => historyRequests).toBeGreaterThanOrEqual(2);
    historyAvailable = true;
    await page.getByRole('button', { name: '重新整理', exact: true }).click();
    for (const card of cards) {
      await expect(card.locator('svg[viewBox="0 0 100 100"] > path')).toHaveCount(6);
      const path = await card.locator('svg[viewBox="0 0 100 100"] > path').last().getAttribute('d');
      assert.ok((path.match(/L /g) || []).length >= 20, 'month trend must contain actual daily history');
      await expect(card.locator('[title^="位置分數 "]')).toHaveCount(1);
      const score = await card.locator('[title^="位置分數 "]').getAttribute('title');
      assert.ok(!/位置分數 (0|100)，/.test(score), 'yearly score must use historical bounds');
    }
    const requestsBefore = historyRequests, batchesBefore = batches;
    await page.clock.fastForward(65_000);
    await expect.poll(() => batches).toBeGreaterThan(batchesBefore);
    assert.equal(historyRequests, requestsBefore, 'cached history must survive 30-second quotes');
    for (const card of cards) {
      await expect(card.locator('svg[viewBox="0 0 100 100"] > path')).toHaveCount(6);
    }
    const cache = await page.evaluate(() => JSON.parse(localStorage.getItem('stock-watchlist-quotes:v1')));
    assert.ok(cache.quotes['2330|台股'].sparkline.length > 20, 'enriched history must persist for page reloads');
    assert.deepEqual(errors, []);
    console.log('PASS: mobile TW/US sparse quotes, honest empty history, retry, real month trend/year score, refresh cache and persistence');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
