import type { MarketQuote, MarketSearchResult, MarketStatus } from '@/lib/market/types';
import {
  calculatePriceChange,
  isFiniteMarketNumber,
  marketAssetId,
} from '@/lib/market/providers/marketDataProvider';

export type FxPairSeed = {
  symbol: string;
  displayName: string;
  currency: string;
  currentPrice: number;
  previousClose: number;
};

type YahooFxChartResponse = {
  chart?: {
    result?: {
      meta?: {
        regularMarketPrice?: number | null;
        previousClose?: number | null;
        chartPreviousClose?: number | null;
        currency?: string;
        regularMarketTime?: number;
      };
      timestamp?: number[];
      indicators?: {
        quote?: {
          open?: Array<number | null>;
          high?: Array<number | null>;
          low?: Array<number | null>;
          close?: Array<number | null>;
          volume?: Array<number | null>;
        }[];
      };
    }[];
  };
};

type CurrencyApiResponse = {
  date?: string;
  [currency: string]: unknown;
};

type TaishinBankRate = NonNullable<MarketQuote['bankRate']>;

const TAISHIN_RATE_URL = 'https://www.taishinbank.com.tw/eServiceA/transactionrate/transactionrateExport.jsp?no=5';
let taishinRateCache: { expiresAt: number; rates: Record<string, TaishinBankRate> } | null = null;

export const defaultFxPairs: FxPairSeed[] = [
  {
    symbol: 'USD/TWD',
    displayName: '美元 / 新台幣',
    currency: 'TWD',
    currentPrice: 30.52,
    previousClose: 30.48,
  },
  {
    symbol: 'HKD/TWD',
    displayName: '港幣 / 新台幣',
    currency: 'TWD',
    currentPrice: 3.89,
    previousClose: 3.89,
  },
  {
    symbol: 'CNY/TWD',
    displayName: '人民幣 / 新台幣',
    currency: 'TWD',
    currentPrice: 4.21,
    previousClose: 4.22,
  },
];

export function normalizeFxSymbol(symbol: string) {
  return symbol.trim().toUpperCase().replace(/\s+/g, '').replace('-', '/');
}

export function yahooFxSymbol(symbol: string) {
  return `${normalizeFxSymbol(symbol).replace('/', '')}=X`;
}

export function fxAssetId(symbol: string) {
  return marketAssetId('fx', normalizeFxSymbol(symbol), 'FX');
}

export function getFxMarketStatus(): MarketStatus {
  const day = new Date().getUTCDay();
  return day === 0 || day === 6 ? 'closed' : 'open';
}

export function defaultFxSearchResults(): MarketSearchResult[] {
  return defaultFxPairs.map((pair) => ({
    assetId: fxAssetId(pair.symbol),
    assetType: 'fx',
    symbol: pair.symbol,
    exchange: 'FX',
    displayName: pair.displayName,
    currency: pair.currency,
    description: 'Default exchange-rate pair',
  }));
}

export function seedFxQuote(pair: FxPairSeed, updatedAt = new Date().toISOString()): MarketQuote {
  const { priceChange, changePercent } = calculatePriceChange(pair.currentPrice, pair.previousClose);
  const basePrice = isFiniteMarketNumber(pair.previousClose) ? pair.previousClose : pair.currentPrice;
  const midpoint = (pair.currentPrice + basePrice) / 2;

  return {
    assetId: fxAssetId(pair.symbol),
    assetType: 'fx',
    symbol: normalizeFxSymbol(pair.symbol),
    exchange: 'FX',
    displayName: pair.displayName,
    currency: pair.currency,
    currentPrice: pair.currentPrice,
    previousClose: pair.previousClose,
    priceChange,
    changePercent,
    marketStatus: getFxMarketStatus(),
    updatedAt,
    chartData: [
      { timestamp: new Date(Date.now() - 4 * 60 * 60_000).toISOString(), price: basePrice },
      { timestamp: new Date(Date.now() - 3 * 60 * 60_000).toISOString(), price: midpoint * 0.999 },
      { timestamp: new Date(Date.now() - 2 * 60 * 60_000).toISOString(), price: midpoint },
      { timestamp: new Date(Date.now() - 1 * 60 * 60_000).toISOString(), price: pair.currentPrice * 1.001 },
      { timestamp: updatedAt, price: pair.currentPrice },
    ],
  };
}

