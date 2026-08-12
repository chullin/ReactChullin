'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronRight,
  ExternalLink,
  ListPlus,
  RefreshCw,
  WalletCards,
  X,
} from 'lucide-react';

type Market = 'us' | 'tw';

type Leader = {
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change: number | null;
  changePercent: number | null;
  marketCap: number;
  country: string;
  sector: string;
  market: Market;
  currency: 'USD' | 'TWD';
};

type LeadersResponse = {
  success?: boolean;
  data?: Leader[];
  updatedAt?: string;
  sourceName?: string;
  sourceUrl?: string;
  error?: string;
};

type EtfLeader = {
  rank: number;
  symbol: string;
  name: string;
  aum: number;
  price: number;
  holders: number;
  issuer: string;
  benchmark: string;
  listingDate: string;
  averageValue: number;
  averageVolume: number;
  holdingsChangeSupported: boolean;
};

type EtfLeadersResponse = {
  success?: boolean;
  data?: EtfLeader[];
  updatedAt?: string;
  sourceName?: string;
  sourceUrl?: string;
  rankingBasis?: string;
  error?: string;
};

type EtfHolding = {
  symbol: string;
  name: string;
  shares: number;
  marketValue: number;
  weight: number;
  shareChange: number | null;
  weightChange: number | null;
};

type EtfResponse = {
  success?: boolean;
  supported?: boolean;
  message?: string;
  error?: string;
  data?: {
    symbol: string;
    name: string;
    updatedAt: string;
    previousDate: string | null;
    holdings: EtfHolding[];
    sourceName: string;
    sourceUrl: string;
    disclosureNote: string;
  } | null;
};

type ExplorerMode = 'leaders' | 'etf';
type LeaderSort = 'marketCap' | 'belowExpected' | 'gainers';

const WATCHLIST_STORAGE_KEY = 'stock-watchlist:v1';
const DEFAULT_LIST_ID = '庫存';
const EXPECTED_PRICES_KEY = 'market-explorer-expected-prices:v2';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: 'no-store' });
  const payload = await response.json() as T;
  if (!response.ok) throw new Error((payload as { error?: string }).error || `HTTP ${response.status}`);
  return payload;
}

function formatPrice(value: number | null, currency: 'USD' | 'TWD' = 'USD') {
  if (value === null) return '-';
  return value.toLocaleString(currency === 'TWD' ? 'zh-TW' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  });
}

