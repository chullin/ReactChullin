import { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import HomeAbout from '@/components/home/HomeAbout';

export const metadata: Metadata = {
  title: '陳憲億 Joseph Chen | Software Engineer & AI Developer',
  description: '陳憲億（Joseph Chen）是 Foxconn 軟體工程師，專注於 AI、自動化、React、Python 與系統開發。這是在 Vercel 上的個人作品集與技術部落格。',
  keywords: ['Joseph Chen', '陳憲億', 'Software Engineer', 'Foxconn', 'AI', 'React', 'Python', 'Portfolio', '系統設計'],
  openGraph: {
    title: '陳憲億 Joseph Chen | Software Engineer & AI Developer',
    description: '陳憲億（Joseph Chen）是 Foxconn 軟體工程師，專注於 AI、自動化、React、Python 與系統開發。',
    url: 'https://chullin.tw',
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

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <HomeHero />
      <HomeAbout />
    </div>
  );
}
