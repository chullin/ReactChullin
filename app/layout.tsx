import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './providers';

export const metadata = {
    metadataBase: new URL('https://chullin.tw'),
    title: {
        default: '陳憲億 Joseph Chen | AI Application & Automation Engineer',
        template: '%s | Joseph Chen'
    },
    description: '陳憲億（Joseph Chen）是 AI 應用與自動化工程師，專注於離線 AI 部署、智慧製造、React 與 Python 系統整合。分享深度技術筆記。',
    keywords: ['Joseph Chen', '陳憲億', 'AI Application Engineer', 'Automation Engineer', 'Foxconn', '鴻海', 'Python Automation', 'OpenCV', 'React', '離線 AI', '系統重構'],
    authors: [{ name: '陳憲億 Joseph Chen' }],
    creator: '陳憲億 Joseph Chen',
    // 加入 Google Search Console 驗證碼
    verification: {
        google: 'Tmye4gYSZJvx8O85kCLZrOhKl52Adtlg5Ntr-qAVMAM',
    },
    openGraph: {
        type: 'website',
        locale: 'zh_TW',
        url: 'https://chullin.tw/',
        title: '陳憲億 Joseph Chen | Software Engineer & AI Developer',
        description: '陳憲億（Joseph Chen）的個人品牌網站。分享 AI、React、Python 與系統開發技術。',
        siteName: '陳憲億 Joseph Chen Portfolio',
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
        canonical: 'https://chullin.tw',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/favicon.ico',
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "陳憲億",
    "alternateName": "Joseph Chen",
    "url": "https://chullin.tw/",
    "jobTitle": "Software Engineer",
    "worksFor": {
        "@type": "Organization",
        "name": "Foxconn"
    },
    "description": "陳憲億（Joseph Chen）是 Foxconn 軟體工程師，專注於 AI、自動化、React、Python 與系統開發。",
    "knowsAbout": ["Python", "AI", "React", "Next.js", "System Design", "Automation"],
    "image": "https://chullin.tw/assets/profile3.png",
    "sameAs": [
        "https://github.com/chullin",
        "https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en",
        "https://profile.104.com.tw/profile/c71bed22-e78d-4e03-acdf-fb9c42e0076d/about"
    ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='zh-Hant' suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
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
            <body className="min-h-screen bg-white" suppressHydrationWarning>
                <Providers>
                    <Script
                        src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
                        strategy="afterInteractive"
                    />
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
