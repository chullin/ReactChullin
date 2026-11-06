// Exercise the real sync component with deterministic hooks, storage and API responses.
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const snapshot = (symbol) => ({ version: 1, watchlistDefs: [{ id: 'mine', name: '我的清單' }],
  watchlists: { mine: [{ symbol, market: '台股', pinned: true }] }, alerts: [],
  activeListId: 'mine', activeMarket: '台股', viewMode: 'table' });
function storage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}
function harness({ cloud = null, putStatus = 200, getStatus = 200, signedIn = true } = {}) {
  const effects = [], requests = [], restores = [], slots = [];
  let cursor = 0, props, tree, rerender = false, signIns = 0;
  const cache = new Map();
  const depsChanged = (a, b) => !a || !b || a.some((value, index) => value !== b[index]);
  const hooks = {
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => {
      const next = typeof value === 'function' ? value(slots[i]) : value;
      if (!Object.is(next, slots[i])) { slots[i] = next; rerender = true; }
    }]; },
    useRef(initial) { const i = cursor++; return slots[i] ??= { current: initial }; },
    useCallback(callback, deps) { const i = cursor++; if (!slots[i] || depsChanged(slots[i].deps, deps)) slots[i] = { callback, deps }; return slots[i].callback; },
    useEffect(effect, deps) { const i = cursor++; if (!slots[i] || depsChanged(slots[i].deps, deps)) {
      effects.push(() => { slots[i]?.cleanup?.(); slots[i] = { deps, cleanup: effect() }; });
    } },
  };
  function load(relative) {
    const file = path.resolve(root, relative);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} }; cache.set(file, module);
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    } }).outputText;
    const localRequire = name => {
      if (name === 'react') return hooks;
      if (name === 'next-auth/react') return { useSession: () => ({ data: signedIn ? { user: { id: 'test-google' } } : null, status: signedIn ? 'authenticated' : 'unauthenticated' }), signIn: async () => { signIns++; }, signOut: async () => {} };
      if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
      if (name.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(file), name)) + '.ts');
      return require(name);
    };
    new Function('require', 'module', 'exports', source)(localRequire, module, module.exports);
    return module.exports;
  }
  const handoff = load('lib/market/login-snapshot.ts');
  const Component = load('components/tools/MarketWatchAccountSync.tsx').default;
  global.window = { sessionStorage: storage(), location: { search: '', replace() { throw Error('Unexpected reload'); } },
    setTimeout: () => 1, clearTimeout() {}, setInterval: () => 1, clearInterval() {}, addEventListener() {}, removeEventListener() {} };
  global.fetch = async (_, options = {}) => {
    requests.push(options);
    if (options.method === 'PUT') return Response.json(putStatus === 200 ? {
      document: { revision: 1, updatedAt: new Date().toISOString(), snapshot: JSON.parse(options.body).snapshot },
    } : { error: 'save failed' }, { status: putStatus });
    return Response.json(getStatus === 200 ? { document: cloud } : { error: 'load failed' }, { status: getStatus });
  };
  const onRestore = value => { restores.push(value); props.snapshot = value; rerender = true; };
  props = { configured: true, mounted: true, snapshot: snapshot('0050'), onRestore, onBlocked() {} };
  async function flush() {
    for (let i = 0; i < 40; i++) {
      if (rerender) { rerender = false; cursor = 0; tree = Component(props); }
      while (effects.length) effects.shift()();
      await new Promise(resolve => setImmediate(resolve));
    }
  }
  return { handoff, requests, restores, get tree() { return tree; }, get signIns() { return signIns; },
    start: async () => { rerender = true; await flush(); }, flush };
}
function button(tree, text) {
  if (!tree || typeof tree !== 'object') return null;
  const children = tree.props?.children;
  const content = value => Array.isArray(value) ? value.map(content).join('') : typeof value === 'string' ? value : value?.props ? content(value.props.children) : '';
  if (tree.type === 'button' && content(children).includes(text)) return tree;
  for (const child of [children].flat()) { const found = button(child, text); if (found) return found; }
  return null;
}
test('login captures the current page before Google redirect, including view and pinned stocks', async () => {
  const h = harness({ signedIn: false }); await h.start();
  await button(h.tree, '使用 Google 登入').props.onClick();
  assert.equal(h.signIns, 1);
  assert.deepEqual(h.handoff.readLoginSnapshot(window.sessionStorage), snapshot('0050'));
});
test('login stays on the page if the browser cannot preserve its current data', async () => {
  const h = harness({ signedIn: false }); await h.start();
  window.sessionStorage.setItem = () => { throw Error('storage blocked'); };
  await button(h.tree, '使用 Google 登入').props.onClick();
  assert.equal(h.signIns, 0);
});
test('a new account without an OAuth handoff adopts the page already loaded from local storage', async () => {
  const h = harness(); await h.start();
  assert.deepEqual(JSON.parse(h.requests.find(request => request.method === 'PUT').body).snapshot, snapshot('0050'));
});
test('new account automatically saves the pre-login page instead of defaults', async () => {
  const h = harness(); h.handoff.storeLoginSnapshot(window.sessionStorage, snapshot('2330'));
  await h.start();
  const writes = h.requests.filter(request => request.method === 'PUT');
  assert.equal(writes.length, 1);
  assert.deepEqual(JSON.parse(writes[0].body), { revision: 0, snapshot: snapshot('2330') });
  assert.deepEqual(h.restores.at(-1), snapshot('2330'));
  assert.equal(h.handoff.readLoginSnapshot(window.sessionStorage), null);
});
test('existing account restores cloud data without overwriting it with the guest page', async () => {
  const h = harness({ cloud: { revision: 7, updatedAt: new Date().toISOString(), snapshot: snapshot('2454') } });
  h.handoff.storeLoginSnapshot(window.sessionStorage, snapshot('2330')); await h.start();
  assert.deepEqual(h.restores.at(-1), snapshot('2454'));
  assert.equal(h.requests.filter(request => request.method === 'PUT').length, 0);
});
test('failed cloud read never creates an account or clears the pending page', async () => {
  const h = harness({ getStatus: 503 }); h.handoff.storeLoginSnapshot(window.sessionStorage, snapshot('2330')); await h.start();
  assert.equal(h.requests.length, 1);
  assert.deepEqual(h.handoff.readLoginSnapshot(window.sessionStorage), snapshot('2330'));
  assert.deepEqual(h.restores.at(-1), snapshot('2330'));
});
test('failed first save and revision conflicts retain the original page for recovery', async () => {
  for (const putStatus of [503, 409]) {
    const h = harness({ putStatus }); h.handoff.storeLoginSnapshot(window.sessionStorage, snapshot('2330')); await h.start();
    assert.deepEqual(h.handoff.readLoginSnapshot(window.sessionStorage), snapshot('2330'));
    assert.deepEqual(h.restores.at(-1), snapshot('2330'));
    assert.equal(h.requests.filter(request => request.method === 'PUT').length, 1);
  }
});
test('malformed and expired handoffs are ignored', () => {
  const h = harness(), s = storage();
  s.setItem('market-watch:pending-google-login:v1', 'bad json'); assert.equal(h.handoff.readLoginSnapshot(s), null);
  s.setItem('market-watch:pending-google-login:v1', JSON.stringify({ savedAt: Date.now() - 3600001, snapshot: snapshot('2330') }));
  assert.equal(h.handoff.readLoginSnapshot(s), null);
});
