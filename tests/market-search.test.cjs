const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, overrides = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports, URL, AbortSignal, fetch: overrides.fetch,
    require: name => overrides[name] || require(name) });
  return exports;
}
const stockSearchResult = (symbol, market) => ({ symbol, assetType: 'us_stock', assetId: `us_stock:${market}:${symbol}`, description: `${market} symbol candidate` });
const directory = [
  'Nasdaq Traded|Symbol|Security Name|ETF|Test Issue',
  'Y|NVDA|NVIDIA Corporation - Common Stock|N|N',
  'Y|AAPL|Apple Inc. - Common Stock|N|N',
  'Y|MSFT|Microsoft Corporation - Common Stock|N|N',
  'Y|TSLA|Tesla, Inc. - Common Stock|N|N',
  'Y|QQQ|Invesco QQQ Trust, Series 1|Y|N',
  'Y|TEST|Apple Test Issue|N|Y',
].join('\n');
const provider = load('lib/market/providers/usSymbolSearch.ts', {
  './jacksuStockAdapter': { stockSearchResult },
  fetch: async () => Response.json({}),
});
const { selectMarketSearchResult } = load('lib/market/resolve-search.ts');
for (const [query, symbol] of [['NVIDIA', 'NVDA'], ['NVDIA', 'NVDA'], ['輝達', 'NVDA'], ['Apple', 'AAPL'], ['Microsoft', 'MSFT'], ['Tesla', 'TSLA'], ['QQQ', 'QQQ'], ['nvda', 'NVDA']]) {
  test(`${query} resolves to ${symbol} when Yahoo is unavailable`, () => {
    const results = provider.searchUsSymbolDirectory(directory, query);
    const match = selectMarketSearchResult(query, [stockSearchResult(query.toUpperCase(), '美股'), ...results]);
    assert.equal(match.symbol, symbol);
    assert.ok(!results.some(item => item.symbol === 'TEST'));
  });
}
test('exact verified ticker takes priority over name matches; direct symbols survive search outages', () => {
  assert.equal(selectMarketSearchResult('NVDA', [{ symbol: 'OTHER', description: 'NVIDIA fund' }, { symbol: 'NVDA', description: 'Nasdaq' }]).symbol, 'NVDA');
  assert.equal(selectMarketSearchResult('brk.b', [stockSearchResult('BRK-B', '美股')]).symbol, 'BRK-B');
  assert.equal(selectMarketSearchResult('unknown name', []), undefined);
});
test('search API falls back to directory and includes Yahoo ETF results', async () => {
  const { GET } = load('app/api/market/search/route.ts', {
    '@/lib/market/providers/usSymbolSearch': { ...provider, searchUsCompanies: async query => provider.searchUsSymbolDirectory(directory, query) },
    '@/lib/market/providers/jacksuStockAdapter': { stockSearchResult },
    '@/lib/market/providers/fxProvider': { normalizeFxSymbol: s => s, defaultFxSearchResults: () => [] },
    '@/lib/market/providers/metalProvider': { normalizeMetalSymbol: s => s, defaultMetalSearchResults: () => [] },
    '@/lib/market/providers/stockMarketProvider': {
      assetTypeToStockMarket: t => t === 'us_stock' ? '美股' : '台股',
      detectStockMarkets: () => ['美股'], normalizeStockSymbol: s => s.toUpperCase(),
    },
    fetch: async url => String(url).includes('q=SPY')
      ? Response.json({ quotes: [{ symbol: 'SPY', quoteType: 'ETF', longname: 'SPDR S&P 500 ETF' }] })
      : new Response('', { status: 429 }),
  });
  for (const [query, expected] of [['NVDIA', 'NVDA'], ['Apple', 'AAPL'], ['SPY', 'SPY']]) {
    const response = await GET({ nextUrl: new URL(`http://localhost/api/market/search?assetType=us_stock&query=${query}`) });
    const { data } = await response.json();
    assert.equal(data[0].symbol, expected);
    assert.notEqual(data[0].description, '美股 symbol candidate');
  }
});
test('directory requests share an in-flight download and cache successful data', async () => {
  let calls = 0;
  const cached = load('lib/market/providers/usSymbolSearch.ts', {
    './jacksuStockAdapter': { stockSearchResult },
    fetch: async () => { calls++; return new Response(directory); },
  });
  const results = await Promise.all(['Apple', 'NVIDIA', 'QQQ'].map(query => cached.searchUsCompanies(query)));
  assert.deepEqual(results.map(items => items[0].symbol), ['AAPL', 'NVDA', 'QQQ']);
  await cached.searchUsCompanies('Tesla');
  assert.equal(calls, 1);
});
test('temporary directory failures are not cached and can be retried immediately', async () => {
  let calls = 0;
  const retry = load('lib/market/providers/usSymbolSearch.ts', {
    './jacksuStockAdapter': { stockSearchResult },
    fetch: async () => ++calls === 1 ? new Response('', { status: 503 }) : new Response(directory),
  });
  assert.equal((await retry.searchUsCompanies('NVIDIA')).length, 0);
  assert.equal((await retry.searchUsCompanies('NVIDIA'))[0].symbol, 'NVDA');
  assert.equal(calls, 2);
});
