import type { MarketChartPoint, MarketQuote, MarketRange, MarketSearchResult, MarketStatus } from '@/lib/market/types';
import {
  calculatePriceChange,
  isFiniteMarketNumber,
  marketAssetId,
} from '@/lib/market/providers/marketDataProvider';

type MetalSymbol = 'GOLD/TWD' | 'PLATINUM/TWD';

type MetalHistoryRow = {
  timestamp: string;
  goldSell: number;
  goldSellChange: number | null;
  goldBuy: number;
  goldBuyChange: number | null;
  platinumSell: number;
  platinumSellChange: number | null;
  platinumBuy: number;
  platinumBuyChange: number | null;
};

type MetalRateMode = 'sell' | 'buy';

const GCK99_GOLD_URL = 'https://www.gck99.com.tw/gold.php';
let metalCache: { expiresAt: number; rows: MetalHistoryRow[] } | null = null;

export const defaultMetalItems = [
  {
    symbol: 'GOLD/TWD' as const,
    displayName: '黃金牌價 / 新台幣',
    currency: 'TWD',
  },
  {
    symbol: 'PLATINUM/TWD' as const,
    displayName: '白金牌價 / 新台幣',
    currency: 'TWD',
  },
];

export function normalizeMetalSymbol(symbol: string) {
  const normalized = symbol.trim().toUpperCase().replace(/\s+/g, '').replace('-', '/');

  if (['GOLD', 'AU', '黃金'].includes(normalized)) return 'GOLD/TWD';
  if (['PLATINUM', 'PT', '白金', '鉑金'].includes(normalized)) return 'PLATINUM/TWD';
  if (normalized === 'XAU/TWD') return 'GOLD/TWD';
  if (normalized === 'XPT/TWD') return 'PLATINUM/TWD';
  return normalized;
}

export function metalAssetId(symbol: string) {
  return marketAssetId('metal', normalizeMetalSymbol(symbol), 'GCK99');
}

export function getMetalMarketStatus(): MarketStatus {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const taiwan = new Date(utc + 8 * 60 * 60_000);
  const day = taiwan.getUTCDay();
  const minutes = taiwan.getUTCHours() * 60 + taiwan.getUTCMinutes();

  if (day === 0) return 'closed';
  return minutes >= 660 && minutes <= 1200 ? 'open' : 'closed';
}

