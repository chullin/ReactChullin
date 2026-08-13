import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const FUBON_ETFS = new Set(['006208']);
const FUBON_BASE = 'https://websys.fsit.com.tw/FubonETF/Trade';
const REQUEST_HEADERS = {
  accept: 'text/html,application/xhtml+xml',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
};

type EtfHolding = {
  symbol: string;
  name: string;
  shares: number;
  marketValue: number;
  weight: number;
};

function plainText(value: string) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function marketNumber(value: string) {
  const parsed = Number(plainText(value).replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseAssetDate(html: string) {
  const match = html.match(/資料日期[：:]\s*(\d{4}\/\d{2}\/\d{2})/);
  return match?.[1]?.replaceAll('/', '-') || null;
}

function parseHoldings(html: string) {
  const stockSection = html.match(/<h6[^>]*>\s*股票\s*<\/h6>([\s\S]*?)(?:<h6|股票合計)/i)?.[1] || '';
  const rows = Array.from(stockSection.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi));

  return rows.flatMap<EtfHolding>((row) => {
    const cells = Array.from(row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)).map((cell) => cell[1]);
    if (cells.length < 5) return [];

    const symbol = plainText(cells[0]);
    const name = plainText(cells[1]);
    if (!/^\d{4,6}[A-Z]?$/.test(symbol)) return [];

    return [{
      symbol,
      name,
      shares: marketNumber(cells[2]),
      marketValue: marketNumber(cells[3]),
      weight: marketNumber(cells[4]),
    }];
  });
}

async function fetchHtml(url: URL, timeout = 8_000) {
  const response = await fetch(url, {
    headers: REQUEST_HEADERS,
    next: { revalidate: 60 * 60 },
    signal: AbortSignal.timeout(timeout),
  });

  if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);
  return response.text();
}

async function holdingsOn(symbol: string, date: string) {
  const url = new URL(`${FUBON_BASE}/Assets.aspx`);
  url.searchParams.set('stkId', symbol);
  url.searchParams.set('ddate', date.replaceAll('-', '/'));
  url.searchParams.set('lan', 'TW');
  const html = await fetchHtml(url, 4_000);
  const actualDate = parseAssetDate(html);
  const holdings = parseHoldings(html);
  return actualDate === date && holdings.length ? { date, holdings } : null;
}

async function latestHoldings(symbol: string) {
  const url = new URL(`${FUBON_BASE}/Assets.aspx`);
  url.searchParams.set('stkId', symbol);
  url.searchParams.set('lan', 'TW');
  const html = await fetchHtml(url);
  const date = parseAssetDate(html);
  const holdings = parseHoldings(html);
  return date && holdings.length ? { date, holdings } : null;
}

async function previousHoldings(symbol: string, currentDate: string) {
  const cursor = new Date(`${currentDate}T12:00:00+08:00`);
  const dates: string[] = [];
  for (let daysBack = 1; daysBack <= 5; daysBack += 1) {
    cursor.setDate(cursor.getDate() - 1);
    dates.push(cursor.toISOString().slice(0, 10));
  }
  const results = await Promise.all(dates.map(async (date) => {
    try {
      return await holdingsOn(symbol, date);
    } catch {
      return null;
    }
  }));
  return results.find(Boolean) || null;
}

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get('symbol')?.trim().toUpperCase().replace(/\.(TW|TWO)$/i, '');

  if (!symbol) {
    return NextResponse.json({ success: false, error: 'Missing symbol' }, { status: 400 });
  }

  if (!FUBON_ETFS.has(symbol)) {
    return NextResponse.json({
      success: true,
      supported: false,
      data: null,
      message: '目前先支援富邦台50（006208）的官方每日基金資產資料。',
    });
  }

  try {
    const current = await latestHoldings(symbol);
    if (!current) throw new Error('Missing official holdings');

    const previous = await previousHoldings(symbol, current.date);
    const previousBySymbol = new Map(previous?.holdings.map((holding) => [holding.symbol, holding]) || []);
    const holdings = current.holdings.map((holding) => ({
      ...holding,
      shareChange: previous ? holding.shares - (previousBySymbol.get(holding.symbol)?.shares || 0) : null,
      weightChange: previous ? holding.weight - (previousBySymbol.get(holding.symbol)?.weight || 0) : null,
    }));

    return NextResponse.json({
      success: true,
      supported: true,
      data: {
        symbol,
        name: '富邦台50',
        updatedAt: current.date,
        previousDate: previous?.date || null,
        holdings,
        sourceName: '富邦投信基金資產',
        sourceUrl: `${FUBON_BASE}/Assets.aspx?stkId=${symbol}&ddate=${current.date.replaceAll('-', '/')}&lan=TW`,
        disclosureNote: '持股變化依兩個官方揭露日的基金資產股數差計算，可能包含申購贖回影響，不等同經理人主動交易。',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, supported: true, error: '暫時無法取得 ETF 官方持股資料' },
      { status: 502 },
    );
  }
}
