import { NextRequest, NextResponse } from 'next/server';
import { fetchYahooStockQuote } from '@/lib/market/providers/yahooStockFallback';

const STOCK_API_BASE = 'https://www.jacksu.tw/api/stock/quotes-batch';
const STOCK_REFERER = 'https://www.jacksu.tw/tool/stock/stock-watchlist';

export const dynamic = 'force-dynamic';

function keepSupportedStocks(stocks: string) {
  return stocks
    .split(',')
    .map((stock) => stock.trim())
    .filter((stock) => {
      const [, market] = stock.split(':');
      return market === '美股' || market === '台股';
    })
    .join(',');
}

function parseStocks(stocks: string) {
  return stocks.split(',').flatMap((stock) => {
    const [symbol, market] = stock.trim().split(':');
    if (!symbol || (market !== '美股' && market !== '台股')) return [];
    return [{ symbol, market } as const];
  });
}

export async function GET(request: NextRequest) {
  const stocks = request.nextUrl.searchParams.get('stocks')?.trim();

  if (!stocks) {
    return NextResponse.json(
      { success: false, error: 'Missing stocks' },
      { status: 400 },
    );
  }

  const supportedStocks = keepSupportedStocks(stocks);

  if (!supportedStocks) {
    return NextResponse.json({ success: true, data: {} });
  }

  const upstreamUrl = new URL(STOCK_API_BASE);
  upstreamUrl.searchParams.set('stocks', supportedStocks);

  try {
    let data: Record<string, unknown> = {};

    try {
      const upstream = await fetch(upstreamUrl, {
        cache: 'no-store',
        headers: {
          accept: 'application/json',
          referer: STOCK_REFERER,
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
        },
        signal: AbortSignal.timeout(10_000),
      });
      if (upstream.ok) {
        const payload = await upstream.json() as { success?: boolean; data?: Record<string, unknown> };
        if (payload.success && payload.data) data = payload.data;
      }
    } catch {
      // Missing and failed primary quotes are filled from Yahoo below.
    }

    const requested = parseStocks(supportedStocks);
    const missing = requested.filter((stock) => !data[`${stock.symbol}|${stock.market}`]);
    const fallbackEntries = await Promise.all(missing.map(async (stock) => {
      const quote = await fetchYahooStockQuote(stock.symbol, stock.market);
      return quote ? [`${stock.symbol}|${stock.market}`, quote] as const : null;
    }));
    fallbackEntries.forEach((entry) => {
      if (entry) data[entry[0]] = entry[1];
    });

    return NextResponse.json({ success: true, data, partial: Object.keys(data).length < requested.length });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stock quotes' },
      { status: 502 },
    );
  }
}
