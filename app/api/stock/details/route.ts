import { NextRequest, NextResponse } from 'next/server';
import { fetchYahooStockQuote } from '@/lib/market/providers/yahooStockFallback';

const JACKSU_BASE = 'https://www.jacksu.tw';
const STOCK_REFERER = 'https://www.jacksu.tw/tool/stock/stock-watchlist';

type Market = '美股' | '台股';
type HistoryPoint = {
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
};

type NasdaqHistoryResponse = {
  data?: {
    tradesTable?: {
      rows?: {
        date?: string;
        open?: string;
        high?: string;
        low?: string;
        close?: string;
        volume?: string;
      }[];
    };
  };
};

type TwseHistoryResponse = {
  stat?: string;
  data?: string[][];
};

const jsonHeaders = {
  accept: 'application/json',
  referer: STOCK_REFERER,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
};

export const dynamic = 'force-dynamic';

async function fetchJson<T>(url: URL | string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: jsonHeaders,
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) return null;
    return response.json() as Promise<T>;
  } catch {
    return null;
  }
}

function yahooSymbol(symbol: string, market: Market) {
  const value = symbol.trim().toUpperCase();

  if (market === '台股' && !value.endsWith('.TW') && !value.endsWith('.TWO')) {
    return `${value}.TW`;
  }

  return value;
}

function plainSymbol(symbol: string) {
  return symbol.trim().toUpperCase().replace(/\.(TW|TWO)$/i, '');
}

function requestedYears(value: string | null) {
  const years = Number(value);
  if (!Number.isFinite(years)) return 5;
  return Math.min(20, Math.max(1, Math.ceil(years)));
}

function parseHistory(payload: any) {
  const result = payload?.chart?.result?.[0];
  const timestamps: number[] = result?.timestamp || [];
  const quote = result?.indicators?.quote?.[0] || {};

  return timestamps
    .map((timestamp, index) => ({
      time: timestamp,
      date: new Date(timestamp * 1000).toISOString().slice(0, 10),
      open: quote.open?.[index] ?? null,
      high: quote.high?.[index] ?? null,
      low: quote.low?.[index] ?? null,
      close: quote.close?.[index] ?? null,
      volume: quote.volume?.[index] ?? null,
    }))
    .filter((point) => Number.isFinite(point.close));
}

function parseMarketNumber(value: string | number | null | undefined) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const cleaned = String(value ?? '').replace(/[$,%\s,]/g, '');
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseNasdaqDate(value: string | undefined) {
  if (!value) return null;
  const [month, day, year] = value.split('/').map(Number);
  if (!month || !day || !year) return null;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

async function fetchNasdaqHistory(symbol: string, years: number): Promise<HistoryPoint[]> {
  const now = new Date();
  const from = new Date(now.getTime() - years * 365 * 24 * 60 * 60_000);
  const fromDate = from.toISOString().slice(0, 10);
  const toDate = now.toISOString().slice(0, 10);

  for (const assetClass of ['stocks', 'etf']) {
    try {
      const url = new URL(`https://api.nasdaq.com/api/quote/${encodeURIComponent(symbol)}/historical`);
      url.searchParams.set('assetclass', assetClass);
      url.searchParams.set('fromdate', fromDate);
      url.searchParams.set('todate', toDate);
      url.searchParams.set('limit', '9999');

      const response = await fetch(url, {
        next: { revalidate: 60 * 60 },
        headers: {
          accept: 'application/json',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
        },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) continue;

      const payload = (await response.json()) as NasdaqHistoryResponse;
      const points = (payload.data?.tradesTable?.rows || []).flatMap((row) => {
        const date = parseNasdaqDate(row.date);
        const close = parseMarketNumber(row.close);
        if (!date || close === null) return [];

        return [{
          date,
          open: parseMarketNumber(row.open),
          high: parseMarketNumber(row.high),
          low: parseMarketNumber(row.low),
          close,
          volume: parseMarketNumber(row.volume),
        }];
      });

      if (points.length) return points.reverse();
    } catch {
      // Try the other Nasdaq asset class before returning no history.
    }
  }

  return [];
}

function twseMonthStarts(years: number, now: Date) {
  const from = new Date(now.getTime() - years * 365 * 24 * 60 * 60_000);
  const firstMonth = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), 1);
  const lastMonth = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const months: number[] = [];

  for (let month = firstMonth; month <= lastMonth; month = new Date(month).setUTCMonth(new Date(month).getUTCMonth() + 1)) {
    months.push(month);
  }

  return months;
}

