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

  return timestamps
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
}

export async function fetchFxQuote(pair: FxPairSeed): Promise<MarketQuote> {
  const fallback = seedFxQuote(pair);
  const payload = await fetchYahooFxChart(pair.symbol, '5D');
  const result = payload?.chart?.result?.[0];
  const meta = result?.meta;
  const chartData = await fetchFxTimeSeries(pair.symbol, '5D');
  const currentPrice = isFiniteMarketNumber(meta?.regularMarketPrice)
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
    updatedAt: meta?.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : new Date().toISOString(),
    chartData: chartData.length ? chartData : fallback.chartData,
  };
}
