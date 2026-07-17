'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackMemoryEvent } from '@/utils/userMemory';

function getPageCategory(pathname: string) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/tool') || pathname.includes('vocab') || pathname.includes('tetris') || pathname.includes('snake')) {
    return 'tool';
  }
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'general';
}

function getPageLabel(pathname: string) {
  if (pathname === '/') return '首頁';
  const parts = pathname.split('/').filter(Boolean);
  return parts.at(-1)?.replaceAll('-', ' ') ?? pathname;
}

export default function MemoryTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    if (previousPath.current === fullPath) {
      return;
    }

    previousPath.current = fullPath;

    trackMemoryEvent({
      type: 'page_view',
      label: getPageLabel(pathname),
      category: getPageCategory(pathname),
      path: fullPath,
    });
  }, [pathname, searchParams]);

  return null;
}
