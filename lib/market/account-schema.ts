import { z } from 'zod';

const market = z.enum(['美股', '台股', '外匯', '貴金屬']);
const text = z.string().trim().min(1).max(120);
const stock = z.object({ symbol: text, market, pinned: z.boolean().optional() });
const list = z.object({ id: text, name: text });
const date = z.string().datetime();
const alert = z.object({
  alertId: text, symbol: text, market,
  conditionType: z.enum(['price_above', 'price_below']),
  targetValue: z.number().finite(), isEnabled: z.boolean(),
  triggerMode: z.enum(['once', 'repeat']),
  cooldownMinutes: z.number().finite().min(0).max(525600),
  lastTriggeredAt: date.nullable(), createdAt: date, updatedAt: date,
});

export const marketAccountSchema = z.object({
  version: z.literal(1),
  watchlistDefs: z.array(list).min(1).max(30),
  watchlists: z.record(z.string().min(1).max(120), z.array(stock).max(300)),
  alerts: z.array(alert).max(500),
  activeListId: text,
  activeMarket: z.enum(['全部', '美股', '台股', '外匯', '貴金屬']),
  viewMode: z.enum(['cards', 'table']),
}).superRefine((value, context) => {
  const ids = value.watchlistDefs.map((item) => item.id);
  if (new Set(ids).size !== ids.length || !ids.includes(value.activeListId) ||
      Object.keys(value.watchlists).length > 30 ||
      ids.some((id) => !Object.hasOwn(value.watchlists, id)) ||
      Object.keys(value.watchlists).some((id) => !ids.includes(id))) {
    context.addIssue({ code: 'custom', message: 'Invalid watchlist definitions' });
  }
});

export type MarketAccountSnapshot = z.infer<typeof marketAccountSchema>;
export type MarketAccountDocument = { revision: number; updatedAt: string; snapshot: MarketAccountSnapshot };
