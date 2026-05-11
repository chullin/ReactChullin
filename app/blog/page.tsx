import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: '技術部落格 | 陳憲億 Joseph Chen',
  description: '由陳憲億（Joseph Chen）撰寫的技術部落格，分享 AI、React、Python、系統設計與自動化開發心得。',
  keywords: ['陳憲億', 'Joseph Chen', '部落格', 'AI', 'React', 'Python', '系統設計', '自動化'],
  alternates: {
    canonical: 'https://chullin.tw/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
