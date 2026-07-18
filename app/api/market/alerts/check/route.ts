import { NextRequest, NextResponse } from 'next/server';
import type { MarketQuote, PriceAlert } from '@/lib/market/types';
import { checkPriceAlerts } from '@/lib/market/alertEngine';

export const dynamic = 'force-dynamic';

type AlertCheckRequestBody = {
  alerts?: PriceAlert[];
  previousQuotes?: Record<string, MarketQuote>;
};

type QuotesResponse = {
  success?: boolean;
  data?: Record<string, MarketQuote>;
  error?: string;
};

function uniqueAssetIds(alerts: PriceAlert[]) {
  return Array.from(new Set(alerts.map((alert) => alert.assetId))).filter(Boolean);
}

async function getCurrentQuotes(request: NextRequest, assetIds: string[]) {
  if (!assetIds.length) return {};

  const url = new URL('/api/market/quotes', request.nextUrl.origin);
  url.searchParams.set('assets', assetIds.join(','));

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) return {};

  const payload = (await response.json()) as QuotesResponse;
  return payload.success && payload.data ? payload.data : {};
}

export async function POST(request: NextRequest) {
  let body: AlertCheckRequestBody;

  try {
    body = (await request.json()) as AlertCheckRequestBody;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const alerts = body.alerts || [];
  const previousQuotes = body.previousQuotes || {};

  if (!alerts.length) {
    return NextResponse.json({ success: true, data: { events: [], alerts: [] } });
  }

  try {
    const currentQuotes = await getCurrentQuotes(request, uniqueAssetIds(alerts));
    const result = await checkPriceAlerts({
      alerts,
      previousQuotes,
      currentQuotes,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        currentQuotes,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to check market alerts' },
      { status: 502 },
    );
  }
}
