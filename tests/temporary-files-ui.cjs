const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let loggedIn = false, confirmed = 0, total = 0, interrupted = false, closed = false;
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') return route.abort();
      return route.continue();
    });
    await page.route('**/api/temporary-files', async route => {
      const request = route.request();
      const reply = (status, data) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });
      if (closed) return reply(503, { code: 'UPLOAD_DISABLED', error: '暫存空間目前未開放。' });
      if (request.method() === 'GET') return reply(loggedIn ? 200 : 401, { authenticated: loggedIn });
      if (request.method() === 'PUT') {
        const offset = Number(request.headers()['x-upload-offset']);
        assert.equal(offset, confirmed);
        confirmed += request.postDataBuffer().length;
        if (!interrupted) { interrupted = true; return reply(503, { error: '模擬網路中斷，請繼續上傳。' }); }
        return reply(200, { complete: confirmed === total, offset: confirmed });
      }
      const input = request.postDataJSON();
      if (input.action === 'login') {
        if (input.password !== 'ui-test-password') return reply(401, { error: '密碼不正確。' });
        loggedIn = true; return reply(200, { authenticated: true });
      }
      if (input.action === 'logout') { loggedIn = false; return reply(200, { authenticated: false }); }
      if (input.action === 'start') { total = input.size; confirmed = 0; return reply(200, { ticket: 'mock-ticket', offset: 0, complete: false }); }
      if (input.action === 'status') return reply(200, { offset: confirmed, complete: confirmed === total });
      return reply(400, { error: 'unknown action' });
    });
    await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000/temporary-files');
    await page.getByLabel('網站密碼').fill('wrong');
    await page.getByRole('button', { name: '解鎖空間' }).click();
    await page.getByRole('alert').filter({ hasText: '密碼不正確' }).waitFor();
    await page.getByLabel('網站密碼').fill('ui-test-password');
    await page.getByRole('button', { name: '解鎖空間' }).click();
    await page.getByRole('heading', { name: '上傳檔案', exact: true }).waitFor();
    await page.locator('#storage-file').setInputFiles({ name: 'resume-test.bin', mimeType: 'application/octet-stream', buffer: Buffer.alloc(2 * 1024 * 1024 + 13) });
    await page.getByRole('button', { name: '開始上傳', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: '模擬網路中斷' }).waitFor();
    await page.getByRole('button', { name: '繼續上傳', exact: true }).click();
    await page.getByRole('button', { name: '儲存完成', exact: true }).waitFor();
    assert.equal(confirmed, total);
    fs.mkdirSync('scratch/temporary-files', { recursive: true });
    await page.screenshot({ path: 'scratch/temporary-files/desktop.png', fullPage: true });
    await page.getByLabel('文字內容').fill('測試文字與連結 https://example.com');
    await page.getByRole('button', { name: '準備成文字檔' }).click();
    await page.getByRole('button', { name: '開始上傳', exact: true }).click();
    await page.getByRole('button', { name: '儲存完成', exact: true }).waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await page.screenshot({ path: 'scratch/temporary-files/mobile.png', fullPage: true });
    closed = true;
    await page.locator('#storage-file').setInputFiles({ name: 'after-close.txt', mimeType: 'text/plain', buffer: Buffer.from('blocked') });
    await page.getByRole('button', { name: '開始上傳', exact: true }).click();
    await page.getByRole('heading', { name: '暫存空間目前未開放', exact: true }).waitFor();
    assert.equal(await page.getByLabel('本頁文字（重新整理前請先保留）').inputValue(), '測試文字與連結 https://example.com');
    assert.equal(await page.getByLabel('網站密碼').count(), 0);
    assert.equal(await page.locator('#storage-file').count(), 0);
    await page.reload();
    await page.getByRole('heading', { name: '暫存空間目前未開放', exact: true }).waitFor();
    await page.screenshot({ path: 'scratch/temporary-files/closed.png', fullPage: true });
    closed = false;
    await page.reload();
    await page.getByRole('button', { name: '登出', exact: true }).click();
    await page.getByLabel('網站密碼').waitFor();
    assert.deepEqual(errors, []);
    console.log('PASS: login, chunk resume, text upload, expiry while signed in, closed-on-load state, logout, mobile layout; external requests blocked.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
