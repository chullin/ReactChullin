// Offline checks: no real Google credentials, sessions or Redis data are used.
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const cache = new Map();
let session = { user: { id: 'google-account-a' } };
let authConfig;
const overrides = {
  '@/lib/market/auth': { auth: async () => session, marketAuthConfigured: () => true },
  'next-auth': (config) => { authConfig = config; return { handlers: {}, auth: async () => null }; },
  'next-auth/providers/google': (config) => config,
};
function load(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const localRequire = (name) => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
    if (name.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(file), name)) + '.ts');
    return require(name);
  };
  new Function('require', 'module', 'exports', source)(localRequire, module, module.exports);
  return module.exports;
}

const { marketAccountSchema } = load('lib/market/account-schema.ts');
const store = load('lib/market/account-store.ts');
const route = load('app/api/market/account/route.ts');
load('lib/market/auth.ts');
const snapshot = {
  version: 1, watchlistDefs: [{ id: '庫存', name: '庫存' }],
  watchlists: { 庫存: [{ symbol: '2330', market: '台股', pinned: true }] },
  alerts: [], activeListId: '庫存', activeMarket: '全部', viewMode: 'cards',
};
const values = new Map();
process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.test';
process.env.UPSTASH_REDIS_REST_TOKEN = 'offline-test-only';
global.fetch = async (url, options) => {
  assert.equal(url, 'https://redis.example.test');
  const command = JSON.parse(options.body);
  if (command[0] === 'GET') return Response.json({ result: values.get(command[1]) ?? null });
  assert.equal(command[0], 'EVAL');
  assert.match(command[1], /rev~=tonumber\(ARGV\[1\]\)/);
  const [, , , key, revision, document] = command;
  const existing = values.has(key) ? JSON.parse(values.get(key)).revision : 0;
  if (existing !== revision) return Response.json({ result: 0 });
  values.set(key, document);
  return Response.json({ result: 1 });
};
const request = (body, origin = 'https://chullin.tw') => new Request('https://chullin.tw/api/market/account', {
  method: 'PUT', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

test('Google login requires a verified Google identity', () => {
  assert.equal(authConfig.callbacks.signIn({ account: { provider: 'google' }, profile: { sub: '123', email_verified: true } }), true);
  assert.equal(authConfig.callbacks.signIn({ account: { provider: 'google' }, profile: { sub: '123', email_verified: false } }), false);
  assert.equal(authConfig.callbacks.signIn({ account: { provider: 'other' }, profile: { sub: '123', email_verified: true } }), false);
});
test('schema rejects invalid lists, oversized lists and non-finite price targets', () => {
  assert.equal(marketAccountSchema.safeParse(snapshot).success, true);
  assert.equal(marketAccountSchema.safeParse({ ...snapshot, activeListId: 'someone-else' }).success, false);
  assert.equal(marketAccountSchema.safeParse({ ...snapshot, watchlists: { unknown: [] } }).success, false);
  assert.equal(marketAccountSchema.safeParse({ ...snapshot, watchlists: { 庫存: Array(301).fill({ symbol: '2330', market: '台股' }) } }).success, false);
  const date = new Date().toISOString();
  const alert = { alertId: 'one', symbol: '2330', market: '台股', conditionType: 'price_above', targetValue: Infinity,
    isEnabled: true, triggerMode: 'once', cooldownMinutes: 5, lastTriggeredAt: null, createdAt: date, updatedAt: date };
  assert.equal(marketAccountSchema.safeParse({ ...snapshot, alerts: [alert] }).success, false);
});
test('account storage isolates identities and rejects a stale device revision', async () => {
  const first = await store.writeMarketAccount('account-one', 0, snapshot);
  assert.equal(first.revision, 1);
  assert.equal(await store.readMarketAccount('account-two'), null);
  assert.equal(await store.writeMarketAccount('account-one', 0, { ...snapshot, viewMode: 'table' }), null);
  assert.equal((await store.readMarketAccount('account-one')).snapshot.viewMode, 'cards');
  for (const key of values.keys()) assert.match(key, /^market-account:v1:[a-f0-9]{64}$/);
});
test('API requires authentication and same-origin writes', async () => {
  session = null;
  assert.equal((await route.GET()).status, 401);
  assert.equal((await route.PUT(request({ revision: 0, snapshot }))).status, 401);
  session = { user: { id: 'google-account-a' } };
  assert.equal((await route.PUT(request({ revision: 0, snapshot }, 'https://evil.example'))).status, 403);
});
test('API stores only the session owner and surfaces revision conflicts', async () => {
  const response = await route.PUT(request({ userId: 'victim', revision: 0, snapshot }));
  assert.equal(response.status, 200);
  assert.equal(await store.readMarketAccount('victim'), null);
  assert.equal((await route.GET()).headers.get('cache-control'), 'private, no-store');
  assert.equal((await route.PUT(request({ revision: 0, snapshot }))).status, 409);
  assert.equal((await route.PUT(request({ revision: 1, snapshot: { ...snapshot, watchlists: null } }))).status, 400);
  assert.equal((await route.PUT(request({ revision: 1, snapshot, padding: 'x'.repeat(256001) }))).status, 413);
});
