import type { MarketQuote, MarketSearchResult } from '@/lib/market/types';
import {
  calculatePriceChange,
  isFiniteMarketNumber,
} from '@/lib/market/providers/marketDataProvider';
import {
  displayStockSymbol,
  getStockMarketStatus,
  normalizeStockSymbol,
  stockAssetId,
  stockMarketToAssetType,
  type StockMarket,
} from '@/lib/market/providers/stockMarketProvider';

export type LegacyStockQuote = {
  symbol: string;
  name?: string;
  longName?: string;
  price?: number | null;
  change?: number | null;
  changePercent?: number | null;
  previousClose?: number | null;
  currency?: string;
  sparkline?: number[];
  exchange?: string;
};

export function stockSearchResult(symbol: string, market: StockMarket): MarketSearchResult {
  const normalized = normalizeStockSymbol(symbol);

  return {
    assetId: stockAssetId(normalized, market),
    assetType: stockMarketToAssetType(market),
    symbol: normalized,
    exchange: market,
    displayName: displayStockSymbol(normalized),
    currency: market === '台股' ? 'TWD' : 'USD',
    description: `${market} symbol candidate`,
  };
}

export function normalizeLegacyStockQuote(
  symbol: string,
  market: StockMarket,
  quote: LegacyStockQuote,
  updatedAt = new Date().toISOString(),
): MarketQuote {
  const normalized = normalizeStockSymbol(symbol || quote.symbol);
  const currentPrice = isFiniteMarketNumber(quote.price) ? quote.price : null;
  const previousClose = isFiniteMarketNumber(quote.previousClose) ? quote.previousClose : null;
  const calculated = calculatePriceChange(currentPrice, previousClose);
  const priceChange = isFiniteMarketNumber(quote.change) ? quote.change : calculated.priceChange;
  const changePercent = isFiniteMarketNumber(quote.changePercent) ? quote.changePercent : calculated.changePercent;

  return {
    assetId: stockAssetId(normalized, market),
    assetType: stockMarketToAssetType(market),
    symbol: normalized,
    exchange: quote.exchange || market,
    displayName: quote.longName || quote.name || displayStockSymbol(normalized),
    currency: quote.currency || (market === '台股' ? 'TWD' : 'USD'),
    currentPrice,
    previousClose,
    priceChange,
    changePercent,
    marketStatus: getStockMarketStatus(market),
    updatedAt,
    chartData: (quote.sparkline || [])
      .filter(isFiniteMarketNumber)
      .map((price, index, values) => ({
        timestamp: new Date(Date.now() - (values.length - index - 1) * 60 * 60_000).toISOString(),
        price,
      })),
  };
}
