'use client';

import type { FormEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpenCheck,
  ExternalLink,
  LineChart,
  Newspaper,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

type Market = '台股' | '美股';

type HistoryPoint = {
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
};

type StockQuote = {
  symbol: string;
  name?: string;
  longName?: string;
  price?: number | null;
  change?: number | null;
  changePercent?: number | null;
  previousClose?: number | null;
  currency?: string;
  exchange?: string;
  fiftyTwoWeekHigh?: number | null;
  fiftyTwoWeekLow?: number | null;
  trailingPE?: number | null;
  forwardPE?: number | null;
  priceToBook?: number | null;
  dividendYield?: number | null;
};

type StockNewsItem = {
  title: string;
  url: string;
  pubDate?: string;
  source?: string;
};

type StockDetails = {
  quote?: StockQuote | null;
  news?: StockNewsItem[];
  history?: HistoryPoint[];
};

type DetailsResponse = {
  success?: boolean;
  data?: StockDetails;
  error?: string;
};

type Indicator = {
  label: string;
  value: string;
  status: 'positive' | 'neutral' | 'negative';
  note: string;
};

type Signal = {
  title: string;
  detail: string;
  tone: 'buy' | 'hold' | 'sell' | 'risk';
};

type Interpretation = {
  title: string;
  stance: string;
  detail: string;
  reasons: string[];
  tone: 'positive' | 'neutral' | 'negative';
};

type TimelineOption = {
  label: string;
  months?: number;
  yearsForApi: number;
};

const MARKET_OPTIONS: Market[] = ['台股', '美股'];
const TIMELINE_OPTIONS: TimelineOption[] = [
  { label: '3M', months: 3, yearsForApi: 1 },
  { label: '6M', months: 6, yearsForApi: 1 },
  { label: '1Y', months: 12, yearsForApi: 1 },
  { label: '3Y', months: 36, yearsForApi: 3 },
  { label: '5Y', months: 60, yearsForApi: 5 },
  { label: '10Y', months: 120, yearsForApi: 10 },
  { label: '20Y', months: 240, yearsForApi: 20 },
];

const STATUS_CLASS: Record<Indicator['status'], string> = {
  positive: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  neutral: 'border-slate-200 bg-slate-50 text-slate-700',
  negative: 'border-rose-200 bg-rose-50 text-rose-800',
};

const SIGNAL_CLASS: Record<Signal['tone'], string> = {
  buy: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  hold: 'border-slate-200 bg-white text-slate-700',
  sell: 'border-amber-200 bg-amber-50 text-amber-800',
  risk: 'border-rose-200 bg-rose-50 text-rose-800',
};

const SOURCE_LINKS = {
  台股: [
    { label: 'TWSE 公開資訊觀測站', href: 'https://mops.twse.com.tw/mops/web/index' },
    { label: 'Yahoo 股市台灣', href: 'https://tw.stock.yahoo.com/' },
  ],
  美股: [
    { label: 'SEC EDGAR', href: 'https://www.sec.gov/edgar/search/' },
    { label: 'Yahoo Finance', href: 'https://finance.yahoo.com/' },
  ],
} satisfies Record<Market, { label: string; href: string }[]>;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatNumber(value: number | null | undefined, digits = 2) {
  if (!isFiniteNumber(value)) return '-';
  return value.toLocaleString('zh-TW', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatPercent(value: number | null | undefined) {
  if (!isFiniteNumber(value)) return '-';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatDate(value?: string) {
  if (!value) return '日期未提供';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values: number[]) {
  const mean = average(values);
  if (!isFiniteNumber(mean) || values.length < 2) return null;
  const variance = average(values.map((value) => (value - mean) ** 2));
  return isFiniteNumber(variance) ? Math.sqrt(variance) : null;
}

function movingAverage(values: number[], windowSize: number) {
  if (values.length < windowSize) return null;
  return average(values.slice(-windowSize));
}

function calculateRsi(values: number[], period = 14) {
  if (values.length <= period) return null;
  const slice = values.slice(-(period + 1));
  let gains = 0;
  let losses = 0;

  for (let index = 1; index < slice.length; index += 1) {
    const change = slice[index] - slice[index - 1];
    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }

  if (losses === 0) return 100;
  const rs = gains / period / (losses / period);
  return 100 - 100 / (1 + rs);
}

function ema(values: number[], period: number) {
  if (values.length < period) return null;
  const multiplier = 2 / (period + 1);
  let current = average(values.slice(0, period));
  if (!isFiniteNumber(current)) return null;

  for (const value of values.slice(period)) {
    current = (value - current) * multiplier + current;
  }

  return current;
}

function calculateMacd(values: number[]) {
  const macd = isFiniteNumber(ema(values, 12)) && isFiniteNumber(ema(values, 26))
    ? (ema(values, 12) as number) - (ema(values, 26) as number)
    : null;

  if (!isFiniteNumber(macd)) return null;
  return macd;
}

function calculateMaxDrawdown(values: number[]) {
  if (values.length < 2) return null;
  let peak = values[0];
  let maxDrawdown = 0;

  for (const value of values) {
    peak = Math.max(peak, value);
    maxDrawdown = Math.min(maxDrawdown, (value - peak) / peak);
  }

  return maxDrawdown * 100;
}

function statusFromScore(score: number) {
  if (score >= 75) return '健康偏強';
  if (score >= 60) return '健康中上';
  if (score >= 45) return '中性觀察';
  return '風險偏高';
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createGoogleNewsUrl(symbol: string, market: Market) {
  const query = encodeURIComponent(`${symbol} ${market === '台股' ? '股票 財報 新聞' : 'stock earnings news'}`);
  return `https://news.google.com/search?q=${query}`;
}

function createYahooUrl(symbol: string, market: Market) {
  const value = symbol.trim().toUpperCase();
  if (market === '台股') return `https://tw.stock.yahoo.com/quote/${value}`;
  return `https://finance.yahoo.com/quote/${value}`;
}

function filterHistoryByTimeline(history: HistoryPoint[], timeline: TimelineOption) {
  const cleanHistory = history.filter((point) => isFiniteNumber(point.close));
  if (!timeline.months || cleanHistory.length < 2) return cleanHistory;

  const latestDate = new Date(cleanHistory.at(-1)?.date || '');
  if (Number.isNaN(latestDate.getTime())) return cleanHistory;

  const fromDate = new Date(latestDate);
  fromDate.setMonth(fromDate.getMonth() - timeline.months);

  return cleanHistory.filter((point) => {
    const pointDate = new Date(point.date);
    return !Number.isNaN(pointDate.getTime()) && pointDate >= fromDate;
  });
}

function percentileRank(values: number[], current: number | null | undefined) {
  if (!values.length || !isFiniteNumber(current)) return null;
  const belowOrEqual = values.filter((value) => value <= current).length;
  return (belowOrEqual / values.length) * 100;
}

function calculateDrawdownEvents(values: number[], thresholdPercent: number) {
  if (values.length < 2) return 0;
  let peak = values[0];
  let inDrawdown = false;
  let count = 0;

  for (const value of values) {
    if (value >= peak) {
      peak = value;
      inDrawdown = false;
      continue;
    }

    const drawdown = ((value - peak) / peak) * 100;
    if (drawdown <= thresholdPercent && !inDrawdown) {
      count += 1;
      inDrawdown = true;
    }
  }

  return count;
}

function valueStatus(value: number | null, low: number, high: number): Indicator['status'] {
  if (!isFiniteNumber(value)) return 'neutral';
  if (value <= low) return 'positive';
  if (value <= high) return 'neutral';
  return 'negative';
}

function formatDividendYield(value: number | null | undefined) {
  if (!isFiniteNumber(value)) return '-';
  return value <= 1 ? formatPercent(value * 100) : formatPercent(value);
}

function distanceFromReference(price: number | null | undefined, reference: number | null | undefined) {
  if (!isFiniteNumber(price) || !isFiniteNumber(reference) || reference === 0) return null;
  return ((price - reference) / reference) * 100;
}

function formatReferenceDistance(distance: number | null | undefined) {
  if (!isFiniteNumber(distance)) return '差距 -';
  if (distance === 0) return '現價貼近均線';
  return `現價${distance > 0 ? '高於' : '低於'} ${Math.abs(distance).toFixed(2)}%`;
}

function createInterpretation({
  timeline,
  score,
  pricePercentile,
  currentDrawdown,
  sma50Distance,
  sma200Distance,
  rsi,
  annualPeriodVolatility,
  volumeRatio,
}: {
  timeline: TimelineOption;
  score: number;
  pricePercentile: number | null;
  currentDrawdown: number | null;
  sma50Distance: number | null;
  sma200Distance: number | null;
  rsi: number | null;
  annualPeriodVolatility: number | null;
  volumeRatio: number | null;
}): Interpretation {
  const isHighPosition = isFiniteNumber(pricePercentile) && pricePercentile >= 75;
  const isVeryHighPosition = isFiniteNumber(pricePercentile) && pricePercentile >= 90;
  const isNearHigh = isFiniteNumber(currentDrawdown) && currentDrawdown > -6;
  const isOverheated = (isFiniteNumber(rsi) && rsi >= 75) || (isFiniteNumber(sma50Distance) && sma50Distance >= 8);
  const isExtendedFromLongTrend = isFiniteNumber(sma200Distance) && sma200Distance >= 20;
  const isWeakTrend = isFiniteNumber(sma50Distance) && sma50Distance < 0;
  const isDeepDrawdown = isFiniteNumber(currentDrawdown) && currentDrawdown <= -20;
  const isHealthyMomentum = isFiniteNumber(rsi) && rsi >= 45 && rsi < 70;
  const hasVolumeSupport = isFiniteNumber(volumeRatio) && volumeRatio >= 1;
  const volatilityText = isFiniteNumber(annualPeriodVolatility) ? `${timeline.label} 年化波動約 ${annualPeriodVolatility.toFixed(1)}%` : `${timeline.label} 波動資料不足`;

  if (isWeakTrend || isDeepDrawdown || score < 45) {
    return {
      title: '趨勢轉弱，先控制風險',
      stance: '目前比較像是防守盤，不適合只因為跌深就急著加碼。',
      detail: `價格已經低於關鍵均線或從區間高點回落較深，${timeline.label} 的健康分數偏低；更合理的做法是等價格重新站回中期均線、RSI 回到合理區間，再評估是否分批買回。`,
      reasons: [
        `目前距 50 日均線：${formatPercent(sma50Distance)}`,
        `目前距區間高點：${formatPercent(currentDrawdown)}`,
        `RSI：${formatNumber(rsi)}`,
        volatilityText,
      ],
      tone: 'negative',
    };
  }

  if ((isVeryHighPosition && isOverheated) || (isNearHigh && isExtendedFromLongTrend && isOverheated)) {
    return {
      title: '明顯偏熱，適合檢查是否分批獲利',
      stance: '目前比較接近波段賣出或至少部分停利的訊號。',
      detail: `價格位於 ${timeline.label} 偏高位置，且 RSI 或均線乖離已經偏熱；如果這是既有持股，可以考慮分批獲利，保留核心部位觀察是否能放量突破。`,
      reasons: [
        `價格區間百分位：${isFiniteNumber(pricePercentile) ? `${pricePercentile.toFixed(0)}%` : '-'}`,
        `目前距 50 日均線：${formatPercent(sma50Distance)}`,
        `目前距 200 日均線：${formatPercent(sma200Distance)}`,
        `RSI：${formatNumber(rsi)}`,
      ],
      tone: 'negative',
    };
  }

  if (isHighPosition || isNearHigh) {
    return {
      title: '接近高檔，值得提高警覺',
      stance: '目前確實處於偏高位置，但還不到明顯過熱、很適合做波段賣出的程度。',
      detail: `價格在 ${timeline.label} 區間的位置偏高，不適合用追價心態買進；但只要 RSI 仍在合理區間、50/200 日均線乖離沒有失控，訊號比較像是續抱並提高警覺，而不是立即判定該賣。`,
      reasons: [
        `價格區間百分位：${isFiniteNumber(pricePercentile) ? `${pricePercentile.toFixed(0)}%` : '-'}`,
        `目前距區間高點：${formatPercent(currentDrawdown)}`,
        `目前距 50 日均線：${formatPercent(sma50Distance)}`,
        `RSI：${formatNumber(rsi)}${isHealthyMomentum ? '，仍在相對健康區間' : ''}`,
      ],
      tone: 'neutral',
    };
  }

  if (score >= 60 && isHealthyMomentum) {
    return {
      title: '趨勢偏健康，可等待拉回切入',
      stance: '目前比較適合列入買進觀察，而不是急著追高。',
      detail: `健康分數與 RSI 都維持在可接受範圍，若價格回測 20/50/60 日均線附近仍守住，且新聞面沒有重大利空，可以考慮分批布局。`,
      reasons: [
        `健康分數：${score}/100`,
        `目前距 50 日均線：${formatPercent(sma50Distance)}`,
        `RSI：${formatNumber(rsi)}`,
        hasVolumeSupport ? `成交量比：${volumeRatio?.toFixed(2)}x，量能尚可` : `成交量比：${isFiniteNumber(volumeRatio) ? `${volumeRatio.toFixed(2)}x` : '-'}，量能仍需觀察`,
      ],
      tone: 'positive',
    };
  }

  return {
    title: '訊號中性，等待更明確位置',
    stance: '目前沒有強烈買進或賣出訊號。',
    detail: `價格、動能與波動沒有形成明確方向；比較務實的做法是設定觀察價位，等接近均線支撐或突破區間高點後，再搭配量能與新聞確認。`,
    reasons: [
      `健康分數：${score}/100`,
      `價格區間百分位：${isFiniteNumber(pricePercentile) ? `${pricePercentile.toFixed(0)}%` : '-'}`,
      `目前距 50 日均線：${formatPercent(sma50Distance)}`,
      `RSI：${formatNumber(rsi)}`,
    ],
    tone: 'neutral',
  };
}

function analyzeStock(details: StockDetails | null, timeline: TimelineOption) {
  const fullHistory = (details?.history || []).filter((point) => isFiniteNumber(point.close));
  const history = filterHistoryByTimeline(fullHistory, timeline);
  const closes = history.map((point) => point.close as number);
  const technicalCloses = fullHistory.map((point) => point.close as number);
  const volumes = history.map((point) => point.volume).filter(isFiniteNumber);
  const price = details?.quote?.price ?? closes.at(-1) ?? null;
  const previousClose = details?.quote?.previousClose ?? closes.at(-2) ?? null;
  const changePercent = isFiniteNumber(price) && isFiniteNumber(previousClose) && previousClose !== 0
    ? ((price - previousClose) / previousClose) * 100
    : details?.quote?.changePercent ?? null;
  const sma20 = movingAverage(technicalCloses, 20);
  const sma50 = movingAverage(technicalCloses, 50);
  const sma60 = movingAverage(technicalCloses, 60);
  const sma120 = movingAverage(technicalCloses, 120);
  const sma200 = movingAverage(technicalCloses, 200);
  const rsi = calculateRsi(technicalCloses);
  const macd = calculateMacd(technicalCloses);
  const low52 = details?.quote?.fiftyTwoWeekLow ?? (closes.length ? Math.min(...closes.slice(-252)) : null);
  const high52 = details?.quote?.fiftyTwoWeekHigh ?? (closes.length ? Math.max(...closes.slice(-252)) : null);
  const periodLow = closes.length ? Math.min(...closes) : null;
  const periodHigh = closes.length ? Math.max(...closes) : null;
  const periodReturn = closes.length >= 2 ? ((closes.at(-1)! - closes[0]) / closes[0]) * 100 : null;
  const drawdown = calculateMaxDrawdown(closes);
  const currentDrawdown = isFiniteNumber(price) && isFiniteNumber(periodHigh) && periodHigh > 0 ? ((price - periodHigh) / periodHigh) * 100 : null;
  const recentReturns = closes.slice(-61).flatMap((value, index, list) => {
    if (index === 0) return [];
    return list[index - 1] ? [(value - list[index - 1]) / list[index - 1]] : [];
  });
  const periodReturns = closes.flatMap((value, index, list) => {
    if (index === 0) return [];
    return list[index - 1] ? [(value - list[index - 1]) / list[index - 1]] : [];
  });
  const volatility = standardDeviation(recentReturns);
  const periodVolatility = standardDeviation(periodReturns);
  const annualVolatility = isFiniteNumber(volatility) ? volatility * Math.sqrt(252) * 100 : null;
  const annualPeriodVolatility = isFiniteNumber(periodVolatility) ? periodVolatility * Math.sqrt(252) * 100 : null;
  const avgVolume20 = average(volumes.slice(-20));
  const latestVolume = volumes.at(-1) ?? null;
  const volumeRatio = isFiniteNumber(latestVolume) && isFiniteNumber(avgVolume20) && avgVolume20 > 0
    ? latestVolume / avgVolume20
    : null;
  const distanceFromHigh = isFiniteNumber(price) && isFiniteNumber(high52) && high52 > 0 ? ((price - high52) / high52) * 100 : null;
  const distanceFromLow = isFiniteNumber(price) && isFiniteNumber(low52) && low52 > 0 ? ((price - low52) / low52) * 100 : null;
  const pricePercentile = percentileRank(closes, price);
  const drawdown10Count = calculateDrawdownEvents(closes, -10);
  const drawdown20Count = calculateDrawdownEvents(closes, -20);
  const trailingPE = details?.quote?.trailingPE ?? null;
  const forwardPE = details?.quote?.forwardPE ?? null;
  const priceToBook = details?.quote?.priceToBook ?? null;
  const dividendYield = details?.quote?.dividendYield ?? null;
  const sma20Distance = distanceFromReference(price, sma20);
  const sma50Distance = distanceFromReference(price, sma50);
  const sma60Distance = distanceFromReference(price, sma60);
  const sma120Distance = distanceFromReference(price, sma120);
  const sma200Distance = distanceFromReference(price, sma200);

  const trendScore = isFiniteNumber(price) && isFiniteNumber(sma60) ? (price >= sma60 ? 18 : 7) : 10;
  const longTrendScore = isFiniteNumber(sma60) && isFiniteNumber(sma120) ? (sma60 >= sma120 ? 14 : 6) : 8;
  const momentumScore = isFiniteNumber(rsi) ? (rsi >= 45 && rsi <= 70 ? 18 : rsi > 70 ? 10 : 7) : 10;
  const macdScore = isFiniteNumber(macd) ? (macd >= 0 ? 12 : 5) : 7;
  const riskScore = isFiniteNumber(annualVolatility) ? clamp(18 - annualVolatility / 4, 5, 18) : 10;
  const rangeScore = isFiniteNumber(distanceFromHigh) ? (distanceFromHigh > -12 ? 14 : distanceFromHigh > -28 ? 9 : 5) : 8;
  const score = Math.round(clamp(trendScore + longTrendScore + momentumScore + macdScore + riskScore + rangeScore, 0, 100));
  const interpretation = createInterpretation({
    timeline,
    score,
    pricePercentile,
    currentDrawdown,
    sma50Distance,
    sma200Distance,
    rsi,
    annualPeriodVolatility,
    volumeRatio,
  });

  const indicators: Indicator[] = [
    {
      label: '20 日均線',
      value: `${formatNumber(sma20)} · ${formatPercent(sma20Distance)}`,
      status: isFiniteNumber(price) && isFiniteNumber(sma20) ? (price >= sma20 ? 'positive' : 'negative') : 'neutral',
      note: `${formatReferenceDistance(sma20Distance)}，用來看短線價格是否仍站在近期成本之上。`,
    },
    {
      label: '50 日均線',
      value: `${formatNumber(sma50)} · ${formatPercent(sma50Distance)}`,
      status: isFiniteNumber(price) && isFiniteNumber(sma50) ? (price >= sma50 ? 'positive' : 'negative') : 'neutral',
      note: `${formatReferenceDistance(sma50Distance)}，接近你提到的 QQQ 50 日線差距判斷方式。`,
    },
    {
      label: '60 / 120 日趨勢',
      value: `${formatNumber(sma60)} (${formatPercent(sma60Distance)}) / ${formatNumber(sma120)} (${formatPercent(sma120Distance)})`,
      status: isFiniteNumber(sma60) && isFiniteNumber(sma120) ? (sma60 >= sma120 ? 'positive' : 'negative') : 'neutral',
      note: `60 日線：${formatReferenceDistance(sma60Distance)}；120 日線：${formatReferenceDistance(sma120Distance)}。`,
    },
    {
      label: '200 日均線',
      value: `${formatNumber(sma200)} · ${formatPercent(sma200Distance)}`,
      status: isFiniteNumber(price) && isFiniteNumber(sma200) ? (price >= sma200 ? 'positive' : 'negative') : 'neutral',
      note: `${formatReferenceDistance(sma200Distance)}，用來判斷長期趨勢與過度偏離風險。`,
    },
    {
      label: 'RSI 14',
      value: formatNumber(rsi),
      status: isFiniteNumber(rsi) ? (rsi > 75 ? 'negative' : rsi >= 45 ? 'positive' : 'negative') : 'neutral',
      note: '45-70 通常較健康，過熱或過弱都要小心。',
    },
    {
      label: 'MACD 動能',
      value: formatNumber(macd),
      status: isFiniteNumber(macd) ? (macd >= 0 ? 'positive' : 'negative') : 'neutral',
      note: '正值代表短中期動能仍偏強。',
    },
    {
      label: '距 52 週高點',
      value: formatPercent(distanceFromHigh),
      status: isFiniteNumber(distanceFromHigh) ? (distanceFromHigh > -12 ? 'positive' : distanceFromHigh > -28 ? 'neutral' : 'negative') : 'neutral',
      note: '離高點太遠通常代表趨勢或市場信心轉弱。',
    },
    {
      label: '距 52 週低點',
      value: formatPercent(distanceFromLow),
      status: isFiniteNumber(distanceFromLow) ? (distanceFromLow > 20 ? 'positive' : 'neutral') : 'neutral',
      note: '確認是否只是低檔反彈，或已脫離弱勢區。',
    },
    {
      label: `${timeline.label} 最大回撤`,
      value: formatPercent(drawdown),
      status: isFiniteNumber(drawdown) ? (drawdown > -20 ? 'positive' : drawdown > -35 ? 'neutral' : 'negative') : 'neutral',
      note: '依目前選定期間統計，回撤越深代表持有壓力越大。',
    },
    {
      label: '60 日年化波動',
      value: formatPercent(annualVolatility),
      status: isFiniteNumber(annualVolatility) ? (annualVolatility < 30 ? 'positive' : annualVolatility < 50 ? 'neutral' : 'negative') : 'neutral',
      note: '用來估計部位大小與停損距離。',
    },
    {
      label: '成交量比',
      value: isFiniteNumber(volumeRatio) ? `${volumeRatio.toFixed(2)}x` : '-',
      status: isFiniteNumber(volumeRatio) ? (volumeRatio >= 1.2 ? 'positive' : volumeRatio < 0.7 ? 'neutral' : 'positive') : 'neutral',
      note: '放量上漲較有續航，縮量反彈可信度較低。',
    },
  ];

  const signals: Signal[] = [
    {
      title: score >= 60 ? '可以列入買進觀察' : '先等條件改善',
      detail: score >= 60
        ? `${timeline.label} 分析分數達中上，若價格回測 20/60 日均線不破，且新聞面沒有重大利空，可以分批建立部位。`
        : `${timeline.label} 趨勢或動能不足，適合等價格站回 60 日線、RSI 回到 45 以上，再評估進場。`,
      tone: score >= 60 ? 'buy' : 'hold',
    },
    {
      title: isFiniteNumber(rsi) && rsi > 75 ? '短線過熱，適合部分獲利' : '停利看 52 週高點與量能',
      detail: isFiniteNumber(rsi) && rsi > 75
        ? 'RSI 已偏熱，若同時接近 52 週高點，可以先賣出一部分，保留核心部位觀察趨勢。'
        : '若股價接近 52 週高點但成交量沒有同步放大，適合分批停利；若放量突破則可續抱。',
      tone: 'sell',
    },
    {
      title: isFiniteNumber(price) && isFiniteNumber(sma60) && price < sma60 ? '跌破中期線，降低持股風險' : '風控線可放在 60 日線附近',
      detail: isFiniteNumber(price) && isFiniteNumber(sma60) && price < sma60
        ? '價格已低於 60 日均線，代表中期趨勢轉弱；若是既有持股，應檢查是否需要減碼或停損。'
        : '只要價格仍在 60 日均線上方，趨勢尚未明顯破壞；跌破且 2-3 天無法站回時要提高警覺。',
      tone: isFiniteNumber(price) && isFiniteNumber(sma60) && price < sma60 ? 'risk' : 'hold',
    },
  ];

  const historyStats: Indicator[] = [
    {
      label: `${timeline.label} 區間報酬`,
      value: formatPercent(periodReturn),
      status: isFiniteNumber(periodReturn) ? (periodReturn > 0 ? 'positive' : 'negative') : 'neutral',
      note: '衡量這段期間買進並持有到現在的結果。',
    },
    {
      label: `${timeline.label} 區間高低`,
      value: `${formatNumber(periodLow)} - ${formatNumber(periodHigh)}`,
      status: 'neutral',
      note: '用來判斷目前價格在該期間的位置。',
    },
    {
      label: '目前距區間高點',
      value: formatPercent(currentDrawdown),
      status: isFiniteNumber(currentDrawdown) ? (currentDrawdown > -10 ? 'positive' : currentDrawdown > -25 ? 'neutral' : 'negative') : 'neutral',
      note: '越接近區間高點，越要搭配量能與估值判斷是否分批停利。',
    },
    {
      label: '價格區間百分位',
      value: isFiniteNumber(pricePercentile) ? `${pricePercentile.toFixed(0)}%` : '-',
      status: isFiniteNumber(pricePercentile) ? (pricePercentile < 35 ? 'positive' : pricePercentile < 75 ? 'neutral' : 'negative') : 'neutral',
      note: '這是價格位置統計，不等同 PE/PB 估值百分位。',
    },
    {
      label: '回檔超過 10%',
      value: `${drawdown10Count} 次`,
      status: drawdown10Count <= 1 ? 'positive' : drawdown10Count <= 3 ? 'neutral' : 'negative',
      note: '觀察選定期間內較明顯修正的頻率。',
    },
    {
      label: '回檔超過 20%',
      value: `${drawdown20Count} 次`,
      status: drawdown20Count === 0 ? 'positive' : drawdown20Count <= 2 ? 'neutral' : 'negative',
      note: '若常出現深度回檔，部位大小與停損要更保守。',
    },
    {
      label: `${timeline.label} 年化波動`,
      value: formatPercent(annualPeriodVolatility),
      status: isFiniteNumber(annualPeriodVolatility) ? (annualPeriodVolatility < 30 ? 'positive' : annualPeriodVolatility < 50 ? 'neutral' : 'negative') : 'neutral',
      note: '依選定期間日報酬換算，時間越短越容易受近期行情影響。',
    },
  ];

  const valuationStats: Indicator[] = [
    {
      label: '本益比 PE',
      value: formatNumber(trailingPE),
      status: valueStatus(trailingPE, 18, 30),
      note: '若資料源未提供，請回 Yahoo、公開資訊觀測站或 SEC 財報確認。',
    },
    {
      label: 'Forward PE',
      value: formatNumber(forwardPE),
      status: valueStatus(forwardPE, 18, 30),
      note: '美股較常見；台股資料源不一定提供預估本益比。',
    },
    {
      label: '股價淨值比 PB',
      value: formatNumber(priceToBook),
      status: valueStatus(priceToBook, 2, 5),
      note: '高成長股 PB 常偏高，需和同產業比較。',
    },
    {
      label: '股息殖利率',
      value: formatDividendYield(dividendYield),
      status: isFiniteNumber(dividendYield) ? 'neutral' : 'neutral',
      note: '殖利率需搭配配息穩定度、盈餘與現金流判斷。',
    },
  ];

  return {
    price,
    changePercent,
    score,
    status: statusFromScore(score),
    indicators,
    interpretation,
    historyStats,
    valuationStats,
    signals,
    historyCount: history.length,
    fullHistoryCount: fullHistory.length,
  };
}

function MiniChart({ history }: { history: HistoryPoint[] }) {
  const values = history.map((point) => point.close).filter(isFiniteNumber).slice(-160);

  if (values.length < 2) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm font-semibold text-slate-400">
        暫無足夠歷史價格
      </div>
    );
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
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-64 w-full rounded-lg bg-slate-950 p-1">
      <path d={path} fill="none" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function StockHealthClient() {
  const [symbol, setSymbol] = useState('2330');
  const [market, setMarket] = useState<Market>('台股');
  const [timelineLabel, setTimelineLabel] = useState('6M');
  const [details, setDetails] = useState<StockDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedTimeline = useMemo(
    () => TIMELINE_OPTIONS.find((option) => option.label === timelineLabel) || TIMELINE_OPTIONS[1],
    [timelineLabel],
  );
  const analysis = useMemo(() => analyzeStock(details, selectedTimeline), [details, selectedTimeline]);
  const displayHistory = useMemo(
    () => filterHistoryByTimeline(details?.history || [], selectedTimeline),
    [details, selectedTimeline],
  );
  const quoteName = details?.quote?.longName || details?.quote?.name || symbol.toUpperCase();

  const loadDetails = useCallback(async (nextSymbol = symbol, nextMarket = market, nextTimeline = selectedTimeline) => {
    const normalizedSymbol = nextSymbol.trim().toUpperCase();
    if (!normalizedSymbol) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        symbol: normalizedSymbol,
        market: nextMarket,
        name: normalizedSymbol,
        years: String(nextTimeline.yearsForApi),
      });
      const response = await fetch(`/api/stock/details?${params.toString()}`, { cache: 'no-store' });
      const payload = (await response.json()) as DetailsResponse;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || '無法取得股票資料');
      }

      setDetails(payload.data || null);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : '無法取得股票資料');
    } finally {
      setIsLoading(false);
    }
  }, [market, selectedTimeline, symbol]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void loadDetails();
  };

  const handleTimelineChange = (option: TimelineOption) => {
    setTimelineLabel(option.label);
    if (details) {
      void loadDetails(symbol, market, option);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
                <ShieldCheck size={16} />
                股票健康度分析
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                用指標、新聞與來源判斷買賣時機
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                輸入台股或美股代號，選擇 3M、6M 或更長時間線，頁面會用趨勢、動能、回檔、波動、區間位置與新聞來源整理成健康分數，並給出分批買進、部分獲利與停損觀察條件。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                <label className="sr-only" htmlFor="stock-symbol">股票代號</label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="stock-symbol"
                    value={symbol}
                    onChange={(event) => setSymbol(event.target.value)}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-base font-bold text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="例如 2330 或 AAPL"
                  />
                </div>
                <select
                  value={market}
                  onChange={(event) => setMarket(event.target.value as Market)}
                  className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                >
                  {MARKET_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
                >
                  {isLoading ? <RefreshCw size={17} className="animate-spin" /> : <BarChart3 size={17} />}
                  分析
                </button>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">分析時間線</p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {TIMELINE_OPTIONS.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => handleTimelineChange(option)}
                      className={`h-10 rounded-lg border text-sm font-black transition ${
                        selectedTimeline.label === option.label
                          ? 'border-slate-950 bg-slate-950 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                  可以只看近 3 個月或近半年，也能拉長到 10-20 年觀察大週期回檔。資料不足時會以可取得日線計算。
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{market} / {symbol.toUpperCase()}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{quoteName}</h2>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">目前價格</p>
                <p className="text-3xl font-black text-slate-950">{formatNumber(analysis.price)}</p>
              </div>
              <div className={`rounded-lg px-3 py-2 text-sm font-black ${isFiniteNumber(analysis.changePercent) && analysis.changePercent < 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                {formatPercent(analysis.changePercent)}
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-slate-950 p-4 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-300">健康分數</span>
                <span className="text-sm font-bold text-emerald-300">{analysis.status}</span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-black">{analysis.score}</span>
                <span className="pb-2 text-sm font-bold text-slate-400">/ 100</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/15">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${analysis.score}%` }} />
              </div>
            </div>
            {error && (
              <div className="mt-4 flex gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">
                <AlertTriangle size={18} className="shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpenCheck size={18} className="text-orange-600" />
              <h3 className="text-lg font-black text-slate-950">資料來源</h3>
            </div>
            <div className="space-y-3 text-sm">
              <a href={createYahooUrl(symbol, market)} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:border-orange-300 hover:text-orange-700">
                Yahoo Finance / 股市
                <ExternalLink size={15} />
              </a>
              <a href={createGoogleNewsUrl(symbol, market)} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:border-orange-300 hover:text-orange-700">
                Google News 搜尋
                <ExternalLink size={15} />
              </a>
              {SOURCE_LINKS[market].map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:border-orange-300 hover:text-orange-700">
                  {source.label}
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              本頁提供投資研究輔助，不構成買賣建議；財報與重大訊息仍應回到交易所、公開資訊觀測站或 SEC 等原始來源確認。
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LineChart size={20} className="text-orange-600" />
                <h3 className="text-lg font-black text-slate-950">價格趨勢</h3>
              </div>
              <span className="text-sm font-bold text-slate-500">
                {analysis.historyCount ? `${selectedTimeline.label} / ${analysis.historyCount} 筆日線` : '等待分析'}
              </span>
            </div>
            <MiniChart history={displayHistory} />
          </div>

          <div className={`rounded-lg border p-5 shadow-sm ${
            analysis.interpretation.tone === 'positive'
              ? 'border-emerald-200 bg-emerald-50'
              : analysis.interpretation.tone === 'negative'
                ? 'border-rose-200 bg-rose-50'
                : 'border-amber-200 bg-amber-50'
          }`}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <BookOpenCheck
                  size={22}
                  className={
                    analysis.interpretation.tone === 'positive'
                      ? 'mt-0.5 shrink-0 text-emerald-700'
                      : analysis.interpretation.tone === 'negative'
                        ? 'mt-0.5 shrink-0 text-rose-700'
                        : 'mt-0.5 shrink-0 text-amber-700'
                  }
                />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">綜合判讀</p>
                  <h3 className="mt-1 text-2xl font-black text-slate-950">{analysis.interpretation.title}</h3>
                </div>
              </div>
              <span className="rounded-lg bg-white/70 px-3 py-1 text-sm font-black text-slate-700">
                {selectedTimeline.label}
              </span>
            </div>
            <p className="text-base font-black leading-8 text-slate-900">{analysis.interpretation.stance}</p>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{analysis.interpretation.detail}</p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {analysis.interpretation.reasons.map((reason) => (
                <div key={reason} className="rounded-lg border border-white/70 bg-white/70 px-3 py-2 text-sm font-bold text-slate-700">
                  {reason}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {analysis.signals.map((signal) => (
              <div key={signal.title} className={`rounded-lg border p-4 ${SIGNAL_CLASS[signal.tone]}`}>
                <div className="mb-3 flex items-center gap-2">
                  {signal.tone === 'buy' ? <TrendingUp size={18} /> : signal.tone === 'risk' ? <TrendingDown size={18} /> : <Activity size={18} />}
                  <h3 className="text-base font-black">{signal.title}</h3>
                </div>
                <p className="text-sm font-semibold leading-7">{signal.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={20} className="text-orange-600" />
                <h3 className="text-lg font-black text-slate-950">歷史統計分析</h3>
              </div>
              <span className="text-sm font-bold text-slate-500">
                已載入 {analysis.fullHistoryCount || 0} 筆，採用 {analysis.historyCount || 0} 筆
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {analysis.historyStats.map((indicator) => (
                <div key={indicator.label} className={`rounded-lg border p-4 ${STATUS_CLASS[indicator.status]}`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black">{indicator.label}</p>
                    <p className="text-lg font-black">{indicator.value}</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-6 opacity-80">{indicator.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Activity size={20} className="text-orange-600" />
              <h3 className="text-lg font-black text-slate-950">評判指標</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {analysis.indicators.map((indicator) => (
                <div key={indicator.label} className={`rounded-lg border p-4 ${STATUS_CLASS[indicator.status]}`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black">{indicator.label}</p>
                    <p className="text-lg font-black">{indicator.value}</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-6 opacity-80">{indicator.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpenCheck size={20} className="text-orange-600" />
              <h3 className="text-lg font-black text-slate-950">估值參考</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {analysis.valuationStats.map((indicator) => (
                <div key={indicator.label} className={`rounded-lg border p-4 ${STATUS_CLASS[indicator.status]}`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black">{indicator.label}</p>
                    <p className="text-lg font-black">{indicator.value}</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-6 opacity-80">{indicator.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold leading-6 text-slate-500">
              目前歷史估值區間取決於資料源是否提供長期 PE/PB/殖利率。本頁不會用價格資料假裝成估值；若欄位為「-」，請用資料來源連結回到原始財報或估值頁確認。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Newspaper size={20} className="text-orange-600" />
                <h3 className="text-lg font-black text-slate-950">新聞與連結</h3>
              </div>
              <a href={createGoogleNewsUrl(symbol, market)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-black text-orange-700 hover:text-orange-900">
                更多新聞
                <ExternalLink size={15} />
              </a>
            </div>
            <div className="grid gap-3">
              {(details?.news || []).slice(0, 8).map((item) => (
                <a key={`${item.title}-${item.url}`} href={item.url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black leading-7 text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{item.source || '新聞來源'} · {formatDate(item.pubDate)}</p>
                    </div>
                    <ExternalLink size={17} className="mt-1 shrink-0 text-slate-400" />
                  </div>
                </a>
              ))}
              {!details?.news?.length && (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
                  分析後會顯示相關新聞；若資料源暫無新聞，可使用上方 Google News 連結查詢。
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