export function defaultMetalSearchResults(): MarketSearchResult[] {
  return defaultMetalItems.map((item) => ({
    assetId: metalAssetId(item.symbol),
    assetType: 'metal',
    symbol: item.symbol,
    exchange: 'GCK99',
    displayName: item.displayName,
    currency: item.currency,
    description: '展寬黃金回收台灣地區每日公告牌價',
  }));
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseNumber(value: string) {
  const match = stripHtml(value).match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return isFiniteMarketNumber(parsed) ? parsed : null;
}

function parseChange(value: string) {
  const parsed = parseNumber(value);
  if (!isFiniteMarketNumber(parsed)) return null;
  if (/class=["']green["']/.test(value)) return -Math.abs(parsed);
  if (/class=["']red["']/.test(value)) return Math.abs(parsed);
  return parsed;
}

function parseGck99Date(value: string) {
  const match = stripHtml(value).match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const [, year, month, day] = match;
  return `${year}-${month}-${day}T00:00:00+08:00`;
}

function parseHistoryRows(html: string) {
  const rows: MetalHistoryRow[] = [];

  for (const row of html.match(/<tr>[\s\S]*?<\/tr>/g) || []) {
    const cells = [...row.matchAll(/<td[\s\S]*?<\/td>/g)].map((cell) => cell[0]);
    if (cells.length >= 10 && parseNumber(cells[5]) === parseNumber(cells[6]) && !/class=["'](?:red|green)["']/.test(cells[6])) {
      cells.splice(6, 1);
    }
    if (cells.length < 9) continue;

    const timestamp = parseGck99Date(cells[0]);
    const goldSell = parseNumber(cells[1]);
    const goldSellChange = parseChange(cells[2]);
    const goldBuy = parseNumber(cells[3]);
    const goldBuyChange = parseChange(cells[4]);
    const platinumSell = parseNumber(cells[5]);
    const platinumSellChange = parseChange(cells[6]);
    const platinumBuy = parseNumber(cells[7]);
    const platinumBuyChange = parseChange(cells[8]);

    if (!timestamp || !isFiniteMarketNumber(goldSell) || !isFiniteMarketNumber(goldBuy) || !isFiniteMarketNumber(platinumSell) || !isFiniteMarketNumber(platinumBuy)) {
      continue;
    }

    rows.push({
      timestamp,
      goldSell,
      goldSellChange,
      goldBuy,
      goldBuyChange,
      platinumSell,
      platinumSellChange,
      platinumBuy,
      platinumBuyChange,
    });
  }

  const seen = new Set<string>();
  return rows
    .filter((row) => {
      if (seen.has(row.timestamp)) return false;
      seen.add(row.timestamp);
      return true;
    })
    .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
}

async function fetchGck99Rows() {
  if (metalCache && metalCache.expiresAt > Date.now()) return metalCache.rows;

  try {
    const response = await fetch(GCK99_GOLD_URL, {
      cache: 'no-store',
      headers: {
        accept: 'text/html,application/xhtml+xml',
        'user-agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) return [];

    const rows = parseHistoryRows(await response.text());
    metalCache = {
      expiresAt: Date.now() + 10 * 60_000,
      rows,
    };
    return rows;
  } catch {
    return [];
  }
}

function metalItem(symbol: string) {
  const normalized = normalizeMetalSymbol(symbol);
  return defaultMetalItems.find((item) => item.symbol === normalized) || null;
}

function rowValue(row: MetalHistoryRow, symbol: MetalSymbol, mode: MetalRateMode) {
  if (symbol === 'GOLD/TWD') return mode === 'sell' ? row.goldSell : row.goldBuy;
  return mode === 'sell' ? row.platinumSell : row.platinumBuy;
}

function rowChange(row: MetalHistoryRow, symbol: MetalSymbol, mode: MetalRateMode) {
  if (symbol === 'GOLD/TWD') return mode === 'sell' ? row.goldSellChange : row.goldBuyChange;
  return mode === 'sell' ? row.platinumSellChange : row.platinumBuyChange;
}

function rangeDays(range: MarketRange) {
  if (range === '1D') return 1;
  if (range === '5D') return 5;
  if (range === '1M') return 31;
  if (range === '6M') return 183;
  if (range === '1Y') return 366;
  if (range === '5Y') return 5 * 366;
  return 20 * 366;
}

function filterByRange(points: MarketChartPoint[], range: MarketRange) {
  if (!points.length || range === 'MAX') return points;
  const latest = Date.parse(points.at(-1)?.timestamp || '');
  if (!Number.isFinite(latest)) return points;
  const earliest = latest - rangeDays(range) * 24 * 60 * 60_000;
  const filtered = points.filter((point) => Date.parse(point.timestamp) >= earliest);
  return filtered.length >= 2 ? filtered : points.slice(-2);
}

export async function fetchMetalTimeSeries(symbol: string, range: MarketRange = '1M', mode: MetalRateMode = 'sell') {
  const item = metalItem(symbol);
  if (!item) return [];

  const rows = await fetchGck99Rows();
  const points = rows.map((row) => {
    const price = rowValue(row, item.symbol, mode);
    return {
      timestamp: row.timestamp,
      price,
      open: price,
      high: price,
      low: price,
      close: price,
      volume: null,
    };
  });

  return filterByRange(points, range);
}

export async function fetchMetalQuote(symbol: string): Promise<MarketQuote | null> {
  const item = metalItem(symbol);
  if (!item) return null;

  const rows = await fetchGck99Rows();
  const latest = rows.at(-1);
  const previous = rows.at(-2);
  if (!latest) return null;

  const currentPrice = rowValue(latest, item.symbol, 'sell');
  const previousClose = previous ? rowValue(previous, item.symbol, 'sell') : currentPrice;
  const { priceChange, changePercent } = calculatePriceChange(currentPrice, previousClose);
  const chartData = await fetchMetalTimeSeries(item.symbol, '1M', 'sell');

  return {
    assetId: metalAssetId(item.symbol),
    assetType: 'metal',
    symbol: item.symbol,
    exchange: 'GCK99',
    displayName: item.displayName,
    currency: item.currency,
    currentPrice,
    previousClose,
    priceChange,
    changePercent,
    marketStatus: getMetalMarketStatus(),
    updatedAt: latest.timestamp,
    chartData,
    metalRate: {
      sell: currentPrice,
      buy: rowValue(latest, item.symbol, 'buy'),
      sellChange: rowChange(latest, item.symbol, 'sell'),
      buyChange: rowChange(latest, item.symbol, 'buy'),
      unit: item.symbol === 'GOLD/TWD' ? '錢' : '錢',
      updatedAt: latest.timestamp,
      sourceName: '展寬黃金回收',
      sourceUrl: GCK99_GOLD_URL,
    },
  };
}
