const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createSetupServer } = require('../scripts/setup-drive-picker.cjs');

test('local setup rejects foreign hosts, CSRF, invalid callbacks and broad OAuth grants', async () => {
  let tokenScope = 'https://www.googleapis.com/auth/drive';
  let calls = 0;
  let writable = false;
  const folderId = '1auq7r82jwMMAlK3XuLonQtZJY1zKl_3w';
  const server = createSetupServer(async (url, options) => {
    calls++;
    if (String(url).startsWith('https://www.googleapis.com/drive/v3/files/')) {
      assert.ok(String(url).includes('/' + folderId + '?'));
      assert.equal(options.headers.Authorization, 'Bearer never-print-access');
      return Response.json({ id: folderId, mimeType: 'application/vnd.google-apps.folder', trashed: false, capabilities: { canAddChildren: writable } });
    }
    return Response.json({ access_token: 'never-print-access', refresh_token: 'never-print-refresh', scope: tokenScope });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://localhost:17865';
  const target = 'http://127.0.0.1:' + server.address().port;
  const request = (path, options = {}) => new Promise((resolve, reject) => {
    const req = require('node:http').request(target + path, { method: options.method || 'GET', headers: { Host: 'localhost:17865', ...options.headers } }, res => {
      let text = '';
      res.on('data', chunk => text += chunk);
      res.on('end', () => resolve(new Response(text, { status: res.statusCode, headers: res.headers })));
    });
    req.on('error', reject);
    req.end(options.body?.toString());
  });
  try {
    assert.equal((await fetch(target)).status, 403);
    const page = await request('/');
    assert.equal(page.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
    assert.ok(page.headers.get('content-security-policy').includes("form-action 'self' https://accounts.google.com"));
    const html = await page.text();
    const csrf = /name="csrf" value="([a-f0-9]+)"/.exec(html)[1];
    const form = { csrf, client: '123-client.apps.googleusercontent.com', secret: 'local-secret', apiKey: 'key', project: '123' };
    assert.equal((await request('/authorize', { method: 'POST', body: new URLSearchParams(form) })).status, 403);
    assert.equal((await request('/authorize', { method: 'POST', headers: { Origin: origin }, body: new URLSearchParams({ ...form, csrf: 'wrong' }) })).status, 403);
    assert.equal((await request('/oauth/callback?state=wrong&code=bad')).status, 403);
    for (const scope of ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file']) {
      tokenScope = scope;
      const auth = await request('/authorize', { method: 'POST', headers: { Origin: origin }, body: new URLSearchParams(form) });
      const location = new URL(auth.headers.get('location'));
      assert.equal(location.searchParams.get('scope'), 'https://www.googleapis.com/auth/drive.file');
      assert.equal(location.searchParams.get('include_granted_scopes'), 'false');
      assert.equal(location.searchParams.get('code_challenge_method'), 'S256');
      const callback = '/oauth/callback?state=' + location.searchParams.get('state') + '&code=code';
      const result = await request(callback);
      assert.equal(result.headers.get('referrer-policy'), 'no-referrer', 'authorization code is not forwarded as a referrer');
      assert.equal(result.status, scope.endsWith('/drive') ? 400 : 303);
      assert.ok(!(await result.text()).includes('never-print'));
      assert.equal((await request(callback)).status, 403, 'code cannot replay');
    }
    assert.equal((await request('/complete')).status, 404, 'refresh token withheld before folder verification');
    const before = calls;
    assert.equal((await request('/selected', { method: 'POST', headers: { Origin: origin }, body: new URLSearchParams({ csrf, folder: 'wrong-folder' }) })).status, 400);
    assert.equal(calls, before, 'wrong selection never sent to Drive');
    const select = () => request('/selected', { method: 'POST', headers: { Origin: origin }, body: new URLSearchParams({ csrf, folder: folderId }) });
    assert.equal((await select()).status, 400, 'folder must be writable');
    assert.equal((await request('/complete')).status, 404);
    const picker = await (await request('/picker')).text();
    assert.ok(picker.includes('google.picker.PickerBuilder'));
    assert.ok(!picker.includes('never-print-refresh'), 'refresh token never given to Picker');
    writable = true;
    assert.equal((await select()).status, 200);
    const complete = await request('/complete');
    assert.equal(complete.status, 200);
    assert.ok((await complete.text()).includes('never-print-refresh'), 'only verified local administrator gets refresh token');
  } finally { await new Promise(resolve => server.close(resolve)); }
});
