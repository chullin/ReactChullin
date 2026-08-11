import type { Metadata } from 'next';
import MarketExplorerClient from '@/components/tools/MarketExplorerClient';

export const metadata: Metadata = {
  title: '市場探索｜大型股票與 ETF 持股變化 | Joseph Chen',
  description: '查看大型股票漲跌排行、回檔觀察名單，以及 ETF 官方持股與每日揭露變化。',
  alternates: {
    canonical: 'https://chullin.tw/market-explorer',
  },
};

export default function MarketExplorerPage() {
  return <MarketExplorerClient />;
}