function parseTwseHistoryDate(value: string | undefined) {
  if (!value) return null;
  const [rocYear, month, day] = value.split('/').map(Number);
  if (!rocYear || !month || !day) return null;
  return `${rocYear + 1911}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

async function fetchTwseHistory(symbol: string, years: number): Promise<HistoryPoint[]> {
  const monthStarts = twseMonthStarts(years, new Date());
  const monthlyPoints: HistoryPoint[][] = Array.from({ length: monthStarts.length }, () => []);
  let nextIndex = 0;

  async function fetchMonth(monthStart: number) {
    const date = new Date(monthStart);
    const month = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, '0')}01`;
    const url = new URL('https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY');
    url.searchParams.set('date', month);
    url.searchParams.set('stockNo', symbol);
    url.searchParams.set('response', 'json');

    try {
      const response = await fetch(url, {
        next: { revalidate: 60 * 60 },
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) return [];

      const payload = (await response.json()) as TwseHistoryResponse;
      if (payload.stat !== 'OK') return [];

      return (payload.data || []).flatMap((row) => {
        const date = parseTwseHistoryDate(row[0]);
        const close = parseMarketNumber(row[6]);
        if (!date || close === null) return [];

        return [{
          date,
          open: parseMarketNumber(row[3]),
          high: parseMarketNumber(row[4]),
          low: parseMarketNumber(row[5]),
          close,
          volume: parseMarketNumber(row[1]),
        }];
      });
    } catch {
      return [];
    }
  }

  async function worker() {
    while (nextIndex < monthStarts.length) {
      const index = nextIndex;
      nextIndex += 1;
      monthlyPoints[index] = await fetchMonth(monthStarts[index]);
    }
  }

  const workerCount = Math.min(8, monthStarts.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return monthlyPoints.flat().sort((first, second) => first.date.localeCompare(second.date));
}

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get('symbol')?.trim();
  const market = request.nextUrl.searchParams.get('market')?.trim() as Market | undefined;
  const name = request.nextUrl.searchParams.get('name')?.trim() || symbol || '';
  const years = requestedYears(request.nextUrl.searchParams.get('years'));
  const historyOnly = request.nextUrl.searchParams.get('historyOnly') === '1';

  if (!symbol || !market) {
    return NextResponse.json(
      { success: false, error: 'Missing symbol or market' },
      { status: 400 },
    );
  }

  if (!['美股', '台股'].includes(market)) {
    return NextResponse.json(
      { success: false, error: 'Only 美股 and 台股 are supported' },
      { status: 400 },
    );
  }

  const normalizedSymbol = plainSymbol(symbol);
  const quoteSymbol = yahooSymbol(symbol, market);
  const now = Math.floor(Date.now() / 1000);
  const from = now - years * 365 * 24 * 60 * 60;

  const quoteUrl = new URL('/api/stock/quote', JACKSU_BASE);
  quoteUrl.searchParams.set('symbol', normalizedSymbol);
  quoteUrl.searchParams.set('market', market);

  const newsUrl = new URL(`/api/news/${encodeURIComponent(name)}`, JACKSU_BASE);
  newsUrl.searchParams.set('ticker', normalizedSymbol);
  newsUrl.searchParams.set('market', market);
  newsUrl.searchParams.set('limit', '20');

  const historyUrl = new URL('/api/stock', JACKSU_BASE);
  historyUrl.searchParams.set('stockNo', normalizedSymbol);
  historyUrl.searchParams.set('market', market === '台股' ? 'TW' : '美股');
  historyUrl.searchParams.set('fromDate', String(from));
  historyUrl.searchParams.set('toDate', String(now));

  const [quote, news, history] = await Promise.all([
    historyOnly ? Promise.resolve(null) : market === '台股'
      ? fetchYahooStockQuote(normalizedSymbol, market).then((data) => ({ data }))
      : fetchJson<any>(quoteUrl),
    historyOnly ? Promise.resolve(null) : fetchJson<any>(newsUrl),
    fetchJson<any>(historyUrl),
  ]);
  const parsedHistory = parseHistory(history);
  const [fallbackQuote, fallbackHistory] = await Promise.all([
    historyOnly ? Promise.resolve(null) : quote?.data ? Promise.resolve(quote.data) : fetchYahooStockQuote(normalizedSymbol, market),
    parsedHistory.length
      ? Promise.resolve(parsedHistory)
      : market === '台股'
        ? fetchTwseHistory(normalizedSymbol, years)
        : fetchNasdaqHistory(normalizedSymbol, years),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      symbol: quoteSymbol,
      market,
      quote: quote?.data || fallbackQuote || null,
      news: news?.data || [],
      history: parsedHistory.length ? parsedHistory : fallbackHistory,
      historyYears: years,
    },
  });
}
