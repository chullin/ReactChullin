import { Metadata } from 'next';
import HubClient from '@/components/hub/HubClient';

export const metadata: Metadata = {
  title: '網站入口總覽 | Joseph Chen',
  description: '整理 Joseph Chen 網站中的文章、專案、工具、股市追蹤、遊戲與互動練習，提供簡單好找的分類入口。',
  alternates: {
    canonical: 'https://chullin.tw/hub',
  },
};

export default function HubPage() {
  return <HubClient />;
}
