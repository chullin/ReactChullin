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
