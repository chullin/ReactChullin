import { NextRequest, NextResponse } from 'next/server';
import type { MarketAssetType, MarketQuote } from '@/lib/market/types';
import { defaultFxPairs, fetchFxQuote, normalizeFxSymbol, seedFxQuote } from '@/lib/market/providers/fxProvider';
import {
  assetTypeToStockMarket,
  normalizeStockSymbol,
  type StockMarket,
} from '@/lib/market/providers/stockMarketProvider';
import {
  normalizeLegacyStockQuote,
  type LegacyStockQuote,
} from '@/lib/market/providers/jacksuStockAdapter';

export const dynamic = 'force-dynamic';

type MarketAssetRequest = {
  assetType: MarketAssetType;
  exchange: string;
  symbol: string;
};

type LegacyBatchResponse = {
  success?: boolean;
  data?: Record<string, LegacyStockQuote>;
};

function parseAssetToken(token: string): MarketAssetRequest | null {
  const [assetType, exchange, ...symbolParts] = token.split(':');
  const symbol = symbolParts.join(':');

  if (!assetType || !exchange || !symbol) return null;
  if (!['tw_stock', 'us_stock', 'fx'].includes(assetType)) return null;

  return {
    assetType: assetType as MarketAssetType,
    exchange,
    symbol,
  };
}

function quoteKey(asset: MarketAssetRequest) {
  return `${asset.assetType}:${asset.exchange}:${asset.symbol}`;
}

async function fetchStockQuotes(request: NextRequest, assets: MarketAssetRequest[]) {
  const stockAssets = assets
    .map((asset) => {
      const market = assetTypeToStockMarket(asset.assetType);
      return market ? { market, symbol: normalizeStockSymbol(asset.symbol), key: quoteKey(asset) } : null;
    })
    .filter((asset): asset is { market: StockMarket; symbol: string; key: string } => Boolean(asset));

  if (!stockAssets.length) return {};

  const stocks = stockAssets.map((asset) => `${asset.symbol}:${asset.market}`).join(',');
  const url = new URL('/api/stock/quotes-batch', request.nextUrl.origin);
  url.searchParams.set('stocks', stocks);

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) return {};

  const payload = (await response.json()) as LegacyBatchResponse;
  if (!payload.success || !payload.data) return {};

  return stockAssets.reduce<Record<string, MarketQuote>>((quotes, asset) => {
    const legacyQuote = payload.data?.[`${asset.symbol}|${asset.market}`];
    if (!legacyQuote) return quotes;

    quotes[asset.key] = normalizeLegacyStockQuote(asset.symbol, asset.market, legacyQuote);
    return quotes;
  }, {});
}

async function getFxQuotes(assets: MarketAssetRequest[]) {
  const pairMap = new Map(defaultFxPairs.map((pair) => [normalizeFxSymbol(pair.symbol), pair]));
  const entries = await Promise.all(
    assets.map(async (asset) => {
      if (asset.assetType !== 'fx') return null;

      const pair = pairMap.get(normalizeFxSymbol(asset.symbol));
      if (!pair) return null;

      try {
        return [quoteKey(asset), await fetchFxQuote(pair)] as const;
      } catch {
        return [quoteKey(asset), seedFxQuote(pair)] as const;
      }
    }),
  );

  return entries.reduce<Record<string, MarketQuote>>((quotes, entry) => {
    if (!entry) return quotes;
    quotes[entry[0]] = entry[1];
    return quotes;
  }, {});
}

export async function GET(request: NextRequest) {
  const assetsParam = request.nextUrl.searchParams.get('assets')?.trim();

  if (!assetsParam) {
    return NextResponse.json(
      { success: false, error: 'Missing assets' },
      { status: 400 },
    );
  }

  const assets = assetsParam
    .split(',')
    .map((token) => parseAssetToken(token.trim()))
    .filter((asset): asset is MarketAssetRequest => Boolean(asset));

  if (!assets.length) {
    return NextResponse.json({ success: true, data: {} });
  }

  try {
    const [stockQuotes, fxQuotes] = await Promise.all([
      fetchStockQuotes(request, assets),
      getFxQuotes(assets),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...stockQuotes,
        ...fxQuotes,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market quotes' },
      { status: 502 },
    );
  }
}
