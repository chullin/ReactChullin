export type EtfHolding = {
  symbol: string;
  name: string;
  shares: number | null;
  marketValue: number | null;
  weight: number | null;
  quantityUnit: '股' | '口' | '單位';
  shareChange: number | null;
  weightChange: number | null;
};

export type EtfHoldingsData = {
  symbol: string;
  name: string;
  updatedAt: string;
  previousDate: string | null;
  holdings: EtfHolding[];
  sourceName: string;
  sourceUrl: string;
  disclosureNote: string;
};

export type EtfHoldingsResponse = {
  success?: boolean;
  supported?: boolean;
  message?: string;
  error?: string;
  data?: EtfHoldingsData | null;
};

function plainText(value: string) {
  return value.replace(/<[^>]*>/g, '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .trim();
}

function numeric(value: string) {
  const text = plainText(value).replace(/[,%\s]/g, '');
  if (!text || !/^-?\d+(?:\.\d+)?$/.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

export function moneyDjEtfId(symbol: string) {
  // Taiwan ETFs on either exchange use .TW in MoneyDJ's ETF catalogue.
  return /^\d/.test(symbol) ? `${symbol}.TW` : symbol;
}

export function moneyDjHoldingsUrl(symbol: string) {
  const url = new URL('https://www.moneydj.com/ETF/X/Basic/Basic0007B.xdjhtm');
  url.searchParams.set('etfid', moneyDjEtfId(symbol));
  return url.toString();
}

export function parseMoneyDjHoldings(html: string, symbol: string): EtfHoldingsData | null {
  const section = html.match(/<!--\s*持股明細表格 Start\s*-->([\s\S]*?)<!--\s*持股明細表格 End\s*-->/i)?.[1];
  if (!section) return null;

  const title = plainText(section.split(/<div[^>]*\bid=["'][^"']*_sdate3["']/i)[0]);
  const expectedId = moneyDjEtfId(symbol);
  const identity = title.match(/^(.*?)\(([^()]+)\)-全部持股$/);
  // Unknown symbols can redirect to another ETF. Never return that fund's holdings.
  if (identity?.[2]?.toUpperCase() !== expectedId) return null;

  const date = section.match(/資料日期[：:]\s*(\d{4})\/(\d{2})\/(\d{2})/);
  const table = section.match(/<table\b[^>]*\bid=["'][^"']*_stable3["'][^>]*>([\s\S]*?)<\/table>/i)?.[1];
  if (!date || !table) return null;

  const holdings = Array.from(table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)).flatMap<EtfHolding>((row) => {
    const cells = Array.from(row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)).map((cell) => cell[1]);
    if (cells.length !== 3) return [];
    const label = plainText(cells[0]);
    if (!label) return [];
    const ticker = label.match(/\(([^()]+)\)$/)?.[1];
    const holdingSymbol = ticker?.replace(/\.(TW|US)$/i, '') || label;
    return [{
      symbol: holdingSymbol,
      name: ticker ? label.slice(0, -(ticker.length + 2)).trim() : label,
      shares: numeric(cells[2]),
      marketValue: null,
      weight: numeric(cells[1]),
      quantityUnit: ticker && /\.(TW|US|HK)$/i.test(ticker) ? '股' : /\.TF$|期貨/i.test(ticker || label) ? '口' : '單位',
      shareChange: null,
      weightChange: null,
    }];
  });
  if (!holdings.length) return null;

  return {
    symbol,
    name: identity![1].trim(),
    updatedAt: `${date[1]}-${date[2]}-${date[3]}`,
    previousDate: null,
    holdings,
    sourceName: 'MoneyDJ ETF 公開持股資料',
    sourceUrl: moneyDjHoldingsUrl(symbol),
    disclosureNote: '依資料來源最近一次公開揭露的持股與投資比例顯示，更新頻率依各 ETF 而異；可能包含債券、期貨等部位。未揭露的數量以「未揭露」標示，目前無前次持股資料可供比較。',
  };
}

export async function fetchMoneyDjHoldings(symbol: string) {
  const response = await fetch(moneyDjHoldingsUrl(symbol), {
    headers: { accept: 'text/html', 'user-agent': 'Mozilla/5.0' },
    next: { revalidate: 60 * 60 },
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`ETF holdings upstream HTTP ${response.status}`);
  return parseMoneyDjHoldings(await response.text(), symbol);
}
