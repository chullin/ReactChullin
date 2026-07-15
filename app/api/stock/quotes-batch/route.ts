import { NextRequest, NextResponse } from 'next/server';

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
    const upstream = await fetch(upstreamUrl, {
      cache: 'no-store',
      headers: {
        accept: 'application/json',
        referer: STOCK_REFERER,
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
      },
    });

    const payload = await upstream.json();
    return NextResponse.json(payload, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stock quotes' },
      { status: 502 },
    );
  }
}
