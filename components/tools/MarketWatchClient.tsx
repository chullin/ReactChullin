'use client';

import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Bell,
  ChevronDown,
  Clock3,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react';
import type {
  AlertConditionType,
  AlertTriggerMode,
  MarketAssetType,
  MarketQuote,
  MarketSearchResult,
  MarketWatchItem,
  NotificationEvent,
  PriceAlert,
} from '@/lib/market/types';
import { defaultFxSearchResults } from '@/lib/market/providers/fxProvider';
import { didCrossAlertTarget, isAlertCoolingDown } from '@/lib/market/alerts';
import { InAppNotificationProvider, createNotificationEvent } from '@/lib/market/notifications';

type QuotesResponse = {
  success?: boolean;
  data?: Record<string, MarketQuote>;
  error?: string;
};

type SearchResponse = {
  success?: boolean;
  data?: MarketSearchResult[];
  error?: string;
};

const STORAGE_KEY = 'market-watchlist:v1';
const FILTER_KEY = 'market-watchlist-filter:v1';
const ALERTS_KEY = 'market-watchlist-alerts:v1';
const NOTIFICATION_EVENTS_KEY = 'market-watchlist-notification-events:v1';
const LOCAL_USER_ID = 'local-market-watch-user';

const ASSET_FILTERS: { value: MarketAssetType | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'tw_stock', label: '台股' },
  { value: 'us_stock', label: '美股' },
  { value: 'fx', label: '外匯' },
];

const ASSET_TYPE_LABELS: Record<MarketAssetType, string> = {
  tw_stock: '台股',
  us_stock: '美股',
  fx: '外匯',
};

const ALERT_CONDITION_LABELS: Record<AlertConditionType, string> = {
  price_above: '價格高於',
  price_below: '價格低於',
  change_percent_above: '漲跌幅高於',
  change_percent_below: '漲跌幅低於',
};

function createDefaultItems(): MarketWatchItem[] {
  const now = new Date().toISOString();

  return defaultFxSearchResults().map((asset, index) => ({
    ...asset,
    sortOrder: index,
    addedAt: now,
  }));
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function formatPrice(value: number | null | undefined, currency?: string) {
  if (!isFiniteNumber(value)) return '-';

  return value.toLocaleString(currency === 'TWD' ? 'zh-TW' : 'en-US', {
    minimumFractionDigits: currency === 'TWD' ? 2 : 2,
    maximumFractionDigits: currency === 'TWD' ? 2 : 2,
  });
}

function formatChange(value: number | null | undefined) {
  if (!isFiniteNumber(value)) return '-';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}`;
}

function formatPercent(value: number | null | undefined) {
  if (!isFiniteNumber(value)) return '-';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatUpdatedAt(value: string | null) {
  if (!value) return '尚未更新';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function trendLabel(changePercent: number | null | undefined) {
  if (!isFiniteNumber(changePercent) || changePercent === 0) return '持平';
  return changePercent > 0 ? '上漲' : '下跌';
}

function formatAlertCondition(alert: Pick<PriceAlert, 'conditionType' | 'targetValue'>) {
  const suffix = alert.conditionType.includes('percent') ? '%' : '';
  return `${ALERT_CONDITION_LABELS[alert.conditionType]} ${alert.targetValue}${suffix}`;
}

function createAlertId(assetId: string) {
  return `${assetId}:alert:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
}

function sortAlerts(alerts: PriceAlert[]) {
  return [...alerts].sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt));
}

function quoteTone(quote?: MarketQuote) {
  const changePercent = quote?.changePercent;
  const positive = isFiniteNumber(changePercent) && changePercent > 0;
  const negative = isFiniteNumber(changePercent) && changePercent < 0;

  return {
    positive,
    negative,
    accent: positive ? '#089981' : negative ? '#f23645' : '#64748b',
    soft: positive ? 'bg-emerald-50 text-emerald-700' : negative ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600',
  };
}

