import type { MarketAssetType, MarketStatus } from '@/lib/market/types';
import { marketAssetId } from '@/lib/market/providers/marketDataProvider';

export type StockMarket = '台股' | '美股';

export function stockMarketToAssetType(market: StockMarket): MarketAssetType {
  return market === '台股' ? 'tw_stock' : 'us_stock';
}

export function assetTypeToStockMarket(assetType: MarketAssetType): StockMarket | null {
  if (assetType === 'tw_stock') return '台股';
  if (assetType === 'us_stock') return '美股';
  return null;
}

export function normalizeStockSymbol(value: string) {
  return value.trim().toUpperCase().replace(/\./g, '-');
}

export function displayStockSymbol(value: string) {
  return value.replace(/-/g, '.');
}

export function detectStockMarkets(symbol: string): StockMarket[] {
  if (!symbol) return [];
  return /^\d+[A-Z]?$/.test(symbol) ? ['台股'] : ['美股'];
}

export function stockAssetId(symbol: string, market: StockMarket) {
  return marketAssetId(stockMarketToAssetType(market), normalizeStockSymbol(symbol), market);
}

export function getStockMarketStatus(market: StockMarket): MarketStatus {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const offset = market === '台股' ? 8 : isUsDst(now) ? -4 : -5;
  const local = new Date(utc + offset * 60 * 60_000);
  const day = local.getUTCDay();
  const minutes = local.getUTCHours() * 60 + local.getUTCMinutes();

  if (day === 0 || day === 6) return 'closed';
  const isOpen = market === '台股' ? minutes >= 540 && minutes <= 810 : minutes >= 570 && minutes <= 960;
  return isOpen ? 'open' : 'closed';
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number) {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  return 1 + ((weekday - first + 7) % 7) + (nth - 1) * 7;
}

function isUsDst(date: Date) {
  const year = date.getUTCFullYear();
  const start = Date.UTC(year, 2, nthWeekdayOfMonth(year, 2, 0, 2), 7);
  const end = Date.UTC(year, 10, nthWeekdayOfMonth(year, 10, 0, 1), 6);
  const time = date.getTime();

  return time >= start && time < end;
}
