import { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import HomeAbout from '@/components/home/HomeAbout';

export const metadata: Metadata = {
  title: 'Joseph Chen (陳憲億) - Software Engineer',
  description: 'Software Engineer specializing in Python, AI, and Embedded Systems. View my portfolio, resume, and blog.',
  keywords: ['Joseph Chen', '陳憲億', 'Software Engineer', 'Python', 'AI', 'Embedded Systems', 'Portfolio'],
  openGraph: {
    title: 'Joseph Chen (陳憲億) - Software Engineer',
    description: 'Software Engineer specializing in Python, AI, and Embedded Systems. View my portfolio, resume, and blog.',
    url: 'https://react-chullin.vercel.app', // Update with actual domain if different
    siteName: 'Joseph Chen Portfolio',
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
