import type { Metadata } from 'next';
import StockHealthClient from '@/components/tools/StockHealthClient';

export const metadata: Metadata = {
  title: '股票健康度分析 | Joseph Chen',
  description: '用趨勢、動能、波動、52 週位置、新聞與資料來源輔助判斷股票買進、停利與風控時機。',
  alternates: {
    canonical: 'https://chullin.tw/stock-health',
  },
};

export default function StockHealthPage() {
  return <StockHealthClient />;
}
