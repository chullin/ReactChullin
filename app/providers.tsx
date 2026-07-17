'use client';

import { HeroUIProvider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import MemoryTracker from '@/components/memory/MemoryTracker';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <I18nProvider>
        <Suspense fallback={null}>
          <MemoryTracker />
        </Suspense>
        {children}
      </I18nProvider>
    </HeroUIProvider>
  );
}
