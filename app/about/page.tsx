import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: '關於陳憲億 Joseph Chen | Software Engineer & AI Developer',
  description: '了解更多關於陳憲億（Joseph Chen）的背景、技術專長與工作經驗。目前在 Foxconn 擔任軟體工程師，專注於 AI 與自動化解決方案。',
  keywords: ['Joseph Chen', '陳憲億', '關於我', '軟體工程師', 'Foxconn', 'AI', 'Python', 'React'],
};

export default function AboutPage() {
  return <AboutContent />;
}
