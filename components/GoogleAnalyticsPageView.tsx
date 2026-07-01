'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
    interface Window {
        gtag?: (
            command: 'config',
            targetId: string,
            config?: Record<string, string>
        ) => void;
    }
}

type GoogleAnalyticsPageViewProps = {
    measurementId: string;
};

export default function GoogleAnalyticsPageView({ measurementId }: GoogleAnalyticsPageViewProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.toString();

    useEffect(() => {
        if (!window.gtag) {
            return;
        }

        const pagePath = query ? `${pathname}?${query}` : pathname;

        window.gtag('config', measurementId, {
            page_path: pagePath,
        });
    }, [measurementId, pathname, query]);

    return null;
}
