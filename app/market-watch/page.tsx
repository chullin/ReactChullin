import { Metadata } from 'next';
import MarketWatchClient from '@/components/tools/MarketWatchClient';

export const metadata: Metadata = {
  title: 'Market Watch 市場觀察清單 | Joseph Chen',
  description: '追蹤台股、美股與外匯標的，查看價格、漲跌、簡易趨勢與市場狀態。',
  alternates: {
    canonical: 'https://chullin.tw/market-watch',
  },
};

export default function MarketWatchPage() {
  return <MarketWatchClient />;
}
