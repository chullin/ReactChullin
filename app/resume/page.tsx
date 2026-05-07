import { Metadata } from 'next';
import ResumeContent from '@/components/resume/ResumeContent';

export const metadata: Metadata = {
  title: '線上履歷 Resume | 陳憲億 Joseph Chen',
  description: '陳憲億（Joseph Chen）的個人履歷。目前任職於 Foxconn 擔任軟體工程師，具備 AI、Python 與自動化系統開發經驗。查看我的學經歷與專業技能。',
  keywords: ['陳憲億', 'Joseph Chen', '履歷', 'Resume', 'CV', 'Software Engineer', 'Foxconn', 'AI', 'Python'],
  openGraph: {
    title: '線上履歷 Resume | 陳憲億 Joseph Chen',
    description: '陳憲億（Joseph Chen）的個人履歷。探索我的工作經驗、學歷背景與技術專長。',
    url: 'https://chullin.vercel.app/resume',
    siteName: '陳憲億 Joseph Chen Portfolio',
    images: [
      {
        url: '/assets/profile3.png',
        width: 800,
        height: 800,
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function ResumePage() {
  return <ResumeContent />;
}
