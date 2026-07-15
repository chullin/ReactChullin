import { NextRequest, NextResponse } from 'next/server';

const JACKSU_BASE = 'https://www.jacksu.tw';
const STOCK_REFERER = 'https://www.jacksu.tw/tool/stock/stock-watchlist';

type Market = '美股' | '台股';

type DividendItem = {
  year?: string;
  exDividend?: {
    cash?: string;
  } | null;
  exRight?: {
    stock?: string;
  } | null;
};

type TwMarketDaily = {
  d?: string;
  instStocks?: { rows?: unknown[][] };
  instStocksPrev?: { rows?: unknown[][]; d?: string };
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

function groupDividends(items: DividendItem[] = []) {
  const byYear = new Map<string, { year: string; cash: number; stock: number }>();

  for (const item of items) {
    const year = item.year || '未知';
    const current = byYear.get(year) || { year, cash: 0, stock: 0 };
    current.cash += Number.parseFloat(item.exDividend?.cash || '0') || 0;
    current.stock += Number.parseFloat(item.exRight?.stock || '0') || 0;
    byYear.set(year, current);
  }

  return Array.from(byYear.values())
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, 20);
}

function findInstitution(symbol: string, data: TwMarketDaily | null) {
  const code = plainSymbol(symbol);
  const row = data?.instStocks?.rows?.find((item) => String(item[0]).toUpperCase() === code);
  const prev = data?.instStocksPrev?.rows?.find((item) => String(item[0]).toUpperCase() === code);

  if (!row) return null;

  const labels = ['外資', '投信', '自營', '三大合計'];

  return {
    date: data?.d || '',
    prevDate: data?.instStocksPrev?.d || '',
    rows: labels.map((label, index) => {
      const currentValue = Number(row[index + 3] || 0);
      const previousValue = prev ? Number(prev[index + 3] || 0) : null;

      return {
        label,
        value: currentValue,
        delta: previousValue === null ? null : currentValue - previousValue,
      };
    }),
  };
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

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get('symbol')?.trim();
  const market = request.nextUrl.searchParams.get('market')?.trim() as Market | undefined;
  const name = request.nextUrl.searchParams.get('name')?.trim() || symbol || '';

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
  const from = now - 365 * 24 * 60 * 60;

  const fundamentalsUrl = new URL('/api/stock/fundamentals', JACKSU_BASE);
  fundamentalsUrl.searchParams.set('symbol', normalizedSymbol);
  fundamentalsUrl.searchParams.set('market', market);

  const quoteUrl = new URL('/api/stock/quote', JACKSU_BASE);
  quoteUrl.searchParams.set('symbol', normalizedSymbol);
  quoteUrl.searchParams.set('market', market);

  const newsUrl = new URL(`/api/news/${encodeURIComponent(name)}`, JACKSU_BASE);
  newsUrl.searchParams.set('ticker', normalizedSymbol);
  newsUrl.searchParams.set('market', market);
  newsUrl.searchParams.set('limit', '8');

  const historyUrl = new URL('/api/stock', JACKSU_BASE);
  historyUrl.searchParams.set('stockNo', normalizedSymbol);
  historyUrl.searchParams.set('market', market === '台股' ? 'TW' : 'US');
  historyUrl.searchParams.set('fromDate', String(from));
  historyUrl.searchParams.set('toDate', String(now));

  const dividendUrl = new URL('/api/stock/twDividend', JACKSU_BASE);
  dividendUrl.searchParams.set('symbol', normalizedSymbol);

  const dailyUrl = 'https://cdn.jacksu.tw/data/tw-market-daily.json';

  const [fundamentals, quote, news, history, dividends, daily] = await Promise.all([
    fetchJson<any>(fundamentalsUrl),
    fetchJson<any>(quoteUrl),
    fetchJson<any>(newsUrl),
    fetchJson<any>(historyUrl),
    market === '台股' ? fetchJson<any>(dividendUrl) : Promise.resolve(null),
    market === '台股' ? fetchJson<TwMarketDaily>(dailyUrl) : Promise.resolve(null),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      symbol: quoteSymbol,
      market,
      quote: quote?.data || null,
      fundamentals: fundamentals?.data || null,
      news: news?.data || [],
      history: parseHistory(history),
      dividends: groupDividends(dividends?.data || []),
      institutions: findInstitution(normalizedSymbol, daily),
    },
  });
}
