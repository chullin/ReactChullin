import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: '技術部落格 | Joseph Chen 陳憲億',
  description: '由 Joseph Chen（陳憲億）撰寫的技術部落格，分享 AI、React、Python、系統設計與自動化開發心得。',
  keywords: ['Joseph Chen', '陳憲億', 'Joseph Chen Taiwan', 'Joseph Chen Blog', '部落格', 'AI', 'React', 'Python', '系統設計', '自動化'],
  alternates: {
    canonical: 'https://chullin.tw/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
