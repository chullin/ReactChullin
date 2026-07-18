import type { MarketQuote, NotificationEvent, PriceAlert } from '@/lib/market/types';
import { didCrossAlertTarget, isAlertCoolingDown } from '@/lib/market/alerts';
import { InAppNotificationProvider, createNotificationEvent } from '@/lib/market/notifications';

export type AlertCheckResult = {
  events: NotificationEvent[];
  alerts: PriceAlert[];
};

export async function checkPriceAlerts({
  alerts,
  previousQuotes,
  currentQuotes,
  now = new Date().toISOString(),
}: {
  alerts: PriceAlert[];
  previousQuotes: Record<string, MarketQuote>;
  currentQuotes: Record<string, MarketQuote>;
  now?: string;
}): Promise<AlertCheckResult> {
  const provider = new InAppNotificationProvider();
  const triggeredAlertIds = new Set<string>();
  const events: NotificationEvent[] = [];

  for (const alert of alerts) {
    if (!alert.isEnabled) continue;
    if (isAlertCoolingDown(alert.lastTriggeredAt, alert.cooldownMinutes, new Date(now))) continue;

    const previousQuote = previousQuotes[alert.assetId];
    const currentQuote = currentQuotes[alert.assetId];

    if (!previousQuote || !currentQuote) continue;

    const previousValue = alert.conditionType.includes('percent')
      ? previousQuote.changePercent
      : previousQuote.currentPrice;
    const currentValue = alert.conditionType.includes('percent')
      ? currentQuote.changePercent
      : currentQuote.currentPrice;

    const crossed = didCrossAlertTarget({
      previousPrice: previousValue,
      currentPrice: currentValue,
      conditionType: alert.conditionType,
      targetValue: alert.targetValue,
    });

    if (!crossed || typeof currentValue !== 'number' || !Number.isFinite(currentValue)) continue;

    const pendingEvent = createNotificationEvent(alert, currentValue, now);
    const deliveredEvent = await provider.send({
      alert,
      event: pendingEvent,
      assetName: currentQuote.displayName,
      symbol: currentQuote.symbol,
      detailUrl: `/market-watch?asset=${encodeURIComponent(currentQuote.assetId)}`,
    });

    triggeredAlertIds.add(alert.alertId);
    events.push(deliveredEvent);
  }

  const updatedAlerts = alerts.map((alert) => {
    if (!triggeredAlertIds.has(alert.alertId)) return alert;

    return {
      ...alert,
      isEnabled: alert.triggerMode === 'once' ? false : alert.isEnabled,
      lastTriggeredAt: now,
      updatedAt: now,
    };
  });

  return { events, alerts: updatedAlerts };
}

export function groupAlertsByAssetId(alerts: PriceAlert[]) {
  return alerts.reduce<Record<string, PriceAlert[]>>((groups, alert) => {
    groups[alert.assetId] = [...(groups[alert.assetId] || []), alert];
    return groups;
  }, {});
}
