const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');

// Run against a local server: node tests/stock-chart-ui.cjs
// Deterministic prices make a wrong date/price projection detectable numerically.
const history = Array.from({ length: 1461 }, (_, index) => {
  const date = new Date(Date.UTC(2022, 10, 6 + index)).toISOString().slice(0, 10);
  const close = 500 + index * 2 + Math.sin(index / 30) * 40;
  return { date, open: close - 1, high: close + 2, low: close - 2, close, volume: 1000 };
});
const selectedHistory = (months) => {
  const start = new Date(history.at(-1).date);
  start.setMonth(start.getMonth() - months);
  return history.filter(point => Date.parse(point.date) >= start.getTime());
};
const fit = (points) => {
  const meanX = (points.length - 1) / 2;
  const meanY = points.reduce((sum, point) => sum + point.close, 0) / points.length;
  const slope = points.reduce((sum, point, i) => sum + (i - meanX) * (point.close - meanY), 0) /
    points.reduce((sum, _, i) => sum + (i - meanX) ** 2, 0);
  return (i) => meanY + slope * (i - meanX);
};

(async () => {
  const browser = await chromium.launch({ channel: process.env.TEST_BROWSER || 'chrome', headless: true });
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.clock.install({ time: new Date('2026-11-06T02:00:00Z') });
      let quotes = 0, details = 0;
      await page.route('**/api/**', route => {
        const path = new URL(route.request().url()).pathname;
        const quote = { symbol: '2330', name: '台積電', price: 3420 + quotes, currency: 'TWD', sparkline: [3300, 3400] };
        let data = { success: true, data: [] };
        if (path === '/api/auth/session') data = {};
        if (path === '/api/stock/quotes-batch') { quotes++; data = { success: true, data: { '2330|台股': quote } }; }
        if (path === '/api/stock/details') { details++; data = { success: true, data: { quote, history, news: [] } }; }
        return route.fulfill({ json: data });
      });
      await page.goto(`${process.env.TEST_BASE_URL || 'http://localhost:3000'}/market-watch`);
      await page.getByRole('button', { name: /TW 2330/ }).click();
      await page.getByRole('button', { name: /樂活五線譜|五線譜/ }).click();
      const chart = page.locator('div.h-72').last();
      await chart.locator('svg g').filter({ hasText: '零線' }).waitFor();
      const read = () => chart.evaluate(el => {
        const groups = Array.from(el.querySelectorAll('svg > g'));
        const zero = groups.find(g => g.textContent.includes('零線'));
        const ticks = groups.filter(g => /^[-\d,.]+$/.test(g.textContent.trim()) && g.querySelector('line'));
        const axis = ticks.slice(0, 2).map(g => ({ price: Number(g.textContent.replaceAll(',', '')), y: Number(g.querySelector('line').getAttribute('y1')) }));
        const candles = groups.filter(g => g.querySelector('rect') && g.querySelector('line') && !g.textContent.trim());
        const line = zero.querySelector('line');
        return {
          axis, count: candles.length,
          closeY: Number(candles[0].querySelector('rect').getAttribute('y')),
          startY: Number(line.getAttribute('y1')), endY: Number(line.getAttribute('y2')),
          texts: groups.map(g => g.textContent),
        };
      });
      const checkAlignment = (state, months) => {
        const [a, b] = state.axis;
        const priceAt = y => a.price + (y - a.y) * (b.price - a.price) / (b.y - a.y);
        const points = selectedHistory(months);
        const firstClose = priceAt(state.closeY);
        const firstIndex = points.findIndex(p => Math.abs(p.close - firstClose) < 0.01);
        assert.ok(firstIndex >= 0, 'first visible candle must match a source price');
        const model = fit(points);
        assert.ok(Math.abs(priceAt(state.startY) - model(firstIndex)) < 0.01, 'line and first candle must use the same date');
        assert.ok(Math.abs(priceAt(state.endY) - model(firstIndex + state.count - 1)) < 0.01, 'line and last candle must use the same date');
      };
      const full = await read();
      checkAlignment(full, 42);
      const box = await chart.boundingBox();
      await page.mouse.move(box.x + box.width * 0.5, box.y + 140);
      await page.mouse.wheel(0, -800);
      await page.waitForTimeout(200);
      const zoomed = await read();
      assert.ok(zoomed.count < full.count, 'zoom must reduce visible candles');
      checkAlignment(zoomed, 42);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.7, box.y + 140, { steps: 5 });
      await page.mouse.up();
      let panned = await read();
      checkAlignment(panned, 42);
      assert.notDeepEqual(panned.texts, zoomed.texts, 'pan must move dates');
      if (width === 390) {
        const touches = (left, right) => [
          { identifier: 1, clientX: box.x + left, clientY: box.y + 140 },
          { identifier: 2, clientX: box.x + right, clientY: box.y + 140 },
        ];
        await chart.dispatchEvent('touchstart', { touches: touches(100, 180) });
        await chart.dispatchEvent('touchmove', { touches: touches(60, 220) });
        await chart.dispatchEvent('touchend', { touches: [] });
        const pinched = await read();
        assert.ok(pinched.count < panned.count, 'two-finger pinch must zoom');
        checkAlignment(pinched, 42);
        await chart.dispatchEvent('touchstart', { touches: touches(60, 220) });
        await chart.dispatchEvent('touchmove', { touches: touches(80, 240) });
        await chart.dispatchEvent('touchend', { touches: [] });
        panned = await read();
        checkAlignment(panned, 42);
        assert.notDeepEqual(panned.texts, pinched.texts, 'two-finger pan must move dates');
      }
      const requestsBefore = details, quotesBefore = quotes;
      await page.clock.fastForward(65_000);
      await page.waitForTimeout(300);
      assert.ok(quotes > quotesBefore, 'background quote interval must actually run');
      assert.equal(details, requestsBefore, 'quote refresh must not refetch historical details');
      assert.deepEqual(await read(), panned, 'refresh must preserve chart viewport and geometry');
      await page.getByRole('button', { name: '6M', exact: true }).click();
      await page.waitForTimeout(300);
      const sixMonths = await read();
      checkAlignment(sixMonths, 6);
      assert.equal(sixMonths.count, selectedHistory(6).length, 'period switch must reset zoom');
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: period fit, zoom and pan date alignment, 65s quote refresh, period switch`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
