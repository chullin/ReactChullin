import { Metadata } from 'next';
import AboutContent from './AboutContent';

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
    'Software Engineer Taiwan',
    'Air-gapped AI',
    'Technical Transfer'
  ],
  authors: [{ name: 'Joseph Chen 陳憲億', url: 'https://chullin.tw' }],
  alternates: {
    canonical: 'https://chullin.tw/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
