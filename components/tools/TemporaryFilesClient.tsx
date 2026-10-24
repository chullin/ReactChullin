'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LockKeyhole, UploadCloud, FileText, LogOut } from 'lucide-react';
import { CHUNK_BYTES, MAX_FILE_BYTES } from '@/lib/temporary-files/constants';

type Progress = { complete: boolean; offset: number; ticket?: string };
const endpoint = '/api/temporary-files';
class ApiError extends Error { constructor(message: string, public status: number, public code?: string) { super(message); } }
async function api(body: object): Promise<Progress> {
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(55000) });
  const data = await response.json();
  if (!response.ok) throw new ApiError(data.error || '操作失敗，請稍後重試。', response.status, data.code);
  return data;
}
const field = 'w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
const button = 'rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed';
export default function TemporaryFilesClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [availability, setAvailability] = useState<'available' | 'disabled' | 'unreachable'>('unreachable');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [offset, setOffset] = useState(0);
  const [complete, setComplete] = useState(false);
  const [text, setText] = useState('');
  const [noteName, setNoteName] = useState('暫存筆記.txt');
  const ticket = useRef<string | null>(null);
  const pause = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    async function check() {
      try {
        const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
        const data = await response.json();
        if (!active) return;
        if (data.code === 'UPLOAD_DISABLED') {
          setAvailability('disabled');
        } else if (response.ok || response.status === 401) {
          setAvailability('available');
          setAuthenticated(response.ok);
        } else {
          setAvailability('unreachable');
        }
      } catch { if (active) setAvailability('unreachable'); }
      finally { if (active) setChecking(false); }
    }
    void check();
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!uploading) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [uploading]);
  function select(next: File | null) {
    setError(''); setMessage(''); ticket.current = null; setOffset(0); setComplete(false);
    if (next && (next.size === 0 || next.size > MAX_FILE_BYTES)) {
      setFile(null); setError('請選擇非空白、單檔不超過 2 GB 的檔案。'); return;
    }
    setFile(next);
  }
  function handleClosure(e: unknown) {
    if (!(e instanceof ApiError) || e.code !== 'UPLOAD_DISABLED') return false;
    setAvailability('disabled'); setAuthenticated(false); setPassword('');
    ticket.current = null; setMessage(''); setError('');
    setOffset(0); setComplete(false);
    return true;
  }
  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { await api({ action: 'login', password }); setPassword(''); setAuthenticated(true); }
    catch (e) { if (!handleClosure(e)) setError(e instanceof Error ? e.message : '登入失敗。'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try {
      await api({ action: 'logout' }); setAuthenticated(false); setFile(null); setText(''); ticket.current = null;
      setMessage(''); setOffset(0); setComplete(false);
    } catch (e) { if (!handleClosure(e)) setError('登出失敗，請重試。'); }
    finally { setBusy(false); }
  }
  async function upload() {
    if (!file || uploading) return;
    setUploading(true); setError(''); setMessage('正在準備上傳…'); pause.current = false;
    try {
      let progress: Progress;
      if (ticket.current) {
        progress = await api({ action: 'status', ticket: ticket.current });
      } else {
        progress = await api({ action: 'start', name: file.name, size: file.size });
        if (!progress.ticket) throw new Error('無法建立上傳工作。');
        ticket.current = progress.ticket;
      }
      while (!progress.complete) {
        setOffset(progress.offset);
        if (pause.current) { setMessage('已暫停，保留此頁即可繼續。'); return; }
        const start = progress.offset;
        const response = await fetch(endpoint, {
          method: 'PUT', headers: { 'Content-Type': 'application/octet-stream', 'X-Upload-Ticket': ticket.current!, 'X-Upload-Offset': String(start) },
          body: file.slice(start, Math.min(start + CHUNK_BYTES, file.size)), signal: AbortSignal.timeout(55000),
        });
        const result = await response.json();
        if (!response.ok) throw new ApiError(result.error || '傳輸中斷，請按繼續上傳。', response.status, result.code);
        progress = result;
        if (!progress.complete && progress.offset <= start) throw new Error('傳輸尚未前進，請按繼續上傳重新確認進度。');
        setMessage('正在上傳，請保持此頁開啟。');
      }
      setOffset(file.size); setComplete(true); setMessage('已成功儲存到你的 Google Drive 暫存資料夾。');
    } catch (e) {
      if (handleClosure(e)) return;
      setMessage('');
      if (e instanceof ApiError && e.status === 401) setAuthenticated(false);
      if (e instanceof ApiError && e.status === 410) { ticket.current = null; setOffset(0); }
      setError((e instanceof Error && e.name !== 'TimeoutError' && e.name !== 'TypeError') ? e.message : '連線中斷或逾時。恢復網路後，按繼續上傳。');
    } finally { setUploading(false); }
  }
  const percent = file ? Math.min(100, Math.floor(offset / file.size * 100)) : 0;
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-32 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold tracking-widest text-teal-700">PERSONAL STORAGE</p>
        <h1 className="text-4xl font-bold">檔案暫存空間</h1>
        <p className="mt-4 text-slate-600">把檔案或文字先放在這裡，稍後再到 Google Drive 整理。</p>
        <Link className="mt-3 inline-block text-sm text-teal-700 underline" href="/temporary-files/privacy">資料使用說明</Link>
        <div role="alert" className={error ? 'mt-6 rounded-xl bg-red-50 p-4 text-red-800' : ''}>{error}</div>
        {checking ? <p className="mt-8" role="status">正在確認空間狀態…</p> : availability !== 'available' ? (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <LockKeyhole className="mb-4 text-teal-700" aria-hidden="true" />
            <h2 className="text-xl font-bold">{availability === 'disabled' ? '暫存空間目前未開放' : '暫時無法連線'}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{availability === 'disabled' ? '這個空間只在需要時開放。開放時間結束後，登入與上傳會自動停止。' : '目前無法確認空間狀態，請稍後再試。'}</p>
            {text ? <div className="mt-4">
              <label htmlFor="unsaved-note" className="mb-2 block text-sm font-semibold">本頁文字（重新整理前請先保留）</label>
              <textarea id="unsaved-note" className={field + ' min-h-32'} readOnly value={text} />
              <p className="mt-2 text-xs text-slate-500">重新確認會重載頁面，這份文字不會保留。</p>
            </div> : null}
            <button className={button + ' mt-5'} onClick={() => window.location.reload()}>重新確認</button>
          </section>
        ) : !authenticated ? (
          <form onSubmit={login} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <LockKeyhole className="mb-4 text-teal-700" aria-hidden="true" />
            <h2 className="text-xl font-bold">輸入密碼以開啟空間</h2>
            <p className="mb-6 mt-2 text-sm text-slate-500">使用網站專用密碼，無需在這裡登入 Google。</p>
            <label htmlFor="storage-password" className="mb-2 block text-sm font-semibold">網站密碼</label>
            <input id="storage-password" type="password" autoComplete="current-password" required maxLength={1024} className={field} value={password} onChange={e => setPassword(e.target.value)} />
            <button className={button + ' mt-4'} disabled={busy}>{busy ? '驗證中…' : '解鎖空間'}</button>
          </form>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm font-semibold text-teal-700">已解鎖 · 單檔上限 2 GB</span>
              <button className="flex items-center gap-2 text-sm text-slate-600" disabled={uploading || busy} onClick={logout}><LogOut size={16} aria-hidden="true" />登出</button>
            </div>
            <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-bold"><UploadCloud aria-hidden="true" />上傳檔案</h2>
              <label htmlFor="storage-file" className="mb-3 mt-5 block text-sm text-slate-600">選擇文件、圖片、影片或壓縮檔</label>
              <input ref={fileInput} id="storage-file" type="file" disabled={uploading} className={field} onChange={e => select(e.target.files?.[0] ?? null)} />
              {file && <div className="mt-5">
                <p className="break-all font-semibold">{file.name}</p>
                <p className="mt-1 text-sm text-slate-500">{(file.size / 1_000_000).toFixed(2)} MB</p>
                <progress aria-label="上傳進度" className="mt-4 h-3 w-full accent-teal-700" max={file.size} value={offset} />
                <p className="mt-2 text-sm text-slate-600">{percent}% · {(offset / 1_000_000).toFixed(2)} / {(file.size / 1_000_000).toFixed(2)} MB</p>
                <div className="mt-4 flex gap-3">
                  <button className={button} disabled={uploading || complete} onClick={upload}>{complete ? '儲存完成' : uploading ? '上傳中…' : ticket.current ? '繼續上傳' : '開始上傳'}</button>
                  {uploading && <button className="rounded-xl border border-slate-300 px-4" onClick={() => { pause.current = true; setMessage('這一段完成後即會暫停。'); }}>暫停</button>}
                </div>
              </div>}
              <p role="status" className="mt-4 text-sm text-teal-800">{message}</p>
              <p className="mt-4 text-xs leading-6 text-slate-500">上傳期間請保持此頁開啟。網路中斷後可在本頁繼續；重新整理或關閉頁面後，需重新選檔並上傳。檔案不會自動刪除。</p>
            </section>
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold"><FileText aria-hidden="true" />暫存文字</h2>
              <label htmlFor="note-name" className="mb-2 block text-sm font-semibold">檔案名稱</label>
              <input id="note-name" className={field} maxLength={170} value={noteName} disabled={uploading} onChange={e => setNoteName(e.target.value)} />
              <label htmlFor="note-text" className="mb-2 mt-4 block text-sm font-semibold">文字內容</label>
              <textarea id="note-text" className={field + ' min-h-40'} maxLength={500000} disabled={uploading} value={text} onChange={e => setText(e.target.value)} placeholder="貼上筆記、連結或其他文字…" />
              <button className={button + ' mt-4'} disabled={uploading || !text.trim() || !noteName.trim()} onClick={() => {
                if (fileInput.current) fileInput.current.value = '';
                select(new File([text], noteName.endsWith('.txt') ? noteName : noteName + '.txt', { type: 'text/plain' }));
              }}>準備成文字檔</button>
              <p className="mt-3 text-xs text-slate-500">準備後，按上方「開始上傳」儲存。</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
