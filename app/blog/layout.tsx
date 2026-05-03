'use client';

import BlogOverlay from '@/components/blog/BlogOverlay';
import FloatingNav from '@/components/blog/FloatingNav';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TOC from '@/components/blog/TOC';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { usePathname } from 'next/navigation';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isArticlePage = pathname !== '/blog' && pathname.startsWith('/blog/');

  return (
    <BlogOverlay>
      {isArticlePage && <ReadingProgress />}
      {isArticlePage && <TOC />}
      <FloatingNav />
      {isArticlePage ? (
        <div className="pt-24">
          <div className="max-w-3xl mx-auto px-6">
            <Breadcrumbs />
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </BlogOverlay>
  );
}
