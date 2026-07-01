import { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import HomeAbout from '@/components/home/HomeAbout';

export const metadata: Metadata = {
  title: 'Joseph Chen 陳憲億 | AI Application & Automation Engineer',
  description: 'Joseph Chen（陳憲億）是專注於 AI 應用、自動化系統與智慧製造的軟體工程師，目前任職於 Foxconn，具備 Offline AI Deployment、OpenCV、Python Automation 與 Web Development 經驗。',
  keywords: [
    'Joseph Chen',
    '陳憲億',
    'Joseph Chen Taiwan',
    'Joseph Chen Portfolio',
    'AI Application Engineer',
    'Automation Engineer',
    'Foxconn',
    'Offline AI',
    'Ollama',
    'Dify',
    'OpenCV',
    'Python Automation',
    'Smart Manufacturing',
    'Software Engineer Taiwan'
  ],
  authors: [{ name: 'Joseph Chen 陳憲億', url: 'https://chullin.tw' }],
  alternates: {
    canonical: 'https://chullin.tw',
  },
  openGraph: {
    title: 'Joseph Chen 陳憲億 | AI Application & Automation Engineer',
    description: 'Joseph Chen（陳憲億）是專注於 AI 應用、自動化系統與智慧製造的軟體工程師，具備 Offline AI Deployment 與 Smart Manufacturing 實戰經驗。',
    url: 'https://chullin.tw',
    siteName: 'Joseph Chen Portfolio',
    images: [
      {
        url: '/assets/profile3.webp',
        width: 800,
        height: 800,
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
};

import HomeProjects from '@/components/home/HomeProjects';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <HomeHero />
      <HomeAbout />
      <HomeProjects />
    </div>
  );
}
