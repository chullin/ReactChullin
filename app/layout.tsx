import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: '陳憲億 Joseph Chen | Software Engineer | AI & Robotics',
  description: 'Software Engineer | Python | AI | Robotics | Joseph Chen 陳憲億 Portfolio',
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
