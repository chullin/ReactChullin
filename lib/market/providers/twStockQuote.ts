type TaiwanQuoteRow = {
  c?: string; ex?: string; n?: string; nf?: string;
  z?: string; y?: string; o?: string; d?: string; t?: string;
  trade?: { z?: string; t?: string };
};

function positiveNumber(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const number = Number(value.replace(/,/g, ''));
  return Number.isFinite(number) && number > 0 ? number : null;
}

export function parseTaiwanStockQuote(row: TaiwanQuoteRow) {
  const lastPrice = positiveNumber(row.z);
  // Between trades MIS may return z="-" while trade contains the last execution.
  // Bid/ask prices must never be used as the last traded price.
  const price = lastPrice ?? positiveNumber(row.trade?.z);
  const time = lastPrice !== null ? row.t : row.trade?.t;
  if (!row.c || price === null || !/^\d{8}$/.test(row.d || '') || !/^\d{2}:\d{2}:\d{2}$/.test(time || '')) return null;
  const day = row.d!;
  const timestamp = Date.parse(`${day.slice(0, 4)}-${day.slice(4, 6)}-${day.slice(6, 8)}T${time}+08:00`);
  if (!Number.isFinite(timestamp)) return null;
  const previousClose = positiveNumber(row.y);
  const change = previousClose === null ? null : price - previousClose;
  return {
    symbol: `${row.c}.${row.ex === 'otc' ? 'TWO' : 'TW'}`,
    name: row.n,
    longName: row.n || row.nf,
    price,
    previousClose,
    change,
    changePercent: change !== null && previousClose !== null ? change / previousClose * 100 : null,
    changeBasis: 'previousClose',
    openPrice: positiveNumber(row.o),
    currentSessionDay: day,
    updatedAt: new Date(timestamp).toISOString(),
    currency: 'TWD',
    sparkline: [previousClose, price].filter((value): value is number => value !== null),
    quoteType: row.c.startsWith('00') ? 'ETF' : 'EQUITY',
    exchange: row.ex === 'otc' ? 'Taipei' : 'Taiwan',
    dataSource: 'TWSE MIS',
    fromCache: false,
  };
}

export async function fetchTaiwanStockQuote(symbol: string) {
  const normalized = symbol.trim().toUpperCase().replace(/\.(TW|TWO)$/i, '');
  if (!/^\d{4,6}[A-Z]?$/.test(normalized)) return null;
  try {
    const url = new URL('https://mis.twse.com.tw/stock/api/getStockInfo.jsp');
    url.searchParams.set('ex_ch', `tse_${normalized}.tw|otc_${normalized}.tw`);
    url.searchParams.set('json', '1');
    url.searchParams.set('delay', '0');
    url.searchParams.set('_', String(Date.now()));
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(8_000) });
    if (!response.ok) return null;
    const payload = await response.json() as { msgArray?: TaiwanQuoteRow[] };
    for (const row of payload.msgArray || []) {
      if (row.c !== normalized) continue;
      const quote = parseTaiwanStockQuote(row);
      if (quote) return quote;
    }
  } catch {
    // Continue to the other quote sources when MIS is unavailable.
  }
  return null;
}