function yahooFxRange(range: string) {
  if (range === '1D') return { range: '1d', interval: '5m' };
  if (range === '5D') return { range: '5d', interval: '1h' };
  if (range === '1M') return { range: '1mo', interval: '1d' };
  if (range === '1Y') return { range: '1y', interval: '1d' };
  if (range === '5Y') return { range: '5y', interval: '1wk' };
  if (range === 'MAX') return { range: 'max', interval: '1mo' };
  return { range: '1mo', interval: '1d' };
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseOptionalNumber(value: string) {
  const match = value.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return isFiniteMarketNumber(parsed) ? parsed : null;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeDocumentWritelnString(value: string) {
  return value
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\\\//g, '/')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\');
}

function parseTaishinTimestamp(value: string | null) {
  if (!value) return null;
  const match = value.match(/(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return null;
  const [, year, month, day, hour, minute, second] = match;
  return `${year}-${month}-${day}T${hour}:${minute}:${second}+08:00`;
}

function parseTaishinRateScript(script: string) {
  const html = [...script.matchAll(/document\.writeln\('([\s\S]*?)'\);/g)]
    .map((match) => decodeDocumentWritelnString(match[1]))
    .join('\n');
  const updatedAt = parseTaishinTimestamp(html.match(/更新時間\s*:\s*([^<]+)/)?.[1] || null);
  const rates: Record<string, TaishinBankRate> = {};

  for (const row of html.match(/<tr>[\s\S]*?<\/tr>/g) || []) {
    const currency = row.match(/queryhistory\('([A-Z]+)'\)/)?.[1];
    if (!currency) continue;
    if (rates[currency]) continue;

    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cell) => stripHtml(cell[1]));
    const values = cells.map(parseOptionalNumber);

    if (values.length < 4 || values.slice(0, 4).filter(isFiniteMarketNumber).length < 2) continue;

    rates[currency] = {
      bankBuy: values[0],
      bankSell: values[1],
      cashBuy: values[2],
      cashSell: values[3],
      updatedAt,
      sourceName: '台新銀行',
      sourceUrl: 'https://www.taishinbank.com.tw/TSB/personal/deposit/lookup/realtime/',
    };
  }

  return rates;
}

async function fetchTaishinBankRates() {
  if (taishinRateCache && taishinRateCache.expiresAt > Date.now()) {
    return taishinRateCache.rates;
  }

  try {
    const response = await fetch(TAISHIN_RATE_URL, {
      cache: 'no-store',
      headers: {
        accept: 'application/javascript,text/javascript,*/*',
        'user-agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) return {};

    const rates = parseTaishinRateScript(await response.text());
    taishinRateCache = {
      expiresAt: Date.now() + 60_000,
      rates,
    };
    return rates;
  } catch {
    return {};
  }
}

async function fetchTaishinBankRate(symbol: string) {
  const [base, quote] = normalizeFxSymbol(symbol).split('/');
  if (!base || quote !== 'TWD') return null;

  const rates = await fetchTaishinBankRates();
  return rates[base] || null;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

function startOfDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function currencyApiSchedule(range: string) {
  const end = startOfDay(new Date());
  const earliestSupported = new Date(Date.UTC(2024, 6, 19));
  const days = range === '1D' ? 1 : range === '5D' ? 5 : range === '1M' ? 31 : range === '1Y' ? 366 : range === '5Y' ? 5 * 366 : 20 * 366;
  const step = range === '1D' || range === '5D' ? 1 : range === '1M' ? 2 : range === '1Y' ? 7 : 30;
  const start = new Date(Math.max(addDays(end, -days).getTime(), earliestSupported.getTime()));
  const dates: string[] = [];

  for (let cursor = start; cursor <= end; cursor = addDays(cursor, step)) {
    dates.push(formatDateKey(cursor));
  }

  const yesterday = formatDateKey(addDays(end, -1));
  if (!dates.includes(yesterday)) dates.push(yesterday);

  return dates;
}

async function fetchCurrencyApiPoint(symbol: string, date: string) {
  const [base, quote] = normalizeFxSymbol(symbol).split('/');
  if (!base || !quote) return null;

  const baseKey = base.toLowerCase();
  const quoteKey = quote.toLowerCase();
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseKey}.json`;

  try {
    const response = await fetch(url, {
      cache: 'force-cache',
      next: { revalidate: 60 * 60 * 12 },
      headers: {
        accept: 'application/json',
        'user-agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as CurrencyApiResponse;
    const rates = payload[baseKey];
    const price = rates && typeof rates === 'object' ? (rates as Record<string, unknown>)[quoteKey] : null;

    if (!isFiniteMarketNumber(price)) return null;

    return {
      timestamp: new Date(`${payload.date || date}T00:00:00.000Z`).toISOString(),
      price,
      open: price,
      high: price,
      low: price,
      close: price,
      volume: null,
    };
  } catch {
    return null;
  }
}

async function fetchCurrencyApiTimeSeries(symbol: string, range: string) {
  const dates = currencyApiSchedule(range);
  const points = await Promise.all(dates.map((date) => fetchCurrencyApiPoint(symbol, date)));
  const byDate = new Map<string, NonNullable<(typeof points)[number]>>();

  points.forEach((point) => {
    if (!point) return;
    byDate.set(point.timestamp.slice(0, 10), point);
  });

  return [...byDate.values()].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
}

async function fetchYahooFxChart(symbol: string, range = '1M') {
  const config = yahooFxRange(range);
  const hosts = ['query1.finance.yahoo.com', 'query2.finance.yahoo.com'];

  for (const host of hosts) {
    const url = new URL(`https://${host}/v8/finance/chart/${encodeURIComponent(yahooFxSymbol(symbol))}`);
    url.searchParams.set('range', config.range);
    url.searchParams.set('interval', config.interval);

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          accept: 'application/json',
          'user-agent': 'Mozilla/5.0',
        },
      });

      if (response.ok) {
        return response.json() as Promise<YahooFxChartResponse>;
      }
    } catch {
      // Try the next Yahoo host before falling back to local seed data.
    }
  }

  return null;
}

