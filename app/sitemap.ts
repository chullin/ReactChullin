import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chullin.tw';
  const lastModified = new Date().toISOString();

  // 靜態頁面
  const routes = [
    '',
    '/blog',
    '/resume',
    '/projects',
    '/contact',
    '/about',
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

  // 部落格文章路徑 (這裡可以手動維護或透過 API 抓取)
  const blogPosts = [
    '/blog/ai/ep05-tts-models',
    '/blog/ai/ep07-finetune-lora',
    '/blog/backend/ep02-csharp-aspnet',
    '/blog/devops/ep02-github-actions',
    '/blog/network/ep04-jwt-oauth2',
    '/blog/system-design/ep01-intro',
    '/blog/system-design/ep02-load-balancer',
    '/blog/system-design/ep03-cache',
    '/blog/web-dev/ep09-advanced-nav',
    '/blog/web-dev/ep11-bootstrap-basics',
  ].map((post) => ({
    url: `${baseUrl}${post}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
