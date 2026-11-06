const { chromium, expect } = require('@playwright/test');
const assert = require('node:assert/strict');

// Hold responses until the assertions release them: this covers arbitrarily
// slow networks without depending on a fixed sleep or a live market provider.
const gate = () => {
  let release;
  const promise = new Promise(resolve => { release = resolve; });
  return { promise, release };
};
const history = years => Array.from({ length: years * 365 + 1 }, (_, i) => {
  const date = new Date(Date.UTC(2026 - years, 10, 6 + i)).toISOString().slice(0, 10);
  return { date, open: 100 + i, high: 102 + i, low: 99 + i, close: 101 + i, volume: 1000 };
});

(async () => {
  const browser = await chromium.launch({ channel: process.env.TEST_BROWSER || 'chrome', headless: true });
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => {
        localStorage.setItem('stock-watchlist:v1', JSON.stringify({ '庫存': [{ symbol: '2330', market: '台股' }] }));
        localStorage.setItem('stock-watchlist-fx-top-migrated:v1', 'true');
        localStorage.setItem('stock-watchlist-default-stock-migrated:v1', 'true');
      });
      const quotes = gate(), initialHistory = gate(), news = gate(), failedThree = gate(), retryThree = gate(), five = gate();
      const counts = { 1: 0, 3: 0, 5: 0, metadata: 0 };
      const quote = { symbol: '2330', name: '台積電', price: 100, currency: 'TWD', sparkline: [99, 100] };
      await page.route('**/api/**', async route => {
        const url = new URL(route.request().url());
        let body = { success: true, data: [] };
        if (url.pathname === '/api/auth/session') body = {};
        if (url.pathname === '/api/stock/quotes-batch') {
          await quotes.promise;
          body.data = { '2330|台股': quote };
        }
        if (url.pathname === '/api/stock/details') {
          if (url.searchParams.get('metadataOnly') === '1') {
            counts.metadata++;
            await news.promise;
            body.data = { quote, news: [] };
          } else {
            assert.equal(url.searchParams.get('historyOnly'), '1');
            const years = Number(url.searchParams.get('years'));
            counts[years]++;
            if (years === 1) await initialHistory.promise;
            if (years === 3) await (counts[3] === 1 ? failedThree : retryThree).promise;
            if (years === 5) await five.promise;
            body.data = { history: years === 3 && counts[3] === 1 ? [] : history(years), historyYears: years };
          }
        }
        await route.fulfill({ json: body });
      });
      await page.goto(`${process.env.TEST_BASE_URL || 'http://127.0.0.1:3000'}/market-watch`);
      const card = page.getByRole('button', { name: /TW 2330/ });
      await expect(card.getByRole('status')).toHaveText('報價載入中…');
      quotes.release();
      await expect(card.getByText('台積電', { exact: true })).toBeVisible();
      await expect(card.getByText('無法取得資料')).toHaveCount(0);
      await expect(card.getByText('走勢載入中…')).toBeVisible();
      await page.screenshot({ path: `/tmp/stock-card-pending-${width}.png` });
      await card.click();
      const chart = page.getByLabel('歷史走勢圖', { exact: true });
      await expect(chart).toHaveAttribute('aria-busy', 'true');
      await expect(chart.getByRole('status')).toHaveText('正在載入 1Y 歷史走勢…');
      await expect(page.getByText('相關新聞載入中…')).toBeVisible();
      assert.equal(counts[1], 1, 'card and modal must share in-flight history');
      initialHistory.release();
      await expect(chart.locator('div.h-72 > svg')).toBeVisible();
      await expect(page.getByText('相關新聞載入中…')).toBeVisible();
      await page.getByRole('button', { name: '3Y', exact: true }).click();
      await expect(chart.getByRole('status')).toHaveText('正在載入 3Y 歷史走勢…');
      await expect(chart.locator('div.h-72 > svg')).toHaveCount(0);
      await page.screenshot({ path: `/tmp/stock-chart-pending-${width}.png` });
      failedThree.release();
      await expect(chart.getByText('暫時無法取得 3Y 歷史走勢，請稍後重試。')).toBeVisible();
      await chart.getByRole('button', { name: '重新載入走勢' }).click();
      await expect(chart).toHaveAttribute('aria-busy', 'true');
      await expect.poll(() => counts[3]).toBe(2);
      await page.getByRole('button', { name: '5Y', exact: true }).click();
      await expect(chart.getByRole('status')).toHaveText('正在載入 5Y 歷史走勢…');
      five.release();
      await expect(chart.locator('div.h-72 > svg')).toBeVisible();
      await expect(chart.getByText('5Y', { exact: true })).toBeVisible();
      const geometry = await chart.locator('div.h-72 > svg').innerHTML();
      retryThree.release();
      news.release();
      await expect(page.getByText('相關新聞載入中…')).toHaveCount(0);
      assert.equal(await chart.locator('div.h-72 > svg').innerHTML(), geometry, 'late 3Y response cannot replace 5Y chart');
      for (const period of ['1Y', '3Y', '5Y']) {
        await page.getByRole('button', { name: period, exact: true }).click();
        await expect(chart).toHaveAttribute('aria-busy', 'false');
        await expect(chart.locator('div.h-72 > svg')).toBeVisible();
      }
      assert.deepEqual(counts, { 1: 1, 3: 2, 5: 1, metadata: 1 }, 'shorter periods must reuse the loaded 5Y data; news fetched once');
      await page.getByRole('dialog').getByRole('button', { name: '關閉', exact: true }).click();
      await card.click();
      await expect(chart.locator('div.h-72 > svg')).toBeVisible();
      assert.equal(counts[1], 1, 'reopening a card must reuse history');
      await page.screenshot({ path: `/tmp/stock-loading-${width}.png`, fullPage: false });
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: delayed quotes/history/news, shared request, period loading, retry, out-of-order responses, cache and reopen`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
