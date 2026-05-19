import { Metadata } from 'next';
import ContactContent from '@/components/contact/ContactContent';

export const metadata: Metadata = {
  title: '聯絡方式 Contact | 陳憲億 Joseph Chen',
  description: '與陳憲億（Joseph Chen）取得聯繫。歡迎討論技術專案、合作機會或任何關於 AI 與軟體開發的想法。',
  keywords: ['陳憲億', 'Joseph Chen', '聯絡', 'Contact', 'Hire Me', '軟體工程師'],
  openGraph: {
    title: '聯絡方式 Contact | 陳憲億 Joseph Chen',
    description: '期待與您的合作！歡迎透過電子郵件或 LinkedIn 與我聯繫。',
    url: 'https://chullin.tw/contact',
    siteName: '陳憲億 Joseph Chen Portfolio',
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

export default function ContactPage() {
  return <ContactContent />;
}
