import type { Metadata } from 'next';
import MarketExplorerClient from '@/components/tools/MarketExplorerClient';

export const metadata: Metadata = {
  title: '市場探索｜美股台股前 100 與 ETF 持股變化 | Joseph Chen',
  description: '查看美股、台股市值前 100，以及台灣 ETF 規模前 100 與官方持股揭露變化。',
  alternates: {
    canonical: 'https://chullin.tw/market-explorer',
  },
};

export default function MarketExplorerPage() {
  return <MarketExplorerClient />;
}