function formatPercent(value: number | null) {
  if (value === null) return '-';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function compactMoney(value: number) {
  return new Intl.NumberFormat('zh-TW', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

function formatDateTime(value?: string | null) {
  if (!value) return '尚未更新';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function expectedPriceKey(leader: Leader) {
  return `${leader.market}:${leader.symbol}`;
}

export default function MarketExplorerClient() {
  const [mode, setMode] = useState<ExplorerMode>('leaders');
  const [market, setMarket] = useState<Market>('us');
  const [sort, setSort] = useState<LeaderSort>('belowExpected');
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [leadersLoading, setLeadersLoading] = useState(true);
  const [leadersError, setLeadersError] = useState<string | null>(null);
  const [leadersUpdatedAt, setLeadersUpdatedAt] = useState<string | null>(null);
  const [leaderSource, setLeaderSource] = useState<{ name: string; url: string } | null>(null);
  const [etfLeaders, setEtfLeaders] = useState<EtfLeader[]>([]);
  const [etfLeadersLoading, setEtfLeadersLoading] = useState(false);
  const [etfLeadersError, setEtfLeadersError] = useState<string | null>(null);
  const [etfSource, setEtfSource] = useState<{ name: string; url: string; basis: string } | null>(null);
  const [selectedEtf, setSelectedEtf] = useState<EtfLeader | null>(null);
  const [etf, setEtf] = useState<NonNullable<EtfResponse['data']> | null>(null);
  const [etfLoading, setEtfLoading] = useState(false);
  const [etfMessage, setEtfMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [expectedPrices, setExpectedPrices] = useState<Record<string, number>>({});

  const loadLeaders = useCallback(async () => {
    setLeadersLoading(true);
    setLeadersError(null);
    try {
      const payload = await fetchJson<LeadersResponse>(`/api/market/leaders?market=${market}`);
      if (!payload.success) throw new Error(payload.error || '載入失敗');
      setLeaders(payload.data || []);
      setLeadersUpdatedAt(payload.updatedAt || null);
      setLeaderSource(payload.sourceName && payload.sourceUrl ? { name: payload.sourceName, url: payload.sourceUrl } : null);
    } catch (error) {
      setLeaders([]);
      setLeadersError(error instanceof Error ? error.message : '暫時無法取得排行');
    } finally {
      setLeadersLoading(false);
    }
  }, [market]);

  const loadEtfLeaders = useCallback(async () => {
    setEtfLeadersLoading(true);
    setEtfLeadersError(null);
    try {
      const payload = await fetchJson<EtfLeadersResponse>('/api/market/etf-leaders');
      if (!payload.success) throw new Error(payload.error || '載入失敗');
      setEtfLeaders(payload.data || []);
      setEtfSource(payload.sourceName && payload.sourceUrl ? {
        name: payload.sourceName,
        url: payload.sourceUrl,
        basis: payload.rankingBasis || '基金規模（AUM）',
      } : null);
    } catch (error) {
      setEtfLeadersError(error instanceof Error ? error.message : 'ETF 排行載入失敗');
    } finally {
      setEtfLeadersLoading(false);
    }
  }, []);

  const loadEtf = useCallback(async (leader: EtfLeader) => {
    setSelectedEtf(leader);
    setEtf(null);
    setEtfMessage(null);
    if (!leader.holdingsChangeSupported) {
      setEtfMessage('這檔 ETF 已列入官方 AUM 排行，但目前尚未串接該投信的歷史持股揭露格式。');
      return;
    }

    setEtfLoading(true);
    try {
      const payload = await fetchJson<EtfResponse>(`/api/market/etf-holdings?symbol=${encodeURIComponent(leader.symbol)}`);
      setEtf(payload.data || null);
      if (!payload.supported || !payload.data) setEtfMessage(payload.message || payload.error || '尚無可用資料');
    } catch (error) {
      setEtfMessage(error instanceof Error ? error.message : 'ETF 資料載入失敗');
    } finally {
      setEtfLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mode === 'leaders') loadLeaders();
  }, [loadLeaders, mode]);

  useEffect(() => {
    if (mode === 'etf' && !etfLeaders.length && !etfLeadersLoading) loadEtfLeaders();
  }, [etfLeaders.length, etfLeadersLoading, loadEtfLeaders, mode]);

  useEffect(() => {
    try {
      setExpectedPrices(JSON.parse(localStorage.getItem(EXPECTED_PRICES_KEY) || '{}'));
    } catch {
      setExpectedPrices({});
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const displayedLeaders = useMemo(() => {
    const next = [...leaders];
    if (sort === 'belowExpected') return next.sort((a, b) => {
      const aTarget = expectedPrices[expectedPriceKey(a)];
      const bTarget = expectedPrices[expectedPriceKey(b)];
      const aDiscount = aTarget && a.price < aTarget ? (a.price - aTarget) / aTarget : Number.POSITIVE_INFINITY;
      const bDiscount = bTarget && b.price < bTarget ? (b.price - bTarget) / bTarget : Number.POSITIVE_INFINITY;
      return aDiscount - bDiscount || (a.changePercent ?? 0) - (b.changePercent ?? 0);
    });
    if (sort === 'gainers') return next.sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0));
    return next.sort((a, b) => a.rank - b.rank);
  }, [expectedPrices, leaders, sort]);

  const changedHoldings = useMemo(
    () => (etf?.holdings || [])
      .filter((holding) => holding.shareChange !== null && holding.shareChange !== 0)
      .sort((a, b) => Math.abs(b.shareChange || 0) - Math.abs(a.shareChange || 0)),
    [etf],
  );

  const setExpectedPrice = (leader: Leader, value: string) => {
    const parsed = Number(value);
    const key = expectedPriceKey(leader);
    const next = { ...expectedPrices };
    if (Number.isFinite(parsed) && parsed > 0) next[key] = parsed;
    else delete next[key];
    setExpectedPrices(next);
    localStorage.setItem(EXPECTED_PRICES_KEY, JSON.stringify(next));
  };

  const addToWatchlist = (leader: Leader) => {
    const watchlistMarket = leader.market === 'tw' ? '台股' : '美股';
    try {
      const parsed = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY) || '{}') as Record<string, { symbol: string; market: string }[]>;
      const inventory = Array.isArray(parsed[DEFAULT_LIST_ID]) ? parsed[DEFAULT_LIST_ID] : [];
      if (inventory.some((item) => item.symbol === leader.symbol && item.market === watchlistMarket)) {
        setToast(`${leader.symbol} 已在庫存清單`);
        return;
      }
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify({
        ...parsed,
        [DEFAULT_LIST_ID]: [...inventory, { symbol: leader.symbol, market: watchlistMarket }],
      }));
      setToast(`已將 ${leader.symbol} 加入庫存清單`);
    } catch {
      setToast('新增失敗，請回觀察清單重試');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_48%,#fafafa_100%)] px-4 pb-16 pt-10 text-slate-900 sm:px-6">
      <main className="mx-auto w-full max-w-6xl">
        <Link href="/market-watch" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-slate-500 transition hover:text-orange-700">
          <ArrowLeft size={16} />返回市場觀察清單
        </Link>

        <header className="mb-7">
          <div className="mb-4 inline-flex rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-orange-700 ring-1 ring-orange-100">Market Explorer</div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">市場<span className="text-gradient">探索</span></h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base">查看美股與台股市值前 100 大，或先從台灣 ETF 規模前 100 名選擇標的，再查看可用的官方持股變化。</p>
        </header>

        <div className="mb-6 flex gap-1 rounded-xl bg-orange-50 p-1 ring-1 ring-orange-100">
          <button type="button" onClick={() => setMode('leaders')} className={`flex-1 rounded-lg px-3 py-2 text-sm font-black ${mode === 'leaders' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}>大型股票前 100</button>
          <button type="button" onClick={() => setMode('etf')} className={`flex-1 rounded-lg px-3 py-2 text-sm font-black ${mode === 'etf' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}>ETF 前 100／持股變化</button>
        </div>

        {toast ? <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700 ring-1 ring-emerald-100">{toast}</div> : null}

        {mode === 'leaders' ? (
          <section>
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 flex gap-1 rounded-lg bg-slate-100 p-1">
                  <button type="button" onClick={() => setMarket('us')} className={`rounded-md px-4 py-2 text-sm font-black ${market === 'us' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}>美股</button>
                  <button type="button" onClick={() => setMarket('tw')} className={`rounded-md px-4 py-2 text-sm font-black ${market === 'tw' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}>台股</button>
                </div>
                <p className="text-sm font-black text-slate-800">依{market === 'tw' ? '台股' : '美股'}市值列出前 100 大</p>
                <p className="mt-1 text-xs font-medium text-slate-400">輸入自己的預期價後，低於預期的標的會依折價幅度排在前面。</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={sort} onChange={(event) => setSort(event.target.value as LeaderSort)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700">
                  <option value="belowExpected">低於預期價優先</option>
                  <option value="gainers">今日漲幅優先</option>
                  <option value="marketCap">市值排名</option>
                </select>
                <button type="button" onClick={loadLeaders} disabled={leadersLoading} className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange-50 px-3 text-sm font-black text-orange-700 ring-1 ring-orange-100 disabled:opacity-60">
                  <RefreshCw size={15} className={leadersLoading ? 'animate-spin' : ''} />更新
                </button>
              </div>
            </div>

            {leadersError ? <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center text-sm font-bold text-rose-700">{leadersError}</div> : null}
            {leadersLoading && !leaders.length ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm font-bold text-slate-400">{market === 'tw' ? '台股' : '美股'}大型股票資料載入中...</div> : null}
            {leaders.length ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-black text-slate-400"><tr><th className="px-4 py-3">排名</th><th className="px-4 py-3">公司</th><th className="px-4 py-3 text-right">價格</th><th className="px-4 py-3 text-right">今日漲跌</th><th className="px-4 py-3 text-right">我的預期價</th><th className="hidden px-4 py-3 text-right sm:table-cell">市值</th><th className="px-4 py-3 text-right">操作</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {displayedLeaders.map((leader) => {
                        const up = (leader.changePercent || 0) > 0;
                        const down = (leader.changePercent || 0) < 0;
                        const expected = expectedPrices[expectedPriceKey(leader)];
                        const discount = expected ? ((leader.price - expected) / expected) * 100 : null;
                        return <tr key={`${leader.market}:${leader.symbol}`} className={discount !== null && discount < 0 ? 'bg-emerald-50/35 hover:bg-emerald-50/60' : 'hover:bg-orange-50/40'}>
                          <td className="px-4 py-3 font-black text-slate-400">#{leader.rank}</td>
                          <td className="min-w-48 px-4 py-3"><p className="font-black text-slate-900">{leader.symbol}</p><p className="max-w-64 truncate text-xs font-medium text-slate-400">{leader.name}</p></td>
                          <td className="px-4 py-3 text-right font-black tabular-nums">{formatPrice(leader.price, leader.currency)}</td>
                          <td className={`px-4 py-3 text-right font-black tabular-nums ${up ? 'text-emerald-600' : down ? 'text-rose-600' : 'text-slate-500'}`}><span className="inline-flex items-center gap-1">{up ? <ArrowUp size={13} /> : down ? <ArrowDown size={13} /> : null}{formatPercent(leader.changePercent)}</span></td>
                          <td className="px-4 py-3 text-right"><input aria-label={`${leader.symbol} 預期價`} type="number" min="0" step="0.01" value={expected || ''} onChange={(event) => setExpectedPrice(leader, event.target.value)} placeholder="設定" className="h-9 w-20 rounded-lg border border-slate-200 bg-white px-2 text-right text-xs font-bold tabular-nums outline-none focus:border-orange-300" />{discount !== null && discount < 0 ? <p className="mt-1 whitespace-nowrap text-[10px] font-black text-emerald-700">低於預期 {Math.abs(discount).toFixed(1)}%</p> : null}</td>
                          <td className="hidden px-4 py-3 text-right font-bold text-slate-500 sm:table-cell">{leader.currency === 'TWD' ? 'NT$' : 'US$'}{compactMoney(leader.marketCap)}</td>
                          <td className="px-4 py-3 text-right"><button type="button" onClick={() => addToWatchlist(leader)} className="inline-flex h-9 items-center gap-1 rounded-lg bg-orange-50 px-2.5 text-xs font-black text-orange-700 ring-1 ring-orange-100"><ListPlus size={14} />加入</button></td>
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 text-xs font-bold text-slate-400">
                  <span>更新時間：{formatDateTime(leadersUpdatedAt)}</span>
                  {leaderSource ? <a href={leaderSource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-orange-700">資料來源：{leaderSource.name}<ExternalLink size={12} /></a> : null}
                </div>
              </div>
            ) : null}
          </section>
        ) : (
          <section>
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-sm font-black text-slate-800">台灣 ETF 規模前 100 名</p><p className="mt-1 text-xs font-medium text-slate-400">點選任一 ETF 查看基本資料；已串接官方歷史揭露者可進一步查看持股增減。</p></div>
              <button type="button" onClick={loadEtfLeaders} disabled={etfLeadersLoading} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-50 px-3 text-sm font-black text-orange-700 ring-1 ring-orange-100 disabled:opacity-60"><RefreshCw size={15} className={etfLeadersLoading ? 'animate-spin' : ''} />更新</button>
            </div>

            {etfLeadersError ? <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center text-sm font-bold text-rose-700">{etfLeadersError}</div> : null}
            {etfLeadersLoading && !etfLeaders.length ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm font-bold text-slate-400">ETF 前 100 資料載入中...</div> : null}
            {etfLeaders.length ? <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs font-black text-slate-400"><tr><th className="px-4 py-3">排名</th><th className="px-4 py-3">ETF</th><th className="px-4 py-3 text-right">價格</th><th className="px-4 py-3 text-right">基金規模</th><th className="hidden px-4 py-3 text-right sm:table-cell">受益人</th><th className="px-4 py-3 text-right">詳情</th></tr></thead><tbody className="divide-y divide-slate-100">{etfLeaders.map((leader) => <tr key={leader.symbol} className="cursor-pointer hover:bg-orange-50/40" onClick={() => loadEtf(leader)}><td className="px-4 py-3 font-black text-slate-400">#{leader.rank}</td><td className="min-w-56 px-4 py-3"><div className="flex items-center gap-2"><p className="font-black">{leader.symbol}</p>{leader.holdingsChangeSupported ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700">可看變化</span> : null}</div><p className="max-w-80 truncate text-xs font-medium text-slate-400">{leader.name}</p></td><td className="px-4 py-3 text-right font-black tabular-nums">{formatPrice(leader.price, 'TWD')}</td><td className="px-4 py-3 text-right font-black text-orange-700">NT${compactMoney(leader.aum * 100_000_000)}</td><td className="hidden px-4 py-3 text-right text-xs font-bold text-slate-500 sm:table-cell">{leader.holders.toLocaleString('zh-TW')}</td><td className="px-4 py-3 text-right"><button type="button" onClick={(event) => { event.stopPropagation(); loadEtf(leader); }} aria-label={`查看 ${leader.symbol} 詳情`} className="rounded-lg p-2 text-orange-700 hover:bg-orange-50"><ChevronRight size={18} /></button></td></tr>)}</tbody></table></div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 text-xs font-bold text-slate-400"><span>排名依據：{etfSource?.basis || '基金規模（AUM）'}</span>{etfSource ? <a href={etfSource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-orange-700">資料來源：{etfSource.name}<ExternalLink size={12} /></a> : null}</div>
            </div> : null}

            {selectedEtf ? <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEtf(null); }}><div role="dialog" aria-modal="true" aria-labelledby="etf-detail-title" className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-widest text-orange-700">ETF #{selectedEtf.rank}</p><h2 id="etf-detail-title" className="mt-1 text-2xl font-black">{selectedEtf.symbol} {selectedEtf.name}</h2><p className="mt-2 text-xs font-bold text-slate-400">{selectedEtf.issuer} · 掛牌 {selectedEtf.listingDate}</p></div><button type="button" onClick={() => setSelectedEtf(null)} aria-label="關閉 ETF 詳情" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div><div className="mb-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-orange-50 p-4"><p className="text-xs font-bold text-slate-400">基金規模</p><p className="mt-1 text-lg font-black text-orange-700">NT${compactMoney(selectedEtf.aum * 100_000_000)}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">收盤價</p><p className="mt-1 text-lg font-black">{formatPrice(selectedEtf.price, 'TWD')}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">受益人數</p><p className="mt-1 text-lg font-black">{selectedEtf.holders.toLocaleString('zh-TW')}</p></div></div>{selectedEtf.benchmark ? <p className="mb-5 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-500">追蹤指數：{selectedEtf.benchmark}</p> : null}{etfLoading ? <div className="p-10 text-center text-sm font-bold text-slate-400">官方持股資料載入中...</div> : null}{etfMessage ? <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-center text-sm font-bold text-amber-700">{etfMessage}</div> : null}{etf ? <div className="space-y-5"><div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4"><div className="flex items-start gap-3"><WalletCards className="mt-0.5 text-orange-700" size={20} /><div><p className="font-black">官方持股揭露</p><p className="mt-1 text-xs font-bold text-slate-500">揭露日 {etf.updatedAt}{etf.previousDate ? `，與 ${etf.previousDate} 比較` : ''}</p><p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">{etf.disclosureNote}</p></div></div></div><div className="grid gap-5 lg:grid-cols-2"><div className="overflow-hidden rounded-2xl border border-slate-200"><div className="border-b border-slate-100 px-4 py-3 font-black">持股明細</div><div className="max-h-96 overflow-auto"><table className="w-full text-sm"><thead className="sticky top-0 bg-slate-50 text-xs font-black text-slate-400"><tr><th className="px-4 py-2 text-left">標的</th><th className="px-4 py-2 text-right">權重</th><th className="px-4 py-2 text-right">股數</th></tr></thead><tbody className="divide-y divide-slate-100">{etf.holdings.map((holding) => <tr key={holding.symbol}><td className="px-4 py-3"><p className="font-black">{holding.symbol}</p><p className="text-xs text-slate-400">{holding.name}</p></td><td className="px-4 py-3 text-right font-black text-orange-700">{holding.weight.toFixed(2)}%</td><td className="px-4 py-3 text-right text-xs font-bold tabular-nums text-slate-500">{holding.shares.toLocaleString('zh-TW')}</td></tr>)}</tbody></table></div></div><div className="overflow-hidden rounded-2xl border border-slate-200"><div className="border-b border-slate-100 px-4 py-3 font-black">兩次揭露間持股變化</div>{changedHoldings.length ? <div className="max-h-96 divide-y divide-slate-100 overflow-auto">{changedHoldings.map((holding) => { const increased = (holding.shareChange || 0) > 0; return <div key={holding.symbol} className="flex items-center justify-between gap-4 px-4 py-3"><div><p className="font-black">{holding.symbol} <span className="text-xs font-medium text-slate-400">{holding.name}</span></p><p className="mt-1 text-xs font-bold text-slate-400">權重變化 {holding.weightChange === null ? '-' : `${holding.weightChange > 0 ? '+' : ''}${holding.weightChange.toFixed(4)}%`}</p></div><span className={`rounded-lg px-2 py-1 text-xs font-black tabular-nums ${increased ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{increased ? '增加' : '減少'} {Math.abs(holding.shareChange || 0).toLocaleString('zh-TW')} 股</span></div>; })}</div> : <div className="p-10 text-center text-sm font-bold text-slate-400">兩次揭露間沒有股票股數變化</div>}</div></div><a href={etf.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-orange-700">資料來源：{etf.sourceName}<ExternalLink size={12} /></a></div> : null}</div></div> : null}
          </section>
        )}
      </main>
    </div>
  );
}
