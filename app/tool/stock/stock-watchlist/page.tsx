import { permanentRedirect } from 'next/navigation';

export default function LegacyStockWatchlistPage() {
  permanentRedirect('/market-watch');
}
