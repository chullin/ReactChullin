import { NextRequest, NextResponse } from 'next/server';
import type { MarketAssetType, MarketSearchResult } from '@/lib/market/types';
import { defaultFxSearchResults, normalizeFxSymbol } from '@/lib/market/providers/fxProvider';
import {
  assetTypeToStockMarket,
  detectStockMarkets,
  normalizeStockSymbol,
} from '@/lib/market/providers/stockMarketProvider';
import { stockSearchResult } from '@/lib/market/providers/jacksuStockAdapter';

export const dynamic = 'force-dynamic';

const supportedAssetTypes: MarketAssetType[] = ['tw_stock', 'us_stock', 'fx'];

function parseAssetType(value: string | null): MarketAssetType | undefined {
  if (!value) return undefined;
  return supportedAssetTypes.includes(value as MarketAssetType) ? (value as MarketAssetType) : undefined;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')?.trim() || '';
  const assetType = parseAssetType(request.nextUrl.searchParams.get('assetType'));
  const results: MarketSearchResult[] = [];

  if (!query && assetType !== 'fx') {
    return NextResponse.json({ success: true, data: results });
  }

  if (!assetType || assetType === 'fx') {
    const normalizedQuery = normalizeFxSymbol(query);
    results.push(
      ...defaultFxSearchResults().filter((item) => {
        if (!query) return true;
        return item.symbol.includes(normalizedQuery) || item.displayName.includes(query);
      }),
    );
  }

  if (!assetType || assetType === 'tw_stock' || assetType === 'us_stock') {
    const normalizedSymbol = normalizeStockSymbol(query);
    const explicitMarket = assetType ? assetTypeToStockMarket(assetType) : null;
    const markets = explicitMarket ? [explicitMarket] : detectStockMarkets(normalizedSymbol);

    results.push(...markets.map((market) => stockSearchResult(normalizedSymbol, market)));
  }

  return NextResponse.json({ success: true, data: results });
}
