const { chromium, expect } = require('@playwright/test');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: process.env.TEST_BROWSER || 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(() => {
      localStorage.setItem('stock-watchlist:v1', JSON.stringify({ 庫存: [] }));
      localStorage.setItem('stock-watchlist-fx-top-migrated:v1', 'true');
      localStorage.setItem('stock-watchlist-default-stock-migrated:v1', 'true');
    });
    const symbols = { NVIDIA: 'NVDA', NVDIA: 'NVDA', Apple: 'AAPL', Microsoft: 'MSFT', Tesla: 'TSLA', QQQ: 'QQQ', Amazon: 'AMZN' };
    const quoteRequests = [];
    let failQuote = false;
    await page.route('**/api/**', async route => {
      const url = new URL(route.request().url());
      let body = { success: true, data: [] };
      if (url.pathname === '/api/auth/session') body = {};
      if (url.pathname === '/api/market/search') {
        const query = url.searchParams.get('query');
        const symbol = symbols[query] || query.toUpperCase();
        // A stale or synthetic literal candidate must not override a real name match.
        body.data = [
          { symbol: query.toUpperCase(), assetId: `candidate:${query}`, assetType: 'us_stock', description: '美股 symbol candidate' },
          { symbol, assetId: `us_stock:美股:${symbol}`, assetType: 'us_stock', displayName: query, description: 'Nasdaq' },
        ];
      }
      if (url.pathname === '/api/stock/quote') {
        const symbol = url.searchParams.get('symbol');
        quoteRequests.push(symbol);
        if (failQuote) return route.fulfill({ status: 502, json: { success: false } });
        body.data = { symbol, name: symbol, price: 100, currency: 'USD' };
      }
      if (url.pathname === '/api/stock/quotes-batch' || url.pathname === '/api/market/quotes') body.data = {};
      if (url.pathname === '/api/stock/details') body.data = { history: [], news: [] };
      await route.fulfill({ json: body });
    });
    await page.goto(`${process.env.TEST_BASE_URL || 'http://127.0.0.1:3000'}/market-watch`);
    for (const query of ['NVDIA', 'Apple', 'Microsoft', 'Tesla', 'QQQ']) {
      await page.getByRole('button', { name: '新增標的', exact: true }).click();
      await page.getByLabel('股票名稱或代號', { exact: true }).fill(query);
      await page.getByRole('button', { name: '新增', exact: true }).click();
      await expect(page.getByLabel('股票名稱或代號', { exact: true })).toHaveCount(0);
      assert.equal(quoteRequests.at(-1), symbols[query]);
    }
    await page.getByRole('button', { name: '新增標的', exact: true }).click();
    await page.getByLabel('股票名稱或代號', { exact: true }).fill('RETRY');
    failQuote = true;
    await page.getByRole('button', { name: '新增', exact: true }).click();
    await expect(page.getByText('無法取得報價，請確認名稱或代號，或稍後重試', { exact: true })).toBeVisible();
    failQuote = false;
    await page.getByRole('button', { name: '新增', exact: true }).click();
    await expect(page.getByLabel('股票名稱或代號', { exact: true })).toHaveCount(0);
    assert.equal(quoteRequests.filter(x => x === 'RETRY').length, 2);
    await page.getByRole('button', { name: '新增標的', exact: true }).click();
    await page.getByRole('button', { name: '從 Excel／CSV 批次匯入' }).click();
    await page.locator('#bulkAssets').fill('NVIDIA,美股\nApple,美股\nAmazon,美股');
    const bulkButton = page.getByRole('button', { name: /批次加入/ });
    await bulkButton.click();
    await expect(page.locator('#bulkAssets')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('stock-watchlist:v1'))['庫存'].some(x => x.symbol === 'AMZN'))).toBe(true);
    const lists = await page.evaluate(() => JSON.parse(localStorage.getItem('stock-watchlist:v1')));
    assert.ok(lists['庫存'].some(x => x.symbol === 'NVDA'));
    assert.ok(lists['庫存'].some(x => x.symbol === 'AMZN'));
    assert.ok(!lists['庫存'].some(x => ['NVIDIA', 'APPLE', 'TESLA', 'NVDIA'].includes(x.symbol)));
    assert.deepEqual(errors, []);
    console.log('PASS: name resolution, ticker/ETF, immediate retry and bulk import');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
