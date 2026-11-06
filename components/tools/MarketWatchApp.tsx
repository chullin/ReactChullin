'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import StockWatchlistClient from './StockWatchlistClient';

export default function MarketWatchApp({ session, configured }: { session: Session | null; configured: boolean }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={configured}>
      <StockWatchlistClient accountConfigured={configured} />
    </SessionProvider>
  );
}
