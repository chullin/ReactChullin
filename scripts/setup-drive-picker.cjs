// Administrator-only, loopback-only setup. Never deploy this server to Vercel.
const http = require('node:http');
const { randomBytes, createHash } = require('node:crypto');
const ORIGIN = 'http://localhost:17865';
const FOLDER = '1auq7r82jwMMAlK3XuLonQtZJY1zKl_3w';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function createSetupServer(fetchGoogle = fetch) {
  const csrf = randomBytes(32).toString('hex');
  let credentials, pending, tokens, selected = false;
  const expires = Date.now() + 30 * 60 * 1000;
  const page = content => `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="referrer" content="strict-origin-when-cross-origin"><title>Drive 管理者設定</title><style>body{font:18px system-ui;max-width:760px;margin:40px auto;padding:20px}label{display:block;margin:20px 0}input,textarea{display:block;width:100%;font:inherit}button{padding:12px}p{line-height:1.7}</style><h1>Drive 管理者設定</h1>${content}</html>`;
  const server = http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Picker uses a Google iframe; allow only this administrator tool to embed it.
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com https://*.google.com https://*.gstatic.com; style-src 'self' 'unsafe-inline'; frame-src https://*.google.com; connect-src 'self' https://*.google.com https://*.googleapis.com; img-src 'self' data: https://*.google.com https://*.gstatic.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self' https://accounts.google.com");
    const send = (status, body) => { res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(page(body)); };
    try {
      if (req.headers.host !== 'localhost:17865' || Date.now() >= expires) return send(403, '<p>設定工作已到期或網址不符，請重新啟動工具。</p>');
      const url = new URL(req.url, ORIGIN);
      let body;
      if (req.method === 'POST') {
        if (req.headers.origin !== ORIGIN) return send(403, '來源不符。');
        let raw = '';
        for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 16384) return send(413, '資料過大。'); }
        body = new URLSearchParams(raw);
        if (body.get('csrf') !== csrf) return send(403, '設定驗證失敗。');
      }
      if (req.method === 'GET' && url.pathname === '/') return send(200, `
        <p>僅管理者在可以連線 Google 的電腦操作。先撤銷舊的完整 Drive 授權，再重新授權。不要選取其他資料夾。</p>
        <p>OAuth 用戶端需加入 JavaScript origin：${ORIGIN}，redirect URI：${ORIGIN}/oauth/callback。</p>
        <form method="post" action="/authorize"><input type="hidden" name="csrf" value="${csrf}">
        <label>OAuth Client ID<input name="client" required autocomplete="off"></label>
        <label>OAuth Client Secret<input name="secret" type="password" required autocomplete="off"></label>
        <label>Picker API key<input name="apiKey" type="password" required autocomplete="off"></label>
        <label>Cloud project number<input name="project" pattern="[0-9]+" required></label>
        <button>只授權 drive.file</button></form>`);
      if (req.method === 'POST' && url.pathname === '/authorize') {
        credentials = Object.fromEntries(['client', 'secret', 'apiKey', 'project'].map(k => [k, body.get(k)?.trim()]));
        if (!credentials.client?.endsWith('.apps.googleusercontent.com') || !credentials.secret || !credentials.apiKey || !/^\d+$/.test(credentials.project) || !credentials.client.startsWith(credentials.project + '-')) return send(400, '請確認同一個 Cloud 專案的完整憑證。');
        tokens = undefined; selected = false;
        pending = { state: randomBytes(32).toString('hex'), verifier: randomBytes(32).toString('base64url'), expires: Date.now() + 10 * 60000 };
        const auth = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        auth.search = new URLSearchParams({ client_id: credentials.client, redirect_uri: ORIGIN + '/oauth/callback', response_type: 'code', scope: SCOPE, access_type: 'offline', prompt: 'consent', include_granted_scopes: 'false', state: pending.state, code_challenge: createHash('sha256').update(pending.verifier).digest('base64url'), code_challenge_method: 'S256' });
        res.writeHead(303, { Location: auth.href }); return res.end();
      }
      if (req.method === 'GET' && url.pathname === '/oauth/callback') {
        res.setHeader('Referrer-Policy', 'no-referrer');
        if (!pending || pending.expires <= Date.now() || url.searchParams.get('state') !== pending.state) return send(403, 'OAuth state 不符或已到期。');
        const verifier = pending.verifier; pending = undefined;
        if (!url.searchParams.get('code') || url.searchParams.has('error')) return send(400, '授權未完成。');
        const response = await fetchGoogle('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: credentials.client, client_secret: credentials.secret, code: url.searchParams.get('code'), code_verifier: verifier, redirect_uri: ORIGIN + '/oauth/callback', grant_type: 'authorization_code' }), signal: AbortSignal.timeout(15000) });
        const result = await response.json();
        if (!response.ok || result.scope?.trim() !== SCOPE || !result.refresh_token || !result.access_token) return send(400, '授權範圍不是單獨 drive.file 或未取得更新權杖。請撤銷舊授權後重新操作。');
        tokens = result;
        res.writeHead(303, { Location: '/picker' }); return res.end();
      }
      if (req.method === 'GET' && url.pathname === '/picker' && tokens) {
        // JSON serialized values cannot terminate the inline script.
        const config = JSON.stringify({ access: tokens.access_token, key: credentials.apiKey, project: credentials.project, csrf, folder: FOLDER }).replace(/</g, '\\u003c');
        return send(200, `<p>只選取指定暫存資料夾：<code>${FOLDER}</code>。選到其他項目會使 Google 對該項目授權；本工具會拒絕完成，請撤銷授權後重試。</p><button id="choose" disabled>選取暫存資料夾</button><p id="status">載入 Google Picker…</p>
          <script>const config=${config}; function loaded(){gapi.load('picker',()=>{document.getElementById('choose').disabled=false;document.getElementById('status').textContent='請選取指定資料夾';});}
          document.getElementById('choose').onclick=()=>{const view=new google.picker.DocsView(google.picker.ViewId.FOLDERS).setIncludeFolders(true).setSelectFolderEnabled(true).setMimeTypes('application/vnd.google-apps.folder');new google.picker.PickerBuilder().addView(view).setAppId(config.project).setDeveloperKey(config.key).setOAuthToken(config.access).setOrigin(location.origin).setCallback(async data=>{if(data.action!=='picked')return;const docs=data.docs||[];const result=await fetch('/selected',{method:'POST',body:new URLSearchParams({csrf:config.csrf,folder:docs.length===1?docs[0].id:''})});document.getElementById('status').textContent=await result.text();if(result.ok)location.href='/complete';}).build().setVisible(true);};</script><script async src="https://apis.google.com/js/api.js?onload=loaded"></script>`);
      }
      if (req.method === 'POST' && url.pathname === '/selected' && tokens) {
        if (body.get('folder') !== FOLDER) return send(400, '選取項目不符，請撤銷本次授權並重新設定。');
        const response = await fetchGoogle(`https://www.googleapis.com/drive/v3/files/${FOLDER}?fields=id,mimeType,trashed,capabilities(canAddChildren)`, { headers: { Authorization: 'Bearer ' + tokens.access_token }, signal: AbortSignal.timeout(15000) });
        const folder = await response.json();
        if (!response.ok || folder.id !== FOLDER || folder.mimeType !== 'application/vnd.google-apps.folder' || folder.trashed !== false || folder.capabilities?.canAddChildren !== true) return send(400, '無法確認指定資料夾的新增檔案權限。');
        selected = true; return send(200, '指定資料夾已確認。');
      }
      if (req.method === 'GET' && url.pathname === '/complete' && selected) return send(200, `<p>已完成 drive.file 授權與指定資料夾驗證。請將下列更新權杖直接存入 Vercel Production 的 GOOGLE_DRIVE_REFRESH_TOKEN。不要貼到聊天或提交 Git。完成後關閉此工具與分頁。</p><label>GOOGLE_DRIVE_REFRESH_TOKEN<textarea readonly rows="5">${escape(tokens.refresh_token)}</textarea></label><p>一般上傳頁面不會載入 Picker，也不會取得這些憑證。</p>`);
      return send(404, '找不到設定步驟。');
    } catch { return send(502, 'Google 連線或設定失敗，請確認憑證及網路後重試。'); }
  });
  server.requestTimeout = 30000;
  return server;
}
if (require.main === module) {
  const server = createSetupServer();
  server.listen(17865, '127.0.0.1', () => console.log('管理者設定：' + ORIGIN + '（30 分鐘後失效，完成後按 Ctrl+C 關閉）'));
}
module.exports = { createSetupServer };
