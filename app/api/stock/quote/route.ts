import { NextRequest, NextResponse } from 'next/server';

const STOCK_API_BASE = 'https://www.jacksu.tw/api/stock/quote';
const STOCK_REFERER = 'https://www.jacksu.tw/tool/stock/stock-watchlist';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get('symbol')?.trim();
  const market = request.nextUrl.searchParams.get('market')?.trim();

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

  const upstreamUrl = new URL(STOCK_API_BASE);
  upstreamUrl.searchParams.set('symbol', symbol);
  upstreamUrl.searchParams.set('market', market);

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
      { success: false, error: 'Failed to fetch stock quote' },
      { status: 502 },
    );
  }
}
