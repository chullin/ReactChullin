import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Python 與 Shell 正規表達式 (Regex) 完全指南 | Joseph Chen',
  description: '深入淺出教學：從零開始掌握 Regex 基礎元字符，並實戰應用於 Python 資料提取與 Shell 日誌分析。全棧工程師必備的核心技術。',
  keywords: ['Regex', '正規表達式', 'Python', 'Shell', 'Grep', '全棧開發', '教學'],
  openGraph: {
    title: 'Python 與 Shell 正規表達式 (Regex) 完全指南',
    description: '從原子組件到實戰提取，掌握全棧開發中最核心的萬用字元搜尋技術。',
    type: 'article',
    url: 'https://chullin.tw/blog/python/ep04-regex',
    images: ['/assets/post-bg.webp'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
