const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// In-memory compilation keeps tests independent of Next's build output.
require.extensions['.ts'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  });
  module._compile(result.outputText, filename);
};
process.env.TEMP_UPLOAD_SECRET = 'test-only-secret-not-for-production-123456';
process.env.TEMP_UPLOAD_PASSWORD = 'test-only-password-123456';
process.env.GOOGLE_DRIVE_FOLDER_ID = 'test-folder';
process.env.GOOGLE_DRIVE_CLIENT_ID = 'test-client';
process.env.GOOGLE_DRIVE_CLIENT_SECRET = 'test-client-secret';
process.env.GOOGLE_DRIVE_REFRESH_TOKEN = 'test-refresh';
const core = require('../lib/temporary-files/server.ts');
const { CHUNK_BYTES, MAX_FILE_BYTES } = require('../lib/temporary-files/constants.ts');
const { NextRequest } = require('next/server');
const route = require('../app/api/temporary-files/route.ts');
const base = 'https://example.test/api/temporary-files';
const session = () => core.seal({ authenticated: true }, 'session', 3600);
function request(method, body, extra = {}, loggedIn = true) {
  return new NextRequest(base, { method, headers: {
    origin: 'https://example.test',
    ...(loggedIn ? { cookie: 'temporary-files-session=' + session() } : {}),
    ...extra,
  }, ...(body !== undefined ? { body: typeof body === 'string' || body instanceof Uint8Array ? body : JSON.stringify(body) } : {}) });
}
const googleSession = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&upload_id=test';
test('tokens reject tampering, purpose confusion, expiry and password rotation', () => {
  const token = session();
  assert.equal(core.unseal(token, 'session').authenticated, true);
  const tampered = Buffer.from(token, 'base64url'); tampered[14] ^= 1;
  assert.throws(() => core.unseal(tampered.toString('base64url'), 'session'));
  assert.throws(() => core.unseal(token, 'upload'));
  assert.throws(() => core.unseal(core.seal({}, 'session', -1), 'session'));
  const password = process.env.TEMP_UPLOAD_PASSWORD;
  process.env.TEMP_UPLOAD_PASSWORD += 'changed';
  assert.throws(() => core.unseal(token, 'session'));
  process.env.TEMP_UPLOAD_PASSWORD = password;
});
test('2 GB boundary and malformed file metadata', () => {
  assert.equal(core.metadata({ name: 'big.zip', size: MAX_FILE_BYTES }).size, MAX_FILE_BYTES);
  for (const size of [0, -1, 1.5, MAX_FILE_BYTES + 1, '100']) assert.throws(() => core.metadata({ name: 'x', size }));
  for (const name of ['', '../x', 'x\\y', 'a\nb', 'x'.repeat(181)]) assert.throws(() => core.metadata({ name, size: 1 }));
});
test('chunk limits, alignment and short last chunk', () => {
  const ticket = { url: googleSession, size: CHUNK_BYTES + 13 };
  core.validateChunk(ticket, 0, CHUNK_BYTES);
  core.validateChunk(ticket, CHUNK_BYTES, 13);
  assert.throws(() => core.validateChunk(ticket, 0, CHUNK_BYTES + 1));
  assert.throws(() => core.validateChunk(ticket, 1, 100));
  assert.throws(() => core.validateChunk(ticket, 0, 13));
  assert.throws(() => core.validateChunk(ticket, CHUNK_BYTES, 14));
});
test('bounded reader rejects oversized streams even without content-length', async () => {
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(9)); controller.close(); } });
  await assert.rejects(core.readBody(new Request(base, { method: 'POST', body: stream, duplex: 'half' }), 8), e => e.status === 413);
});
test('unauthenticated and cross-origin API requests cannot reach Google', async () => {
  const original = global.fetch;
  global.fetch = () => { throw new Error('Must not reach network'); };
  try {
    assert.equal((await route.GET(request('GET', undefined, {}, false))).status, 401);
    assert.equal((await route.POST(request('POST', { action: 'start', name: 'x', size: 1 }, {}, false))).status, 401);
    assert.equal((await route.POST(request('POST', { action: 'login', password: process.env.TEMP_UPLOAD_PASSWORD }, { origin: 'https://evil.test' }, false))).status, 403);
    assert.equal((await route.PUT(request('PUT', new Uint8Array(1), {}, false))).status, 401);
    assert.equal((await route.POST(request('POST', { action: 'start', name: 'x', size: MAX_FILE_BYTES + 1 }))).status, 400);
  } finally { global.fetch = original; }
});
test('production login rate limiting is shared and fails closed', async () => {
  const previous = process.env.NODE_ENV, original = global.fetch;
  process.env.NODE_ENV = 'production';
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.test';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test';
  try {
    global.fetch = async () => Response.json({ result: 11 });
    await assert.rejects(core.limitLogin('1.2.3.4'), e => e.status === 429);
    global.fetch = async () => { throw new Error('unavailable'); };
    await assert.rejects(core.limitLogin('1.2.3.4'), e => e.status === 503);
    global.fetch = async () => Response.json({ result: 1 });
    const login = await route.POST(request('POST', { action: 'login', password: process.env.TEMP_UPLOAD_PASSWORD }, {}, false));
    assert.equal(login.status, 200);
    const cookie = login.headers.get('set-cookie');
    assert.match(cookie, /HttpOnly/i); assert.match(cookie, /Secure/i); assert.match(cookie, /SameSite=strict/i);
    const wrong = await route.POST(request('POST', { action: 'login', password: 'incorrect' }, {}, false));
    assert.equal(wrong.status, 401);
  } finally {
    if (previous === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = previous;
    delete process.env.UPSTASH_REDIS_REST_URL; delete process.env.UPSTASH_REDIS_REST_TOKEN; global.fetch = original;
  }
});
test('proxy upload binds folder and size; resume uses Google confirmed offset', async () => {
  const original = global.fetch;
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    if (String(url).includes('oauth2')) return Response.json({ access_token: 'private-access-token' });
    if (options.method === 'POST') {
      assert.deepEqual(JSON.parse(options.body).parents, ['test-folder']);
      return new Response(null, { status: 200, headers: { Location: googleSession } });
    }
    const range = options.headers['Content-Range'];
    assert.equal(options.redirect, 'manual');
    if (range.startsWith('bytes */')) return new Response(null, { status: 308, headers: { Range: 'bytes=0-' + (CHUNK_BYTES - 1) } });
    if (range.startsWith('bytes 0-')) return new Response(null, { status: 308, headers: { Range: 'bytes=0-' + (CHUNK_BYTES - 1) } });
    return Response.json({ id: 'completed-file', size: String(CHUNK_BYTES + 13) });
  };
  try {
    const start = await route.POST(request('POST', { action: 'start', name: 'test.zip', size: CHUNK_BYTES + 13, folder: 'attacker-folder' }));
    assert.equal(start.status, 200);
    const data = await start.json();
    assert.ok(!JSON.stringify(data).includes('googleapis.com'));
    assert.ok(!JSON.stringify(data).includes('private-access-token'));
    const headers = { 'x-upload-ticket': data.ticket, 'x-upload-offset': '0' };
    const first = await route.PUT(request('PUT', new Uint8Array(CHUNK_BYTES), headers));
    assert.deepEqual(await first.json(), { complete: false, offset: CHUNK_BYTES });
    const status = await route.POST(request('POST', { action: 'status', ticket: data.ticket }));
    assert.deepEqual(await status.json(), { complete: false, offset: CHUNK_BYTES });
    const last = await route.PUT(request('PUT', new Uint8Array(13), { ...headers, 'x-upload-offset': String(CHUNK_BYTES) }));
    assert.deepEqual(await last.json(), { complete: true, offset: CHUNK_BYTES + 13 });
    assert.equal(calls.filter(c => c.options.method === 'PUT').length, 3);
  } finally { global.fetch = original; }
});
test('expired Google sessions and upstream failures are explicit; malicious destinations rejected', async () => {
  const original = global.fetch;
  try {
    const ticket = { url: googleSession, size: 1 };
    global.fetch = async () => new Response(null, { status: 404 });
    await assert.rejects(core.transfer(ticket), e => e.status === 410);
    global.fetch = async () => new Response(null, { status: 503 });
    await assert.rejects(core.transfer(ticket), e => e.status === 503);
    assert.throws(() => core.uploadTicket(core.seal({ url: 'https://evil.test/upload', size: 1 }, 'upload', 100)));
  } finally { global.fetch = original; }
});
