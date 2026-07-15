import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { Providers } from './providers';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-plus-jakarta',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    display: 'swap',
    variable: '--font-playfair',
});

export const metadata = {
    metadataBase: new URL('https://chullin.tw'),
    title: {
        default: 'Joseph Chen 陳憲億 | AI Application & Automation Engineer',
        template: '%s | Joseph Chen'
    },
    description: 'Joseph Chen（陳憲億）是 AI 應用與自動化工程師，專注於離線 AI 部署、智慧製造、React 與 Python 系統整合。分享深度技術筆記。',
    keywords: ['Joseph Chen', '陳憲億', 'Joseph Chen Taiwan', 'Joseph Chen Portfolio', 'AI Application Engineer', 'Automation Engineer', 'Foxconn', '鴻海', 'Python Automation', 'OpenCV', 'React', '離線 AI', '系統重構'],
    authors: [{ name: 'Joseph Chen 陳憲億', url: 'https://chullin.tw' }],
    creator: 'Joseph Chen 陳憲億',
    verification: {
        google: 'Tmye4gYSZJvx8O85kCLZrOhKl52Adtlg5Ntr-qAVMAM',
    },
    openGraph: {
        type: 'website',
        locale: 'zh_TW',
        url: 'https://chullin.tw/',
        title: 'Joseph Chen 陳憲億 | Software Engineer & AI Developer',
        description: 'Joseph Chen（陳憲億）的個人品牌網站。分享 AI、React、Python 與系統開發技術。',
        siteName: 'Joseph Chen Portfolio',
        images: [
            {
                url: '/assets/profile3.webp',
                width: 1200,
                height: 630,
                alt: 'Joseph Chen Profile',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Joseph Chen 陳憲億 | Software Engineer',
        description: 'Explore the portfolio of Joseph Chen, also known as 陳憲億, a Software Engineer in AI & Robotics.',
        images: ['/assets/profile3.webp'],
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
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://chullin.tw/#website",
            "url": "https://chullin.tw/",
            "name": "Joseph Chen Portfolio",
            "alternateName": ["Joseph Chen 陳憲億", "陳憲億 Joseph Chen"],
            "publisher": {
                "@id": "https://chullin.tw/#person"
            },
            "inLanguage": ["zh-Hant", "en"]
        },
        {
            "@type": "Person",
            "@id": "https://chullin.tw/#person",
            "name": "Joseph Chen",
            "alternateName": ["陳憲億", "Joseph Chen 陳憲億", "陳憲億 Joseph Chen", "Sian-Yi Chen"],
            "url": "https://chullin.tw/",
            "mainEntityOfPage": "https://chullin.tw/",
            "jobTitle": "Software Engineer",
            "worksFor": {
                "@type": "Organization",
                "name": "Foxconn"
            },
            "description": "Joseph Chen（陳憲億）是 Foxconn 軟體工程師，專注於 AI、自動化、React、Python 與系統開發。",
            "knowsAbout": ["Python", "AI", "React", "Next.js", "System Design", "Automation", "Offline AI Deployment", "OpenCV"],
            "image": "https://chullin.tw/assets/profile3.webp",
            "sameAs": [
                "https://chullin.tw/",
                "https://github.com/chullin",
                "https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en",
                "https://profile.104.com.tw/profile/c71bed22-e78d-4e03-acdf-fb9c42e0076d/about"
            ]
        }
    ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='zh-Hant' className={`${plusJakarta.variable} ${playfair.variable}`} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="min-h-screen bg-white" suppressHydrationWarning>
                <GoogleAnalytics />
                <Providers>
                    <SiteHeader />
                    <main>
                        {children}
                    </main>
                    <SiteFooter />
                </Providers>
            </body>
        </html>
    );
}
