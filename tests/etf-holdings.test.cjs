const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadTs(file, fetch, dependencies = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports, require: (name) => dependencies[name] || require(name),
    fetch, URL, AbortSignal,
  }, { filename: file });
  return exports;
}

function page(id, rows, date = '2026/11/05') {
  return `<!-- 持股明細表格 Start --><div class="eTitle">測試基金(${id})-全部持股
    <div id="ctl00_MainContent_sdate3">資料日期：${date}</div></div>
    <table id="ctl00_MainContent_stable3"><thead><tr><th>個股名稱</th><th>投資比例(%)</th><th>持有股數 / 口數</th></tr></thead>
    <tbody>${rows.map(([name, weight, shares]) => `<tr><td>${name}</td><td>${weight}</td><td>${shares}</td></tr>`).join('')}</tbody></table>
    <!-- 持股明細表格 End -->`;
}

const provider = loadTs('lib/market/etfHoldings.ts');
function routeWith(fetch) {
  const source = loadTs('lib/market/etfHoldings.ts', fetch);
  return loadTs('app/api/market/etf-holdings/route.ts', fetch, { '@/lib/market/etfHoldings': source }).GET;
}
const request = (symbol) => ({ nextUrl: new URL(`http://localhost/api/market/etf-holdings?symbol=${encodeURIComponent(symbol)}`) });

test('parses holdings across Taiwan issuers, active ETFs and US ETFs without a symbol allowlist', () => {
  for (const symbol of ['0050', '00919', '00980A', 'VOO']) {
    const id = /^\d/.test(symbol) ? `${symbol}.TW` : symbol;
    const ticker = symbol === 'VOO' ? 'NVDA.US' : '2330.TW';
    const data = provider.parseMoneyDjHoldings(page(id, [[`<a href="#">測試 &amp; 公司(${ticker})</a>`, '10.25', '1,234,567']]), symbol);
    assert.equal(data.symbol, symbol);
    assert.equal(data.updatedAt, '2026-11-05');
    assert.equal(data.holdings[0].name, '測試 & 公司');
    assert.equal(data.holdings[0].symbol, ticker.split('.')[0]);
    assert.equal(data.holdings[0].shares, 1234567);
    assert.equal(data.holdings[0].weight, 10.25);
    assert.equal(data.holdings[0].quantityUnit, '股');
    assert.equal(data.previousDate, null);
    assert.equal(data.holdings[0].shareChange, null);
    assert.equal(new URL(data.sourceUrl).searchParams.get('etfid'), id);
  }
});

test('preserves bonds, futures, zero values and missing quantities without fabricating numbers', () => {
  const data = provider.parseMoneyDjHoldings(page('00679B.TW', [
    ['US TREASURY N/B 4.75% 05/15/2055', '5.55', 'N/A'],
    ['台指期(FITXN*1.TF)', '-0.25', '-60'],
    ['未揭露', '--', '&nbsp;'],
    ['現金', '0.00', '0'],
  ]), '00679B');
  assert.equal(data.holdings.length, 4);
  assert.equal(data.holdings[0].shares, null);
  assert.equal(data.holdings[0].weight, 5.55);
  assert.equal(data.holdings[1].quantityUnit, '口');
  assert.equal(data.holdings[1].shares, -60);
  assert.equal(data.holdings[2].weight, null);
  assert.equal(data.holdings[2].shares, null);
  assert.equal(data.holdings[3].weight, 0);
  assert.equal(data.holdings[3].shares, 0);
});

test('rejects upstream redirects to another ETF, empty tables, missing dates and unrelated markup', () => {
  assert.equal(provider.parseMoneyDjHoldings(page('SPY', [['Apple(AAPL.US)', '7', '100']]), 'VOO'), null);
  assert.equal(provider.parseMoneyDjHoldings(page('0050.TW', []), '0050'), null);
  assert.equal(provider.parseMoneyDjHoldings(page('0050.TW', [['公司(2330.TW)', '7', '100']], 'N/A'), '0050'), null);
  assert.equal(provider.parseMoneyDjHoldings('<html>Access denied</html>', '0050'), null);
});

test('API normalizes Taiwan exchange suffixes and queries the general source', async () => {
  for (const input of ['0050.tw', '00679b.TWO', 'voo']) {
    const symbol = input.toUpperCase().replace(/\.(TW|TWO)$/, '');
    const id = provider.moneyDjEtfId(symbol);
    const GET = routeWith(async (url) => {
      assert.equal(new URL(url).searchParams.get('etfid'), id);
      return new Response(page(id, [['公司(2330.TW)', '7', '100']]));
    });
    const response = await GET(request(input));
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.supported, true);
    assert.equal(body.data.symbol, symbol);
    assert.equal(body.data.holdings.length, 1);
  }
});

test('API distinguishes unavailable disclosure from network failure and rejects invalid input', async () => {
  const GET = routeWith(async () => new Response(page('SPY', [])));
  for (const symbol of ['', '../0050', '0050?x=1']) {
    assert.equal((await GET(request(symbol))).status, 400);
  }
  const absent = await (await GET(request('NEWETF'))).json();
  assert.equal(absent.data, null);
  assert.equal(absent.supported, true);
  assert.match(absent.message, /尚未提供/);
  const failed = routeWith(async () => { throw new Error('Network failure'); });
  assert.equal((await failed(request('VOO'))).status, 502);
});

test('006208 retains official history comparison and falls back when the issuer is unavailable', async () => {
  const current = '2026-11-05';
  const previous = '2026-11-04';
  const official = (date, shares) => `資料日期：${date.replaceAll('-', '/')}<h6>股票</h6><table><tr><td>2330</td><td>台積電</td><td>${shares}</td><td>100000</td><td>60</td></tr></table>股票合計`;
  const GET = routeWith(async (url) => {
    const date = new URL(url).searchParams.get('ddate')?.replaceAll('/', '-');
    return new Response(date ? official(date, 90) : official(current, 100));
  });
  const body = await (await GET(request('006208'))).json();
  assert.equal(body.data.previousDate, previous);
  assert.equal(body.data.holdings[0].shareChange, 10);
  assert.equal(body.data.holdings[0].quantityUnit, '股');
  assert.match(body.data.sourceName, /富邦/);

  const fallback = routeWith(async (url) => {
    if (new URL(url).hostname !== 'www.moneydj.com') throw new Error('Issuer unavailable');
    return new Response(page('006208.TW', [['公司(2330.TW)', '60', '100']]));
  });
  const alternative = await (await fallback(request('006208'))).json();
  assert.equal(alternative.data.holdings.length, 1);
  assert.match(alternative.data.sourceName, /MoneyDJ/);
});
