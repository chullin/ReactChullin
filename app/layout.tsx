import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://chullin.vercel.app/'),
  title: '陳憲億 Joseph Chen | Software Engineer | AI & Robotics',
  description: 'Software Engineer specializing in Python, AI, and Robotics. Explore Joseph Chen（陳憲億） portfolio and projects.',
  keywords: ['Joseph Chen', '陳憲億', 'Software Engineer', 'AI', 'Robotics', 'Python', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Joseph Chen' }],
  creator: 'Joseph Chen',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://chullin.vercel.app/',
    title: '陳憲億 Joseph Chen | Software Engineer | AI & Robotics',
    description: 'Software Engineer | Python | AI | Robotics | Joseph Chen 陳憲億 Portfolio',
    siteName: 'Joseph Chen Portfolio',
    images: [
      {
        url: '/assets/profile3.png',
        width: 1200,
        height: 630,
        alt: 'Joseph Chen Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '陳憲億 Joseph Chen | Software Engineer',
    description: 'Explore the portfolio of Joseph Chen, a Software Engineer in AI & Robotics.',
    images: ['/assets/profile3.png'],
  },
  alternates: {
    canonical: 'https://chullin.vercel.app/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-Hant'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body className="d-flex flex-column h-100">
        <Script
          src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
          strategy="afterInteractive"
        />
        <main className="flex-shrink-0">
          <Navbar />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
