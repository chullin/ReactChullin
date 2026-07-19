'use client';

import type { FormEvent, PointerEvent as ReactPointerEvent, TouchEvent } from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  BarChart3,
  Bell,
  ChevronDown,
  ExternalLink,
  Info,
  LineChart,
  Minus,
  Newspaper,
  Plus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react';
import { defaultFxPairs, seedFxQuote } from '@/lib/market/providers/fxProvider';

type Market = '美股' | '台股' | '外匯';

type StockItem = {
  symbol: string;
  market: Market;
};

type Watchlists = Record<string, StockItem[]>;

type WatchlistDef = {
  id: string;
  name: string;
};

type LocalPriceAlert = {
  alertId: string;
  symbol: string;
  market: Market;
  conditionType: 'price_above' | 'price_below';
  targetValue: number;
  isEnabled: boolean;
  triggerMode: 'once' | 'repeat';
  cooldownMinutes: number;
  lastTriggeredAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type StockQuote = {
  symbol: string;
  name?: string;
  longName?: string;
  price?: number | null;
  change?: number | null;
  changePercent?: number | null;
  changeBasis?: string;
  openPrice?: number | null;
  previousClose?: number | null;
  currentSessionDay?: string | null;
  isLiveDailyBar?: boolean;
  currency?: string;
  sparkline?: number[];
  quoteType?: string;
  exchange?: string;
  fiftyTwoWeekHigh?: number | null;
  fiftyTwoWeekLow?: number | null;
};

type QuoteResponse = {
  success?: boolean;
  data?: StockQuote | null;
  error?: string;
};

type BatchQuoteResponse = {
  success?: boolean;
  data?: Record<string, StockQuote>;
};

type HistoryPoint = {
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
};

type VrvpBin = {
  low: number;
  high: number;
  volume: number;
};

type VrvpProfile = {
  bins: VrvpBin[];
  maxVolume: number;
  poc: VrvpBin | null;
  vah: number | null;
  val: number | null;
};

type StaffLine = {
  label: string;
  startValue: number;
  midValue: number;
  endValue: number;
  offset: number;
  color: string;
  tagColor: string;
};

type StockDetails = {
  quote?: StockQuote | null;
  news?: { title: string; url: string; pubDate?: string; source?: string }[];
  history?: HistoryPoint[];
};

type DetailsResponse = {
  success?: boolean;
  data?: StockDetails;
};

type PeriodOption = {
  label: string;
  months?: number;
  ytd?: boolean;
};

const DEFAULT_LISTS: WatchlistDef[] = [
  { id: '庫存', name: '庫存' },
  { id: '觀察清單 1', name: '觀察清單 1' },
  { id: '觀察清單 2', name: '觀察清單 2' },
  { id: '觀察清單 3', name: '觀察清單 3' },
];

const MARKET_TABS = [
  { label: '全部', value: '全部' },
  { label: '美股', value: '美股' },
  { label: '台股', value: '台股' },
  { label: '外匯', value: '外匯' },
] as const;

const STORAGE_KEY = 'stock-watchlist:v1';
const LIST_DEFS_KEY = 'stock-watchlist-list-defs:v1';
const ALERTS_KEY = 'stock-watchlist-alerts:v1';
const ACTIVE_LIST_KEY = 'stock-watchlist-active-list:v1';
const ACTIVE_MARKET_KEY = 'stock-watchlist-active-market:v1';
const REFRESH_INTERVAL_MS = 30_000;
const PRICE_PERIODS: PeriodOption[] = [
  { label: '1M', months: 1 },
  { label: '3M', months: 3 },
  { label: '6M', months: 6 },
  { label: 'YTD', ytd: true },
  { label: '1Y', months: 12 },
  { label: '3Y', months: 36 },
  { label: '5Y', months: 60 },
] satisfies PeriodOption[];
const STAFF_PERIODS: PeriodOption[] = [
  { label: '6M', months: 6 },
  { label: '1Y', months: 12 },
  { label: '2Y', months: 24 },
  { label: '3.5Y', months: 42 },
  { label: '5Y', months: 60 },
] satisfies PeriodOption[];
const VRVP_PERIODS: PeriodOption[] = [
  { label: '3M', months: 3 },
  { label: '6M', months: 6 },
  { label: '1Y', months: 12 },
  { label: '3Y', months: 36 },
  { label: '5Y', months: 60 },
] satisfies PeriodOption[];

function defaultFxItems(): StockItem[] {
  return defaultFxPairs.map((pair) => ({
    symbol: pair.symbol,
    market: '外匯' as const,
  }));
}

function createEmptyWatchlists(lists: WatchlistDef[] = DEFAULT_LISTS) {
  const watchlists = lists.reduce<Watchlists>((acc, list) => {
    acc[list.id] = [];
    return acc;
  }, {});

  watchlists['庫存'] = defaultFxItems();
  return watchlists;
}

function mergeStoredWatchlists(base: Watchlists, stored: Watchlists): Watchlists {
  const merged = { ...base, ...stored };
  const inventory = merged['庫存'] || [];
  const existingKeys = new Set(inventory.map((item) => stockKey(item.symbol, item.market)));
  const missingFxItems = defaultFxItems().filter((item) => !existingKeys.has(stockKey(item.symbol, item.market)));

  return {
    ...merged,
    庫存: [...inventory, ...missingFxItems],
  };
}

function normalizeWatchlistDefs(value: unknown): WatchlistDef[] {
  if (!Array.isArray(value)) return DEFAULT_LISTS;
  const merged = [...DEFAULT_LISTS, ...value.filter((item): item is WatchlistDef => {
    return typeof item?.id === 'string' && typeof item?.name === 'string';
  })];
  const seen = new Set<string>();

  return merged.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function normalizeSymbol(value: string) {
  return value.trim().toUpperCase().replace(/\./g, '-');
}

function displaySymbol(value: string) {
  return value.replace(/-/g, '.');
}

function detectMarkets(symbol: string): Market[] {
  if (!symbol) return [];
  if (/^[A-Z]{3}[/-][A-Z]{3}$/.test(symbol)) return ['外匯'];
  return /^\d+[A-Z]?$/.test(symbol) ? ['台股'] : ['美股'];
}

function stockKey(symbol: string, market: Market) {
  return `${symbol}|${market}`;
}

function apiStockToken(symbol: string, market: Market) {
  return `${symbol}:${market}`;
}

function isStockMarket(market: Market): market is '美股' | '台股' {
  return market === '美股' || market === '台股';
}

function fxQuoteToStockQuote(symbol: string): StockQuote | null {
  const pair = defaultFxPairs.find((item) => item.symbol === symbol);
  if (!pair) return null;

  const quote = seedFxQuote(pair);

  return {
    symbol: quote.symbol,
    longName: quote.displayName,
    price: quote.currentPrice,
    change: quote.priceChange,
    changePercent: quote.changePercent,
    previousClose: quote.previousClose,
    currency: quote.currency,
    sparkline: quote.chartData.map((point) => point.price).filter(isFiniteNumber),
    quoteType: 'FX',
    exchange: quote.exchange,
  };
}

function alertKey(symbol: string, market: Market) {
  return stockKey(symbol, market);
}

function formatAlertText(alert: LocalPriceAlert) {
  return `${alert.conditionType === 'price_above' ? '價格高於' : '價格低於'} ${alert.targetValue}`;
}

function createAlertId(symbol: string, market: Market) {
  return `${alertKey(symbol, market)}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function formatPrice(value: number | null | undefined, currency?: string) {
  if (!isFiniteNumber(value)) return '-';
  const fractionDigits = currency === 'TWD' ? 2 : 2;

  return value.toLocaleString(currency === 'TWD' ? 'zh-TW' : 'en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function formatChange(value: number | null | undefined, currency?: string) {
  if (!isFiniteNumber(value)) return '-';
  const prefix = value >= 0 ? '+' : '';

  if (currency === 'TWD') {
    return `${prefix}${value.toFixed(2)}`;
  }

  return `${prefix}${value.toFixed(2)}`;
}

function formatPercent(value: number | null | undefined) {
  if (!isFiniteNumber(value)) return '-';
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)}%`;
}

function formatDate(value?: string) {
  if (!value) return '-';
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function formatTooltipDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function periodStart(period: { months?: number; ytd?: boolean }) {
  const date = new Date();

  if (period.ytd) {
    return new Date(date.getFullYear(), 0, 1);
  }

  date.setMonth(date.getMonth() - (period.months || 12));
  return date;
}

function filterHistory(points: HistoryPoint[] = [], period: { months?: number; ytd?: boolean }) {
  const start = periodStart(period).getTime();
  return points.filter((point) => Date.parse(point.date) >= start && isFiniteNumber(point.close));
}

function getCloseValues(points: HistoryPoint[]) {
  return points.map((point) => point.close).filter(isFiniteNumber);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

const CHART_BOUNDS = {
  left: 18,
  right: 82,
  top: 20,
  bottom: 32,
};

function linePath(values: number[]) {
  if (values.length < 2) return '';

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = 2 + (index / (values.length - 1)) * 96;
      const y = 6 + (1 - (value - min) / range) * 88;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function chartPath(points: HistoryPoint[], min: number, max: number, width = 100, height = 100) {
  const valid = points.filter((point): point is HistoryPoint & { close: number } => isFiniteNumber(point.close));

  if (valid.length < 2) return '';

  return valid
    .map((point, index) => {
      const x = chartX(index, valid.length, width);
      const y = horizontalLineY(point.close, min, max, height);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function horizontalLineY(value: number, min: number, max: number, height = 100) {
  return CHART_BOUNDS.top + (1 - (value - min) / (max - min || 1)) * Math.max(1, height - CHART_BOUNDS.top - CHART_BOUNDS.bottom);
}

function chartX(index: number, total: number, width = 100) {
  const right = Math.max(CHART_BOUNDS.left + 1, width - CHART_BOUNDS.right);
  return total <= 1
    ? CHART_BOUNDS.left
    : CHART_BOUNDS.left + (index / (total - 1)) * (right - CHART_BOUNDS.left);
}

function chartRight(width: number) {
  return Math.max(CHART_BOUNDS.left + 1, width - CHART_BOUNDS.right);
}

function chartBottom(height: number) {
  return Math.max(CHART_BOUNDS.top + 1, height - CHART_BOUNDS.bottom);
}

function formatMonthTick(value: string, previousYear?: number) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 7);
  const year = date.getFullYear();
  if (date.getMonth() === 0 && previousYear !== year) return `${year}年`;
  return `${date.getMonth() + 1}月`;
}

function formatDayTick(value: string, includeMonth: boolean) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(5);
  return includeMonth ? `${date.getMonth() + 1}/${date.getDate()}` : `${date.getDate()}`;
}

function makeDateTicks(points: HistoryPoint[], width = 100) {
  if (!points.length) return [];
  const ticks: { label: string; x: number }[] = [];
  const shouldShowDays = points.length <= 95;

  if (shouldShowDays) {
    const targetTicks = width >= 900 ? 14 : width >= 640 ? 10 : 6;
    const step = Math.max(1, Math.ceil(points.length / targetTicks));

    points.forEach((point, index) => {
      if (index !== 0 && index !== points.length - 1 && index % step !== 0) return;
      const previousPoint = points[Math.max(0, index - step)];
      const previousDate = previousPoint ? new Date(previousPoint.date) : null;
      const currentDate = new Date(point.date);
      const includeMonth =
        index === 0 ||
        index === points.length - 1 ||
        !previousDate ||
        Number.isNaN(previousDate.getTime()) ||
        previousDate.getMonth() !== currentDate.getMonth();

      ticks.push({
        label: formatDayTick(point.date, includeMonth),
        x: chartX(index, points.length, width),
      });
    });

    return ticks;
  }

  let previousMonth = -1;
  let previousYear: number | undefined;

  points.forEach((point, index) => {
    const date = new Date(point.date);
    if (Number.isNaN(date.getTime())) return;
    const month = date.getMonth();
    const year = date.getFullYear();

    if (index === 0 || month !== previousMonth) {
      ticks.push({
        label: formatMonthTick(point.date, previousYear),
        x: chartX(index, points.length, width),
      });
    }

    previousMonth = month;
    previousYear = year;
  });

  const visibleTicks: { label: string; x: number }[] = [];

  for (const tick of ticks) {
    const previous = visibleTicks.at(-1);

    if (!previous || tick.x - previous.x >= (width >= 900 ? 84 : 70)) {
      visibleTicks.push(tick);
    }
  }

  return visibleTicks;
}

function niceStep(rawStep: number) {
  const exponent = Math.floor(Math.log10(rawStep || 1));
  const magnitude = 10 ** exponent;
  const normalized = rawStep / magnitude;
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return nice * magnitude;
}

function makeNicePriceDomain(min: number, max: number, targetCount = 8) {
  const range = max - min || Math.max(Math.abs(max), 1);
  const step = niceStep(range / Math.max(targetCount - 1, 1));
  return {
    min: Math.floor(min / step) * step,
    max: Math.ceil(max / step) * step,
    step,
  };
}

function makePriceTicks(min: number, max: number, step: number, height = 100) {
  const ticks: { label: string; value: number; y: number }[] = [];

  for (let value = min; value <= max + step * 0.5; value += step) {
    ticks.push({
      label: formatPrice(value),
      value,
      y: horizontalLineY(value, min, max, height),
    });
  }

  return ticks;
}

function getPriceDomain(points: HistoryPoint[]) {
  const prices = points.flatMap((point) => [
    point.high,
    point.low,
    point.open,
    point.close,
  ]).filter(isFiniteNumber);

  if (!prices.length) return { min: 0, max: 0 };

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

function getCandlePoint(point: HistoryPoint) {
  const close = point.close;
  if (!isFiniteNumber(close)) return null;

  const open = isFiniteNumber(point.open) ? point.open : close;
  const high = isFiniteNumber(point.high) ? point.high : Math.max(open, close);
  const low = isFiniteNumber(point.low) ? point.low : Math.min(open, close);

  return { open, high, low, close };
}

function makeCloseMarker(value: number, min: number, max: number, height = 100) {
  return {
    label: formatPrice(value),
    value,
    y: horizontalLineY(value, min, max, height),
  };
}

function calculateStaff(points: HistoryPoint[]): StaffLine[] | null {
  const valid = points
    .map((point, index) => ({ index, close: point.close }))
    .filter((point): point is { index: number; close: number } => isFiniteNumber(point.close));

  if (!valid.length) return null;

  const count = valid.length;
  const averageX = valid.reduce((sum, point) => sum + point.index, 0) / count;
  const averageY = valid.reduce((sum, point) => sum + point.close, 0) / count;
  const varianceX = valid.reduce((sum, point) => sum + (point.index - averageX) ** 2, 0);
  const covariance = valid.reduce((sum, point) => sum + (point.index - averageX) * (point.close - averageY), 0);
  const slope = varianceX === 0 ? 0 : covariance / varianceX;
  const intercept = averageY - slope * averageX;
  const residualVariance = valid.reduce((sum, point) => {
    const trendValue = intercept + slope * point.index;
    return sum + (point.close - trendValue) ** 2;
  }, 0) / count;
  const residualStdev = Math.sqrt(residualVariance);
  const fallbackBand = Math.max(Math.abs(averageY) * 0.04, 1);
  const band = residualStdev > 0 ? residualStdev : fallbackBand;
  const startIndex = valid[0].index;
  const endIndex = valid.at(-1)?.index ?? startIndex;
  const midIndex = startIndex + (endIndex - startIndex) * 0.5;
  const levels = [
    { label: '+2σ', offset: 2, color: '#2563eb', tagColor: '#2563eb' },
    { label: '+1σ', offset: 1, color: '#0891b2', tagColor: '#0284c7' },
    { label: '零線', offset: 0, color: '#f97316', tagColor: '#f97316' },
    { label: '-1σ', offset: -1, color: '#10b981', tagColor: '#10b981' },
    { label: '-2σ', offset: -2, color: '#4ade80', tagColor: '#4ade80' },
  ];

  return levels.map((level) => {
    const lineOffset = band * level.offset;

    return {
      ...level,
      startValue: intercept + slope * startIndex + lineOffset,
      midValue: intercept + slope * midIndex + lineOffset,
      endValue: intercept + slope * endIndex + lineOffset,
    };
  });
}

function calculateVrvp(points: HistoryPoint[], binCount = 56): VrvpProfile {
  const valid = points.filter((point) => isFiniteNumber(point.close) && isFiniteNumber(point.volume));
  const prices = valid.map((point) => point.close as number);

  if (!prices.length) {
    return { bins: [], maxVolume: 1, poc: null, vah: null, val: null };
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const step = (max - min || 1) / binCount;
  const bins = Array.from({ length: binCount }, (_, index) => ({
    low: min + step * index,
    high: min + step * (index + 1),
    volume: 0,
  }));

  for (const point of valid) {
    const index = Math.min(binCount - 1, Math.max(0, Math.floor(((point.close as number) - min) / step)));
    bins[index].volume += point.volume || 0;
  }

  const maxVolume = Math.max(...bins.map((bin) => bin.volume), 1);
  const totalVolume = bins.reduce((sum, bin) => sum + bin.volume, 0);
  const pocIndex = bins.reduce((bestIndex, bin, index) => (bin.volume > bins[bestIndex].volume ? index : bestIndex), 0);
  const poc = bins[pocIndex] || null;
  const included = new Set<number>();
  let cumulativeVolume = poc?.volume || 0;
  let lowerIndex = pocIndex - 1;
  let upperIndex = pocIndex + 1;

  if (poc) included.add(pocIndex);

  while (cumulativeVolume < totalVolume * 0.7 && (lowerIndex >= 0 || upperIndex < bins.length)) {
    const lowerVolume = lowerIndex >= 0 ? bins[lowerIndex].volume : -1;
    const upperVolume = upperIndex < bins.length ? bins[upperIndex].volume : -1;

    if (upperVolume >= lowerVolume) {
      if (upperIndex < bins.length) {
        included.add(upperIndex);
        cumulativeVolume += bins[upperIndex].volume;
      }
      upperIndex += 1;
    } else {
      if (lowerIndex >= 0) {
        included.add(lowerIndex);
        cumulativeVolume += bins[lowerIndex].volume;
      }
      lowerIndex -= 1;
    }
  }

  const valueAreaBins = Array.from(included)
    .map((index) => bins[index])
    .filter(Boolean);

  return {
    bins: bins.slice().reverse(),
    maxVolume,
    poc,
    vah: valueAreaBins.length ? Math.max(...valueAreaBins.map((bin) => bin.high)) : null,
    val: valueAreaBins.length ? Math.min(...valueAreaBins.map((bin) => bin.low)) : null,
  };
}

function rangePercent(quote: StockQuote) {
  const low = quote.fiftyTwoWeekLow;
  const high = quote.fiftyTwoWeekHigh;
  const price = quote.price;

  if (!isFiniteNumber(low) || !isFiniteNumber(high) || !isFiniteNumber(price) || high <= low) {
    return null;
  }

  return Math.max(2, Math.min(100, ((price - low) / (high - low)) * 100));
}

function isMarketOpen(market: Market) {
  if (market === '外匯') {
    const day = new Date().getUTCDay();
    return day !== 0 && day !== 6;
  }

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const offset = market === '台股' ? 8 : isUsDst(now) ? -4 : -5;
  const local = new Date(utc + offset * 60 * 60_000);
  const day = local.getUTCDay();
  const minutes = local.getUTCHours() * 60 + local.getUTCMinutes();

  if (day === 0 || day === 6) return false;
  return market === '台股' ? minutes >= 540 && minutes <= 810 : minutes >= 570 && minutes <= 960;
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

function Sparkline({ quote, positive, negative }: { quote?: StockQuote; positive: boolean; negative: boolean }) {
  const values = quote?.sparkline || [];
  const path = linePath(values);
  const stroke = positive ? '#089981' : negative ? '#f23645' : '#6b7280';

  if (!path) {
    return <div className="h-full w-full rounded bg-gray-100" />;
  }

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function DetailChart({
  mode,
  points,
  periodLabel,
}: {
  mode: string;
  points: HistoryPoint[];
  periodLabel: string;
}) {
  const [range, setRange] = useState({ start: 0, end: 1 });
  const [chartSize, setChartSize] = useState({ width: 900, height: 288 });
  const [hoveredCandle, setHoveredCandle] = useState<{
    point: HistoryPoint;
    candle: { open: number; high: number; low: number; close: number };
    x: number;
    y: number;
  } | null>(null);
  const [isDraggingChart, setIsDraggingChart] = useState(false);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const pinchRef = useRef<{ distance: number; centerX: number; centerRatio: number; range: { start: number; end: number } } | null>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; range: { start: number; end: number } } | null>(null);

  useEffect(() => {
    setRange({ start: 0, end: 1 });
    setHoveredCandle(null);
    setIsDraggingChart(false);
    pinchRef.current = null;
    dragRef.current = null;
  }, [mode, periodLabel, points]);

  useLayoutEffect(() => {
    const element = chartRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setChartSize({
        width: Math.max(320, Math.round(rect.width)),
        height: Math.max(240, Math.round(rect.height)),
      });
    };

    updateSize();

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [mode, points.length]);

  const visiblePoints = useMemo(() => {
    if (points.length <= 2) return points;
    const maxIndex = points.length - 1;
    const startIndex = Math.floor(range.start * maxIndex);
    const endIndex = Math.max(startIndex + 1, Math.ceil(range.end * maxIndex));
    return points.slice(startIndex, endIndex + 1);
  }, [mode, points, range]);
  const values = getCloseValues(visiblePoints);
  const isCandlestickMode = mode === 'price' || mode === 'staff' || mode === 'vrvp';
  const closeDomain = {
    min: values.length ? Math.min(...values) : 0,
    max: values.length ? Math.max(...values) : 0,
  };
  const staff = calculateStaff(visiblePoints);
  const vrvpProfile = calculateVrvp(visiblePoints);
  const rawPriceDomain = isCandlestickMode ? getPriceDomain(visiblePoints) : closeDomain;
  const staffValues = mode === 'staff' && staff ? staff.flatMap((line) => [line.startValue, line.midValue, line.endValue]) : [];
  const vrvpValues = mode === 'vrvp'
    ? [
        vrvpProfile.vah,
        vrvpProfile.val,
        vrvpProfile.poc ? (vrvpProfile.poc.low + vrvpProfile.poc.high) / 2 : null,
      ].filter(isFiniteNumber)
    : [];
  const domainValues = [...staffValues, ...vrvpValues];
  const rawDomain = domainValues.length
    ? {
        min: Math.min(rawPriceDomain.min, ...domainValues),
        max: Math.max(rawPriceDomain.max, ...domainValues),
      }
    : rawPriceDomain;
  const priceAxis = makeNicePriceDomain(rawDomain.min, rawDomain.max, isCandlestickMode ? 9 : 3);
  const min = priceAxis.min;
  const max = priceAxis.max;
  const path = chartPath(visiblePoints, min, max, chartSize.width, chartSize.height);
  const last = values.at(-1);
  const first = values[0];
  const positive = isFiniteNumber(last) && isFiniteNumber(first) ? last >= first : true;
  const stroke = positive ? '#089981' : '#f23645';
  const dateTicks = makeDateTicks(visiblePoints, chartSize.width);
  const priceTicks = makePriceTicks(min, max, priceAxis.step, chartSize.height);
  const plotWidth = Math.max(1, chartRight(chartSize.width) - CHART_BOUNDS.left);
  const candleWidth = clamp((plotWidth / Math.max(visiblePoints.length, 1)) * 0.62, 1, 8);
  const staffLabelX = CHART_BOUNDS.left + plotWidth * 0.5;
  const hasCandles = visiblePoints.some((point) => getCandlePoint(point));
  const closeMarker = isCandlestickMode && isFiniteNumber(last) ? makeCloseMarker(last, min, max, chartSize.height) : null;
  const canPan = isCandlestickMode && range.end - range.start < 0.999 && points.length > visiblePoints.length;
  const profileWidth = Math.min(220, Math.max(96, plotWidth * 0.32));
  const pocValue = vrvpProfile.poc ? (vrvpProfile.poc.low + vrvpProfile.poc.high) / 2 : null;
  const vrvpLevels = mode === 'vrvp'
    ? [
        { label: 'VAH', value: vrvpProfile.vah, color: '#2563eb' },
        { label: 'POC', value: pocValue, color: '#f97316' },
        { label: 'VAL', value: vrvpProfile.val, color: '#2563eb' },
      ].filter((level): level is { label: string; value: number; color: string } => isFiniteNumber(level.value))
    : [];
  const closeMarkerColor = mode === 'vrvp' ? '#f23645' : '#089981';

  const updateZoom = useCallback((factor: number, anchorRatio: number) => {
    setRange((current) => {
      const currentSpan = current.end - current.start;
      const span = clamp(currentSpan * factor, Math.min(1, 24 / Math.max(points.length, 1)), 1);
      const anchor = current.start + currentSpan * clamp(anchorRatio, 0, 1);
      const start = clamp(anchor - span * anchorRatio, 0, 1 - span);
      return { start, end: start + span };
    });
  }, [points.length]);

  useEffect(() => {
    const element = chartRef.current;
    if (!element || points.length < 25) return;

    const handleNativeWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = element.getBoundingClientRect();
      const anchorRatio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      updateZoom(event.deltaY < 0 ? 0.82 : 1.22, anchorRatio);
    };

    element.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleNativeWheel);
  }, [points.length, updateZoom]);

  const setRangeFromTouch = useCallback((initial: NonNullable<typeof pinchRef.current>, distance: number, centerX: number) => {
    const initialSpan = initial.range.end - initial.range.start;
    const scale = distance / Math.max(initial.distance, 1);
    const span = clamp(initialSpan / Math.max(scale, 0.2), Math.min(1, 24 / Math.max(points.length, 1)), 1);
    const anchorRatio = clamp(initial.centerRatio, 0, 1);
    const anchor = initial.range.start + initialSpan * anchorRatio;
    const deltaRatio = ((centerX - initial.centerX) / Math.max(plotWidth, 1)) * span;
    const start = clamp(anchor - span * anchorRatio - deltaRatio, 0, 1 - span);

    setRange({ start, end: start + span });
  }, [plotWidth, points.length]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2) {
      pinchRef.current = null;
      return;
    }

    const [firstTouch, secondTouch] = Array.from(event.touches);
    const rect = event.currentTarget.getBoundingClientRect();
    const distance = Math.hypot(firstTouch.clientX - secondTouch.clientX, firstTouch.clientY - secondTouch.clientY);
    const center = (firstTouch.clientX + secondTouch.clientX) / 2;
    pinchRef.current = {
      distance,
      centerX: center,
      centerRatio: clamp((center - rect.left) / rect.width, 0, 1),
      range,
    };
  }, [range]);

  const handleTouchMove = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || !pinchRef.current) return;
    event.preventDefault();
    const [firstTouch, secondTouch] = Array.from(event.touches);
    const distance = Math.hypot(firstTouch.clientX - secondTouch.clientX, firstTouch.clientY - secondTouch.clientY);
    const center = (firstTouch.clientX + secondTouch.clientX) / 2;
    const initial = pinchRef.current;
    setRangeFromTouch(initial, distance, center);
  }, [setRangeFromTouch]);

  const updateHoveredCandle = useCallback((clientX: number, clientY: number) => {
    if (!isCandlestickMode || isDraggingChart || !chartRef.current || !visiblePoints.length) return;
    const rect = chartRef.current.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / Math.max(rect.width, 1)) * chartSize.width;
    const svgY = ((clientY - rect.top) / Math.max(rect.height, 1)) * chartSize.height;
    const ratio = clamp((svgX - CHART_BOUNDS.left) / Math.max(plotWidth, 1), 0, 1);
    const index = Math.round(ratio * (visiblePoints.length - 1));
    const point = visiblePoints[index];
    const candle = point ? getCandlePoint(point) : null;

    if (!point || !candle) {
      setHoveredCandle(null);
      return;
    }

    const x = chartX(index, visiblePoints.length, chartSize.width);
    const highY = horizontalLineY(candle.high, min, max, chartSize.height);
    const lowY = horizontalLineY(candle.low, min, max, chartSize.height);
    const openY = horizontalLineY(candle.open, min, max, chartSize.height);
    const closeY = horizontalLineY(candle.close, min, max, chartSize.height);
    const bodyTop = Math.min(openY, closeY);
    const bodyBottom = Math.max(openY, closeY);
    const hitTolerance = 8;
    const nearCandleX = Math.abs(svgX - x) <= Math.max(hitTolerance, candleWidth * 1.9);
    const nearCandle =
      nearCandleX &&
      (
        (svgY >= highY - hitTolerance && svgY <= lowY + hitTolerance) ||
        (svgY >= bodyTop - hitTolerance && svgY <= bodyBottom + hitTolerance)
      );
    const nearStaffLine = mode === 'staff' && staff
      ? staff.some((line) => {
          const lineY = horizontalLineY(line.startValue, min, max, chartSize.height) +
            (horizontalLineY(line.endValue, min, max, chartSize.height) - horizontalLineY(line.startValue, min, max, chartSize.height)) * ratio;

          return svgX >= CHART_BOUNDS.left && svgX <= chartRight(chartSize.width) && Math.abs(svgY - lineY) <= hitTolerance;
        })
      : false;

    if (!nearCandle && !nearStaffLine) {
      setHoveredCandle(null);
      return;
    }

    setHoveredCandle({
      point,
      candle,
      x,
      y: highY,
    });
  }, [candleWidth, chartSize.height, chartSize.width, isCandlestickMode, isDraggingChart, min, max, mode, plotWidth, staff, visiblePoints]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    if (!isCandlestickMode || !canPan || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      range,
    };
    setIsDraggingChart(true);
    setHoveredCandle(null);
  }, [canPan, isCandlestickMode, range]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      updateHoveredCandle(event.clientX, event.clientY);
      return;
    }

    event.preventDefault();
    const span = drag.range.end - drag.range.start;
    const deltaRatio = ((event.clientX - drag.startX) / Math.max(plotWidth, 1)) * span;
    const start = clamp(drag.range.start - deltaRatio, 0, 1 - span);
    setRange({ start, end: start + span });
  }, [plotWidth, updateHoveredCandle]);

  const endPointerDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (drag?.pointerId === event.pointerId) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      dragRef.current = null;
      setIsDraggingChart(false);
      updateHoveredCandle(event.clientX, event.clientY);
    }
  }, [updateHoveredCandle]);

  if (!values.length || (isCandlestickMode && !hasCandles) || (!isCandlestickMode && mode !== 'vrvp' && !path)) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm font-bold text-slate-400">
        暫無圖表資料
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-400">
        <span>{periodLabel}</span>
        <span>
          {formatPrice(min)} - {formatPrice(max)}
        </span>
      </div>
      <div
        ref={chartRef}
        className={`relative h-72 overflow-hidden rounded-xl bg-white touch-pan-y ${
          isCandlestickMode ? (canPan ? (isDraggingChart ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-crosshair') : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
        onPointerLeave={(event) => {
          endPointerDrag(event);
          setHoveredCandle(null);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => {
          pinchRef.current = null;
        }}
        onTouchCancel={() => {
          pinchRef.current = null;
        }}
      >
        <svg
          viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
          className="h-full w-full overflow-visible"
        >
            {priceTicks.map((tick) => (
              <g key={`${tick.label}-${tick.value}`}>
                <line
                  x1={String(CHART_BOUNDS.left)}
                  x2={String(chartRight(chartSize.width))}
                  y1={String(tick.y)}
                  y2={String(tick.y)}
                  stroke="#e5e7eb"
                  strokeWidth="0.7"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={String(chartSize.width - 14)}
                  y={String(tick.y)}
                  dominantBaseline="middle"
                  textAnchor="end"
                  className="fill-slate-400 text-[11px] font-bold"
                  vectorEffect="non-scaling-stroke"
                >
                  {tick.label}
                </text>
              </g>
            ))}
            {dateTicks.map((tick) => (
              <g key={`${tick.label}-${tick.x}`}>
                <line
                  x1={String(tick.x)}
                  x2={String(tick.x)}
                  y1={String(CHART_BOUNDS.top)}
                  y2={String(chartBottom(chartSize.height))}
                  stroke="#eef2f7"
                  strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={String(tick.x)}
                  y={String(chartSize.height - 10)}
                  textAnchor="middle"
                  className="fill-slate-400 text-[11px] font-bold"
                  vectorEffect="non-scaling-stroke"
                >
                  {tick.label}
                </text>
              </g>
            ))}
            <line
              x1={String(CHART_BOUNDS.left)}
              x2={String(chartRight(chartSize.width))}
              y1={String(chartBottom(chartSize.height))}
              y2={String(chartBottom(chartSize.height))}
              stroke="#cbd5e1"
              strokeWidth="0.9"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={String(chartRight(chartSize.width))}
              x2={String(chartRight(chartSize.width))}
              y1={String(CHART_BOUNDS.top)}
              y2={String(chartBottom(chartSize.height))}
              stroke="#cbd5e1"
              strokeWidth="0.9"
              vectorEffect="non-scaling-stroke"
            />
            {mode === 'vrvp'
              ? vrvpProfile.bins.map((bin) => {
                  const highY = horizontalLineY(bin.high, min, max, chartSize.height);
                  const lowY = horizontalLineY(bin.low, min, max, chartSize.height);
                  const y = Math.min(highY, lowY);
                  const height = Math.max(1, Math.abs(lowY - highY) - 0.25);
                  const width = Math.max(1, (bin.volume / vrvpProfile.maxVolume) * profileWidth);

                  return (
                    <rect
                      key={`${bin.low}-${bin.high}`}
                      x={String(CHART_BOUNDS.left)}
                      y={String(y)}
                      width={String(width)}
                      height={String(height)}
                      fill="#9dbbff"
                      opacity="0.65"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })
              : null}
            {vrvpLevels.map((level) => {
              const y = horizontalLineY(level.value, min, max, chartSize.height);
              const labelX = clamp(CHART_BOUNDS.left + profileWidth + 10, CHART_BOUNDS.left + 8, chartRight(chartSize.width) - 92);

              return (
                <g key={level.label}>
                  <line
                    x1={String(CHART_BOUNDS.left)}
                    x2={String(chartRight(chartSize.width))}
                    y1={String(y)}
                    y2={String(y)}
                    stroke={level.color}
                    strokeWidth={level.label === 'POC' ? '1.25' : '1.45'}
                    vectorEffect="non-scaling-stroke"
                  />
                  <rect
                    x={String(labelX)}
                    y={String(y - 10)}
                    width="34"
                    height="20"
                    rx="4"
                    fill={level.color}
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={String(labelX + 17)}
                    y={String(y)}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="fill-white text-[10px] font-black"
                    vectorEffect="non-scaling-stroke"
                  >
                    {level.label}
                  </text>
                  <rect
                    x={String(chartRight(chartSize.width) + 4)}
                    y={String(y - 10)}
                    width="66"
                    height="20"
                    rx="4"
                    fill={level.color}
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={String(chartRight(chartSize.width) + 37)}
                    y={String(y)}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="fill-white text-[11px] font-black"
                    vectorEffect="non-scaling-stroke"
                  >
                    {formatPrice(level.value)}
                  </text>
                </g>
              );
            })}
            {isCandlestickMode && closeMarker ? (
              <>
                <line
                  x1={String(CHART_BOUNDS.left)}
                  x2={String(chartRight(chartSize.width))}
                  y1={String(closeMarker.y)}
                  y2={String(closeMarker.y)}
                  stroke={closeMarkerColor}
                  strokeDasharray="1.5 1.5"
                  strokeWidth="0.9"
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  x={String(chartRight(chartSize.width) + 4)}
                  y={String(closeMarker.y - 10)}
                  width="66"
                  height="20"
                  rx="4"
                  fill={closeMarkerColor}
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={String(chartRight(chartSize.width) + 37)}
                  y={String(closeMarker.y)}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-white text-[11px] font-black"
                  vectorEffect="non-scaling-stroke"
                >
                  {closeMarker.label}
                </text>
              </>
            ) : null}
            {isCandlestickMode && hoveredCandle ? (
              <>
                <line
                  x1={String(hoveredCandle.x)}
                  x2={String(hoveredCandle.x)}
                  y1={String(CHART_BOUNDS.top)}
                  y2={String(chartBottom(chartSize.height))}
                  stroke="#64748b"
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1={String(CHART_BOUNDS.left)}
                  x2={String(chartRight(chartSize.width))}
                  y1={String(horizontalLineY(hoveredCandle.candle.close, min, max, chartSize.height))}
                  y2={String(horizontalLineY(hoveredCandle.candle.close, min, max, chartSize.height))}
                  stroke="#64748b"
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            ) : null}
            {isCandlestickMode
              ? visiblePoints.map((point, index) => {
                  const candle = getCandlePoint(point);
                  if (!candle) return null;
                  const x = chartX(index, visiblePoints.length, chartSize.width);
                  const highY = horizontalLineY(candle.high, min, max, chartSize.height);
                  const lowY = horizontalLineY(candle.low, min, max, chartSize.height);
                  const openY = horizontalLineY(candle.open, min, max, chartSize.height);
                  const closeY = horizontalLineY(candle.close, min, max, chartSize.height);
                  const bodyTop = Math.min(openY, closeY);
                  const bodyHeight = Math.max(0.45, Math.abs(closeY - openY));
                  const rising = candle.close >= candle.open;
                  const color = rising ? '#089981' : '#f23645';

                  return (
                    <g key={`${point.date}-${index}`}>
                      <line
                        x1={String(x)}
                        x2={String(x)}
                        y1={String(highY)}
                        y2={String(lowY)}
                        stroke={color}
                        strokeWidth="0.7"
                        vectorEffect="non-scaling-stroke"
                      />
                      <rect
                        x={String(x - candleWidth / 2)}
                        y={String(bodyTop)}
                        width={String(candleWidth)}
                        height={String(bodyHeight)}
                        fill={color}
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  );
                })
              : null}
            {mode === 'staff' && staff
              ? staff.map((line) => {
                  const startY = horizontalLineY(line.startValue, min, max, chartSize.height);
                  const midY = horizontalLineY(line.midValue, min, max, chartSize.height);
                  const endY = horizontalLineY(line.endValue, min, max, chartSize.height);
                  const levelTagWidth = line.label === '零線' ? 34 : 38;
                  const valueTagWidth = 70;

                  return (
                    <g key={line.label}>
                      <line
                        x1={String(CHART_BOUNDS.left)}
                        x2={String(chartRight(chartSize.width))}
                        y1={String(startY)}
                        y2={String(endY)}
                        stroke={line.color}
                        strokeWidth={line.offset === 0 ? '1.45' : '1.25'}
                        opacity={line.offset === 0 ? '0.95' : '0.9'}
                        vectorEffect="non-scaling-stroke"
                      />
                      <rect
                        x={String(clamp(staffLabelX - levelTagWidth / 2, CHART_BOUNDS.left + 8, chartRight(chartSize.width) - levelTagWidth - 8))}
                        y={String(midY - 10)}
                        width={String(levelTagWidth)}
                        height="20"
                        rx="4"
                        fill={line.tagColor}
                        vectorEffect="non-scaling-stroke"
                      />
                      <text
                        x={String(clamp(staffLabelX, CHART_BOUNDS.left + 8 + levelTagWidth / 2, chartRight(chartSize.width) - 8 - levelTagWidth / 2))}
                        y={String(midY)}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="fill-white text-[10px] font-black"
                        vectorEffect="non-scaling-stroke"
                      >
                        {line.label}
                      </text>
                      <rect
                        x={String(chartRight(chartSize.width) + 4)}
                        y={String(endY - 10)}
                        width={String(valueTagWidth)}
                        height="20"
                        rx="4"
                        fill={line.tagColor}
                        vectorEffect="non-scaling-stroke"
                      />
                      <text
                        x={String(chartRight(chartSize.width) + 4 + valueTagWidth / 2)}
                        y={String(endY)}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="fill-white text-[11px] font-black"
                        vectorEffect="non-scaling-stroke"
                      >
                        {formatPrice(line.endValue)}
                      </text>
                    </g>
                  );
                })
              : null}
            {!isCandlestickMode ? (
              <path d={path} fill="none" stroke={stroke} strokeWidth="2.25" vectorEffect="non-scaling-stroke" />
            ) : null}
        </svg>
        {isCandlestickMode && hoveredCandle ? (
          <div
            className="pointer-events-none absolute z-10 w-44 rounded-xl border border-slate-200 bg-white/95 p-3 text-xs font-bold text-slate-600 shadow-xl shadow-slate-900/10 backdrop-blur"
            style={{
              left: clamp(hoveredCandle.x + 12, 8, chartSize.width - 184),
              top: clamp(hoveredCandle.y + 12, 8, chartSize.height - 132),
            }}
          >
            <p className="mb-2 font-black text-slate-900">{formatTooltipDate(hoveredCandle.point.date)}</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 tabular-nums">
              <span className="text-slate-400">開盤</span>
              <span className="text-right text-slate-700">{formatPrice(hoveredCandle.candle.open)}</span>
              <span className="text-slate-400">最高</span>
              <span className="text-right text-emerald-700">{formatPrice(hoveredCandle.candle.high)}</span>
              <span className="text-slate-400">最低</span>
              <span className="text-right text-rose-700">{formatPrice(hoveredCandle.candle.low)}</span>
              <span className="text-slate-400">收盤</span>
              <span className="text-right text-slate-900">{formatPrice(hoveredCandle.candle.close)}</span>
            </div>
          </div>
        ) : null}
      </div>
      {mode !== 'vrvp' ? (
        <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-slate-400">
          <span>滾輪縮放；手機雙指可縮放與平移</span>
          <button
            type="button"
            onClick={() => setRange({ start: 0, end: 1 })}
            className="rounded-lg px-2 py-1 text-orange-700 transition-colors hover:bg-orange-50"
          >
            重設縮放
          </button>
        </div>
      ) : null}
      {mode === 'staff' && staff ? (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {staff.map((line) => (
            <div key={line.label} className="rounded-xl bg-slate-50 px-2 py-2 text-center">
              <p className="text-[10px] font-black text-slate-400">{line.label}</p>
              <p className="mt-1 text-xs font-black tabular-nums text-slate-700">{formatPrice(line.endValue)}</p>
            </div>
          ))}
        </div>
      ) : null}
      {mode === 'vrvp' ? (
        <p className="mt-3 text-xs font-bold leading-relaxed text-slate-400">
          VRVP 依照目前可視時間區間，將成交量累加到對應價格帶，並標示 POC、VAH、VAL 觀察量能密集區。
        </p>
      ) : null}
    </div>
  );
}

function StockDetailModal({
  item,
  quote,
  onClose,
}: {
  item: StockItem;
  quote?: StockQuote;
  onClose: () => void;
}) {
  const [details, setDetails] = useState<StockDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('price');
  const [pricePeriod, setPricePeriod] = useState(PRICE_PERIODS[4]);
  const [staffPeriod, setStaffPeriod] = useState(STAFF_PERIODS[3]);
  const [vrvpPeriod, setVrvpPeriod] = useState(VRVP_PERIODS[2]);
  const activeQuote = details?.quote || quote;
  const positive = (activeQuote?.changePercent || 0) > 0;
  const negative = (activeQuote?.changePercent || 0) < 0;
  const accent = positive ? '#089981' : negative ? '#f23645' : '#6b7280';
  const chartTabs = [
    { value: 'price', label: '股價走勢', short: '走勢', icon: LineChart },
    { value: 'staff', label: '樂活五線譜', short: '五線譜', icon: Activity },
    { value: 'vrvp', label: 'VRVP', short: 'VRVP', icon: BarChart3 },
  ];
  const activePeriod = mode === 'staff' ? staffPeriod : mode === 'vrvp' ? vrvpPeriod : pricePeriod;
  const activePeriodOptions = mode === 'staff' ? STAFF_PERIODS : mode === 'vrvp' ? VRVP_PERIODS : PRICE_PERIODS;
  const chartPoints = useMemo(
    () => filterHistory(details?.history || [], activePeriod),
    [activePeriod, details?.history],
  );
  const setActivePeriod = (period: typeof PRICE_PERIODS[number] | typeof STAFF_PERIODS[number] | typeof VRVP_PERIODS[number]) => {
    if (mode === 'staff') {
      setStaffPeriod(period as typeof STAFF_PERIODS[number]);
      return;
    }

    if (mode === 'vrvp') {
      setVrvpPeriod(period as typeof VRVP_PERIODS[number]);
      return;
    }

    setPricePeriod(period as typeof PRICE_PERIODS[number]);
  };

  useEffect(() => {
    let cancelled = false;

    async function loadDetails() {
      setLoading(true);
      try {
        if (item.market === '外匯') {
          const values = quote?.sparkline || [];
          const history = values.map((value, index) => ({
            date: new Date(Date.now() - (values.length - index - 1) * 60 * 60_000).toISOString().slice(0, 10),
            open: value,
            high: value,
            low: value,
            close: value,
            volume: null,
          }));

          if (!cancelled) {
            setDetails({
              quote: quote || null,
              news: [],
              history,
            });
          }
          return;
        }

        const name = quote?.longName || quote?.name || item.symbol;
        const payload = await fetchJson<DetailsResponse>(
          `/api/stock/details?symbol=${encodeURIComponent(item.symbol)}&market=${encodeURIComponent(item.market)}&name=${encodeURIComponent(name)}`,
        );

        if (!cancelled) {
          setDetails(payload.success && payload.data ? payload.data : null);
        }
      } catch {
        if (!cancelled) setDetails(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDetails();
    return () => {
      cancelled = true;
    };
  }, [item.market, item.symbol, quote, quote?.longName, quote?.name]);

  useEffect(() => {
    const { body, documentElement } = document;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-xl p-2 text-slate-400 transition-colors hover:bg-orange-50 hover:text-orange-700"
          aria-label="關閉"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
          <header className="mb-5 pr-10">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
              <span className="rounded-lg bg-orange-50 px-2 py-1 text-orange-700 ring-1 ring-orange-100">{item.market}</span>
              <span>{displaySymbol(item.symbol)}</span>
              <span>·</span>
              <span className="truncate">{activeQuote?.longName || activeQuote?.name || displaySymbol(item.symbol)}</span>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-4xl font-black tabular-nums sm:text-5xl" style={{ color: accent }}>
                  {formatPrice(activeQuote?.price, activeQuote?.currency)}
                  {activeQuote?.currency ? <span className="ml-1 text-sm font-bold">{activeQuote.currency}</span> : null}
                </div>
                <div className="mt-2 text-sm font-bold tabular-nums" style={{ color: accent }}>
                  {formatChange(activeQuote?.change, activeQuote?.currency)} ({formatPercent(activeQuote?.changePercent)})
                </div>
              </div>
              {activeQuote?.fiftyTwoWeekLow && activeQuote?.fiftyTwoWeekHigh ? (
                <div className="min-w-56 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black text-slate-400">近 52 週</p>
                  <div className="mt-2 flex justify-between text-sm font-bold text-slate-500">
                    <span>{formatPrice(activeQuote.fiftyTwoWeekLow, activeQuote.currency)}</span>
                    <span>{formatPrice(activeQuote.fiftyTwoWeekHigh, activeQuote.currency)}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </header>

          <div className="mb-4 flex gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1">
            {chartTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setMode(tab.value)}
                  className={`inline-flex whitespace-nowrap rounded-xl px-3 py-2 text-xs font-black transition-colors ${
                    mode === tab.value ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon size={14} className="mr-1.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                </button>
              );
            })}
          </div>

          <div className="mb-4 flex gap-1 overflow-x-auto rounded-2xl bg-orange-50/80 p-1 ring-1 ring-orange-100">
            {activePeriodOptions.map((period) => (
              <button
                key={period.label}
                type="button"
                onClick={() => setActivePeriod(period)}
                className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-black transition-colors ${
                  activePeriod.label === period.label ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          <DetailChart mode={mode} points={chartPoints} periodLabel={activePeriod.label} />

          {loading ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm font-bold text-slate-400">
              詳細資料載入中...
            </div>
          ) : null}

          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-orange-50/60 px-4 py-3 text-sm font-black text-slate-700">
              <Newspaper size={16} className="text-orange-700" />
              最新相關新聞
            </div>
            <div className="divide-y divide-slate-100">
              {(details?.news || []).slice(0, 8).map((news) => (
                <a
                  key={news.url}
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-3 transition-colors hover:bg-orange-50/60"
                >
                  <div className="flex gap-3">
                    <p className="flex-1 text-sm font-bold leading-relaxed text-slate-800">{news.title}</p>
                    <ExternalLink size={14} className="mt-1 shrink-0 text-slate-300" />
                  </div>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {news.source || 'News'} · {formatDate(news.pubDate)}
                  </p>
                </a>
              ))}
              {!details?.news?.length && !loading ? (
                <div className="px-4 py-8 text-center text-sm font-bold text-slate-400">暫無新聞資料</div>
              ) : null}
            </div>
          </section>

          <section className="mt-5 grid gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-4 text-xs font-bold leading-relaxed text-slate-500 sm:grid-cols-3">
            <div>
              <p className="text-orange-700">股價走勢</p>
              <p className="mt-1">可切換 1M、3M、6M、YTD、1Y、3Y、5Y。</p>
            </div>
            <div>
              <p className="text-orange-700">五線譜</p>
              <p className="mt-1">依選定時間長度計算均線與正負標準差線。</p>
            </div>
            <div>
              <p className="text-orange-700">VRVP</p>
              <p className="mt-1">結合 K 線、量價分佈與 POC、VAH、VAL 線標。</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StockCard({
  item,
  quote,
  loading,
  alertCount,
  onRemove,
  onOpen,
  onOpenAlerts,
}: {
  item: StockItem;
  quote?: StockQuote;
  loading: boolean;
  alertCount: number;
  onRemove: (symbol: string, market: Market) => void;
  onOpen: (item: StockItem) => void;
  onOpenAlerts: (item: StockItem) => void;
}) {
  const positive = (quote?.changePercent || 0) > 0;
  const negative = (quote?.changePercent || 0) < 0;
  const accent = positive ? '#089981' : negative ? '#f23645' : '#6b7280';
  const accentBg = positive ? 'rgba(8,153,129,0.1)' : negative ? 'rgba(242,54,69,0.1)' : 'rgba(107,114,128,0.1)';
  const range = quote ? rangePercent(quote) : null;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(item);
        }
      }}
      className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white px-3 pb-3 pt-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-700/10 focus:outline focus:outline-2 focus:outline-orange-500/40 sm:px-4 sm:pb-4"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemove(item.symbol, item.market);
        }}
        className="absolute right-2 top-2 z-10 rounded-lg p-1 text-slate-300 transition-colors hover:bg-orange-50 hover:text-orange-700"
        aria-label="移除"
      >
        <X size={14} />
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpenAlerts(item);
        }}
        className={`absolute right-8 top-2 z-10 inline-flex h-6 items-center gap-1 rounded-lg px-1.5 text-[10px] font-black transition-colors ${
          alertCount ? 'bg-orange-50 text-orange-700 ring-1 ring-orange-100' : 'text-slate-300 hover:bg-orange-50 hover:text-orange-700'
        }`}
        aria-label="設定通知"
      >
        <Bell size={12} />
        {alertCount || ''}
      </button>

      <div className="mb-1 flex items-center gap-2 pr-6">
        <span className="flex h-5 min-w-7 shrink-0 items-center justify-center rounded-md bg-orange-50 px-1.5 text-[10px] font-black text-orange-700 ring-1 ring-orange-100">
          {item.market === '美股' ? 'US' : item.market === '台股' ? 'TW' : 'FX'}
        </span>
        <span className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
          {displaySymbol(item.symbol)}
        </span>
      </div>

      {quote?.longName ? (
        <div className="mb-2 truncate text-[11px] font-medium text-slate-500 sm:text-xs">{quote.longName}</div>
      ) : loading ? (
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-orange-50" />
      ) : (
        <div className="mb-2 text-[11px] text-slate-400">無法取得資料</div>
      )}

      {loading && !quote ? (
        <div className="space-y-2">
          <div className="h-7 w-24 animate-pulse rounded bg-orange-50" />
          <div className="h-6 w-20 animate-pulse rounded bg-orange-50" />
        </div>
      ) : quote ? (
        <>
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="whitespace-nowrap text-lg font-semibold tabular-nums sm:text-2xl" style={{ color: accent }}>
                {formatPrice(quote.price, quote.currency)}
                {quote.currency ? (
                  <span className="ml-1 text-[10px] font-normal sm:text-xs">{quote.currency}</span>
                ) : null}
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="mt-0.5 inline-flex h-6 items-center gap-0.5 rounded px-[0.37rem] py-[0.2rem] text-[10px] font-medium tabular-nums sm:mt-1 sm:px-1.5 sm:py-1 sm:text-xs"
                  style={{ color: accent, backgroundColor: accentBg }}
                >
                  {positive ? <TrendingUp size={10} /> : negative ? <TrendingDown size={10} /> : <Minus size={10} />}
                  {formatPercent(quote.changePercent)}
                </span>
                <span className="hidden text-xs sm:inline" style={{ color: accent }}>
                  {formatChange(quote.change, quote.currency)}
                </span>
              </div>
            </div>
            <div className="h-6 w-12 shrink-0 sm:h-10 sm:w-20">
              <Sparkline quote={quote} positive={positive} negative={negative} />
            </div>
          </div>

          {range !== null ? (
            <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3">
              <span className="shrink-0 rounded-md bg-slate-100 px-[5px] py-[1px] text-[9px] font-bold text-slate-400">
                52W
              </span>
              <span className="shrink-0 text-[9px] tabular-nums text-slate-400 sm:text-[10px]">
                {formatPrice(quote.fiftyTwoWeekLow, quote.currency)}
              </span>
              <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${range}%`, backgroundColor: accent }} />
              </div>
              <span className="shrink-0 text-[9px] tabular-nums text-slate-400 sm:text-[10px]">
                {formatPrice(quote.fiftyTwoWeekHigh, quote.currency)}
              </span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpenAlerts(item);
            }}
            className="mt-3 text-[11px] font-bold text-slate-400 transition hover:text-orange-700"
          >
            通知：{alertCount ? `${alertCount} 筆` : '未設定'}
          </button>
        </>
      ) : null}
    </article>
  );
}

function AlertManagerModal({
  item,
  quote,
  alerts,
  onClose,
  onCreate,
  onToggle,
  onRemove,
}: {
  item: StockItem;
  quote?: StockQuote;
  alerts: LocalPriceAlert[];
  onClose: () => void;
  onCreate: (input: Pick<LocalPriceAlert, 'conditionType' | 'targetValue' | 'triggerMode' | 'cooldownMinutes'>) => void;
  onToggle: (alertId: string) => void;
  onRemove: (alertId: string) => void;
}) {
  const [conditionType, setConditionType] = useState<LocalPriceAlert['conditionType']>('price_above');
  const [targetValue, setTargetValue] = useState(() => quote?.price?.toString() || '');
  const [triggerMode, setTriggerMode] = useState<LocalPriceAlert['triggerMode']>('once');
  const [cooldownMinutes, setCooldownMinutes] = useState('60');
  const [error, setError] = useState<string | null>(null);

  const submitAlert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedTarget = Number(targetValue);
    const parsedCooldown = Number(cooldownMinutes);

    if (!Number.isFinite(parsedTarget)) {
      setError('請輸入有效目標價格');
      return;
    }

    if (!Number.isFinite(parsedCooldown) || parsedCooldown < 0) {
      setError('Cooldown 不可小於 0');
      return;
    }

    onCreate({
      conditionType,
      targetValue: parsedTarget,
      triggerMode,
      cooldownMinutes: parsedCooldown,
    });
    setTargetValue('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-3xl bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-700">Price Alerts</p>
            <h2 className="mt-1 text-xl font-black text-slate-900">{displaySymbol(item.symbol)}</h2>
            <p className="mt-1 text-xs font-bold text-slate-400">
              {item.market} · 目前 {formatPrice(quote?.price, quote?.currency)} {quote?.currency || ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-orange-50 hover:text-orange-700"
            aria-label="關閉"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submitAlert} className="grid gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-4 sm:grid-cols-[1fr_1fr_auto]">
          <select
            value={conditionType}
            onChange={(event) => setConditionType(event.target.value as LocalPriceAlert['conditionType'])}
            className="h-11 rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
          >
            <option value="price_above">價格高於</option>
            <option value="price_below">價格低於</option>
          </select>
          <input
            value={targetValue}
            onChange={(event) => setTargetValue(event.target.value)}
            inputMode="decimal"
            className="h-11 rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold tabular-nums text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
            placeholder="目標價格"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--theme-primary)] px-4 text-sm font-black text-white shadow-lg shadow-orange-700/20"
          >
            新增
          </button>
          <select
            value={triggerMode}
            onChange={(event) => setTriggerMode(event.target.value as LocalPriceAlert['triggerMode'])}
            className="h-11 rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
          >
            <option value="once">once</option>
            <option value="repeat">repeat</option>
          </select>
          <input
            value={cooldownMinutes}
            onChange={(event) => setCooldownMinutes(event.target.value)}
            inputMode="numeric"
            className="h-11 rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold tabular-nums text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
            placeholder="Cooldown 分鐘"
          />
          {error ? <p className="text-xs font-bold text-rose-700 sm:col-span-3">{error}</p> : null}
        </form>

        <div className="mt-5 space-y-2">
          {alerts.map((alert) => (
            <div key={alert.alertId} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3">
              <div>
                <p className="text-sm font-black text-slate-900">{formatAlertText(alert)}</p>
                <p className="mt-1 text-xs font-bold text-slate-400">
                  {alert.triggerMode} · cooldown {alert.cooldownMinutes} 分鐘 · {alert.isEnabled ? '啟用' : '停用'}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(alert.alertId)}
                  className="h-9 rounded-lg bg-slate-100 px-3 text-xs font-black text-slate-700 transition hover:bg-slate-200"
                >
                  {alert.isEnabled ? '停用' : '啟用'}
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(alert.alertId)}
                  className="h-9 rounded-lg bg-rose-50 px-3 text-xs font-black text-rose-700 transition hover:bg-rose-100"
                >
                  移除
                </button>
              </div>
            </div>
          ))}
          {!alerts.length ? (
            <div className="rounded-2xl border border-dashed border-slate-200 py-8 text-center text-sm font-bold text-slate-400">
              尚未設定通知
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function StockWatchlistClient() {
  const [mounted, setMounted] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [watchlistDefs, setWatchlistDefs] = useState<WatchlistDef[]>(DEFAULT_LISTS);
  const [watchlists, setWatchlists] = useState<Watchlists>(() => createEmptyWatchlists());
  const [activeListId, setActiveListId] = useState(DEFAULT_LISTS[0].id);
  const [activeMarket, setActiveMarket] = useState<(typeof MARKET_TABS)[number]['value']>('全部');
  const [quotes, setQuotes] = useState<Record<string, StockQuote>>({});
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [alerts, setAlerts] = useState<LocalPriceAlert[]>([]);
  const [alertItem, setAlertItem] = useState<StockItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const missingSymbolCache = useRef(new Map<string, number>());
  const previousQuotesRef = useRef<Record<string, StockQuote>>({});

  useEffect(() => {
    setMounted(true);

    try {
      const storedListDefs = localStorage.getItem(LIST_DEFS_KEY);
      const storedWatchlists = localStorage.getItem(STORAGE_KEY);
      const storedAlerts = localStorage.getItem(ALERTS_KEY);
      const storedList = localStorage.getItem(ACTIVE_LIST_KEY);
      const storedMarket = localStorage.getItem(ACTIVE_MARKET_KEY);
      const nextListDefs = storedListDefs ? normalizeWatchlistDefs(JSON.parse(storedListDefs)) : DEFAULT_LISTS;

      setWatchlistDefs(nextListDefs);

      if (storedWatchlists) {
        setWatchlists(mergeStoredWatchlists(createEmptyWatchlists(nextListDefs), JSON.parse(storedWatchlists)));
      }

      if (storedList && nextListDefs.some((list) => list.id === storedList)) {
        setActiveListId(storedList);
      }

      if (storedMarket && MARKET_TABS.some((tab) => tab.value === storedMarket)) {
        setActiveMarket(storedMarket as typeof activeMarket);
      }

      if (storedAlerts) {
        setAlerts(JSON.parse(storedAlerts));
      }
    } catch {
      setWatchlists(createEmptyWatchlists());
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlists)), 250);
    return () => window.clearTimeout(id);
  }, [mounted, watchlists]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(LIST_DEFS_KEY, JSON.stringify(watchlistDefs));
  }, [mounted, watchlistDefs]);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts)), 250);
    return () => window.clearTimeout(id);
  }, [alerts, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(ACTIVE_LIST_KEY, activeListId);
  }, [mounted, activeListId]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(ACTIVE_MARKET_KEY, activeMarket);
  }, [mounted, activeMarket]);

  const activeItems = watchlists[activeListId] || [];
  const filteredItems = useMemo(() => {
    if (activeMarket === '全部') return activeItems;
    return activeItems.filter((item) => item.market === activeMarket);
  }, [activeItems, activeMarket]);

  const alertsByKey = useMemo(() => {
    return alerts.reduce<Record<string, LocalPriceAlert[]>>((groups, alert) => {
      const key = alertKey(alert.symbol, alert.market);
      groups[key] = [...(groups[key] || []), alert];
      return groups;
    }, {});
  }, [alerts]);

  const stocksParam = useMemo(() => {
    const stockItems = activeItems.filter((item) => isStockMarket(item.market));
    if (!stockItems.length) return '';
    return stockItems.map((item) => apiStockToken(item.symbol, item.market)).join(',');
  }, [activeItems]);

  const refreshQuotes = useCallback(async () => {
    if (!activeItems.length) {
      setQuotes({});
      return;
    }

    setQuotesLoading(true);

    try {
      const fxQuotes = activeItems.reduce<Record<string, StockQuote>>((acc, item) => {
        if (item.market !== '外匯') return acc;
        const quote = fxQuoteToStockQuote(item.symbol);
        if (quote) acc[stockKey(item.symbol, item.market)] = quote;
        return acc;
      }, {});
      const stockQuotes = stocksParam
        ? (await fetchJson<BatchQuoteResponse>(
            `/api/stock/quotes-batch?stocks=${encodeURIComponent(stocksParam)}`,
          )).data || {}
        : {};
      const nextQuotes = { ...stockQuotes, ...fxQuotes };
      const previousQuotes = previousQuotesRef.current;
      const now = new Date();
      const triggeredAlertIds = new Set<string>();
      let triggeredCount = 0;

      for (const alert of alerts) {
        if (!alert.isEnabled) continue;
        const key = stockKey(alert.symbol, alert.market);
        const previousPrice = previousQuotes[key]?.price;
        const currentPrice = nextQuotes[key]?.price;

        if (!isFiniteNumber(previousPrice) || !isFiniteNumber(currentPrice)) continue;

        if (alert.lastTriggeredAt) {
          const lastTriggeredTime = Date.parse(alert.lastTriggeredAt);
          if (!Number.isNaN(lastTriggeredTime) && now.getTime() - lastTriggeredTime < alert.cooldownMinutes * 60_000) {
            continue;
          }
        }

        const crossed = alert.conditionType === 'price_above'
          ? previousPrice <= alert.targetValue && currentPrice > alert.targetValue
          : previousPrice >= alert.targetValue && currentPrice < alert.targetValue;

        if (!crossed) continue;

        triggeredCount += 1;
        triggeredAlertIds.add(alert.alertId);
      }

      if (triggeredAlertIds.size) {
        const nowIso = now.toISOString();
        setAlerts((current) =>
          current.map((alert) => {
            if (!triggeredAlertIds.has(alert.alertId)) return alert;

            return {
              ...alert,
              isEnabled: alert.triggerMode === 'once' ? false : alert.isEnabled,
              lastTriggeredAt: nowIso,
              updatedAt: nowIso,
            };
          }),
        );
        setMessage({ text: `已觸發 ${triggeredCount} 筆到價通知`, type: 'success' });
      }

      previousQuotesRef.current = nextQuotes;
      setQuotes(nextQuotes);
    } catch {
      setMessage({ text: '報價更新失敗，請稍後再試', type: 'error' });
    } finally {
      setQuotesLoading(false);
    }
  }, [activeItems, alerts, stocksParam]);

  useEffect(() => {
    refreshQuotes();
  }, [refreshQuotes]);

  useEffect(() => {
    if (!stocksParam) return;

    const markets = Array.from(new Set(activeItems.map((item) => item.market)));
    const shouldRefresh = markets.some((market) => isMarketOpen(market));

    if (!shouldRefresh) return;

    const id = window.setInterval(refreshQuotes, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [activeItems, refreshQuotes, stocksParam]);

  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(() => setMessage(null), 2400);
    return () => window.clearTimeout(id);
  }, [message]);

  const addStock = useCallback(async () => {
    const normalized = normalizeSymbol(symbol);

    if (!normalized) return;

    const cachedUntil = missingSymbolCache.current.get(normalized) || 0;

    if (cachedUntil > Date.now()) {
      setMessage({ text: '查無此代號，請重試', type: 'error' });
      return;
    }

    const markets = detectMarkets(normalized);
    const existingKeys = new Set((watchlists[activeListId] || []).map((item) => stockKey(item.symbol, item.market)));

    setLoading(true);

    try {
      const resolved = (
        await Promise.all(
          markets.map(async (market) => {
            try {
              if (market === '外匯') {
                const quote = fxQuoteToStockQuote(normalized.replace('-', '/'));
                return quote?.price ? { market, quote } : null;
              }

              const payload = await fetchJson<QuoteResponse>(
                `/api/stock/quote?symbol=${encodeURIComponent(normalized)}&market=${encodeURIComponent(market)}`,
              );

              return payload.success && payload.data?.price ? { market, quote: payload.data } : null;
            } catch {
              return null;
            }
          }),
        )
      ).filter(Boolean) as { market: Market; quote: StockQuote }[];

      if (!resolved.length) {
        missingSymbolCache.current.set(normalized, Date.now() + 60_000);
        setMessage({ text: '查無此代號，請重試', type: 'error' });
        return;
      }

      const target = resolved.find((item) => !existingKeys.has(stockKey(normalized, item.market)));

      if (!target) {
        setMessage({ text: `${displaySymbol(normalized)} 已存在於「${activeListId}」`, type: 'error' });
        setSymbol('');
        return;
      }

      setWatchlists((current) => ({
        ...current,
        [activeListId]: [...(current[activeListId] || []), { symbol: target.market === '外匯' ? normalized.replace('-', '/') : normalized, market: target.market }],
      }));
      setQuotes((current) => ({
        ...current,
        [stockKey(target.market === '外匯' ? normalized.replace('-', '/') : normalized, target.market)]: target.quote,
      }));
      setSymbol('');
      setIsAddPanelOpen(false);
      setMessage({ text: '新增成功', type: 'success' });
    } catch {
      setMessage({ text: '查詢失敗，請稍後再試', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [activeListId, symbol, watchlists]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addStock();
  };

  const removeStock = useCallback(
    (targetSymbol: string, targetMarket: Market) => {
      setWatchlists((current) => ({
        ...current,
        [activeListId]: (current[activeListId] || []).filter(
          (item) => item.symbol !== targetSymbol || item.market !== targetMarket,
        ),
      }));
      setAlerts((current) => current.filter((alert) => alert.symbol !== targetSymbol || alert.market !== targetMarket));
    },
    [activeListId],
  );

  const createAlert = useCallback((item: StockItem, input: Pick<LocalPriceAlert, 'conditionType' | 'targetValue' | 'triggerMode' | 'cooldownMinutes'>) => {
    const now = new Date().toISOString();
    setAlerts((current) => [
      ...current,
      {
        alertId: createAlertId(item.symbol, item.market),
        symbol: item.symbol,
        market: item.market,
        conditionType: input.conditionType,
        targetValue: input.targetValue,
        isEnabled: true,
        triggerMode: input.triggerMode,
        cooldownMinutes: input.cooldownMinutes,
        lastTriggeredAt: null,
        createdAt: now,
        updatedAt: now,
      },
    ]);
    setMessage({ text: '到價通知已建立', type: 'success' });
  }, []);

  const toggleAlert = useCallback((alertId: string) => {
    const now = new Date().toISOString();
    setAlerts((current) =>
      current.map((alert) =>
        alert.alertId === alertId
          ? {
              ...alert,
              isEnabled: !alert.isEnabled,
              updatedAt: now,
            }
          : alert,
      ),
    );
  }, []);

  const removeAlert = useCallback((alertId: string) => {
    setAlerts((current) => current.filter((alert) => alert.alertId !== alertId));
  }, []);

  const createWatchlist = useCallback(() => {
    const nextIndex = watchlistDefs.filter((list) => list.name.startsWith('觀察清單')).length + 1;
    const rawName = window.prompt('請輸入新的觀察清單名稱', `觀察清單 ${nextIndex}`);
    const name = rawName?.trim();

    if (!name) return;

    if (watchlistDefs.some((list) => list.name === name || list.id === name)) {
      setMessage({ text: `${name} 已存在`, type: 'error' });
      return;
    }

    const nextList = { id: name, name };
    setWatchlistDefs((current) => [...current, nextList]);
    setWatchlists((current) => ({ ...current, [nextList.id]: [] }));
    setActiveListId(nextList.id);
    setMessage({ text: `已新增「${name}」`, type: 'success' });
  }, [watchlistDefs]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_48%,#fafafa_100%)] px-6 pb-16 pt-12 text-slate-900">
      <main className="mx-auto w-full max-w-6xl">
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-5 inline-flex h-6 items-center rounded-full bg-orange-50 px-3 text-[10px] font-bold uppercase tracking-widest text-orange-700 ring-1 ring-orange-100">
              Market Watch
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              市場<span className="text-gradient">觀察清單</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
              建立自己的台股、美股與匯率觀察清單，保留股價走勢、五線譜、VRVP 與新聞等完整分析內容。
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={refreshQuotes}
              disabled={quotesLoading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-orange-100 bg-white px-4 text-sm font-black text-orange-700 shadow-sm transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={17} className={quotesLoading ? 'animate-spin' : ''} />
              重新整理
            </button>
            <button
              type="button"
              onClick={() => setIsAddPanelOpen((open) => !open)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--theme-primary)] px-4 text-sm font-black text-white shadow-lg shadow-orange-700/20 transition hover:bg-[var(--theme-primary-hover)]"
            >
              <Plus size={17} />
              新增標的
            </button>
          </div>
        </header>

        {isAddPanelOpen ? (
        <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-orange-700/5 backdrop-blur-md tabular-nums sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="stockSymbol" className="block text-sm font-bold leading-6 text-slate-700">
                標的代號
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  id="stockSymbol"
                  value={symbol}
                  onChange={(event) => setSymbol(event.target.value.toUpperCase())}
                  className="block h-[3.25rem] w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left font-medium text-slate-700 placeholder:text-slate-400 focus:border-orange-200 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-orange-500/40 focus:ring-4 focus:ring-orange-100"
                  placeholder="輸入美股或台股代號，例如 AAPL 或 2330"
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="targetWatchlist" className="mb-2 block text-sm font-bold leading-6 text-slate-700">
                新增至
              </label>
              <div className="relative">
                <select
                  id="targetWatchlist"
                  value={activeListId}
                  onChange={(event) => setActiveListId(event.target.value)}
                  className="h-[3.25rem] w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left font-medium text-slate-700 focus:border-orange-200 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-orange-500/40 focus:ring-4 focus:ring-orange-100"
                >
                  {watchlistDefs.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              disabled={loading}
              className="flex h-[3.25rem] w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--theme-primary)] px-3.5 py-2.5 text-center text-md font-bold text-white shadow-xl shadow-orange-700/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--theme-primary-hover)] hover:shadow-orange-700/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? '新增中...' : '新增'}
            </button>
          </div>
        </form>
        ) : null}

        {message ? (
          <div
            className={`mt-4 rounded-xl px-3.5 py-2.5 text-sm font-bold ring-1 ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            } ${message.type === 'success' ? 'ring-emerald-100' : 'ring-rose-100'}`}
          >
            {message.text}
          </div>
        ) : null}

        <section className="mt-5 rounded-2xl border border-orange-100 bg-white/85 p-4 shadow-sm shadow-orange-700/5 sm:flex sm:items-center sm:justify-between sm:gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-700">Tribute</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-slate-700">
              這個自選股看盤頁面以 Jack Su 的工具為基礎重新製作，在此向他的優秀作品致敬。如果你喜歡這類實用工具，也推薦前往他的網站，體驗更多功能。
            </p>
          </div>
          <a
            href="https://www.jacksu.tw/tool"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 px-3 text-sm font-black text-orange-700 ring-1 ring-orange-100 transition-colors hover:bg-orange-100 sm:mt-0"
          >
            前往 Jack Su 工具頁
            <ExternalLink size={15} className="ml-1.5" />
          </a>
        </section>

        {activeItems.length ? (
          <div className="mt-7 mb-4 flex gap-1 overflow-x-auto rounded-xl bg-orange-50/80 p-1 tabular-nums ring-1 ring-orange-100">
            {watchlistDefs.map((list) => (
              <button
                key={list.id}
                type="button"
                onClick={() => setActiveListId(list.id)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                  activeListId === list.id ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {list.name}
              </button>
            ))}
            <button
              type="button"
              onClick={createWatchlist}
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-bold text-orange-700 transition-colors hover:bg-white hover:text-orange-800"
            >
              <Plus size={13} />
              新增清單
            </button>
          </div>
        ) : null}

        {activeItems.length ? (
          <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 tabular-nums">
            {MARKET_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveMarket(tab.value)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                  activeMarket === tab.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : null}

        {mounted && activeItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-orange-200 bg-white/70 py-16 text-center text-sm font-bold text-slate-400 shadow-sm sm:py-20">
            尚未新增任何標的，先試試 AAPL、2330 或 USD/TWD
          </div>
        ) : null}

        {mounted && activeItems.length > 0 && filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 py-16 text-center text-sm font-bold text-slate-400 shadow-sm sm:py-20">
            此分類沒有標的
          </div>
        ) : null}

        {filteredItems.length ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <StockCard
                  key={stockKey(item.symbol, item.market)}
                  item={item}
                  quote={quotes[stockKey(item.symbol, item.market)]}
                  loading={quotesLoading}
                  alertCount={(alertsByKey[alertKey(item.symbol, item.market)] || []).length}
                  onRemove={removeStock}
                  onOpen={setSelectedStock}
                  onOpenAlerts={setAlertItem}
                />
              ))}
            </div>

            <div className="mt-5 inline-flex items-center rounded-full bg-white/80 px-3 py-2 text-xs font-bold text-slate-500 shadow-sm ring-1 ring-slate-100">
              <Info size={14} className="text-orange-600" />
              <span className="ml-1.5 font-medium">每張卡片右側的小線圖顯示該標的近期價格變化</span>
            </div>
          </>
        ) : null}
      </main>

      {selectedStock ? (
        <StockDetailModal
          item={selectedStock}
          quote={quotes[stockKey(selectedStock.symbol, selectedStock.market)]}
          onClose={() => setSelectedStock(null)}
        />
      ) : null}

      {alertItem ? (
        <AlertManagerModal
          item={alertItem}
          quote={quotes[stockKey(alertItem.symbol, alertItem.market)]}
          alerts={alertsByKey[alertKey(alertItem.symbol, alertItem.market)] || []}
          onClose={() => setAlertItem(null)}
          onCreate={(input) => createAlert(alertItem, input)}
          onToggle={toggleAlert}
          onRemove={removeAlert}
        />
      ) : null}
    </div>
  );
}
