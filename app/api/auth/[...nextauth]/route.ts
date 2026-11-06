import type { NextRequest } from 'next/server';
import { handlers, marketAuthConfigured } from '@/lib/market/auth';

export async function GET(request: NextRequest) {
  if (!marketAuthConfigured()) return Response.json({ error: 'Google 登入功能準備中。' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  return handlers.GET(request);
}

export async function POST(request: NextRequest) {
  if (!marketAuthConfigured()) return Response.json({ error: 'Google 登入功能準備中。' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  return handlers.POST(request);
}
