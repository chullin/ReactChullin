import { NextRequest, NextResponse } from 'next/server';
import type { MarketAssetType, MarketChartPoint, MarketRange } from '@/lib/market/types';
import { defaultFxPairs, fetchFxTimeSeries, normalizeFxSymbol, seedFxQuote } from '@/lib/market/providers/fxProvider';
import { assetTypeToStockMarket, normalizeStockSymbol } from '@/lib/market/providers/stockMarketProvider';

export const dynamic = 'force-dynamic';

type StockDetailsResponse = {
  success?: boolean;
  data?: {
    history?: {
      date: string;
      open: number | null;
      high: number | null;
      low: number | null;
      close: number | null;
      volume: number | null;
    }[];
  };
};

const rangeDays: Record<MarketRange, number> = {
  '1D': 1,
  '5D': 5,
  '1M': 31,
  '6M': 183,
  '1Y': 366,
  '5Y': 5 * 366,
  MAX: 20 * 366,
};

function parseAssetId(assetId: string) {
  const [assetType, exchange, ...symbolParts] = assetId.split(':');
  const symbol = symbolParts.join(':');

  if (!assetType || !exchange || !symbol) return null;
  if (!['tw_stock', 'us_stock', 'fx'].includes(assetType)) return null;

  return {
    assetType: assetType as MarketAssetType,
    exchange,
    symbol,
  };
}

function parseRange(value: string | null): MarketRange {
  if (value === '1D' || value === '5D' || value === '1M' || value === '6M' || value === '1Y' || value === '5Y' || value === 'MAX') {
    return value;
  }

  return '1M';
}

function filterByRange(points: MarketChartPoint[], range: MarketRange) {
  const earliest = Date.now() - rangeDays[range] * 24 * 60 * 60_000;
  return points.filter((point) => Date.parse(point.timestamp) >= earliest);
}

async function fxSeries(symbol: string, range: MarketRange) {
  const pair = defaultFxPairs.find((item) => normalizeFxSymbol(item.symbol) === normalizeFxSymbol(symbol));
  if (!pair) return [];

  const points = await fetchFxTimeSeries(pair.symbol, range);
  if (points.length) return points;

  return seedFxQuote(pair).chartData;
}

async function stockSeries(request: NextRequest, assetId: string, range: MarketRange) {
  const asset = parseAssetId(assetId);
  const market = asset ? assetTypeToStockMarket(asset.assetType) : null;

  if (!asset || !market) return [];

  const url = new URL('/api/stock/details', request.nextUrl.origin);
  url.searchParams.set('symbol', normalizeStockSymbol(asset.symbol));
  url.searchParams.set('market', market);
  url.searchParams.set('name', asset.symbol);

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) return [];

  const payload = (await response.json()) as StockDetailsResponse;
  const points = (payload.data?.history || [])
    .filter((point) => Number.isFinite(point.close))
    .map((point) => ({
      timestamp: new Date(point.date).toISOString(),
      price: point.close,
      open: point.open,
      high: point.high,
      low: point.low,
      close: point.close,
      volume: point.volume,
    }));

  return filterByRange(points, range);
}

export async function GET(request: NextRequest) {
  const assetId = request.nextUrl.searchParams.get('assetId')?.trim();
  const range = parseRange(request.nextUrl.searchParams.get('range'));

  if (!assetId) {
    return NextResponse.json(
      { success: false, error: 'Missing assetId' },
      { status: 400 },
    );
  }

  const asset = parseAssetId(assetId);
  if (!asset) {
    return NextResponse.json(
      { success: false, error: 'Invalid assetId' },
      { status: 400 },
    );
  }

  try {
    const data = asset.assetType === 'fx' ? await fxSeries(asset.symbol, range) : await stockSeries(request, assetId, range);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market time series' },
      { status: 502 },
    );
  }
}
