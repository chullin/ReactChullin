'use client';

import type { FormEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpenCheck,
  ExternalLink,
  LineChart,
  Newspaper,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

type Market = '台股' | '美股';

type HistoryPoint = {
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
};

type StockQuote = {
  symbol: string;
  name?: string;
  longName?: string;
  price?: number | null;
  change?: number | null;
  changePercent?: number | null;
  previousClose?: number | null;
  currency?: string;
  exchange?: string;
  fiftyTwoWeekHigh?: number | null;
  fiftyTwoWeekLow?: number | null;
};

type StockNewsItem = {
  title: string;
  url: string;
  pubDate?: string;
  source?: string;
};

type StockDetails = {
  quote?: StockQuote | null;
  news?: StockNewsItem[];
  history?: HistoryPoint[];
};

type DetailsResponse = {
  success?: boolean;
  data?: StockDetails;
  error?: string;
};

type Indicator = {
  label: string;
  value: string;
  status: 'positive' | 'neutral' | 'negative';
  note: string;
};

type Signal = {
  title: string;
  detail: string;
  tone: 'buy' | 'hold' | 'sell' | 'risk';
};

const MARKET_OPTIONS: Market[] = ['台股', '美股'];

const STATUS_CLASS: Record<Indicator['status'], string> = {
  positive: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  neutral: 'border-slate-200 bg-slate-50 text-slate-700',
  negative: 'border-rose-200 bg-rose-50 text-rose-800',
};

const SIGNAL_CLASS: Record<Signal['tone'], string> = {
  buy: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  hold: 'border-slate-200 bg-white text-slate-700',
  sell: 'border-amber-200 bg-amber-50 text-amber-800',
  risk: 'border-rose-200 bg-rose-50 text-rose-800',
};

const SOURCE_LINKS = {
  台股: [
    { label: 'TWSE 公開資訊觀測站', href: 'https://mops.twse.com.tw/mops/web/index' },
    { label: 'Yahoo 股市台灣', href: 'https://tw.stock.yahoo.com/' },
  ],
  美股: [
    { label: 'SEC EDGAR', href: 'https://www.sec.gov/edgar/search/' },
    { label: 'Yahoo Finance', href: 'https://finance.yahoo.com/' },
  ],
} satisfies Record<Market, { label: string; href: string }[]>;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatNumber(value: number | null | undefined, digits = 2) {
  if (!isFiniteNumber(value)) return '-';
  return value.toLocaleString('zh-TW', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatPercent(value: number | null | undefined) {
  if (!isFiniteNumber(value)) return '-';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatDate(value?: string) {
  if (!value) return '日期未提供';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values: number[]) {
  const mean = average(values);
  if (!isFiniteNumber(mean) || values.length < 2) return null;
  const variance = average(values.map((value) => (value - mean) ** 2));
  return isFiniteNumber(variance) ? Math.sqrt(variance) : null;
}

function movingAverage(values: number[], windowSize: number) {
  if (values.length < windowSize) return null;
  return average(values.slice(-windowSize));
}

function calculateRsi(values: number[], period = 14) {
  if (values.length <= period) return null;
  const slice = values.slice(-(period + 1));
  let gains = 0;
  let losses = 0;

  for (let index = 1; index < slice.length; index += 1) {
    const change = slice[index] - slice[index - 1];
    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }

  if (losses === 0) return 100;
  const rs = gains / period / (losses / period);
  return 100 - 100 / (1 + rs);
}

function ema(values: number[], period: number) {
  if (values.length < period) return null;
  const multiplier = 2 / (period + 1);
  let current = average(values.slice(0, period));
  if (!isFiniteNumber(current)) return null;

  for (const value of values.slice(period)) {
    current = (value - current) * multiplier + current;
  }

  return current;
}

function calculateMacd(values: number[]) {
  const macd = isFiniteNumber(ema(values, 12)) && isFiniteNumber(ema(values, 26))
    ? (ema(values, 12) as number) - (ema(values, 26) as number)
    : null;

  if (!isFiniteNumber(macd)) return null;
  return macd;
}

function calculateMaxDrawdown(values: number[]) {
  if (values.length < 2) return null;
  let peak = values[0];
  let maxDrawdown = 0;

  for (const value of values) {
    peak = Math.max(peak, value);
    maxDrawdown = Math.min(maxDrawdown, (value - peak) / peak);
  }

  return maxDrawdown * 100;
}

function statusFromScore(score: number) {
  if (score >= 75) return '健康偏強';
  if (score >= 60) return '健康中上';
  if (score >= 45) return '中性觀察';
  return '風險偏高';
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createGoogleNewsUrl(symbol: string, market: Market) {
  const query = encodeURIComponent(`${symbol} ${market === '台股' ? '股票 財報 新聞' : 'stock earnings news'}`);
  return `https://news.google.com/search?q=${query}`;
}

function createYahooUrl(symbol: string, market: Market) {
  const value = symbol.trim().toUpperCase();
  if (market === '台股') return `https://tw.stock.yahoo.com/quote/${value}`;
  return `https://finance.yahoo.com/quote/${value}`;
}

function analyzeStock(details: StockDetails | null) {
  const history = (details?.history || []).filter((point) => isFiniteNumber(point.close));
  const closes = history.map((point) => point.close as number);
  const volumes = history.map((point) => point.volume).filter(isFiniteNumber);
  const price = details?.quote?.price ?? closes.at(-1) ?? null;
  const previousClose = details?.quote?.previousClose ?? closes.at(-2) ?? null;
  const changePercent = isFiniteNumber(price) && isFiniteNumber(previousClose) && previousClose !== 0
    ? ((price - previousClose) / previousClose) * 100
    : details?.quote?.changePercent ?? null;
  const sma20 = movingAverage(closes, 20);
  const sma60 = movingAverage(closes, 60);
  const sma120 = movingAverage(closes, 120);
  const rsi = calculateRsi(closes);
  const macd = calculateMacd(closes);
  const low52 = details?.quote?.fiftyTwoWeekLow ?? (closes.length ? Math.min(...closes.slice(-252)) : null);
  const high52 = details?.quote?.fiftyTwoWeekHigh ?? (closes.length ? Math.max(...closes.slice(-252)) : null);
  const drawdown = calculateMaxDrawdown(closes.slice(-252));
  const recentReturns = closes.slice(-61).flatMap((value, index, list) => {
    if (index === 0) return [];
    return list[index - 1] ? [(value - list[index - 1]) / list[index - 1]] : [];
  });
  const volatility = standardDeviation(recentReturns);
  const annualVolatility = isFiniteNumber(volatility) ? volatility * Math.sqrt(252) * 100 : null;
  const avgVolume20 = average(volumes.slice(-20));
  const latestVolume = volumes.at(-1) ?? null;
  const volumeRatio = isFiniteNumber(latestVolume) && isFiniteNumber(avgVolume20) && avgVolume20 > 0
    ? latestVolume / avgVolume20
    : null;
  const distanceFromHigh = isFiniteNumber(price) && isFiniteNumber(high52) && high52 > 0 ? ((price - high52) / high52) * 100 : null;
  const distanceFromLow = isFiniteNumber(price) && isFiniteNumber(low52) && low52 > 0 ? ((price - low52) / low52) * 100 : null;

  const trendScore = isFiniteNumber(price) && isFiniteNumber(sma60) ? (price >= sma60 ? 18 : 7) : 10;
  const longTrendScore = isFiniteNumber(sma60) && isFiniteNumber(sma120) ? (sma60 >= sma120 ? 14 : 6) : 8;
  const momentumScore = isFiniteNumber(rsi) ? (rsi >= 45 && rsi <= 70 ? 18 : rsi > 70 ? 10 : 7) : 10;
  const macdScore = isFiniteNumber(macd) ? (macd >= 0 ? 12 : 5) : 7;
  const riskScore = isFiniteNumber(annualVolatility) ? clamp(18 - annualVolatility / 4, 5, 18) : 10;
  const rangeScore = isFiniteNumber(distanceFromHigh) ? (distanceFromHigh > -12 ? 14 : distanceFromHigh > -28 ? 9 : 5) : 8;
  const score = Math.round(clamp(trendScore + longTrendScore + momentumScore + macdScore + riskScore + rangeScore, 0, 100));

  const indicators: Indicator[] = [
    {
      label: '20 日均線',
      value: formatNumber(sma20),
      status: isFiniteNumber(price) && isFiniteNumber(sma20) ? (price >= sma20 ? 'positive' : 'negative') : 'neutral',
      note: '短線價格是否仍站在近期成本之上。',
    },
    {
      label: '60 / 120 日趨勢',
      value: `${formatNumber(sma60)} / ${formatNumber(sma120)}`,
      status: isFiniteNumber(sma60) && isFiniteNumber(sma120) ? (sma60 >= sma120 ? 'positive' : 'negative') : 'neutral',
      note: '判斷中期趨勢是否仍偏多。',
    },
    {
      label: 'RSI 14',
      value: formatNumber(rsi),
      status: isFiniteNumber(rsi) ? (rsi > 75 ? 'negative' : rsi >= 45 ? 'positive' : 'negative') : 'neutral',
      note: '45-70 通常較健康，過熱或過弱都要小心。',
    },
    {
      label: 'MACD 動能',
      value: formatNumber(macd),
      status: isFiniteNumber(macd) ? (macd >= 0 ? 'positive' : 'negative') : 'neutral',
      note: '正值代表短中期動能仍偏強。',
    },
    {
      label: '距 52 週高點',
      value: formatPercent(distanceFromHigh),
      status: isFiniteNumber(distanceFromHigh) ? (distanceFromHigh > -12 ? 'positive' : distanceFromHigh > -28 ? 'neutral' : 'negative') : 'neutral',
      note: '離高點太遠通常代表趨勢或市場信心轉弱。',
    },
    {
      label: '距 52 週低點',
      value: formatPercent(distanceFromLow),
      status: isFiniteNumber(distanceFromLow) ? (distanceFromLow > 20 ? 'positive' : 'neutral') : 'neutral',
      note: '確認是否只是低檔反彈，或已脫離弱勢區。',
    },
    {
      label: '近 1 年最大回撤',
      value: formatPercent(drawdown),
      status: isFiniteNumber(drawdown) ? (drawdown > -20 ? 'positive' : drawdown > -35 ? 'neutral' : 'negative') : 'neutral',
      note: '回撤越深，代表持有期間承受壓力越大。',
    },
    {
      label: '60 日年化波動',
      value: formatPercent(annualVolatility),
      status: isFiniteNumber(annualVolatility) ? (annualVolatility < 30 ? 'positive' : annualVolatility < 50 ? 'neutral' : 'negative') : 'neutral',
      note: '用來估計部位大小與停損距離。',
    },
    {
      label: '成交量比',
      value: isFiniteNumber(volumeRatio) ? `${volumeRatio.toFixed(2)}x` : '-',
      status: isFiniteNumber(volumeRatio) ? (volumeRatio >= 1.2 ? 'positive' : volumeRatio < 0.7 ? 'neutral' : 'positive') : 'neutral',
      note: '放量上漲較有續航，縮量反彈可信度較低。',
    },
  ];

  const signals: Signal[] = [
    {
      title: score >= 60 ? '可以列入買進觀察' : '先等條件改善',
      detail: score >= 60
        ? '健康分數達中上，若價格回測 20/60 日均線不破，且新聞面沒有重大利空，可以分批建立部位。'
        : '目前趨勢或動能不足，適合等價格站回 60 日線、RSI 回到 45 以上，再評估進場。',
      tone: score >= 60 ? 'buy' : 'hold',
    },
    {
      title: isFiniteNumber(rsi) && rsi > 75 ? '短線過熱，適合部分獲利' : '停利看 52 週高點與量能',
      detail: isFiniteNumber(rsi) && rsi > 75
        ? 'RSI 已偏熱，若同時接近 52 週高點，可以先賣出一部分，保留核心部位觀察趨勢。'
        : '若股價接近 52 週高點但成交量沒有同步放大，適合分批停利；若放量突破則可續抱。',
      tone: 'sell',
    },
    {
      title: isFiniteNumber(price) && isFiniteNumber(sma60) && price < sma60 ? '跌破中期線，降低持股風險' : '風控線可放在 60 日線附近',
      detail: isFiniteNumber(price) && isFiniteNumber(sma60) && price < sma60
        ? '價格已低於 60 日均線，代表中期趨勢轉弱；若是既有持股，應檢查是否需要減碼或停損。'
        : '只要價格仍在 60 日均線上方，趨勢尚未明顯破壞；跌破且 2-3 天無法站回時要提高警覺。',
      tone: isFiniteNumber(price) && isFiniteNumber(sma60) && price < sma60 ? 'risk' : 'hold',
    },
  ];

  return {
    price,
    changePercent,
    score,
    status: statusFromScore(score),
    indicators,
    signals,
    historyCount: history.length,
  };
}

function MiniChart({ history }: { history: HistoryPoint[] }) {
  const values = history.map((point) => point.close).filter(isFiniteNumber).slice(-160);

  if (values.length < 2) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm font-semibold text-slate-400">
        暫無足夠歷史價格
      </div>
    );
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const path = values
    .map((value, index) => {
      const x = 2 + (index / (values.length - 1)) * 96;
      const y = 8 + (1 - (value - min) / range) * 84;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-64 w-full rounded-lg bg-slate-950 p-1">
      <path d={path} fill="none" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function StockHealthClient() {
  const [symbol, setSymbol] = useState('2330');
  const [market, setMarket] = useState<Market>('台股');
  const [details, setDetails] = useState<StockDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analysis = useMemo(() => analyzeStock(details), [details]);
  const quoteName = details?.quote?.longName || details?.quote?.name || symbol.toUpperCase();

  const loadDetails = useCallback(async (nextSymbol = symbol, nextMarket = market) => {
    const normalizedSymbol = nextSymbol.trim().toUpperCase();
    if (!normalizedSymbol) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        symbol: normalizedSymbol,
        market: nextMarket,
        name: normalizedSymbol,
      });
      const response = await fetch(`/api/stock/details?${params.toString()}`, { cache: 'no-store' });
      const payload = (await response.json()) as DetailsResponse;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || '無法取得股票資料');
      }

      setDetails(payload.data || null);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : '無法取得股票資料');
    } finally {
      setIsLoading(false);
    }
  }, [market, symbol]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void loadDetails();
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
                <ShieldCheck size={16} />
                股票健康度分析
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                用指標、新聞與來源判斷買賣時機
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                輸入台股或美股代號，頁面會用趨勢、動能、波動、52 週位置與新聞來源整理成健康分數，並給出分批買進、部分獲利與停損觀察條件。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_auto_auto]">
              <label className="sr-only" htmlFor="stock-symbol">股票代號</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="stock-symbol"
                  value={symbol}
                  onChange={(event) => setSymbol(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-base font-bold text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="例如 2330 或 AAPL"
                />
              </div>
              <select
                value={market}
                onChange={(event) => setMarket(event.target.value as Market)}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              >
                {MARKET_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
              >
                {isLoading ? <RefreshCw size={17} className="animate-spin" /> : <BarChart3 size={17} />}
                分析
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{market} / {symbol.toUpperCase()}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{quoteName}</h2>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">目前價格</p>
                <p className="text-3xl font-black text-slate-950">{formatNumber(analysis.price)}</p>
              </div>
              <div className={`rounded-lg px-3 py-2 text-sm font-black ${isFiniteNumber(analysis.changePercent) && analysis.changePercent < 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                {formatPercent(analysis.changePercent)}
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-slate-950 p-4 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-300">健康分數</span>
                <span className="text-sm font-bold text-emerald-300">{analysis.status}</span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-black">{analysis.score}</span>
                <span className="pb-2 text-sm font-bold text-slate-400">/ 100</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/15">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${analysis.score}%` }} />
              </div>
            </div>
            {error && (
              <div className="mt-4 flex gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">
                <AlertTriangle size={18} className="shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpenCheck size={18} className="text-orange-600" />
              <h3 className="text-lg font-black text-slate-950">資料來源</h3>
            </div>
            <div className="space-y-3 text-sm">
              <a href={createYahooUrl(symbol, market)} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:border-orange-300 hover:text-orange-700">
                Yahoo Finance / 股市
                <ExternalLink size={15} />
              </a>
              <a href={createGoogleNewsUrl(symbol, market)} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:border-orange-300 hover:text-orange-700">
                Google News 搜尋
                <ExternalLink size={15} />
              </a>
              {SOURCE_LINKS[market].map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:border-orange-300 hover:text-orange-700">
                  {source.label}
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              本頁提供投資研究輔助，不構成買賣建議；財報與重大訊息仍應回到交易所、公開資訊觀測站或 SEC 等原始來源確認。
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LineChart size={20} className="text-orange-600" />
                <h3 className="text-lg font-black text-slate-950">價格趨勢</h3>
              </div>
              <span className="text-sm font-bold text-slate-500">{analysis.historyCount ? `${analysis.historyCount} 筆日線` : '等待分析'}</span>
            </div>
            <MiniChart history={details?.history || []} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {analysis.signals.map((signal) => (
              <div key={signal.title} className={`rounded-lg border p-4 ${SIGNAL_CLASS[signal.tone]}`}>
                <div className="mb-3 flex items-center gap-2">
                  {signal.tone === 'buy' ? <TrendingUp size={18} /> : signal.tone === 'risk' ? <TrendingDown size={18} /> : <Activity size={18} />}
                  <h3 className="text-base font-black">{signal.title}</h3>
                </div>
                <p className="text-sm font-semibold leading-7">{signal.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Activity size={20} className="text-orange-600" />
              <h3 className="text-lg font-black text-slate-950">評判指標</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {analysis.indicators.map((indicator) => (
                <div key={indicator.label} className={`rounded-lg border p-4 ${STATUS_CLASS[indicator.status]}`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black">{indicator.label}</p>
                    <p className="text-lg font-black">{indicator.value}</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-6 opacity-80">{indicator.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Newspaper size={20} className="text-orange-600" />
                <h3 className="text-lg font-black text-slate-950">新聞與連結</h3>
              </div>
              <a href={createGoogleNewsUrl(symbol, market)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-black text-orange-700 hover:text-orange-900">
                更多新聞
                <ExternalLink size={15} />
              </a>
            </div>
            <div className="grid gap-3">
              {(details?.news || []).slice(0, 8).map((item) => (
                <a key={`${item.title}-${item.url}`} href={item.url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black leading-7 text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{item.source || '新聞來源'} · {formatDate(item.pubDate)}</p>
                    </div>
                    <ExternalLink size={17} className="mt-1 shrink-0 text-slate-400" />
                  </div>
                </a>
              ))}
              {!details?.news?.length && (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
                  分析後會顯示相關新聞；若資料源暫無新聞，可使用上方 Google News 連結查詢。
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
