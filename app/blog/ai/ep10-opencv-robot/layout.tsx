import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenCV Vision Automation | 智慧化視覺辨識與自動化操作系統',
  description: '透過 OpenCV 視覺辨識與座標轉換，讓傳統依賴固定 XY 座標的自動化測試，升級為可動態辨識 UI 的智慧化操作系統。',
  alternates: {
    canonical: 'https://chullin.tw/blog/ai/ep10-opencv-robot',
  },
  openGraph: {
    title: 'OpenCV Vision Automation | 智慧化視覺辨識與自動化操作系統',
    description: '透過 OpenCV 視覺辨識與座標轉換，實現高彈性的自動化測試。',
    type: 'article',
    publishedTime: '2025-05-10T00:00:00.000Z',
    authors: ['陳憲億 Joseph Chen'],
    images: ['/assets/profile3.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
