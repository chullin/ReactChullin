'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { series } from '@/config/blog';

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/blog') return null;

  const parts = pathname.split('/').filter(Boolean); // [blog, category, slug]
  
  // Find category label from config
  const categoryId = parts[1];
  const category = series.find(s => s.id === categoryId);
  const categoryLabel = category ? category.label : categoryId;

  // Find post title
  const post = category?.posts.find(p => p.href === pathname);
  const postTitle = post ? (post.ep ? `${post.ep} ${post.title}` : post.title) : parts[2];

  return (
    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home size={12} />
      </Link>
      <ChevronRight size={10} className="opacity-30" />
      <Link href="/blog" className="hover:text-primary transition-colors">
        Blog
      </Link>
      <ChevronRight size={10} className="opacity-30" />
      <span className="opacity-60">{categoryLabel}</span>
      <ChevronRight size={10} className="opacity-30" />
      <span className="text-primary truncate max-w-[200px]">{postTitle}</span>
    </nav>
  );
}
