import { Metadata } from 'next';
import ResumeContent from '@/components/resume/ResumeContent';

export const metadata: Metadata = {
  title: 'Resume - Joseph Chen (陳憲億)',
  description: 'Professional resume of Joseph Chen (陳憲億), showcasing experience as a Software Engineer at Foxconn and Sound Control Technology, and academic background in CSIE.',
  keywords: ['Resume', 'CV', 'Joseph Chen', 'Software Engineer', 'Python', 'Foxconn', 'Embedded Systems', '陳憲億'],
  openGraph: {
    title: 'Resume - Joseph Chen (陳憲億)',
    description: 'Professional resume of Joseph Chen (陳憲億). Explore my experience, education, and technical skills.',
    url: 'https://react-chullin.vercel.app/resume',
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

export default function ResumePage() {
  return <ResumeContent />;
}
