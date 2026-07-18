import type { PriceCrossingInput } from '@/lib/market/types';

export function didCrossAlertTarget({
  previousPrice,
  currentPrice,
  conditionType,
  targetValue,
}: PriceCrossingInput) {
  if (previousPrice === null || currentPrice === null) return false;

  if (conditionType === 'price_above' || conditionType === 'change_percent_above') {
    return previousPrice <= targetValue && currentPrice > targetValue;
  }

  if (conditionType === 'price_below' || conditionType === 'change_percent_below') {
    return previousPrice >= targetValue && currentPrice < targetValue;
  }

  return false;
}

export function isAlertCoolingDown(lastTriggeredAt: string | null, cooldownMinutes: number, now = new Date()) {
  if (!lastTriggeredAt || cooldownMinutes <= 0) return false;

  const lastTriggeredTime = Date.parse(lastTriggeredAt);
  if (Number.isNaN(lastTriggeredTime)) return false;

  return now.getTime() - lastTriggeredTime < cooldownMinutes * 60_000;
}
