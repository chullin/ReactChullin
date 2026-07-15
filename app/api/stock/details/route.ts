import { NextRequest, NextResponse } from 'next/server';

const JACKSU_BASE = 'https://www.jacksu.tw';
const STOCK_REFERER = 'https://www.jacksu.tw/tool/stock/stock-watchlist';

type Market = '美股' | '台股';

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
  const from = now - 5 * 365 * 24 * 60 * 60;

  const quoteUrl = new URL('/api/stock/quote', JACKSU_BASE);
  quoteUrl.searchParams.set('symbol', normalizedSymbol);
  quoteUrl.searchParams.set('market', market);

  const newsUrl = new URL(`/api/news/${encodeURIComponent(name)}`, JACKSU_BASE);
  newsUrl.searchParams.set('ticker', normalizedSymbol);
  newsUrl.searchParams.set('market', market);
  newsUrl.searchParams.set('limit', '8');

  const historyUrl = new URL('/api/stock', JACKSU_BASE);
  historyUrl.searchParams.set('stockNo', normalizedSymbol);
  historyUrl.searchParams.set('market', market === '台股' ? 'TW' : '美股');
  historyUrl.searchParams.set('fromDate', String(from));
  historyUrl.searchParams.set('toDate', String(now));

  const [quote, news, history] = await Promise.all([
    fetchJson<any>(quoteUrl),
    fetchJson<any>(newsUrl),
    fetchJson<any>(historyUrl),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      symbol: quoteSymbol,
      market,
      quote: quote?.data || null,
      news: news?.data || [],
      history: parseHistory(history),
    },
  });
}
