'use client';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardBody } from '@heroui/react';

interface Post {
  title: string;
  href: string;
  description: string;
}

interface BlogRelatedPostsProps {
  currentPostHref: string;
  category: string;
}

const ALL_POSTS: Record<string, Post[]> = {
  ai: [
    { title: 'AI 離線部署系列 EP.01：架構簡介', href: '/blog/ai/ep01-airgapped-intro', description: '探討無網路環境下部署 AI 的挑戰。' },
    { title: 'TTS 模型語音合成技術', href: '/blog/ai/ep05-tts-models', description: '深度解析語音合成技術發展。' },
    { title: 'LoRA 參數高效微調', href: '/blog/ai/ep07-finetune-lora', description: '輕量化模型微調實戰指南。' },
    { title: 'Test Management System (TMS)', href: '/blog/ai/ep09-tms', description: 'Legacy System 重構與現代化。' },
    { title: 'OpenCV Vision Automation', href: '/blog/ai/ep10-opencv-robot', description: '智慧化視覺辨識與座標映射。' },
  ],
  'system-design': [
    { title: '系統設計入門：可擴展性', href: '/blog/system-design/ep01-intro', description: '理解分散式系統的核心概念。' },
    { title: '負載平衡 Load Balancer', href: '/blog/system-design/ep02-load-balancer', description: '高併發環境下的流量調度。' },
    { title: '快取策略 Caching Strategies', href: '/blog/system-design/ep03-cache', description: '提升系統回應速度的關鍵技術。' },
  ],
  'web-dev': [
    { title: '進階導航組件設計', href: '/blog/web-dev/ep09-advanced-nav', description: 'React 與 Framer Motion 的動畫整合。' },
    { title: 'Bootstrap 基礎與現代化', href: '/blog/web-dev/ep11-bootstrap', description: '在 Next.js 中優化 legacy UI。' },
  ],
};

export default function BlogRelatedPosts({ currentPostHref, category }: BlogRelatedPostsProps) {
  const relatedPosts = (ALL_POSTS[category] || [])
    .filter(post => post.href !== currentPostHref)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 space-y-8">
      <div className="flex items-center gap-3">
        <BookOpen className="text-blue-500" size={24} />
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">延伸閱讀：更多 {category.toUpperCase()} 技術分享</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedPosts.map((post) => (
          <Link key={post.href} href={post.href} className="group">
            <Card className="border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300">
              <CardBody className="p-5 space-y-2">
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-blue-500 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  閱讀文章 <ArrowRight size={12} />
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
