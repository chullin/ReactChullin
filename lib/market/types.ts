export type MarketAssetType = 'tw_stock' | 'us_stock' | 'fx';

export type MarketStatus = 'open' | 'closed' | 'pre_market' | 'after_hours' | 'unknown';

export type MarketRange = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'MAX';

export type MarketInterval = '1m' | '5m' | '1h' | '1d';

export type AlertConditionType =
  | 'price_above'
  | 'price_below'
  | 'change_percent_above'
  | 'change_percent_below';

export type AlertTriggerMode = 'once' | 'repeat';

export type NotificationChannel = 'in_app' | 'email' | 'telegram' | 'web_push';

export type NotificationDeliveryStatus = 'pending' | 'sent' | 'failed' | 'skipped';

export type MarketChartPoint = {
  timestamp: string;
  price: number | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
};

export type MarketAsset = {
  assetId: string;
  assetType: MarketAssetType;
  symbol: string;
  exchange: string;
  displayName: string;
  currency: string;
};

export type MarketQuote = MarketAsset & {
  currentPrice: number | null;
  previousClose: number | null;
  priceChange: number | null;
  changePercent: number | null;
  marketStatus: MarketStatus;
  updatedAt: string;
  chartData: MarketChartPoint[];
  bankRate?: {
    bankBuy: number | null;
    bankSell: number | null;
    cashBuy: number | null;
    cashSell: number | null;
    bankBuyLabel?: string | null;
    bankSellLabel?: string | null;
    cashBuyLabel?: string | null;
    cashSellLabel?: string | null;
    updatedAt: string | null;
    sourceName: string;
    sourceUrl: string;
  };
};

export type MarketSearchResult = MarketAsset & {
  description?: string;
};

export type MarketWatchItem = MarketAsset & {
  sortOrder: number;
  addedAt: string;
};

export type PriceAlert = {
  alertId: string;
  userId: string;
  assetId: string;
  conditionType: AlertConditionType;
  targetValue: number;
  isEnabled: boolean;
  triggerMode: AlertTriggerMode;
  cooldownMinutes: number;
  lastTriggeredAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NotificationEvent = {
  alertId: string;
  triggeredPrice: number;
  targetValue: number;
  conditionType: AlertConditionType;
  channel: NotificationChannel;
  deliveryStatus: NotificationDeliveryStatus;
  triggeredAt: string;
};

export type PriceCrossingInput = {
  previousPrice: number | null;
  currentPrice: number | null;
  conditionType: AlertConditionType;
  targetValue: number;
};
