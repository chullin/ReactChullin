import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NASDAQ_SCREENER_URL = 'https://api.nasdaq.com/api/screener/stocks?tableonly=true&download=true';
const TWSE_DAILY_URL = 'https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL';
const TWSE_COMPANIES_URL = 'https://openapi.twse.com.tw/v1/opendata/t187ap03_L';
const REQUEST_HEADERS = {
  accept: 'application/json',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
};

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

type TwseDailyRow = {
  Date?: string;
  Code?: string;
  Name?: string;
  ClosingPrice?: string;
  Change?: string;
};

type TwseCompanyRow = {
  公司代號?: string;
  公司簡稱?: string;
  產業別?: string;
  已發行普通股數或TDR原股發行股數?: string;
};

function numeric(value?: string) {
  const parsed = Number((value || '').replace(/[$,%+\s,]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

async function fetchUsLeaders() {
  const response = await fetch(NASDAQ_SCREENER_URL, {
    next: { revalidate: 300 },
    headers: REQUEST_HEADERS,
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);
  const payload = await response.json() as { data?: { rows?: NasdaqRow[] } };
  const data = (payload.data?.rows || [])
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
        market: 'us' as const,
        currency: 'USD' as const,
      }];
    })
    .sort((first, second) => second.marketCap - first.marketCap)
    .slice(0, 100)
    .map((row, index) => ({ ...row, rank: index + 1 }));

  return {
    data,
    updatedAt: new Date().toISOString(),
    sourceName: 'Nasdaq Stock Screener',
    sourceUrl: 'https://www.nasdaq.com/market-activity/stocks/screener',
  };
}

async function fetchTwLeaders() {
  const [dailyResponse, companiesResponse] = await Promise.all([
    fetch(TWSE_DAILY_URL, {
      next: { revalidate: 300 },
      headers: REQUEST_HEADERS,
      signal: AbortSignal.timeout(15_000),
    }),
    fetch(TWSE_COMPANIES_URL, {
      next: { revalidate: 86_400 },
      headers: REQUEST_HEADERS,
      signal: AbortSignal.timeout(15_000),
    }),
  ]);

  if (!dailyResponse.ok || !companiesResponse.ok) throw new Error('TWSE upstream failed');
  const [dailyRows, companyRows] = await Promise.all([
    dailyResponse.json() as Promise<TwseDailyRow[]>,
    companiesResponse.json() as Promise<TwseCompanyRow[]>,
  ]);
  const companies = new Map(companyRows.map((company) => [company['公司代號'], company]));

  const data = dailyRows
    .flatMap((row) => {
      if (!row.Code || !/^\d{4}$/.test(row.Code)) return [];
      const company = companies.get(row.Code);
      const price = numeric(row.ClosingPrice);
      const shares = numeric(company?.['已發行普通股數或TDR原股發行股數']);
      const change = numeric(row.Change);
      if (!company || price === null || !shares) return [];
      const previousClose = change === null ? null : price - change;

      return [{
        symbol: row.Code,
        name: company['公司簡稱'] || row.Name || row.Code,
        price,
        change,
        changePercent: change !== null && previousClose ? (change / previousClose) * 100 : null,
        marketCap: price * shares,
        country: '台灣',
        sector: company['產業別'] || '',
        market: 'tw' as const,
        currency: 'TWD' as const,
      }];
    })
    .sort((first, second) => second.marketCap - first.marketCap)
    .slice(0, 100)
    .map((row, index) => ({ ...row, rank: index + 1 }));

  return {
    data,
    updatedAt: dailyRows[0]?.Date || new Date().toISOString(),
    sourceName: '臺灣證券交易所 OpenAPI',
    sourceUrl: 'https://openapi.twse.com.tw/',
  };
}

export async function GET(request: NextRequest) {
  const market = request.nextUrl.searchParams.get('market') === 'tw' ? 'tw' : 'us';

  try {
    const result = market === 'tw' ? await fetchTwLeaders() : await fetchUsLeaders();
    return NextResponse.json({ success: true, market, ...result });
  } catch {
    return NextResponse.json(
      { success: false, error: `暫時無法取得${market === 'tw' ? '台股' : '美股'}大型股票排行` },
      { status: 502 },
    );
  }
}
