import { MetadataRoute } from 'next';
import { series } from '@/config/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chullin.tw';
  const lastModified = new Date().toISOString();

  // 靜態頁面
  const routes = [
    '',
    '/about',
    '/blog',
    '/projects',
    '/contact',
    '/flashcards',
    '/tetris-battle',
    '/snake',
    '/vocab-quiz',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog 文章：從 series.flatMap 取得 href，排除 isExternal === true
  const blogPosts = series
    .flatMap((s) => s.posts)
    .filter((post) => !post.isExternal)
    .map((post) => ({
      url: `${baseUrl}${post.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...routes, ...blogPosts];
}
