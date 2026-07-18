import type {
  MarketAssetType,
  MarketInterval,
  MarketQuote,
  MarketRange,
  MarketSearchResult,
  MarketStatus,
} from '@/lib/market/types';

export type MarketDataProvider = {
  searchSymbols(query: string, assetType?: MarketAssetType): Promise<MarketSearchResult[]>;
  getQuote(symbol: string): Promise<MarketQuote | null>;
  getQuotes(symbols: string[]): Promise<Record<string, MarketQuote>>;
  getTimeSeries(symbol: string, range: MarketRange, interval: MarketInterval): Promise<MarketQuote['chartData']>;
  normalizeSymbol(symbol: string, exchange?: string): string;
  getMarketStatus(exchange: string): MarketStatus;
};

export function marketAssetId(assetType: MarketAssetType, symbol: string, exchange: string) {
  return `${assetType}:${exchange}:${symbol.toUpperCase()}`;
}

export function isFiniteMarketNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function calculatePriceChange(currentPrice: number | null, previousClose: number | null) {
  if (!isFiniteMarketNumber(currentPrice) || !isFiniteMarketNumber(previousClose)) {
    return { priceChange: null, changePercent: null };
  }

  const priceChange = currentPrice - previousClose;
  const changePercent = previousClose === 0 ? null : (priceChange / previousClose) * 100;

  return { priceChange, changePercent };
}
