import { Metadata } from 'next';
import ContactContent from '@/components/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact - Joseph Chen (陳憲億)',
  description: "Get in touch with Joseph Chen (陳憲億). I'm always open to discussing technical projects, opportunities, and ideas.",
  keywords: ['Contact', 'Joseph Chen', 'Software Engineer', 'Hire', 'Email', '陳憲億'],
  openGraph: {
    title: 'Contact - Joseph Chen (陳憲億)',
    description: "Let's work together! Get in touch with me for technical projects and opportunities.",
    url: 'https://react-chullin.vercel.app/contact',
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

export default function ContactPage() {
  return <ContactContent />;
}
