import type { NotificationEvent, PriceAlert } from '@/lib/market/types';

export type NotificationPayload = {
  alert: PriceAlert;
  event: NotificationEvent;
  assetName: string;
  symbol: string;
  detailUrl: string;
};

export type NotificationProvider = {
  channel: NotificationEvent['channel'];
  send(payload: NotificationPayload): Promise<NotificationEvent>;
};

export class InAppNotificationProvider implements NotificationProvider {
  channel = 'in_app' as const;

  async send(payload: NotificationPayload): Promise<NotificationEvent> {
    return {
      ...payload.event,
      channel: this.channel,
      deliveryStatus: 'sent',
    };
  }
}

export function createNotificationEvent(
  alert: PriceAlert,
  triggeredPrice: number,
  triggeredAt = new Date().toISOString(),
): NotificationEvent {
  return {
    alertId: alert.alertId,
    triggeredPrice,
    targetValue: alert.targetValue,
    conditionType: alert.conditionType,
    channel: 'in_app',
    deliveryStatus: 'pending',
    triggeredAt,
  };
}
