import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NASDAQ_SCREENER_URL = 'https://api.nasdaq.com/api/screener/stocks?tableonly=true&download=true';

type NasdaqRow = {
  symbol?: string;
  name?: string;
  lastsale?: string;
  netchange?: string;
  pctchange?: string;
  marketCap?: string;
  country?: string;
  sector?: string;
};

function numeric(value?: string) {
  const parsed = Number((value || '').replace(/[$,%\s,]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

export async function GET() {
  try {
    const response = await fetch(NASDAQ_SCREENER_URL, {
      next: { revalidate: 300 },
      headers: {
        accept: 'application/json',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);
    const payload = await response.json() as { data?: { rows?: NasdaqRow[] } };
    const rows = (payload.data?.rows || [])
      .flatMap((row) => {
        const marketCap = numeric(row.marketCap);
        const price = numeric(row.lastsale);
        if (!row.symbol || !row.name || !marketCap || price === null) return [];

        return [{
          symbol: row.symbol,
          name: row.name.replace(/\s+(Common Stock|Ordinary Shares).*$/i, '').trim(),
          price,
          change: numeric(row.netchange),
          changePercent: numeric(row.pctchange),
          marketCap,
          country: row.country || '',
          sector: row.sector || '',
        }];
      })
      .sort((first, second) => second.marketCap - first.marketCap)
      .slice(0, 100)
      .map((row, index) => ({ ...row, rank: index + 1 }));

    return NextResponse.json({
      success: true,
      data: rows,
      updatedAt: new Date().toISOString(),
      sourceName: 'Nasdaq Stock Screener',
      sourceUrl: 'https://www.nasdaq.com/market-activity/stocks/screener',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '暫時無法取得大型股票排行' },
      { status: 502 },
    );
  }
}
