const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function handler(fetch) {
  const code = ts.transpileModule(fs.readFileSync('app/api/stock/details/route.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports, fetch, URL, AbortSignal,
    require: name => name === '@/lib/market/providers/yahooStockFallback'
      ? { fetchYahooStockQuote: async () => ({ price: 100 }) } : require(name),
  });
  return query => exports.GET({ nextUrl: new URL(`http://localhost/api/stock/details?symbol=QQQ&market=${encodeURIComponent('美股')}&${query}`) });
}

test('metadata-only requests never start primary or fallback historical requests', async () => {
  const urls = [];
  const get = handler(async input => {
    const url = new URL(input); urls.push(url.pathname);
    assert.ok(url.pathname === '/api/stock/quote' || url.pathname.startsWith('/api/news/'));
    return Response.json({ data: url.pathname === '/api/stock/quote' ? { price: 100 } : [] });
  });
  const response = await get('metadataOnly=1');
  assert.equal(response.status, 200);
  assert.equal(urls.length, 2);
  const { data } = await response.json();
  assert.deepEqual(data.history, []);
  assert.equal(data.quote.price, 100);
});

test('history-only requests fetch history without fetching news or quotes', async () => {
  const get = handler(async input => {
    assert.equal(new URL(input).pathname, '/api/stock');
    return Response.json({ chart: { result: [{ timestamp: [1700000000], indicators: { quote: [{ close: [100] }] } }] } });
  });
  const { data } = await (await get('historyOnly=1&years=3')).json();
  assert.equal(data.history.length, 1);
  assert.equal(data.historyYears, 3);
  assert.equal(data.quote, null);
  assert.deepEqual(data.news, []);
});