function Sparkline({ quote }: { quote?: MarketQuote }) {
  const values = (quote?.chartData || []).map((point) => point.price).filter(isFiniteNumber);
  const tone = quoteTone(quote);

  if (values.length < 2) {
    return <div className="h-full w-full rounded-lg bg-slate-100" />;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const path = values
    .map((value, index) => {
      const x = 2 + (index / (values.length - 1)) * 96;
      const y = 8 + (1 - (value - min) / range) * 84;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
      <path d={path} fill="none" stroke={tone.accent} strokeWidth="2.25" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function AddAssetDialog({
  open,
  query,
  assetType,
  results,
  loading,
  error,
  onClose,
  onQueryChange,
  onAssetTypeChange,
  onSubmit,
  onAdd,
}: {
  open: boolean;
  query: string;
  assetType: MarketAssetType | 'all';
  results: MarketSearchResult[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onQueryChange: (query: string) => void;
  onAssetTypeChange: (assetType: MarketAssetType | 'all') => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onAdd: (result: MarketSearchResult) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-700">Add Asset</p>
            <h2 className="text-xl font-black text-slate-900">搜尋與新增標的</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-orange-50 hover:text-orange-700"
            aria-label="關閉"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-3 p-5 sm:grid-cols-[1fr_160px_auto]">
          <label className="relative block">
            <span className="sr-only">搜尋代號或名稱</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-200 focus:ring-4 focus:ring-orange-100"
              placeholder="AAPL、2330、USD/TWD"
            />
          </label>

          <label className="relative block">
            <span className="sr-only">資產類型</span>
            <select
              value={assetType}
              onChange={(event) => onAssetTypeChange(event.target.value as MarketAssetType | 'all')}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition focus:border-orange-200 focus:ring-4 focus:ring-orange-100"
            >
              {ASSET_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-lg shadow-orange-700/20 transition hover:bg-[var(--theme-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? '搜尋中' : '搜尋'}
          </button>
        </form>

        {error ? (
          <div className="mx-5 mb-4 rounded-xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 ring-1 ring-rose-100">
            {error}
          </div>
        ) : null}

        <div className="max-h-[48vh] overflow-y-auto px-5 pb-5">
          {results.length ? (
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
              {results.map((result) => (
                <button
                  key={result.assetId}
                  type="button"
                  onClick={() => onAdd(result)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-orange-50/70"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-slate-900">{result.displayName}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">
                      {result.symbol} · {ASSET_TYPE_LABELS[result.assetType]} · {result.exchange}
                    </p>
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                    <Plus size={17} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 py-10 text-center text-sm font-bold text-slate-400">
              輸入代號後搜尋，或切到外匯查看預設匯率標的
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AlertDialog({
  item,
  quote,
  alerts,
  events,
  onClose,
  onCreate,
  onToggle,
  onRemove,
}: {
  item: MarketWatchItem;
  quote?: MarketQuote;
  alerts: PriceAlert[];
  events: NotificationEvent[];
  onClose: () => void;
  onCreate: (input: {
    conditionType: AlertConditionType;
    targetValue: number;
    triggerMode: AlertTriggerMode;
    cooldownMinutes: number;
  }) => void;
  onToggle: (alertId: string) => void;
  onRemove: (alertId: string) => void;
}) {
  const [conditionType, setConditionType] = useState<AlertConditionType>('price_above');
  const [targetValue, setTargetValue] = useState(() => quote?.currentPrice?.toString() || '');
  const [triggerMode, setTriggerMode] = useState<AlertTriggerMode>('once');
  const [cooldownMinutes, setCooldownMinutes] = useState('60');
  const [formError, setFormError] = useState<string | null>(null);
  const assetEvents = events.filter((event) => alerts.some((alert) => alert.alertId === event.alertId)).slice(0, 6);

  const submitAlert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedTarget = Number(targetValue);
    const parsedCooldown = Number(cooldownMinutes);

    if (!Number.isFinite(parsedTarget)) {
      setFormError('請輸入有效的目標價格。');
      return;
    }

    if (!Number.isFinite(parsedCooldown) || parsedCooldown < 0) {
      setFormError('Cooldown 分鐘數不可小於 0。');
      return;
    }

    onCreate({
      conditionType,
      targetValue: parsedTarget,
      triggerMode,
      cooldownMinutes: parsedCooldown,
    });
    setTargetValue('');
    setFormError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-700">Price Alerts</p>
            <h2 className="mt-1 text-xl font-black text-slate-900">{item.displayName}</h2>
            <p className="mt-1 text-xs font-bold text-slate-400">
              {item.symbol} · 目前 {formatPrice(quote?.currentPrice, quote?.currency)} {quote?.currency || item.currency}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-orange-50 hover:text-orange-700"
            aria-label="關閉"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-76px)] gap-5 overflow-y-auto p-5 lg:grid-cols-[1fr_1.05fr]">
          <section className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <h3 className="text-sm font-black text-slate-900">新增通知</h3>
            <form onSubmit={submitAlert} className="mt-4 space-y-3">
              <label className="block">
                <span className="text-xs font-black text-slate-500">條件</span>
                <select
                  value={conditionType}
                  onChange={(event) => setConditionType(event.target.value as AlertConditionType)}
                  className="mt-1 h-11 w-full rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
                >
                  <option value="price_above">價格高於</option>
                  <option value="price_below">價格低於</option>
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-black text-slate-500">目標價格</span>
                <input
                  value={targetValue}
                  onChange={(event) => setTargetValue(event.target.value)}
                  inputMode="decimal"
                  className="mt-1 h-11 w-full rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold tabular-nums text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
                  placeholder="例如 650"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-black text-slate-500">模式</span>
                  <select
                    value={triggerMode}
                    onChange={(event) => setTriggerMode(event.target.value as AlertTriggerMode)}
                    className="mt-1 h-11 w-full rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="once">once</option>
                    <option value="repeat">repeat</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-500">Cooldown</span>
                  <input
                    value={cooldownMinutes}
                    onChange={(event) => setCooldownMinutes(event.target.value)}
                    inputMode="numeric"
                    className="mt-1 h-11 w-full rounded-xl border border-orange-100 bg-white px-3 text-sm font-bold tabular-nums text-slate-700 outline-none focus:ring-4 focus:ring-orange-100"
                  />
                </label>
              </div>

              {formError ? <p className="text-xs font-bold text-rose-700">{formError}</p> : null}

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--theme-primary)] px-4 text-sm font-black text-white shadow-lg shadow-orange-700/20 transition hover:bg-[var(--theme-primary-hover)]"
              >
                <Bell size={16} />
                建立通知
              </button>
            </form>
          </section>

          <section>
            <h3 className="text-sm font-black text-slate-900">通知清單</h3>
            <div className="mt-3 space-y-2">
              {sortAlerts(alerts).map((alert) => (
                <div key={alert.alertId} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-900">{formatAlertCondition(alert)}</p>
                      <p className="mt-1 text-xs font-bold text-slate-400">
                        {alert.triggerMode} · cooldown {alert.cooldownMinutes} 分鐘
                      </p>
                    </div>
                    <span className={`rounded-md px-2 py-1 text-[10px] font-black ${alert.isEnabled ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {alert.isEnabled ? '啟用' : '停用'}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onToggle(alert.alertId)}
                      className="h-9 flex-1 rounded-lg bg-slate-100 px-3 text-xs font-black text-slate-700 transition hover:bg-slate-200"
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
                  尚未設定到價通知
                </div>
              ) : null}
            </div>

            <h3 className="mt-5 text-sm font-black text-slate-900">最近觸發</h3>
            <div className="mt-3 space-y-2">
              {assetEvents.map((event) => (
                <div key={`${event.alertId}-${event.triggeredAt}`} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">
                  {formatUpdatedAt(event.triggeredAt)} · {ALERT_CONDITION_LABELS[event.conditionType]} {event.targetValue}，觸發價 {formatPrice(event.triggeredPrice, quote?.currency)}
                </div>
              ))}
              {!assetEvents.length ? (
                <p className="rounded-xl bg-slate-50 px-3 py-3 text-xs font-bold text-slate-400">尚無觸發紀錄</p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MarketAssetCard({
  item,
  quote,
  alertCount,
  loading,
  isFirst,
  isLast,
  onOpen,
  onOpenAlerts,
  onMove,
  onRemove,
}: {
  item: MarketWatchItem;
  quote?: MarketQuote;
  alertCount: number;
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  onOpen: (item: MarketWatchItem) => void;
  onOpenAlerts: (item: MarketWatchItem) => void;
  onMove: (assetId: string, direction: -1 | 1) => void;
  onRemove: (assetId: string) => void;
}) {
  const tone = quoteTone(quote);
  const TrendIcon = tone.positive ? TrendingUp : tone.negative ? TrendingDown : Clock3;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-100 hover:shadow-xl hover:shadow-orange-700/10">
      <button type="button" onClick={() => onOpen(item)} className="block w-full text-left">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-orange-50 px-2 py-1 text-[10px] font-black text-orange-700 ring-1 ring-orange-100">
                {ASSET_TYPE_LABELS[item.assetType]}
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-500">
                {quote?.marketStatus === 'open' ? '開盤' : quote?.marketStatus === 'closed' ? '休市' : '未知'}
              </span>
            </div>
            <h3 className="truncate text-lg font-black text-slate-900">{quote?.displayName || item.displayName}</h3>
            <p className="mt-1 text-xs font-bold text-slate-400">
              {item.symbol} · {item.exchange}
            </p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpenAlerts(item);
            }}
            className={`mt-1 inline-flex h-9 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-black transition ${
              alertCount ? 'bg-orange-50 text-orange-700 ring-1 ring-orange-100' : 'bg-slate-100 text-slate-400 hover:text-slate-700'
            }`}
            aria-label="設定通知"
          >
            <Bell size={15} />
            {alertCount || 0}
          </button>
        </div>

        {loading && !quote ? (
          <div className="space-y-3">
            <div className="h-8 w-32 animate-pulse rounded bg-orange-50" />
            <div className="h-5 w-24 animate-pulse rounded bg-orange-50" />
          </div>
        ) : (
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-2xl font-black tabular-nums" style={{ color: tone.accent }}>
                {formatPrice(quote?.currentPrice, quote?.currency)}
                {quote?.currency ? <span className="ml-1 text-xs font-bold">{quote.currency}</span> : null}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-black tabular-nums ${tone.soft}`}>
                  <TrendIcon size={13} />
                  {trendLabel(quote?.changePercent)} {formatPercent(quote?.changePercent)}
                </span>
                <span className="text-xs font-bold tabular-nums text-slate-400">{formatChange(quote?.priceChange)}</span>
              </div>
            </div>
            <div className="h-12 w-24 shrink-0">
              <Sparkline quote={quote} />
            </div>
          </div>
        )}
      </button>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onOpenAlerts(item)}
          className="text-[11px] font-bold text-slate-400 transition hover:text-orange-700"
        >
          通知：{alertCount ? `${alertCount} 筆` : '未設定'}
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(item.assetId, -1)}
            disabled={isFirst}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="上移"
          >
            <ArrowUp size={15} />
          </button>
          <button
            type="button"
            onClick={() => onMove(item.assetId, 1)}
            disabled={isLast}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="下移"
          >
            <ArrowDown size={15} />
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.assetId)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-700"
            aria-label="刪除"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function DetailDialog({
  item,
  quote,
  onClose,
}: {
  item: MarketWatchItem;
  quote?: MarketQuote;
  onClose: () => void;
}) {
  const tone = quoteTone(quote);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-700">{ASSET_TYPE_LABELS[item.assetType]}</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900">{quote?.displayName || item.displayName}</h2>
            <p className="mt-1 text-sm font-bold text-slate-400">
              {item.symbol} · {item.exchange}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-orange-50 hover:text-orange-700"
            aria-label="關閉"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-black text-slate-400">目前價格</p>
            <p className="mt-2 text-2xl font-black tabular-nums" style={{ color: tone.accent }}>
              {formatPrice(quote?.currentPrice, quote?.currency)}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-black text-slate-400">漲跌</p>
            <p className="mt-2 text-xl font-black tabular-nums" style={{ color: tone.accent }}>
              {formatChange(quote?.priceChange)} / {formatPercent(quote?.changePercent)}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-black text-slate-400">狀態</p>
            <p className="mt-2 text-xl font-black text-slate-800">
              {quote?.marketStatus === 'open' ? '開盤中' : quote?.marketStatus === 'closed' ? '休市' : '未知'}
            </p>
          </div>
        </div>

        <div className="h-64 rounded-2xl border border-slate-200 bg-white p-4">
          <Sparkline quote={quote} />
        </div>
      </div>
    </div>
  );
}

export default function MarketWatchClient() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<MarketWatchItem[]>(() => createDefaultItems());
  const [quotes, setQuotes] = useState<Record<string, MarketQuote>>({});
  const previousQuotesRef = useRef<Record<string, MarketQuote>>({});
  const [activeFilter, setActiveFilter] = useState<MarketAssetType | 'all'>('all');
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [notificationEvents, setNotificationEvents] = useState<NotificationEvent[]>([]);
  const notificationProvider = useMemo(() => new InAppNotificationProvider(), []);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchAssetType, setSearchAssetType] = useState<MarketAssetType | 'all'>('all');
  const [searchResults, setSearchResults] = useState<MarketSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MarketWatchItem | null>(null);
  const [alertItem, setAlertItem] = useState<MarketWatchItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    try {
      const storedItems = window.localStorage.getItem(STORAGE_KEY);
      const storedFilter = window.localStorage.getItem(FILTER_KEY);
      const storedAlerts = window.localStorage.getItem(ALERTS_KEY);
      const storedEvents = window.localStorage.getItem(NOTIFICATION_EVENTS_KEY);

      if (storedItems) {
        const parsed = JSON.parse(storedItems) as MarketWatchItem[];
        setItems(parsed.length ? parsed : createDefaultItems());
      }

      if (storedFilter && ASSET_FILTERS.some((filter) => filter.value === storedFilter)) {
        setActiveFilter(storedFilter as MarketAssetType | 'all');
      }

      if (storedAlerts) {
        setAlerts(JSON.parse(storedAlerts) as PriceAlert[]);
      }

      if (storedEvents) {
        setNotificationEvents(JSON.parse(storedEvents) as NotificationEvent[]);
      }
    } catch {
      setItems(createDefaultItems());
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, 200);

    return () => window.clearTimeout(id);
  }, [items, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(FILTER_KEY, activeFilter);
  }, [activeFilter, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => {
      window.localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    }, 200);

    return () => window.clearTimeout(id);
  }, [alerts, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => {
      window.localStorage.setItem(NOTIFICATION_EVENTS_KEY, JSON.stringify(notificationEvents.slice(0, 100)));
    }, 200);

    return () => window.clearTimeout(id);
  }, [mounted, notificationEvents]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const sortedItems = useMemo(
    () => [...items].sort((first, second) => first.sortOrder - second.sortOrder),
    [items],
  );

  const visibleItems = useMemo(() => {
    if (activeFilter === 'all') return sortedItems;
    return sortedItems.filter((item) => item.assetType === activeFilter);
  }, [activeFilter, sortedItems]);

  const alertsByAssetId = useMemo(() => {
    return alerts.reduce<Record<string, PriceAlert[]>>((groups, alert) => {
      groups[alert.assetId] = [...(groups[alert.assetId] || []), alert];
      return groups;
    }, {});
  }, [alerts]);

  const evaluateAlerts = useCallback(async (nextQuotes: Record<string, MarketQuote>) => {
    const previousQuotes = previousQuotesRef.current;
    const now = new Date().toISOString();
    const triggeredAlertIds = new Set<string>();
    const newEvents: NotificationEvent[] = [];

    for (const alert of alerts) {
      if (!alert.isEnabled) continue;
      const previousQuote = previousQuotes[alert.assetId];
      const nextQuote = nextQuotes[alert.assetId];

      if (!previousQuote || !nextQuote) continue;
      if (isAlertCoolingDown(alert.lastTriggeredAt, alert.cooldownMinutes)) continue;

      const previousValue = alert.conditionType.includes('percent')
        ? previousQuote.changePercent
        : previousQuote.currentPrice;
      const currentValue = alert.conditionType.includes('percent')
        ? nextQuote.changePercent
        : nextQuote.currentPrice;

      const crossed = didCrossAlertTarget({
        previousPrice: previousValue,
        currentPrice: currentValue,
        conditionType: alert.conditionType,
        targetValue: alert.targetValue,
      });

      if (!crossed || !isFiniteNumber(currentValue)) continue;

      const pendingEvent = createNotificationEvent(alert, currentValue, now);
      const deliveredEvent = await notificationProvider.send({
        alert,
        event: pendingEvent,
        assetName: nextQuote.displayName,
        symbol: nextQuote.symbol,
        detailUrl: `/market-watch?asset=${encodeURIComponent(nextQuote.assetId)}`,
      });

      triggeredAlertIds.add(alert.alertId);
      newEvents.push(deliveredEvent);
    }

    if (!newEvents.length) return;

    setNotificationEvents((current) => [...newEvents, ...current].slice(0, 100));
    setAlerts((current) =>
      current.map((alert) => {
        if (!triggeredAlertIds.has(alert.alertId)) return alert;

        return {
          ...alert,
          isEnabled: alert.triggerMode === 'once' ? false : alert.isEnabled,
          lastTriggeredAt: now,
          updatedAt: now,
        };
      }),
    );
    setToast(`已觸發 ${newEvents.length} 筆到價通知`);
  }, [alerts, notificationProvider]);

  const refreshQuotes = useCallback(async () => {
    if (!sortedItems.length) {
      setQuotes({});
      setUpdatedAt(null);
      return;
    }

    setQuotesLoading(true);
    setError(null);

    try {
      const assets = sortedItems.map((item) => item.assetId).join(',');
      const payload = await fetchJson<QuotesResponse>(`/api/market/quotes?assets=${encodeURIComponent(assets)}`);

      if (!payload.success || !payload.data) {
        throw new Error(payload.error || 'Market quote API failed');
      }

      setQuotes(payload.data);
      await evaluateAlerts(payload.data);
      previousQuotesRef.current = payload.data;
      setUpdatedAt(new Date().toISOString());
    } catch {
      setError('市場資料更新失敗，請稍後再試。');
    } finally {
      setQuotesLoading(false);
    }
  }, [evaluateAlerts, sortedItems]);

  useEffect(() => {
    if (!mounted) return;
    refreshQuotes();
  }, [mounted, refreshQuotes]);

  const searchAssets = useCallback(async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setSearchLoading(true);
    setSearchError(null);

    try {
      const url = new URL('/api/market/search', window.location.origin);
      url.searchParams.set('query', query.trim());
      if (searchAssetType !== 'all') {
        url.searchParams.set('assetType', searchAssetType);
      }

      const payload = await fetchJson<SearchResponse>(url.toString());

      if (!payload.success || !payload.data) {
        throw new Error(payload.error || 'Market search API failed');
      }

      setSearchResults(payload.data);
    } catch {
      setSearchError('搜尋失敗，請確認代號後再試一次。');
    } finally {
      setSearchLoading(false);
    }
  }, [query, searchAssetType]);

  const addAsset = useCallback((result: MarketSearchResult) => {
    if (items.some((item) => item.assetId === result.assetId)) {
      setSearchError(`${result.symbol} 已在觀察清單中。`);
      return;
    }

    const nextOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), -1) + 1;
    setItems((current) => [
      ...current,
      {
        ...result,
        sortOrder: nextOrder,
        addedAt: new Date().toISOString(),
      },
    ]);
    setQuery('');
    setSearchResults([]);
    setIsAddOpen(false);
  }, [items]);

  const removeAsset = useCallback((assetId: string) => {
    setItems((current) => current.filter((item) => item.assetId !== assetId).map((item, index) => ({ ...item, sortOrder: index })));
    setAlerts((current) => current.filter((alert) => alert.assetId !== assetId));
  }, []);

  const moveAsset = useCallback((assetId: string, direction: -1 | 1) => {
    setItems((current) => {
      const ordered = [...current].sort((first, second) => first.sortOrder - second.sortOrder);
      const index = ordered.findIndex((item) => item.assetId === assetId);
      const targetIndex = index + direction;

      if (index < 0 || targetIndex < 0 || targetIndex >= ordered.length) return current;

      const next = [...ordered];
      const [target] = next.splice(index, 1);
      next.splice(targetIndex, 0, target);

      return next.map((item, nextIndex) => ({ ...item, sortOrder: nextIndex }));
    });
  }, []);

  const openAddDialog = () => {
    setIsAddOpen(true);
    setSearchError(null);
    setSearchResults(searchAssetType === 'fx' ? defaultFxSearchResults() : []);
  };

  const createAlert = useCallback(
    (item: MarketWatchItem, input: {
      conditionType: AlertConditionType;
      targetValue: number;
      triggerMode: AlertTriggerMode;
      cooldownMinutes: number;
    }) => {
      const now = new Date().toISOString();
      setAlerts((current) => [
        ...current,
        {
          alertId: createAlertId(item.assetId),
          userId: LOCAL_USER_ID,
          assetId: item.assetId,
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
      setToast('到價通知已建立');
    },
    [],
  );

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

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_44%,#f8fafc_100%)] px-4 pb-16 pt-10 text-slate-900 sm:px-6">
      <main className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex h-7 items-center rounded-full bg-orange-50 px-3 text-[11px] font-black uppercase tracking-widest text-orange-700 ring-1 ring-orange-100">
              Market Watch
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              市場<span className="text-gradient">觀察清單</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
              統一追蹤台股、美股與外匯標的，快速查看目前價格、漲跌狀態、簡易趨勢與市場開休盤。
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
              onClick={openAddDialog}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--theme-primary)] px-4 text-sm font-black text-white shadow-lg shadow-orange-700/20 transition hover:bg-[var(--theme-primary-hover)]"
            >
              <Plus size={17} />
              新增標的
            </button>
          </div>
        </header>

        <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1">
            {ASSET_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-black transition ${
                  activeFilter === filter.value ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
            <Clock3 size={14} className="text-orange-600" />
            資料更新時間：{formatUpdatedAt(updatedAt)}
          </div>
        </section>

        {error ? (
          <div className="mb-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 ring-1 ring-rose-100">
            {error}
          </div>
        ) : null}

        {toast ? (
          <div className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
            {toast}
          </div>
        ) : null}

        {!mounted ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-52 animate-pulse rounded-2xl bg-orange-50" />
            ))}
          </div>
        ) : visibleItems.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, index) => (
              <MarketAssetCard
                key={item.assetId}
                item={item}
                quote={quotes[item.assetId]}
                alertCount={(alertsByAssetId[item.assetId] || []).length}
                loading={quotesLoading}
                isFirst={index === 0}
                isLast={index === visibleItems.length - 1}
                onOpen={setSelectedItem}
                onOpenAlerts={setAlertItem}
                onMove={moveAsset}
                onRemove={removeAsset}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white/75 py-16 text-center shadow-sm">
            <p className="text-sm font-black text-slate-500">目前沒有符合篩選的觀察標的</p>
            <button
              type="button"
              onClick={openAddDialog}
              className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 text-sm font-black text-orange-700 ring-1 ring-orange-100 transition hover:bg-orange-100"
            >
              <Plus size={16} />
              新增第一個標的
            </button>
          </div>
        )}
      </main>

      <AddAssetDialog
        open={isAddOpen}
        query={query}
        assetType={searchAssetType}
        results={searchResults}
        loading={searchLoading}
        error={searchError}
        onClose={() => setIsAddOpen(false)}
        onQueryChange={setQuery}
        onAssetTypeChange={(value) => {
          setSearchAssetType(value);
          setSearchResults(value === 'fx' ? defaultFxSearchResults() : []);
        }}
        onSubmit={searchAssets}
        onAdd={addAsset}
      />

      {selectedItem ? (
        <DetailDialog
          item={selectedItem}
          quote={quotes[selectedItem.assetId]}
          onClose={() => setSelectedItem(null)}
        />
      ) : null}

      {alertItem ? (
        <AlertDialog
          item={alertItem}
          quote={quotes[alertItem.assetId]}
          alerts={alertsByAssetId[alertItem.assetId] || []}
          events={notificationEvents}
          onClose={() => setAlertItem(null)}
          onCreate={(input) => createAlert(alertItem, input)}
          onToggle={toggleAlert}
          onRemove={removeAlert}
        />
      ) : null}
    </div>
  );
}
