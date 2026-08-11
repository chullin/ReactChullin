type StockMarket = '美股' | '台股';

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        symbol?: string;
        shortName?: string;
        longName?: string;
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
        currency?: string;
        instrumentType?: string;
        exchangeName?: string;
        fiftyTwoWeekHigh?: number;
        fiftyTwoWeekLow?: number;
      };
      indicators?: { quote?: Array<{ close?: Array<number | null> }> };
    }>;
  };
};

function yahooSymbols(symbol: string, market: StockMarket) {
  const normalized = symbol.trim().toUpperCase().replace(/\.(TW|TWO)$/i, '');
  if (market === '台股') return [`${normalized}.TW`, `${normalized}.TWO`];
  return [normalized.replace(/\./g, '-')];
}

function finiteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function marketNumber(value: unknown) {
  const parsed = Number(String(value ?? '').replace(/[$,%+,\s]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

async function fetchTwseQuote(symbol: string) {
  try {
    const response = await fetch('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL', {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return null;
    const rows = await response.json() as Array<Record<string, string>>;
    const normalized = symbol.trim().toUpperCase().replace(/\.(TW|TWO)$/i, '');
    const row = rows.find((item) => item.Code === normalized);
    const price = marketNumber(row?.ClosingPrice);
    const change = marketNumber(row?.Change);
    if (!row || price === null) return null;
    const previousClose = change === null ? null : price - change;
    return {
      symbol: `${normalized}.TW`,
      name: row.Name,
      longName: row.Name,
      price,
      change,
      changePercent: change !== null && previousClose ? (change / previousClose) * 100 : null,
      changeBasis: 'previousClose',
      previousClose,
      currentSessionDay: row.Date,
      currency: 'TWD',
      sparkline: [row.OpeningPrice, row.HighestPrice, row.LowestPrice, row.ClosingPrice].map(marketNumber).filter(finiteNumber),
      quoteType: normalized.startsWith('00') ? 'ETF' : 'EQUITY',
      exchange: 'Taiwan',
      dataSource: 'TWSE OpenAPI fallback',
    };
  } catch {
    return null;
  }
}

async function fetchNasdaqQuote(symbol: string) {
  for (const assetClass of ['stocks', 'etf']) {
    try {
      const url = `https://api.nasdaq.com/api/quote/${encodeURIComponent(symbol)}/info?assetclass=${assetClass}`;
      const response = await fetch(url, {
        next: { revalidate: 30 },
        headers: {
          accept: 'application/json',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
        },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) continue;
      const payload = await response.json() as {
        data?: { symbol?: string; companyName?: string; primaryData?: Record<string, string | boolean | null> };
      };
      const data = payload.data;
      const primary = data?.primaryData;
      const price = marketNumber(primary?.lastSalePrice);
      const change = marketNumber(primary?.netChange);
      if (!data || !primary || price === null) continue;
      const signedChange = primary.deltaIndicator === 'down' && change !== null ? -Math.abs(change) : change;
      const previousClose = signedChange === null ? null : price - signedChange;
      return {
        symbol: data.symbol || symbol,
        name: data.companyName,
        longName: data.companyName,
        price,
        change: signedChange,
        changePercent: marketNumber(primary.percentageChange),
        changeBasis: 'previousClose',
        previousClose,
        currency: 'USD',
        sparkline: [previousClose, price].filter(finiteNumber),
        quoteType: assetClass === 'etf' ? 'ETF' : 'EQUITY',
        exchange: 'US',
        dataSource: 'Nasdaq fallback',
      };
    } catch {
      // Try the other Nasdaq asset class, then Yahoo.
    }
  }
  return null;
}

export async function fetchYahooStockQuote(symbol: string, market: StockMarket) {
  const officialFallback = market === '台股'
    ? await fetchTwseQuote(symbol)
    : await fetchNasdaqQuote(symbol);
  if (officialFallback) return officialFallback;

  for (const yahooSymbol of yahooSymbols(symbol, market)) {
    try {
      const url = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}`);
      url.searchParams.set('range', '1mo');
      url.searchParams.set('interval', '1d');
      url.searchParams.set('includePrePost', 'false');
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          accept: 'application/json',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
        },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) continue;
      const payload = await response.json() as YahooChartResponse;
      const result = payload.chart?.result?.[0];
      const meta = result?.meta;
      const price = meta?.regularMarketPrice;
      if (!meta || !finiteNumber(price)) continue;
      const previousClose = finiteNumber(meta.previousClose)
        ? meta.previousClose
        : finiteNumber(meta.chartPreviousClose)
          ? meta.chartPreviousClose
          : null;
      const change = finiteNumber(previousClose) ? price - previousClose : null;
      const changePercent = change !== null && previousClose !== null && previousClose !== 0
        ? (change / previousClose) * 100
        : null;
      const sparkline = (result?.indicators?.quote?.[0]?.close || []).filter(finiteNumber);

      return {
        symbol: meta.symbol || yahooSymbol,
        name: meta.shortName,
        longName: meta.longName || meta.shortName,
        price,
        change,
        changePercent,
        changeBasis: 'previousClose',
        previousClose,
        currency: meta.currency || (market === '台股' ? 'TWD' : 'USD'),
        sparkline,
        quoteType: meta.instrumentType,
        exchange: meta.exchangeName || market,
        fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ?? null,
        fiftyTwoWeekLow: meta.fiftyTwoWeekLow ?? null,
        dataSource: 'Yahoo Finance fallback',
      };
    } catch {
      // Taiwan symbols may be listed on TWSE or TPEx; try the next suffix.
    }
  }

  return null;
}
