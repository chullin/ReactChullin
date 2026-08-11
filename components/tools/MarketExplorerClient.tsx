'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink, ListPlus, RefreshCw, Search, WalletCards } from 'lucide-react';

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
};

type LeadersResponse = {
  success?: boolean;
  data?: Leader[];
  updatedAt?: string;
  sourceName?: string;
  sourceUrl?: string;
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
const EXPECTED_PRICES_KEY = 'market-explorer-expected-prices:v1';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: 'no-store' });
  const payload = await response.json() as T;
  if (!response.ok) throw new Error((payload as { error?: string }).error || `HTTP ${response.status}`);
  return payload;
}

function formatPrice(value: number | null, currency = 'USD') {
  if (value === null) return '-';
  return value.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits: 2 });
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

export default function MarketExplorerClient() {
  const [mode, setMode] = useState<ExplorerMode>('leaders');
  const [sort, setSort] = useState<LeaderSort>('belowExpected');
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [leadersLoading, setLeadersLoading] = useState(true);
  const [leadersError, setLeadersError] = useState<string | null>(null);
  const [leadersUpdatedAt, setLeadersUpdatedAt] = useState<string | null>(null);
  const [leaderSource, setLeaderSource] = useState<{ name: string; url: string } | null>(null);
  const [etfSymbol, setEtfSymbol] = useState('006208');
  const [etf, setEtf] = useState<NonNullable<EtfResponse['data']> | null>(null);
  const [etfLoading, setEtfLoading] = useState(false);
  const [etfMessage, setEtfMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [expectedPrices, setExpectedPrices] = useState<Record<string, number>>({});

  const loadLeaders = useCallback(async () => {
    setLeadersLoading(true);
    setLeadersError(null);
    try {
      const payload = await fetchJson<LeadersResponse>('/api/market/leaders');
      if (!payload.success) throw new Error(payload.error || '載入失敗');
      setLeaders(payload.data || []);
      setLeadersUpdatedAt(payload.updatedAt || null);
      setLeaderSource(payload.sourceName && payload.sourceUrl ? { name: payload.sourceName, url: payload.sourceUrl } : null);
    } catch (error) {
      setLeadersError(error instanceof Error ? error.message : '暫時無法取得排行');
    } finally {
      setLeadersLoading(false);
    }
  }, []);

  const loadEtf = useCallback(async () => {
    const normalized = etfSymbol.trim().toUpperCase().replace(/\.(TW|TWO)$/i, '');
    if (!normalized) return;
    setEtfLoading(true);
    setEtfMessage(null);
    try {
      const payload = await fetchJson<EtfResponse>(`/api/market/etf-holdings?symbol=${encodeURIComponent(normalized)}`);
      setEtf(payload.data || null);
      if (!payload.supported || !payload.data) setEtfMessage(payload.message || payload.error || '尚無可用資料');
    } catch (error) {
      setEtf(null);
      setEtfMessage(error instanceof Error ? error.message : 'ETF 資料載入失敗');
    } finally {
      setEtfLoading(false);
    }
  }, [etfSymbol]);

  useEffect(() => {
    loadLeaders();
  }, [loadLeaders]);

  useEffect(() => {
    try {
      setExpectedPrices(JSON.parse(localStorage.getItem(EXPECTED_PRICES_KEY) || '{}'));
    } catch {
      setExpectedPrices({});
    }
  }, []);

  useEffect(() => {
    if (mode === 'etf' && !etf && !etfLoading) loadEtf();
  }, [etf, etfLoading, loadEtf, mode]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const displayedLeaders = useMemo(() => {
    const next = [...leaders];
    if (sort === 'belowExpected') return next.sort((a, b) => {
      const aTarget = expectedPrices[a.symbol];
      const bTarget = expectedPrices[b.symbol];
      const rawADiscount = aTarget ? (a.price - aTarget) / aTarget : Number.POSITIVE_INFINITY;
      const rawBDiscount = bTarget ? (b.price - bTarget) / bTarget : Number.POSITIVE_INFINITY;
      const aDiscount = rawADiscount < 0 ? rawADiscount : Number.POSITIVE_INFINITY;
      const bDiscount = rawBDiscount < 0 ? rawBDiscount : Number.POSITIVE_INFINITY;
      return aDiscount - bDiscount || (a.changePercent ?? 0) - (b.changePercent ?? 0);
    });
    if (sort === 'gainers') return next.sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0));
    return next.sort((a, b) => a.rank - b.rank);
  }, [expectedPrices, leaders, sort]);

  const setExpectedPrice = (symbol: string, value: string) => {
    const parsed = Number(value);
    const next = { ...expectedPrices };
    if (Number.isFinite(parsed) && parsed > 0) next[symbol] = parsed;
    else delete next[symbol];
    setExpectedPrices(next);
    localStorage.setItem(EXPECTED_PRICES_KEY, JSON.stringify(next));
  };

  const changedHoldings = useMemo(
    () => (etf?.holdings || [])
      .filter((holding) => holding.shareChange !== null && holding.shareChange !== 0)
      .sort((a, b) => Math.abs(b.shareChange || 0) - Math.abs(a.shareChange || 0)),
    [etf],
  );

  const addToWatchlist = (leader: Leader) => {
    try {
      const parsed = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY) || '{}') as Record<string, { symbol: string; market: string }[]>;
      const inventory = Array.isArray(parsed[DEFAULT_LIST_ID]) ? parsed[DEFAULT_LIST_ID] : [];
      if (inventory.some((item) => item.symbol === leader.symbol && item.market === '美股')) {
        setToast(`${leader.symbol} 已在庫存清單`);
        return;
      }
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify({
        ...parsed,
        [DEFAULT_LIST_ID]: [...inventory, { symbol: leader.symbol, market: '美股' }],
      }));
      setToast(`已將 ${leader.symbol} 加入庫存清單`);
    } catch {
      setToast('新增失敗，請回觀察清單重試');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_48%,#fafafa_100%)] px-4 pb-16 pt-10 text-slate-900 sm:px-6">
      <main className="mx-auto w-full max-w-6xl">
        <header className="mb-7">
          <div className="mb-4 inline-flex rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-orange-700 ring-1 ring-orange-100">Market Explorer</div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">市場<span className="text-gradient">探索</span></h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base">查看大型股票即時漲跌與回檔觀察順序，並追蹤 ETF 官方揭露的持股與相鄰日期變化。</p>
        </header>

        <div className="mb-6 flex gap-1 rounded-xl bg-orange-50 p-1 ring-1 ring-orange-100">
          <button type="button" onClick={() => setMode('leaders')} className={`flex-1 rounded-lg px-3 py-2 text-sm font-black ${mode === 'leaders' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}>大型股票前 100</button>
          <button type="button" onClick={() => setMode('etf')} className={`flex-1 rounded-lg px-3 py-2 text-sm font-black ${mode === 'etf' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}>ETF 持股變化</button>
        </div>

        {toast ? <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700 ring-1 ring-emerald-100">{toast}</div> : null}

        {mode === 'leaders' ? (
          <section>
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-slate-800">依美股市值列出前 100 大</p>
                <p className="mt-1 text-xs font-medium text-slate-400">輸入自己的預期價後，「低於預期」的標的會依折價幅度排前；未設定者排在後面。</p>
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
            {leadersLoading && !leaders.length ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm font-bold text-slate-400">大型股票資料載入中...</div> : null}
            {leaders.length ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-black text-slate-400"><tr><th className="px-4 py-3">排名</th><th className="px-4 py-3">公司</th><th className="px-4 py-3 text-right">價格</th><th className="px-4 py-3 text-right">今日漲跌</th><th className="px-4 py-3 text-right">我的預期價</th><th className="hidden px-4 py-3 text-right sm:table-cell">市值</th><th className="px-4 py-3 text-right">操作</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {displayedLeaders.map((leader) => {
                        const up = (leader.changePercent || 0) > 0;
                        const down = (leader.changePercent || 0) < 0;
                        const expected = expectedPrices[leader.symbol];
                        const discount = expected ? ((leader.price - expected) / expected) * 100 : null;
                        return <tr key={leader.symbol} className={discount !== null && discount < 0 ? 'bg-emerald-50/35 hover:bg-emerald-50/60' : 'hover:bg-orange-50/40'}>
                          <td className="px-4 py-3 font-black text-slate-400">#{leader.rank}</td>
                          <td className="min-w-48 px-4 py-3"><p className="font-black text-slate-900">{leader.symbol}</p><p className="max-w-64 truncate text-xs font-medium text-slate-400">{leader.name}</p></td>
                          <td className="px-4 py-3 text-right font-black tabular-nums">{formatPrice(leader.price)}</td>
                          <td className={`px-4 py-3 text-right font-black tabular-nums ${up ? 'text-emerald-600' : down ? 'text-rose-600' : 'text-slate-500'}`}><span className="inline-flex items-center gap-1">{up ? <ArrowUp size={13} /> : down ? <ArrowDown size={13} /> : null}{formatPercent(leader.changePercent)}</span></td>
                          <td className="px-4 py-3 text-right"><input aria-label={`${leader.symbol} 預期價`} type="number" min="0" step="0.01" value={expected || ''} onChange={(event) => setExpectedPrice(leader.symbol, event.target.value)} placeholder="設定" className="h-9 w-20 rounded-lg border border-slate-200 bg-white px-2 text-right text-xs font-bold tabular-nums outline-none focus:border-orange-300" />{discount !== null && discount < 0 ? <p className="mt-1 whitespace-nowrap text-[10px] font-black text-emerald-700">低於預期 {Math.abs(discount).toFixed(1)}%</p> : null}</td>
                          <td className="hidden px-4 py-3 text-right font-bold text-slate-500 sm:table-cell">US${compactMoney(leader.marketCap)}</td>
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
            <form onSubmit={(event) => { event.preventDefault(); loadEtf(); }} className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 sm:flex sm:items-end sm:gap-3">
              <div className="flex-1"><label htmlFor="etfSymbol" className="text-sm font-black text-slate-700">ETF 代號</label><input id="etfSymbol" value={etfSymbol} onChange={(event) => setEtfSymbol(event.target.value.toUpperCase())} placeholder="目前支援 006208" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-bold outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100" /></div>
              <button type="submit" disabled={etfLoading} className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-sm font-black text-white disabled:opacity-60 sm:mt-0 sm:w-auto"><Search size={16} />{etfLoading ? '查詢中...' : '查詢持股'}</button>
            </form>

            {etfMessage ? <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 text-center text-sm font-bold text-orange-700">{etfMessage}</div> : null}
            {etf ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                  <div className="flex items-start gap-3"><WalletCards className="mt-0.5 text-orange-700" size={20} /><div><p className="font-black text-slate-900">{etf.symbol} {etf.name}</p><p className="mt-1 text-xs font-bold text-slate-500">揭露日 {etf.updatedAt}{etf.previousDate ? `，與 ${etf.previousDate} 比較` : ''}</p><p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">{etf.disclosureNote}</p></div></div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="border-b border-slate-100 px-4 py-3 font-black">持股明細</div><div className="max-h-[36rem] overflow-auto"><table className="w-full text-sm"><thead className="sticky top-0 bg-slate-50 text-xs font-black text-slate-400"><tr><th className="px-4 py-2 text-left">標的</th><th className="px-4 py-2 text-right">權重</th><th className="px-4 py-2 text-right">股數</th></tr></thead><tbody className="divide-y divide-slate-100">{etf.holdings.map((holding) => <tr key={holding.symbol}><td className="px-4 py-3"><p className="font-black">{holding.symbol}</p><p className="text-xs text-slate-400">{holding.name}</p></td><td className="px-4 py-3 text-right font-black text-orange-700">{holding.weight.toFixed(2)}%</td><td className="px-4 py-3 text-right text-xs font-bold tabular-nums text-slate-500">{holding.shares.toLocaleString('zh-TW')}</td></tr>)}</tbody></table></div></div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="border-b border-slate-100 px-4 py-3 font-black">兩次揭露間持股變化</div>{changedHoldings.length ? <div className="max-h-[36rem] overflow-auto divide-y divide-slate-100">{changedHoldings.map((holding) => { const increased = (holding.shareChange || 0) > 0; return <div key={holding.symbol} className="flex items-center justify-between gap-4 px-4 py-3"><div><p className="font-black">{holding.symbol} <span className="text-xs font-medium text-slate-400">{holding.name}</span></p><p className="mt-1 text-xs font-bold text-slate-400">權重變化 {holding.weightChange === null ? '-' : `${holding.weightChange > 0 ? '+' : ''}${holding.weightChange.toFixed(4)}%`}</p></div><span className={`rounded-lg px-2 py-1 text-xs font-black tabular-nums ${increased ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{increased ? '增加' : '減少'} {Math.abs(holding.shareChange || 0).toLocaleString('zh-TW')} 股</span></div>; })}</div> : <div className="p-10 text-center text-sm font-bold text-slate-400">兩次揭露間沒有股票股數變化</div>}</div>
                </div>
                <a href={etf.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-orange-700">資料來源：{etf.sourceName}<ExternalLink size={12} /></a>
              </div>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}