export async function fetchFxTimeSeries(symbol: string, range = '1M') {
  const payload = await fetchYahooFxChart(symbol, range);
  const result = payload?.chart?.result?.[0];
  const timestamps = result?.timestamp || [];
  const quote = result?.indicators?.quote?.[0] || {};

  const yahooPoints = timestamps
    .map((timestamp, index) => {
      const close = quote.close?.[index] ?? null;

      if (!isFiniteMarketNumber(close)) return null;

      return {
        timestamp: new Date(timestamp * 1000).toISOString(),
        price: close,
        open: quote.open?.[index] ?? close,
        high: quote.high?.[index] ?? close,
        low: quote.low?.[index] ?? close,
        close,
        volume: quote.volume?.[index] ?? null,
      };
    })
    .filter((point): point is NonNullable<typeof point> => Boolean(point));

  if (yahooPoints.length >= 2) return yahooPoints;

  const fallbackPoints = await fetchCurrencyApiTimeSeries(symbol, range);
  return fallbackPoints.length >= 2 ? fallbackPoints : yahooPoints;
}

export async function fetchFxQuote(pair: FxPairSeed): Promise<MarketQuote> {
  const fallback = seedFxQuote(pair);
  const [payload, bankRate] = await Promise.all([
    fetchYahooFxChart(pair.symbol, '5D'),
    fetchTaishinBankRate(pair.symbol),
  ]);
  const result = payload?.chart?.result?.[0];
  const meta = result?.meta;
  const chartData = await fetchFxTimeSeries(pair.symbol, '5D');
  const currentPrice = isFiniteMarketNumber(bankRate?.bankSell)
    ? bankRate.bankSell
    : isFiniteMarketNumber(meta?.regularMarketPrice)
    ? meta.regularMarketPrice
    : chartData.at(-1)?.price ?? fallback.currentPrice;
  const previousClose = isFiniteMarketNumber(meta?.chartPreviousClose)
    ? meta.chartPreviousClose
    : isFiniteMarketNumber(meta?.previousClose)
      ? meta.previousClose
      : chartData.at(-2)?.price ?? fallback.previousClose;
  const { priceChange, changePercent } = calculatePriceChange(currentPrice, previousClose);

  return {
    ...fallback,
    currentPrice,
    previousClose,
    priceChange,
    changePercent,
    currency: meta?.currency || pair.currency,
    updatedAt: bankRate?.updatedAt || (meta?.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : new Date().toISOString()),
    chartData: chartData.length ? chartData : fallback.chartData,
    bankRate: bankRate || undefined,
  };
}
