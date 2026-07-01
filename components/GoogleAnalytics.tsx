import Script from 'next/script';
import { Suspense } from 'react';
import GoogleAnalyticsPageView from './GoogleAnalyticsPageView';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-V99XQTJ30E';

export default function GoogleAnalytics() {
    if (process.env.NODE_ENV !== 'production' || !GA_MEASUREMENT_ID) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
            <Suspense fallback={null}>
                <GoogleAnalyticsPageView measurementId={GA_MEASUREMENT_ID} />
            </Suspense>
        </>
    );
}
