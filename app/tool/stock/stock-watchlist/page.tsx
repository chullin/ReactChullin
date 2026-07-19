import { Metadata } from 'next';
import StockWatchlistClient from '@/components/tools/StockWatchlistClient';

export const metadata: Metadata = {
  title: '市場觀察清單 | Joseph Chen',
  description: '自訂台股、美股與市場標的追蹤清單，即時查看報價、漲跌幅與進階分析圖表。',
  alternates: {
    canonical: 'https://chullin.tw/tool/stock/stock-watchlist',
  },
};

export default function StockWatchlistPage() {
  return <StockWatchlistClient />;
}
