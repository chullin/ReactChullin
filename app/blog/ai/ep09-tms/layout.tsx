import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Management System (TMS) | Legacy System 重構實戰',
  description: '分享如何在不中斷實驗室運作的前提下，重構一套每天被大量使用的測試管理系統，處理上萬行 legacy code 的實戰心得。',
  alternates: {
    canonical: 'https://chullin.tw/blog/ai/ep09-tms',
  },
  openGraph: {
    title: 'Test Management System (TMS) | Legacy System 重構實戰',
    description: '從維護上萬行 legacy code，到逐步推動 Python3 與 React 現代化遷移。',
    type: 'article',
    publishedTime: '2025-05-10T00:00:00.000Z',
    authors: ['陳憲億 Joseph Chen'],
    images: ['/assets/profile3.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
