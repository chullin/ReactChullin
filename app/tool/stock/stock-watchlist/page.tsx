import { Metadata } from 'next';
import StockWatchlistClient from '@/components/tools/StockWatchlistClient';

export const metadata: Metadata = {
  title: '自選股看盤 | Joseph Chen',
  description: '自訂台股與美股追蹤清單，即時查看報價與漲跌幅。',
  alternates: {
    canonical: 'https://chullin.tw/tool/stock/stock-watchlist',
  },
};

export default function StockWatchlistPage() {
  return <StockWatchlistClient />;
}
