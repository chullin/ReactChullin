import type { Metadata } from 'next';
import TradingCostClient from '@/components/tools/TradingCostClient';

export const metadata: Metadata = {
  title: '交易成本計算機 | Joseph Chen',
  description: '計算台股、美股、定期定額與單筆交易成本，並估算賣出後需要回檔多少才值得買回。',
  alternates: {
    canonical: 'https://chullin.tw/trading-cost',
  },
};

export default function TradingCostPage() {
  return <TradingCostClient />;
}
