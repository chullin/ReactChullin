'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Cloud, CloudCheck, LogOut, RefreshCw } from 'lucide-react';
import { readLoginSnapshot, storeLoginSnapshot, clearLoginSnapshot } from '@/lib/market/login-snapshot';
import { marketAccountSchema, type MarketAccountDocument, type MarketAccountSnapshot } from '@/lib/market/account-schema';

type Props = {
  configured: boolean; mounted: boolean;
  snapshot: MarketAccountSnapshot;
  onRestore: (snapshot: MarketAccountSnapshot) => void;
  onBlocked: (blocked: boolean) => void;
};
type Phase = 'loading' | 'ready' | 'saving' | 'error' | 'conflict';

export default function MarketWatchAccountSync({ configured, mounted, snapshot, onRestore, onBlocked }: Props) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [phase, setPhase] = useState<Phase>('loading');
  const [problem, setProblem] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [authError, setAuthError] = useState(false);
  const [tick, setTick] = useState(0);
  const current = useRef(snapshot);
  current.current = snapshot;
  const saved = useRef('');
  const revision = useRef(0);
  const hydrated = useRef(false);
  const busy = useRef(false);
  const generation = useRef(0);
  const previousUser = useRef(userId);
  const serialized = JSON.stringify(snapshot);

  useEffect(() => {
    setAuthError(new URLSearchParams(window.location.search).has('error'));
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (previousUser.current && previousUser.current !== userId) {
      window.location.replace('/market-watch');
      return;
    }
    previousUser.current = userId;
  }, [status, userId]);

  const save = useCallback(async (data: MarketAccountSnapshot) => {
    if (busy.current) return false;
    const input = marketAccountSchema.safeParse(data);
    if (!input.success) { setProblem('清單超過同步上限或含有不支援的資料，請減少清單或通知數量。'); setPhase('error'); return false; }
    busy.current = true;
    setPhase('saving');
    const requestGeneration = generation.current;
    try {
      const response = await fetch('/api/market/account', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revision: revision.current, snapshot: input.data }),
      });
      const payload = await response.json() as { document?: MarketAccountDocument; error?: string };
      if (requestGeneration !== generation.current) return false;
      if (response.status === 409) { setProblem(payload.error || '另一部裝置已更新清單。'); setPhase('conflict'); return false; }
      if (!response.ok || !payload.document) throw new Error(payload.error || '雲端儲存失敗。');
      // Keep the exact local baseline: schema normalization can reorder object keys.
      saved.current = JSON.stringify(hydrated.current ? data : input.data);
      revision.current = payload.document.revision;
      if (!hydrated.current) onRestore(input.data);
      hydrated.current = true;
      clearLoginSnapshot(window.sessionStorage);
      setUpdatedAt(payload.document.updatedAt);
      setProblem('');
      setPhase('ready');
      return true;
    } catch (error) {
      if (requestGeneration !== generation.current) return false;
      setProblem(error instanceof Error ? error.message : '雲端儲存失敗。');
      setPhase('error');
      return false;
    } finally {
      if (requestGeneration === generation.current) { busy.current = false; setTick((value) => value + 1); }
    }
  }, [onRestore]);

  const load = useCallback(async (force = false) => {
    if (busy.current) return;
    if (!hydrated.current) {
      const pending = readLoginSnapshot(window.sessionStorage);
      if (pending) { current.current = pending; onRestore(pending); }
    }
    const before = JSON.stringify(current.current);
    if (!force && hydrated.current && before !== saved.current) return;
    const requestGeneration = generation.current;
    busy.current = true;
    try {
      const response = await fetch('/api/market/account', { cache: 'no-store' });
      const payload = await response.json() as { document?: MarketAccountDocument | null; error?: string };
      if (requestGeneration !== generation.current) return;
      if (!response.ok) throw new Error(payload.error || '無法載入雲端清單。');
      if (!force && hydrated.current && JSON.stringify(current.current) !== before) return;
      if (!payload.document) {
        // Only an absent cloud document may adopt the page shown before login.
        revision.current = 0;
        busy.current = false;
        await save(current.current);
        return;
      }
      const document = payload.document;
      const data = marketAccountSchema.parse(document.snapshot);
      if (!hydrated.current || document.revision !== revision.current || force) {
        saved.current = JSON.stringify(data);
        revision.current = document.revision;
        onRestore(data);
        setUpdatedAt(document.updatedAt);
      }
      clearLoginSnapshot(window.sessionStorage);
      hydrated.current = true;
      setProblem('');
      setPhase('ready');
    } catch (error) {
      if (requestGeneration !== generation.current) return;
      setProblem(error instanceof Error ? error.message : '無法載入雲端清單。');
      setPhase('error');
    } finally {
      if (requestGeneration === generation.current) { busy.current = false; setTick((value) => value + 1); }
    }
  }, [onRestore, save]);

  useEffect(() => {
    if (!configured || !mounted || !userId) return;
    generation.current += 1;
    busy.current = false;
    hydrated.current = false;
    saved.current = '';
    revision.current = 0;
    setPhase('loading');
    load(true);
    return () => { generation.current += 1; };
  }, [configured, load, mounted, userId]);

  useEffect(() => {
    onBlocked(Boolean(userId) && !hydrated.current);
  }, [onBlocked, phase, tick, userId]);

  useEffect(() => {
    if (!userId || phase !== 'ready' || !hydrated.current || serialized === saved.current) return;
    const timer = window.setTimeout(() => save(current.current), 700);
    return () => window.clearTimeout(timer);
  }, [phase, save, serialized, tick, userId]);

  useEffect(() => {
    if (!userId) return;
    const refresh = () => { if (document.visibilityState === 'visible' && hydrated.current) load(); };
    const timer = window.setInterval(refresh, 30_000);
    window.addEventListener('focus', refresh);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', refresh); };
  }, [load, userId]);

  const dirty = serialized !== saved.current;
  const pending = phase === 'loading' || phase === 'saving';
  const button = 'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <section aria-label="Google 帳號與清單同步" className="mb-8 rounded-2xl border border-orange-100 bg-white/95 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-700"><Cloud size={23} /></div>
          <div>
            <h2 className="text-base font-black text-slate-900">{userId ? `${session.user?.name || '我的'}的雲端清單` : '你的市場清單，隨身帶著走'}</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{userId ? session.user?.email : '使用同一個 Google 帳號登入，在手機與電腦追蹤同一份 2330 自選清單。'}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">同步自選標的、清單分類、排序、置頂及通知條件；未登入時只儲存在此裝置。</p>
          </div>
        </div>
        {userId ? (
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" disabled={pending || phase === 'conflict'} onClick={() => hydrated.current && dirty ? save(current.current) : load()} className={`${button} bg-orange-50 text-orange-700 hover:bg-orange-100`}><RefreshCw size={15} className={pending ? 'animate-spin' : ''} />立即同步</button>
            <button type="button" disabled={pending || phase === 'conflict'} onClick={async () => {
              if (hydrated.current && dirty && !(await save(current.current))) return;
              await signOut({ redirectTo: '/market-watch' });
            }} className={`${button} border border-slate-200 text-slate-500 hover:bg-slate-50`}><LogOut size={15} />登出</button>
          </div>
        ) : (
          <button type="button" disabled={!configured || !mounted || status === 'loading'} onClick={async () => {
            try {
              storeLoginSnapshot(window.sessionStorage, current.current);
              setProblem('');
              await signIn('google', { redirectTo: '/market-watch' });
            } catch {
              setProblem('目前清單無法暫存，請確認瀏覽器允許儲存資料後重試登入。');
            }
          }} className={`${button} shrink-0 border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-orange-200 hover:bg-orange-50`}><span aria-hidden="true" className="text-lg font-black text-blue-600">G</span>使用 Google 登入</button>
        )}
      </div>
      <div aria-live="polite" className="mt-4 text-xs leading-relaxed">
        {!configured ? <p className="text-slate-500">Google 登入功能準備中，目前仍可使用本機觀察清單。</p> : !userId ? <p className={problem ? 'text-amber-700' : 'text-slate-400'}>{problem || '首次登入會自動保存目前頁面的清單；已有雲端清單的帳號會載入帳號資料。Google 只提供基本帳號資料。'}</p> : problem ? (
          <div className="rounded-xl bg-amber-50 p-3 text-amber-800">
            <p>{problem}</p>
            {phase === 'conflict' ? <button type="button" onClick={() => load(true)} className="mt-2 font-black underline underline-offset-4">載入雲端版本（放棄此頁未儲存變更）</button> : <button type="button" onClick={() => hydrated.current ? save(current.current) : load(true)} className="mt-2 font-black underline underline-offset-4">重試同步</button>}
          </div>
        ) : <p className="inline-flex items-center gap-1.5 text-emerald-700"><CloudCheck size={14} />{phase === 'loading' ? '正在載入你的清單…' : phase === 'saving' || dirty ? '正在儲存變更…' : `已同步${updatedAt ? ` · ${new Date(updatedAt).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}` : ''}`}</p>}
        {authError && !userId ? <p className="mt-2 text-amber-700">Google 登入未完成，請重試；若持續發生，請聯絡網站管理者檢查登入設定。</p> : null}
        <a href="/market-watch/privacy" className="mt-2 inline-block text-slate-400 underline underline-offset-4">帳號與同步資料說明</a>
      </div>
    </section>
  );
}
