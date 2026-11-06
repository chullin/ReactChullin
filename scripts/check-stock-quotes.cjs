const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const modules = new Map();
function load(relative) {
  const file = path.resolve(root, relative);
  if (modules.has(file)) return modules.get(file).exports;
  const module = { exports: {} };
  modules.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const requireLocal = (id) => {
    if (id === 'next/server') return { NextResponse: { json: (body, init) => ({ body, status: init?.status ?? 200 }) } };
    if (id.startsWith('@/')) return load(id.slice(2) + '.ts');
    if (id.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(file), id)) + '.ts');
    return require(id);
  };
  new Function('require', 'module', 'exports', code)(requireLocal, module, module.exports);
  return module.exports;
}
const row = { c: '2330', ex: 'tse', n: '台積電', d: '20261106', t: '12:51:55', z: '-', y: '2240', o: '2020', trade: { z: '2145', t: '12:51:30' } };
const response = (body, status = 200) => ({ ok: status === 200, status, json: async () => body });
async function main() {
  const { parseTaiwanStockQuote, fetchTaiwanStockQuote } = load('lib/market/providers/twStockQuote.ts');
  const parsed = parseTaiwanStockQuote(row);
  assert.equal(parsed.price, 2145);
  assert.equal(parsed.change, -95);
  assert.equal(parsed.updatedAt, '2026-11-06T04:51:30.000Z');
  assert.equal(parseTaiwanStockQuote({ ...row, z: '2150' }).price, 2150);
  assert.equal(parseTaiwanStockQuote({ ...row, z: '2150' }).updatedAt, '2026-11-06T04:51:55.000Z');
  assert.equal(parseTaiwanStockQuote({ ...row, y: '' }).previousClose, null);
  assert.equal(parseTaiwanStockQuote({ ...row, trade: undefined }), null);
  assert.equal(parseTaiwanStockQuote({ ...row, d: '' }), null);
  assert.equal(parseTaiwanStockQuote({ ...row, c: '6488', ex: 'otc' }).symbol, '6488.TWO');
  const calls = [];
  global.fetch = async (url) => {
    calls.push(String(url));
    assert.match(String(url), /mis\.twse\.com\.tw/);
    return response({ msgArray: [row] });
  };
  assert.equal((await fetchTaiwanStockQuote('2330.TW')).price, 2145);
  assert.equal(await fetchTaiwanStockQuote('bad&symbol'), null);
  const { fetchYahooStockQuote } = load('lib/market/providers/yahooStockFallback.ts');
  assert.equal((await fetchYahooStockQuote('2330', '台股')).dataSource, 'TWSE MIS');
  const batch = await load('app/api/stock/quotes-batch/route.ts').GET({ nextUrl: new URL('http://localhost/api/stock/quotes-batch?stocks=' + encodeURIComponent('2330:台股')) });
  assert.equal(batch.body.data['2330|台股'].price, 2145);
  const single = await load('app/api/stock/quote/route.ts').GET({ nextUrl: new URL('http://localhost/api/stock/quote?symbol=2330&market=' + encodeURIComponent('台股')) });
  assert.equal(single.body.data.price, 2145);
  assert.ok(calls.every(url => !url.includes('jacksu')));
  global.fetch = async (url) => String(url).includes('openapi.twse')
    ? response([{ Code: '2330', Name: '台積電', ClosingPrice: '2240', Change: '-20', Date: '1151105' }])
    : response({}, 429);
  const fallback = await fetchYahooStockQuote('2330', '台股');
  assert.equal(fallback.price, 2240);
  assert.equal(fallback.fromCache, true);
  assert.equal(fallback.updatedAt, '2026-11-05T05:30:00.000Z');
  assert.deepEqual(fallback.sparkline, [2240], 'missing OHLC values must not become zero');
  console.log('PASS: MIS last execution, timestamps, missing fields, OTC, single/batch APIs, source priority, and dated closing fallback');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
